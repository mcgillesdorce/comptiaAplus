import type {
  Question,
  QuestionStat,
  WeaknessTag,
  WeaknessStats,
  WeaknessTrend,
  DomainStats,
  Domain,
  QuizSession,
} from "./types";
import { allQuestions } from "@/data/questions";
import { WEAKNESS_PRIORITIES } from "./domains";

/**
 * Pick questions weighted by Gilly's specific weaknesses.
 *
 * Algorithm:
 * - Questions Gilly has actually missed on practice exams get the highest base priority.
 * - Questions tagged with his top weak areas (jitter, fiber, printer) get a boost.
 * - Questions answered correctly recently get DEPRIORITIZED.
 * - Questions flagged for review get a 2x boost.
 * - Unseen questions get a moderate priority (so they enter the rotation).
 */
export function pickWeakQuestions(
  stats: Record<string, QuestionStat>,
  count: number,
  domainFilter?: Domain[],
  sessions: QuizSession[] = []
): Question[] {
  const recentWeaknessMissRates = getRecentWeaknessMissRates(sessions);
  const candidates = domainFilter && domainFilter.length > 0
    ? allQuestions.filter((q) => domainFilter.includes(q.domain))
    : allQuestions;

  const scored = candidates.map((q) => {
    const stat = stats[q.id];

    // Base score: how often Gilly missed this category
    const weaknessBoost = q.weaknessTags.reduce((sum, tag) => {
      return sum + (WEAKNESS_PRIORITIES[tag]?.priority ?? 0);
    }, 0);
    const recentWeaknessBoost = q.weaknessTags.reduce((sum, tag) => {
      return sum + (recentWeaknessMissRates.get(tag) ?? 0);
    }, 0);

    // Source boost: actual missed questions > drills > concept builders
    const sourceBoost =
      q.source === "exam1-missed" || q.source === "exam2-missed" ? 5 :
      q.source === "drill" ? 3 : 1;

    // Performance: low accuracy = high priority
    let performanceScore = 1.0; // never-seen = full priority
    let recencyDays = 30;
    if (stat) {
      const accuracy = stat.attempts === 0 ? 0 : stat.correct / stat.attempts;
      performanceScore = Math.max(0.1, 1 - accuracy);
      recencyDays = (Date.now() - stat.lastSeen) / (1000 * 60 * 60 * 24);
    }

    // Review flag = 2x priority
    const reviewBoost = stat?.markedForReview ? 2 : 1;

    // Final priority — multiplied together with logarithmic recency
    const priority =
      (weaknessBoost + sourceBoost) *
      performanceScore *
      Math.log(recencyDays + 2) *
      reviewBoost *
      (1 + recentWeaknessBoost);

    // Inject a little randomness so it's not the same set every time
    const jitter = 0.85 + Math.random() * 0.3;

    return { question: q, priority: priority * jitter };
  });

  scored.sort((a, b) => b.priority - a.priority);
  return scored.slice(0, count).map((s) => s.question);
}

function getRecentWeaknessMissRates(
  sessions: QuizSession[],
  limit = 5
): Map<WeaknessTag, number> {
  const recentSessions = sessions
    .filter((s) => s.weaknessResults && Object.keys(s.weaknessResults).length > 0)
    .sort((a, b) => b.finishedAt - a.finishedAt)
    .slice(0, limit);

  const totals = new Map<WeaknessTag, { missWeighted: number; weightSum: number }>();
  const sessionCount = Math.max(1, recentSessions.length);

  recentSessions.forEach((session, index) => {
    const recencyWeight = (sessionCount - index) / sessionCount;
    for (const [tag, result] of Object.entries(session.weaknessResults ?? {})) {
      if (result.total <= 0) continue;
      const missRate = 1 - result.correct / result.total;
      const weaknessTag = tag as WeaknessTag;
      const existing = totals.get(weaknessTag) ?? { missWeighted: 0, weightSum: 0 };
      totals.set(weaknessTag, {
        missWeighted: existing.missWeighted + missRate * recencyWeight,
        weightSum: existing.weightSum + recencyWeight,
      });
    }
  });

  const missRates = new Map<WeaknessTag, number>();
  for (const [tag, total] of totals) {
    if (total.weightSum > 0) {
      missRates.set(tag, total.missWeighted / total.weightSum);
    }
  }
  return missRates;
}

/**
 * Get questions by weakness tag — for "drill this one weakness" mode.
 */
