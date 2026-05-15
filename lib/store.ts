import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuestionStat, QuizSession, Domain, WeaknessTag } from "./types";

interface StudyStore {
  // State
  questionStats: Record<string, QuestionStat>;
  sessions: QuizSession[];
  streakDays: number;
  lastActiveDate: string;
  totalStudyMinutes: number;

  // Personal targets — set by Gilly's situation
  targetExamDate: string | null; // ISO date string

  // Actions
  recordAnswer: (questionId: string, correct: boolean) => void;
  rateConfidence: (questionId: string, level: "low" | "medium" | "high") => void;
  toggleReview: (questionId: string) => void;
  saveSession: (session: QuizSession) => void;
  resetProgress: () => void;
  bumpStreak: () => void;
  setTargetDate: (iso: string | null) => void;
  addStudyMinutes: (mins: number) => void;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set) => ({
      questionStats: {},
      sessions: [],
      streakDays: 0,
      lastActiveDate: "",
      totalStudyMinutes: 0,
      targetExamDate: null,

      recordAnswer: (questionId, correct) =>
        set((s) => {
          const existing = s.questionStats[questionId];
          const next: QuestionStat = {
            questionId,
            attempts: (existing?.attempts ?? 0) + 1,
            correct: (existing?.correct ?? 0) + (correct ? 1 : 0),
            lastSeen: Date.now(),
            confidence: existing?.confidence ?? "low",
            markedForReview: existing?.markedForReview ?? false,
          };
          return { questionStats: { ...s.questionStats, [questionId]: next } };
        }),

      rateConfidence: (questionId, level) =>
        set((s) => ({
          questionStats: {
            ...s.questionStats,
            [questionId]: {
              ...(s.questionStats[questionId] ?? {
                questionId,
                attempts: 0,
                correct: 0,
                lastSeen: Date.now(),
                confidence: "low",
                markedForReview: false,
              }),
              confidence: level,
              lastSeen: Date.now(),
            },
          },
        })),

      toggleReview: (questionId) =>
        set((s) => {
          const stat = s.questionStats[questionId];
          return {
            questionStats: {
              ...s.questionStats,
              [questionId]: {
                ...(stat ?? {
                  questionId,
                  attempts: 0,
                  correct: 0,
                  lastSeen: Date.now(),
                  confidence: "low",
                  markedForReview: false,
                }),
                markedForReview: !(stat?.markedForReview ?? false),
              },
            },
          };
        }),

      saveSession: (session) =>
        set((s) => ({
          sessions: [...s.sessions, session].slice(-50),
        })),

      resetProgress: () =>
        set({ questionStats: {}, sessions: [], streakDays: 0, totalStudyMinutes: 0 }),

      bumpStreak: () =>
        set((s) => {
          const today = new Date().toISOString().slice(0, 10);
          if (s.lastActiveDate === today) return s;
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          return {
            streakDays: s.lastActiveDate === yesterday ? s.streakDays + 1 : 1,
            lastActiveDate: today,
          };
        }),

      setTargetDate: (iso) => set({ targetExamDate: iso }),

      addStudyMinutes: (mins) =>
        set((s) => ({ totalStudyMinutes: s.totalStudyMinutes + mins })),
    }),
    {
      name: "aplus-study-gilly-v1",
      version: 1,
    }
  )
);
