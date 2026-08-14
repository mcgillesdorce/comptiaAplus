import {
  questionsAZ305,
  AZ305_OBJECTIVE_ORDER,
  type AZ305Objective,
  type AZ305Question,
} from "@/data/azure/questions/1305";
import {
  AZ305_TAG_NAMES,
  tagsForQuestion,
} from "@/data/azure/questions/1305-tags";
import type { AZ305CardStat } from "./az305-store";

/**
 * Pure analytics helpers for the AZ-305 smart quiz, smart flashcards and the
 * dedicated AZ-305 stats page. All operate over the isolated AZ-305 mastery
 * profile (`cardStats`) and the AZ-305 question bank only.
 */

type Stats = Record<string, AZ305CardStat>;

/** Baseline mastery for an item that has never been seen. */
const UNSEEN_MASTERY = 0.15;
/** Items below this mastery (or never seen) count as "weak". */
export const WEAK_THRESHOLD = 0.5;
/** Mastery above baseline decays with this half-life (days) — forgetting curve. */
const DECAY_HALF_LIFE_DAYS = 14;

/** Official AZ-305 exam domain weights (midpoints of published ranges). */
export const AZ305_BLUEPRINT_WEIGHTS: Record<AZ305Objective, number> = {
  "1.0-identity-governance-monitoring": 0.275,
  "2.0-data-storage": 0.225,
  "3.0-business-continuity": 0.175,
  "4.0-infrastructure": 0.325,
};

/**
 * Mastery with time decay applied: anything learned decays toward the unseen
 * baseline with a ~2-week half-life, so stale wins stop inflating readiness.
 */
function masteryOf(stats: Stats, id: string): number {
  const stat = stats[id];
  if (!stat) return UNSEEN_MASTERY;
  const raw = stat.mastery;
  if (raw <= UNSEEN_MASTERY) return raw;
  const days = (Date.now() - stat.lastSeen) / (1000 * 60 * 60 * 24);
  const factor = Math.pow(0.5, Math.max(days, 0) / DECAY_HALF_LIFE_DAYS);
  return UNSEEN_MASTERY + (raw - UNSEEN_MASTERY) * factor;
}

function recencyDays(stats: Stats, id: string): number {
  const last = stats[id]?.lastSeen;
  if (!last) return 30; // never seen → treat as very stale so it enters rotation
  return (Date.now() - last) / (1000 * 60 * 60 * 24);
}

/**
 * Per-concept weakness (0 = fine, 1 = very weak) computed from attempted
 * questions only, so a miss on one Cosmos question raises the priority of
 * every question sharing its tags.
 */
function buildTagWeakness(stats: Stats): Map<string, number> {
  const sums = new Map<string, { total: number; count: number }>();
  for (const q of questionsAZ305) {
    const stat = stats[q.id];
    if (!stat || stat.attempts === 0) continue;
    const m = masteryOf(stats, q.id);
    for (const tag of tagsForQuestion(q.id)) {
      const e = sums.get(tag) ?? { total: 0, count: 0 };
      e.total += m;
      e.count += 1;
      sums.set(tag, e);
    }
  }
  const weakness = new Map<string, number>();
  for (const [tag, e] of sums) {
    const avg = e.total / e.count;
    weakness.set(tag, Math.max(0, Math.min(1, 1 - avg / 0.6)));
  }
  return weakness;
}

/**
 * Priority score: weaker + staler = higher, boosted up to 1.8× when the
 * question belongs to a concept you've demonstrably struggled with.
 */
function priority(
  stats: Stats,
  q: AZ305Question,
  jitter = true,
  tagWeakness?: Map<string, number>
): number {
  const weakness = 1.2 - masteryOf(stats, q.id); // 0.2 .. 1.2
  const staleness = Math.log(recencyDays(stats, q.id) + 2);
  let base = weakness * staleness;
  if (tagWeakness) {
    let maxTagWeakness = 0;
    for (const tag of tagsForQuestion(q.id)) {
      maxTagWeakness = Math.max(maxTagWeakness, tagWeakness.get(tag) ?? 0);
    }
    base *= 1 + 0.8 * maxTagWeakness;
  }
  return jitter ? base * (0.85 + Math.random() * 0.3) : base;
}

/**
 * Pick `count` questions weighted toward weak / stale / unseen items, boosted
 * by concept-level weakness, and (when unscoped) balanced toward the official
 * exam blueprint so over-represented domains don't dominate the session.
 */
export function pickSmartQuestions(
  stats: Stats,
  count: number,
  objective?: AZ305Objective
): AZ305Question[] {
  const pool = objective
    ? questionsAZ305.filter((q) => q.objective === objective)
    : [...questionsAZ305];

  const tagWeakness = buildTagWeakness(stats);

  // Blueprint correction: weight ÷ share-of-pool per objective.
  const poolCounts = new Map<AZ305Objective, number>();
  for (const q of pool) poolCounts.set(q.objective, (poolCounts.get(q.objective) ?? 0) + 1);
  const blueprintFactor = (q: AZ305Question): number => {
    if (objective) return 1;
    const share = (poolCounts.get(q.objective) ?? 1) / pool.length;
    return AZ305_BLUEPRINT_WEIGHTS[q.objective] / share;
  };

  const weighted = pool.map((q) => ({
    q,
    p: Math.max(priority(stats, q, true, tagWeakness) * blueprintFactor(q), 0.01),
  }));
  const selected: AZ305Question[] = [];

  while (selected.length < count && weighted.length > 0) {
    const total = weighted.reduce((sum, e) => sum + e.p, 0);
    let threshold = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < weighted.length; i++) {
      threshold -= weighted[i].p;
      if (threshold <= 0) {
        idx = i;
        break;
      }
    }
    selected.push(weighted[idx].q);
    weighted.splice(idx, 1);
  }

  return selected;
}

