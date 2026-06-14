import {
  questionsAZ305,
  AZ305_OBJECTIVE_ORDER,
  type AZ305Objective,
  type AZ305Question,
} from "@/data/azure/questions/1305";
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

function masteryOf(stats: Stats, id: string): number {
  return stats[id]?.mastery ?? UNSEEN_MASTERY;
}

function recencyDays(stats: Stats, id: string): number {
  const last = stats[id]?.lastSeen;
  if (!last) return 30; // never seen → treat as very stale so it enters rotation
  return (Date.now() - last) / (1000 * 60 * 60 * 24);
}

/**
 * Priority score: weaker + staler = higher. Unseen items get a moderate score
 * so they steadily enter the rotation.
 */
function priority(stats: Stats, q: AZ305Question, jitter = true): number {
  const weakness = 1.2 - masteryOf(stats, q.id); // 0.2 .. 1.2
  const staleness = Math.log(recencyDays(stats, q.id) + 2);
  const base = weakness * staleness;
  return jitter ? base * (0.85 + Math.random() * 0.3) : base;
}

/**
 * Pick `count` questions weighted toward weak / stale / unseen items.
 * Optionally scope to a single objective.
 */
export function pickSmartQuestions(
  stats: Stats,
  count: number,
  objective?: AZ305Objective
): AZ305Question[] {
  const pool = objective
    ? questionsAZ305.filter((q) => q.objective === objective)
    : [...questionsAZ305];

  const weighted = pool.map((q) => ({ q, p: Math.max(priority(stats, q), 0.01) }));
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
  return [...deck].sort((a, b) => priority(stats, b, false) - priority(stats, a, false));
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
      const mastery = stat?.mastery ?? UNSEEN_MASTERY;
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
      return !stat || stat.mastery < WEAK_THRESHOLD;
    })
    .sort((a, b) => masteryOf(stats, a.id) - masteryOf(stats, b.id));
}

export interface AZ305Readiness {
  /** 0-100 overall readiness, weighted by mastery across the whole bank. */
  score: number;
  totalQuestions: number;
  attempted: number;
  attempts: number;
  correct: number;
  accuracyPct: number;
  weakCount: number;
}

/** Overall AZ-305 readiness summary for the stats page header. */
export function computeAZ305Readiness(stats: Stats): AZ305Readiness {
  const total = questionsAZ305.length;
  let masterySum = 0;
  let attempted = 0;
  let attempts = 0;
  let correct = 0;
  let weakCount = 0;

  for (const q of questionsAZ305) {
    const stat = stats[q.id];
    const mastery = stat?.mastery ?? UNSEEN_MASTERY;
    masterySum += mastery;
    if (stat && stat.attempts > 0) {
      attempted += 1;
      attempts += stat.attempts;
      correct += stat.correct;
    }
    if (!stat || mastery < WEAK_THRESHOLD) weakCount += 1;
  }

  return {
    score: total === 0 ? 0 : Math.round((masterySum / total) * 100),
    totalQuestions: total,
    attempted,
    attempts,
    correct,
    accuracyPct: attempts === 0 ? 0 : Math.round((correct / attempts) * 100),
    weakCount,
  };
}
