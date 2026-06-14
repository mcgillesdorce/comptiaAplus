"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AZ305_OBJECTIVES,
  type AZ305Objective,
} from "@/data/azure/questions/1305";
import { useAZ305Store, useAZ305Hydrated } from "@/lib/azure/az305-store";
import {
  computeObjectiveStats,
  computeAZ305Readiness,
  getWeakItems,
} from "@/lib/azure/az305-analytics";
import {
  ChevronLeft,
  Award,
  Target,
  Brain,
  Layers,
  AlertTriangle,
  Trash2,
  CheckCircle2,
} from "lucide-react";

function masteryBar(m: number): string {
  if (m >= 0.75) return "bg-emerald-500";
  if (m >= 0.5) return "bg-sky-500";
  if (m >= 0.3) return "bg-amber-500";
  return "bg-rose-500";
}

export default function AZ305StatsPage() {
  const cardStats = useAZ305Store((s) => s.cardStats);
  const resetAZ305 = useAZ305Store((s) => s.resetAZ305);
  const hydrated = useAZ305Hydrated();
  const [confirmReset, setConfirmReset] = useState(false);

  const readiness = useMemo(() => computeAZ305Readiness(cardStats), [cardStats]);
  const objectiveStats = useMemo(() => computeObjectiveStats(cardStats), [cardStats]);
  const weakItems = useMemo(() => getWeakItems(cardStats), [cardStats]);

  // Skeleton until persisted store rehydrates (avoids SSR/client mismatch).
  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-40 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-64 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/certs/az-305"
        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> AZ-305
      </Link>

      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-wider text-sky-500 dark:text-sky-400">
          AZ-305 · Progress
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Where you stand
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tracked separately from your CompTIA progress.
        </p>
      </header>

      {/* Readiness summary */}
      <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500 to-blue-700 p-6 text-white shadow-sm dark:border-sky-900">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-sky-100" />
          <p className="font-semibold">AZ-305 readiness</p>
        </div>
        <p className="mt-3 font-mono text-5xl font-bold tabular-nums">
          {readiness.score}%
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-white/15 p-3">
            <p className="text-lg font-bold tabular-nums">{readiness.accuracyPct}%</p>
            <p className="text-[11px] text-sky-100">Accuracy</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3">
            <p className="text-lg font-bold tabular-nums">
              {readiness.attempted}/{readiness.totalQuestions}
            </p>
            <p className="text-[11px] text-sky-100">Questions seen</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3">
            <p className="text-lg font-bold tabular-nums">{readiness.weakCount}</p>
            <p className="text-[11px] text-sky-100">Weak areas</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/certs/az-305/quiz"
          className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 transition-all hover:shadow-sm active:scale-[0.99] dark:border-amber-900 dark:bg-amber-950/30"
        >
          <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-900/40">
            <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Smart quiz
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Target weak areas</p>
          </div>
        </Link>
        <Link
          href="/certs/az-305/flashcards"
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-sky-300 hover:shadow-sm active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="rounded-xl bg-sky-50 p-2 dark:bg-sky-900/30">
            <Layers className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Smart review
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Flip weak cards</p>
          </div>
        </Link>
      </section>

      {/* Per-objective mastery */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          By exam objective
        </h2>
        <div className="space-y-2">
          {objectiveStats.map((o) => {
            const meta = AZ305_OBJECTIVES[o.objective as AZ305Objective];
            return (
              <div
                key={o.objective}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center justify-between">
                  <p className="min-w-0 truncate font-medium text-slate-900 dark:text-slate-100">
                    {meta.emoji} {meta.short}
                  </p>
                  <span className="ml-3 flex-shrink-0 font-mono text-xs text-slate-400">
                    {Math.round(o.avgMastery * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className={cn("h-full rounded-full transition-all", masteryBar(o.avgMastery))}
                    style={{ width: `${Math.round(o.avgMastery * 100)}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>{o.attempted}/{o.total} seen</span>
                  <span>·</span>
                  <span>{o.accuracyPct}% accuracy</span>
                  {o.weakCount > 0 && (
                    <>
                      <span>·</span>
                      <span className="font-medium text-rose-600 dark:text-rose-400">
                        {o.weakCount} weak
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weak areas list */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Weak areas
          </h2>
        </div>
        {weakItems.length === 0 ? (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm text-slate-700 dark:text-slate-200">
              No weak areas — every question is at or above target mastery. Keep it up!
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {weakItems.length} {weakItems.length === 1 ? "question needs" : "questions need"} more
              practice. The smart quiz and smart review target these first.
            </p>
            <div className="space-y-2">
              {weakItems.slice(0, 12).map((q) => {
                const mastery = cardStats[q.id]?.mastery ?? 0.15;
                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 flex-shrink-0 rounded-full", masteryBar(mastery))} />
                      <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                        {AZ305_OBJECTIVES[q.objective].short}
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-slate-400">
                        {Math.round(mastery * 100)}%
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-200">
                      {q.prompt}
                    </p>
                  </div>
                );
              })}
            </div>
            {weakItems.length > 12 && (
              <p className="text-center text-xs text-slate-400">
                +{weakItems.length - 12} more
              </p>
            )}
            <Link
              href="/certs/az-305/quiz"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
            >
              <Brain className="h-4 w-4" /> Drill weak areas now
            </Link>
          </>
        )}
      </section>

      {/* Reset */}
      <section className="border-t border-slate-200 pt-4 dark:border-slate-700">
        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-rose-600 dark:hover:text-rose-400"
          >
            <Trash2 className="h-3.5 w-3.5" /> Reset AZ-305 progress
          </button>
        ) : (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/30">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Reset all AZ-305 progress?
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              This clears your AZ-305 mastery data only. CompTIA progress is untouched.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  resetAZ305();
                  setConfirmReset(false);
                }}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-rose-700 active:scale-[0.99]"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