/**
 * Order a flashcard deck so the weakest / stalest cards come first.
 * Deterministic (no jitter) so the deck order is stable within a session.
 */
export function orderSmartCards(stats: Stats, deck: AZ305Question[]): AZ305Question[] {
  const tagWeakness = buildTagWeakness(stats);
  return [...deck].sort(
    (a, b) => priority(stats, b, false, tagWeakness) - priority(stats, a, false, tagWeakness)
  );
}

export interface AZ305ObjectiveStat {
  objective: AZ305Objective;
  total: number;
  attempted: number;
  correct: number;
  attempts: number;
  accuracyPct: number;
  avgMastery: number;
  weakCount: number;
}

/** Per-objective rollup for the stats page and hub mini-bars. */
export function computeObjectiveStats(stats: Stats): AZ305ObjectiveStat[] {
  return AZ305_OBJECTIVE_ORDER.map((objective) => {
    const qs = questionsAZ305.filter((q) => q.objective === objective);
    let attempted = 0;
    let correct = 0;
    let attempts = 0;
    let masterySum = 0;
    let weakCount = 0;

    for (const q of qs) {
      const stat = stats[q.id];
      const mastery = masteryOf(stats, q.id);
      masterySum += mastery;
      if (stat && stat.attempts > 0) {
        attempted += 1;
        correct += stat.correct;
        attempts += stat.attempts;
      }
      if (!stat || mastery < WEAK_THRESHOLD) weakCount += 1;
    }

    return {
      objective,
      total: qs.length,
      attempted,
      correct,
      attempts,
      accuracyPct: attempts === 0 ? 0 : Math.round((correct / attempts) * 100),
      avgMastery: qs.length === 0 ? 0 : masterySum / qs.length,
      weakCount,
    };
  });
}

/** All weak / unseen questions, weakest first. */
export function getWeakItems(stats: Stats): AZ305Question[] {
  return questionsAZ305
    .filter((q) => {
      const stat = stats[q.id];
      return !stat || masteryOf(stats, q.id) < WEAK_THRESHOLD;
    })
    .sort((a, b) => masteryOf(stats, a.id) - masteryOf(stats, b.id));
}

export interface AZ305TagStat {
  tag: string;
  name: string;
  total: number;
  attempted: number;
  avgMastery: number;
  weakCount: number;
}

/**
 * Per-concept rollup for the stats page "weakest concepts" list. Only tags
 * with at least one attempted question are returned (no evidence = no verdict),
 * sorted weakest first.
 */
export function computeTagStats(stats: Stats): AZ305TagStat[] {
  const agg = new Map<
    string,
    { total: number; attempted: number; masterySum: number; weakCount: number }
  >();
  for (const q of questionsAZ305) {
    for (const tag of tagsForQuestion(q.id)) {
      const e =
        agg.get(tag) ?? { total: 0, attempted: 0, masterySum: 0, weakCount: 0 };
      e.total += 1;
      const stat = stats[q.id];
      if (stat && stat.attempts > 0) {
        e.attempted += 1;
        const m = masteryOf(stats, q.id);
        e.masterySum += m;
        if (m < WEAK_THRESHOLD) e.weakCount += 1;
      }
      agg.set(tag, e);
    }
  }
  return Array.from(agg.entries())
    .filter(([, e]) => e.attempted > 0)
    .map(([tag, e]) => ({
      tag,
      name: AZ305_TAG_NAMES[tag] ?? tag,
      total: e.total,
      attempted: e.attempted,
      avgMastery: e.masterySum / e.attempted,
      weakCount: e.weakCount,
    }))
    .sort((a, b) => a.avgMastery - b.avgMastery);
}

export interface AZ305Readiness {
  /** 0-100 readiness, blueprint-weighted by official exam domain weights. */
  score: number;
  totalQuestions: number;
  attempted: number;
  attempts: number;
  correct: number;
  accuracyPct: number;
  weakCount: number;
}

/** Overall AZ-305 readiness summary, weighted per the official exam blueprint. */
export function computeAZ305Readiness(stats: Stats): AZ305Readiness {
  const total = questionsAZ305.length;
  let attempted = 0;
  let attempts = 0;
  let correct = 0;
  let weakCount = 0;

  const objMasterySum = new Map<AZ305Objective, { sum: number; count: number }>();

  for (const q of questionsAZ305) {
    const stat = stats[q.id];
    const mastery = masteryOf(stats, q.id);
    const e = objMasterySum.get(q.objective) ?? { sum: 0, count: 0 };
    e.sum += mastery;
    e.count += 1;
    objMasterySum.set(q.objective, e);
    if (stat && stat.attempts > 0) {
      attempted += 1;
      attempts += stat.attempts;
      correct += stat.correct;
    }
    if (!stat || mastery < WEAK_THRESHOLD) weakCount += 1;
  }

  let weightedScore = 0;
  for (const objective of AZ305_OBJECTIVE_ORDER) {
    const e = objMasterySum.get(objective);
    const avg = e && e.count > 0 ? e.sum / e.count : 0;
    weightedScore += AZ305_BLUEPRINT_WEIGHTS[objective] * avg;
  }

  return {
    score: Math.round(weightedScore * 100),
    totalQuestions: total,
    attempted,
    attempts,
    correct,
    accuracyPct: attempts === 0 ? 0 : Math.round((correct / attempts) * 100),
    weakCount,
  };
}
