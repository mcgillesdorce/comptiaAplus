"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStudyStore } from "@/lib/store";
import { computeWeaknessTrends } from "@/lib/analytics";
import { WEAKNESS_PRIORITIES } from "@/lib/domains";
import { cn } from "@/lib/utils";
import type { WeaknessTag, WeaknessTrend } from "@/lib/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  Home,
  RotateCcw,
  Zap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Weakness bar row component
// ---------------------------------------------------------------------------
function WeaknessBar({
  label,
  accuracy,
  trend,
  tag,
}: {
  label: string;
  accuracy: number;
  trend?: WeaknessTrend;
  tag: WeaknessTag;
}) {
  const isWeak = accuracy < 70;
  const isStrong = accuracy >= 85;

  const TrendIcon =
    trend?.trend === "improving"
      ? TrendingUp
      : trend?.trend === "declining"
      ? TrendingDown
      : Minus;

  const trendColor =
    trend?.trend === "improving"
      ? "text-emerald-600"
      : trend?.trend === "declining"
      ? "text-red-500"
      : "text-slate-400";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-2 gap-3">
        <p className="text-sm font-medium text-slate-900 flex-1 leading-tight">{label}</p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <TrendIcon className={cn("h-4 w-4", trendColor)} />
          <span
            className={cn(
              "font-mono text-sm font-bold",
              isWeak ? "text-red-600" : isStrong ? "text-emerald-600" : "text-slate-700"
            )}
          >
            {accuracy}%
          </span>
          {trend?.delta !== undefined && trend.trend !== "new" && trend.delta !== 0 && (
            <span
              className={cn(
                "font-mono text-xs",
                trend.delta > 0 ? "text-emerald-600" : "text-red-500"
              )}
            >
              {trend.delta > 0 ? "+" : ""}
              {trend.delta}pp
            </span>
          )}
        </div>
      </div>

      {/* Bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            isWeak ? "bg-red-500" : isStrong ? "bg-emerald-500" : "bg-brand-700"
          )}
          style={{ width: `${accuracy}%` }}
        />
      </div>

      {/* All-time vs latest */}
      {trend && trend.allTimeAccuracy !== accuracy && (
        <p className="mt-1.5 font-mono text-xs text-slate-400">
          All-time: {trend.allTimeAccuracy}%
        </p>
      )}

      {/* Drill link */}
      {isWeak && (
        <Link
          href={`/quiz/session?weakness=${tag}`}
          className="mt-2 inline-block rounded-lg bg-red-50 px-3 py-1 font-mono text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
        >
          Drill this →
        </Link>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main results content (reads store inside client component)
// ---------------------------------------------------------------------------
function ResultsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("id");

  const sessions = useStudyStore((s) => s.sessions);
  const stats = useStudyStore((s) => s.questionStats);

  const session = sessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-12 w-12 text-slate-300" />
        <p className="text-slate-600">Session not found. It may have been cleared.</p>
        <button
          onClick={() => router.push("/")}
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
        >
          Go home
        </button>
      </div>
    );
  }

  const { scorePct, weaknessResults } = session;
  const passed = scorePct >= 72;

  // Compute trends across all saved sessions
  const allTrends = computeWeaknessTrends(sessions, stats);

  // Build per-weakness rows from THIS session's results
  const sessionWeaknesses = Object.entries(weaknessResults ?? {})
    .map(([tag, { correct, total }]) => {
      const t = tag as WeaknessTag;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      const trend = allTrends.find((tr) => tr.tag === t);
      return {
        tag: t,
        accuracy,
        correct,
        total,
        label: WEAKNESS_PRIORITIES[t]?.label ?? t,
        trend,
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy); // worst first

  const improving = sessionWeaknesses.filter((w) => w.trend?.trend === "improving");
  const declining = sessionWeaknesses.filter(
    (w) => w.trend?.trend === "declining" || (w.trend?.trend === "new" && w.accuracy < 70)
  );
  const stillStruggling = sessionWeaknesses.filter(
    (w) => w.accuracy < 70 && w.trend?.trend === "stable"
  );

  // Weakest tag for drill recommendation
  const weakestTag = sessionWeaknesses[0];

  return (
    <div className="space-y-6 pb-8">
      {/* ── Score header ── */}
      <div className="pt-4 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Quiz Results
        </p>
        <p
          className={cn(
            "mt-2 font-mono text-7xl font-bold tabular-nums",
            passed ? "text-emerald-600" : "text-slate-900"
          )}
        >
          {scorePct}%
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {passed ? "✅ Above passing threshold (72%)" : "⚠️ Below passing threshold (72%)"}
        </p>
      </div>

      {/* ── Trend callout boxes ── */}
      {improving.length > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="font-semibold">
              Improving ({improving.length}{" "}
              {improving.length === 1 ? "area" : "areas"})
            </p>
          </div>
          <div className="mt-2 space-y-1">
            {improving.map((w) => (
              <div key={w.tag} className="flex items-center justify-between">
                <p className="text-sm text-slate-700">{w.label}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-emerald-700">
                    {w.accuracy}%
                  </span>
                  {(w.trend?.delta ?? 0) > 0 && (
                    <span className="font-mono text-xs text-emerald-600">
                      +{w.trend!.delta}pp
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stillStruggling.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Minus className="h-5 w-5 flex-shrink-0" />
            <p className="font-semibold">
              Still struggling ({stillStruggling.length}{" "}
              {stillStruggling.length === 1 ? "area" : "areas"})
            </p>
          </div>
          <div className="mt-2 space-y-1">
            {stillStruggling.map((w) => (
              <div key={w.tag} className="flex items-center justify-between">
                <p className="text-sm text-slate-700">{w.label}</p>
                <span className="font-mono text-sm font-bold text-amber-700">
                  {w.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {declining.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-800">
            <TrendingDown className="h-5 w-5 flex-shrink-0" />
            <p className="font-semibold">
              Needs attention ({declining.length}{" "}
              {declining.length === 1 ? "area" : "areas"})
            </p>
          </div>
          <div className="mt-2 space-y-1">
            {declining.map((w) => (
              <div key={w.tag} className="flex items-center justify-between">
                <p className="text-sm text-slate-700">{w.label}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-red-700">
                    {w.accuracy}%
                  </span>
                  {(w.trend?.delta ?? 0) < 0 && (
                    <span className="font-mono text-xs text-red-500">
                      {w.trend!.delta}pp
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Full weakness breakdown (bar chart) ── */}
      {sessionWeaknesses.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Weakness breakdown — this quiz
          </h2>
          <p className="text-sm text-slate-500">
            Sorted worst → best. Arrows show trend vs your last 5 sessions.
          </p>
          <div className="space-y-2">
            {sessionWeaknesses.map((w) => (
              <WeaknessBar
                key={w.tag}
                label={w.label}
                accuracy={w.accuracy}
                trend={w.trend}
                tag={w.tag}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Quick drill recommendation ── */}
      {weakestTag && weakestTag.accuracy < 70 && (
        <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 p-5 text-white">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
            Recommended next step
          </p>
          <p className="mt-2 font-bold text-lg">
            Drill: {weakestTag.label}
          </p>
          <p className="mt-1 text-sm text-slate-300">
            You scored {weakestTag.accuracy}% on this topic. Get more reps in now.
          </p>
          <Link
            href={`/quiz/session?weakness=${weakestTag.tag}&n=10`}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-slate-900 transition-all active:scale-[0.99]"
          >
            <Zap className="h-4 w-4" />
            Start drill
          </Link>
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="space-y-3">
        <Link
          href="/quiz/session?mode=weak&n=15"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 py-4 font-semibold text-white shadow-lg active:scale-[0.99]"
        >
          <Zap className="h-5 w-5" />
          Another smart quiz (weak areas)
        </Link>
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-4 font-semibold text-slate-900 active:scale-[0.99]"
        >
          <Home className="h-5 w-5" />
          Back to home
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page export (wrapped in Suspense for useSearchParams)
// ---------------------------------------------------------------------------
export default function QuizResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-12 text-center text-slate-500">Loading results…</div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
