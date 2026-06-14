import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

/**
 * AZ-305 study store — FULLY ISOLATED from the CompTIA store.
 *
 * Lives under its own localStorage key (`az305-study-v1`) so AZ-305 progress
 * never bleeds into the A+ modules (which use `aplus-study-gilly-v1`).
 *
 * One shared mastery profile powers BOTH the smart quiz and the smart
 * flashcards: missing a quiz question and rating a flashcard "Again" both
 * push the same item's `mastery` down so it resurfaces more often.
 */

export type AZ305Grade = "again" | "hard" | "good" | "easy";

export interface AZ305CardStat {
  /** Question / card id (e.g. "az305-igm-01"). */
  id: string;
  attempts: number;
  correct: number;
  lastSeen: number;
  /** 0 = totally weak, 1 = fully mastered. */
  mastery: number;
  lastGrade: AZ305Grade | null;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function blankStat(id: string): AZ305CardStat {
  return {
    id,
    attempts: 0,
    correct: 0,
    lastSeen: Date.now(),
    mastery: 0.15,
    lastGrade: null,
  };
}

const GRADE_DELTA: Record<AZ305Grade, number> = {
  again: -0.3,
  hard: -0.1,
  good: 0.15,
  easy: 0.3,
};

interface AZ305Store {
  cardStats: Record<string, AZ305CardStat>;

  /** Quiz answered — nudges mastery up on correct, down on wrong. */
  recordQuizAnswer: (id: string, correct: boolean) => void;
  /** Flashcard self-rating — adjusts mastery by grade. */
  rateCard: (id: string, grade: AZ305Grade) => void;
  /** Wipe ALL AZ-305 progress (does not touch CompTIA data). */
  resetAZ305: () => void;
}

export const useAZ305Store = create<AZ305Store>()(
  persist(
    (set) => ({
      cardStats: {},

      recordQuizAnswer: (id, correct) =>
        set((s) => {
          const prev = s.cardStats[id] ?? blankStat(id);
          const next: AZ305CardStat = {
            ...prev,
            attempts: prev.attempts + 1,
            correct: prev.correct + (correct ? 1 : 0),
            lastSeen: Date.now(),
            mastery: clamp01(prev.mastery + (correct ? 0.2 : -0.25)),
          };
          return { cardStats: { ...s.cardStats, [id]: next } };
        }),

      rateCard: (id, grade) =>
        set((s) => {
          const prev = s.cardStats[id] ?? blankStat(id);
          const next: AZ305CardStat = {
            ...prev,
            lastSeen: Date.now(),
            lastGrade: grade,
            mastery: clamp01(prev.mastery + GRADE_DELTA[grade]),
          };
          return { cardStats: { ...s.cardStats, [id]: next } };
        }),

      resetAZ305: () => set({ cardStats: {} }),
    }),
    {
      name: "az305-study-v1",
      version: 1,
    }
  )
);

/**
 * Returns true once the persisted store has rehydrated on the client.
 * Use to guard derived counts so server and first client render match.
 */
export function useAZ305Hydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(useAZ305Store.persist.hasHydrated());
    const unsub = useAZ305Store.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);
  return hydrated;
}