export function getQuestionsByWeakness(tag: WeaknessTag): Question[] {
  return allQuestions.filter((q) => q.weaknessTags.includes(tag));
}

/**
 * Get questions flagged for review by user.
 */
export function getReviewQuestions(stats: Record<string, QuestionStat>): Question[] {
  const flaggedIds = Object.values(stats)
    .filter((s) => s.markedForReview)
    .map((s) => s.questionId);
  return allQuestions.filter((q) => flaggedIds.includes(q.id));
}

/**
 * Compute per-domain accuracy stats.
 */
export function computeDomainStats(
  stats: Record<string, QuestionStat>
): DomainStats[] {
  const byDomain = new Map<Domain, { attempted: number; correct: number; lastSeen: number }>();

  for (const stat of Object.values(stats)) {
    const q = allQuestions.find((x) => x.id === stat.questionId);
    if (!q) continue;
    const existing = byDomain.get(q.domain) ?? { attempted: 0, correct: 0, lastSeen: 0 };
    byDomain.set(q.domain, {
      attempted: existing.attempted + stat.attempts,
      correct: existing.correct + stat.correct,
      lastSeen: Math.max(existing.lastSeen, stat.lastSeen),
    });
  }

  return Array.from(byDomain.entries()).map(([domain, v]) => ({
    domain,
    questionsAttempted: v.attempted,
    questionsCorrect: v.correct,
    accuracyPct: v.attempted === 0 ? 0 : Math.round((v.correct / v.attempted) * 100),
    lastStudied: v.lastSeen,
  }));
}

/**
 * Compute per-weakness-tag accuracy stats. This is the killer feature —
 * shows Gilly exactly which patterns he keeps getting wrong.
 */
export function computeWeaknessStats(
  stats: Record<string, QuestionStat>
): WeaknessStats[] {
  const byTag = new Map<WeaknessTag, { attempted: number; correct: number }>();

  for (const stat of Object.values(stats)) {
    const q = allQuestions.find((x) => x.id === stat.questionId);
    if (!q) continue;
    for (const tag of q.weaknessTags) {
      const existing = byTag.get(tag) ?? { attempted: 0, correct: 0 };
      byTag.set(tag, {
        attempted: existing.attempted + stat.attempts,
        correct: existing.correct + stat.correct,
      });
    }
  }

  return Array.from(byTag.entries())
    .map(([tag, v]) => ({
      tag,
      attempted: v.attempted,
      correct: v.correct,
      accuracyPct: v.attempted === 0 ? 0 : Math.round((v.correct / v.attempted) * 100),
    }))
    .sort((a, b) => a.accuracyPct - b.accuracyPct); // lowest accuracy first
}

/**
 * Compute days until exam.
 */
export function daysUntilExam(targetDate: string | null): number | null {
  if (!targetDate) return null;
  const target = new Date(targetDate).getTime();
  const days = Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24));
  return days;
}

/**
 * Overall pass-readiness estimate.
 * A+ passing is 72%. We weight by domain coverage on the real exam.
 */
export function computeReadinessScore(stats: Record<string, QuestionStat>): {
  estimatedScore: number;
  status: "not-ready" | "borderline" | "ready" | "confident";
  message: string;
} {
  const domainStats = computeDomainStats(stats);

  // A+ Core 1 domain weights
  const weights: Record<Domain, number> = {
    "1.0-mobile": 0.15,
    "2.0-networking": 0.20,
    "3.0-hardware": 0.25,
    "4.0-virtualization-cloud": 0.11,
    "5.0-troubleshooting": 0.29,
  };

  let weighted = 0;
  let totalWeight = 0;
  for (const ds of domainStats) {
    const w = weights[ds.domain] ?? 0;
    weighted += ds.accuracyPct * w;
    totalWeight += w;
  }

  const estimatedScore = totalWeight === 0 ? 0 : Math.round(weighted / totalWeight);

  let status: "not-ready" | "borderline" | "ready" | "confident";
  let message: string;

  if (estimatedScore < 60) {
    status = "not-ready";
    message = "Keep grinding. Focus on weak areas before retaking practice exams.";
  } else if (estimatedScore < 72) {
    status = "borderline";
    message = "You're close. A+ passes at 72% — keep tightening your weak spots.";
  } else if (estimatedScore < 82) {
    status = "ready";
    message = "Above pass mark. Take a full practice exam to confirm readiness.";
  } else {
    status = "confident";
    message = "Strong. Schedule the real exam.";
  }

  return { estimatedScore, status, message };
}

/**
 * Compute per-weakness accuracy breakdown for a single quiz session.
 * Returns a map of tag → { correct, total } for every tag seen in this session.
 */
export function computeSessionWeaknessResults(
  questions: Question[],
  answers: Record<string, string[]>
): Record<string, { correct: number; total: number }> {
  const results: Record<string, { correct: number; total: number }> = {};

  for (const q of questions) {
    const selected = answers[q.id] ?? [];
    const correctIds = q.choices.filter((c) => c.correct).map((c) => c.id);
    const isCorrect =
      selected.length === correctIds.length &&
      selected.every((id) => correctIds.includes(id));

    for (const tag of q.weaknessTags) {
      if (!results[tag]) results[tag] = { correct: 0, total: 0 };
      results[tag].total++;
      if (isCorrect) results[tag].correct++;
    }
  }

  return results;
}

/**
 * Compute weakness trends across all saved sessions.
 * Returns one WeaknessTrend per tag that has been attempted.
 */
export function computeWeaknessTrends(
  sessions: QuizSession[],
  stats: Record<string, QuestionStat>
): WeaknessTrend[] {
  // Sessions that carry per-weakness data (new format)
  const sessionsWithData = sessions.filter(
    (s) => s.weaknessResults && Object.keys(s.weaknessResults).length > 0
  );

  // Collect all tags seen in either session data or all-time stats
  const allTags = new Set<WeaknessTag>();
  for (const s of sessionsWithData) {
    Object.keys(s.weaknessResults!).forEach((t) => allTags.add(t as WeaknessTag));
  }
  for (const stat of Object.values(stats)) {
    const q = allQuestions.find((x) => x.id === stat.questionId);
    if (q) q.weaknessTags.forEach((t) => allTags.add(t));
  }

  // Build all-time map from questionStats
  const allTimeMap = new Map<WeaknessTag, { attempted: number; correct: number }>();
  for (const stat of Object.values(stats)) {
    const q = allQuestions.find((x) => x.id === stat.questionId);
    if (!q) continue;
    for (const tag of q.weaknessTags) {
      const existing = allTimeMap.get(tag) ?? { attempted: 0, correct: 0 };
      allTimeMap.set(tag, {
        attempted: existing.attempted + stat.attempts,
        correct: existing.correct + stat.correct,
      });
    }
  }

  return Array.from(allTags).map((tag) => {
    const allTimeData = allTimeMap.get(tag);
    const allTimeAccuracy =
      allTimeData && allTimeData.attempted > 0
        ? Math.round((allTimeData.correct / allTimeData.attempted) * 100)
        : 0;

    // Sessions that include this tag, sorted oldest → newest
    const tagSessions = sessionsWithData
      .filter((s) => s.weaknessResults![tag])
      .sort((a, b) => a.startedAt - b.startedAt);

    if (tagSessions.length === 0) {
      return {
        tag,
        label: WEAKNESS_PRIORITIES[tag]?.label ?? tag,
        allTimeAccuracy,
        latestAccuracy: allTimeAccuracy,
        prev5Accuracy: null,
        trend: "new" as const,
        delta: 0,
      };
    }

    const latest = tagSessions[tagSessions.length - 1];
    const latestResult = latest.weaknessResults![tag];
    const latestAccuracy =
      latestResult.total > 0
        ? Math.round((latestResult.correct / latestResult.total) * 100)
        : 0;

    // Average of up to 5 sessions BEFORE the latest
    const prev5 = tagSessions.slice(-6, -1);
    const prev5Accuracy =
      prev5.length > 0
        ? Math.round(
            prev5.reduce((sum, s) => {
              const r = s.weaknessResults![tag];
              return sum + (r.total > 0 ? (r.correct / r.total) * 100 : 0);
            }, 0) / prev5.length
          )
        : null;

    const delta = prev5Accuracy !== null ? latestAccuracy - prev5Accuracy : 0;

    let trend: WeaknessTrend["trend"];
    if (tagSessions.length < 2) trend = "new";
    else if (delta >= 10) trend = "improving";
    else if (delta <= -10) trend = "declining";
    else trend = "stable";

    return {
      tag,
      label: WEAKNESS_PRIORITIES[tag]?.label ?? tag,
      allTimeAccuracy,
      latestAccuracy,
      prev5Accuracy,
      trend,
      delta,
    };
  });
}
