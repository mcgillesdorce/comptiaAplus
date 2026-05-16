"use client";
import Link from "next/link";
import { useStudyStore } from "@/lib/store";
import {
  computeReadinessScore,
  computeWeaknessStats,
  daysUntilExam,
} from "@/lib/analytics";
import { WEAKNESS_PRIORITIES } from "@/lib/domains";
import { Flame, Target, Zap, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const stats = useStudyStore((s) => s.questionStats);
  const streakDays = useStudyStore((s) => s.streakDays);
  const sessions = useStudyStore((s) => s.sessions);
  const targetDate = useStudyStore((s) => s.targetExamDate);

  const readiness = computeReadinessScore(stats);
  const weaknessStats = computeWeaknessStats(stats);
  const daysLeft = daysUntilExam(targetDate);
  const totalAttempted = Object.values(stats).reduce((sum, s) => sum + s.attempts, 0);

  // Get top 3 weakness tags Gilly has actually struggled with
  const topWeaknesses = weaknessStats
    .filter((w) => w.attempted > 0 && w.accuracyPct < 70)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <header className="pt-2">
        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Hi Gilly. Ready to grind?
        </h1>
      </header>

      {/* Readiness Card */}
      <div className={cn(
        "rounded-3xl border p-6 shadow-sm",
        readiness.status === "not-ready" && "border-red-200 bg-red-50",
        readiness.status === "borderline" && "border-amber-200 bg-amber-50",
        readiness.status === "ready" && "border-emerald-200 bg-emerald-50",
        readiness.status === "confident" && "border-blue-200 bg-blue-50",
      )}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-600">
              A+ Core 1 Readiness
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-slate-900">
              {readiness.estimatedScore}%
            </p>
            <p className="mt-1 text-sm text-slate-600">{readiness.message}</p>
          </div>
          <Target className="h-8 w-8 text-slate-400" />
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-700"
            style={{ width: `${readiness.estimatedScore}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-slate-500">
          <span>0</span>
          <span className="font-semibold">Pass: 72%</span>
          <span>100</span>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${streakDays}d`}
          color="text-orange-500"
        />
        <StatCard
          icon={Zap}
          label="Attempted"
          value={`${totalAttempted}`}
          color="text-blue-500"
        />
        <StatCard
          icon={Target}
          label={daysLeft !== null ? "Until exam" : "Sessions"}
          value={daysLeft !== null ? `${daysLeft}d` : `${sessions.length}`}
          color="text-emerald-500"
        />
      </div>

      {/* Top Weaknesses */}
      {topWeaknesses.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Your weak spots right now
            </h2>
            <span className="font-mono text-xs text-slate-500">
              {topWeaknesses.length} active
            </span>
          </div>
          <div className="space-y-2">
            {topWeaknesses.map((w) => (
              <Link
                key={w.tag}
                href={`/quiz/session?weakness=${w.tag}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm active:scale-[0.99]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900">
                    {WEAKNESS_PRIORITIES[w.tag]?.label ?? w.tag}
                  </p>
                  {WEAKNESS_PRIORITIES[w.tag]?.note && (
                    <p className="mt-0.5 truncate text-xs text-red-600">
                      {WEAKNESS_PRIORITIES[w.tag].note}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          w.accuracyPct < 40 ? "bg-red-500" :
                          w.accuracyPct < 70 ? "bg-amber-500" :
                          "bg-emerald-500"
                        )}
                        style={{ width: `${w.accuracyPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs tabular-nums text-slate-600">
                      {w.accuracyPct}% • {w.correct}/{w.attempted}
                    </span>
                  </div>
                </div>
                <ChevronRight className="ml-3 h-5 w-5 flex-shrink-0 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-2 text-sm font-medium text-slate-900">
            No data yet — take a quiz to surface your weak areas
          </p>
        </div>
      )}

      {/* Main Actions */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Study now</h2>
        <Link
          href="/quiz/session?mode=weak"
          className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white shadow-md transition-all active:scale-[0.99]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-brand-300">
              Recommended
            </p>
            <p className="mt-1 text-xl font-bold">Smart Quiz</p>
            <p className="mt-1 text-sm text-brand-100">
              10 questions weighted to your weak areas
            </p>
          </div>
          <ChevronRight className="h-6 w-6" />
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/flashcards"
            className="rounded-2xl border border-slate-200 bg-white p-4 transition-all active:scale-[0.99] hover:border-brand-300"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Quick review
            </p>
            <p className="mt-1 font-semibold text-slate-900">Flashcards</p>
          </Link>
          <Link
            href="/quiz"
            className="rounded-2xl border border-slate-200 bg-white p-4 transition-all active:scale-[0.99] hover:border-brand-300"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Custom
            </p>
            <p className="mt-1 font-semibold text-slate-900">Build a quiz</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
      <Icon className={cn("mx-auto h-5 w-5", color)} />
      <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-900">
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}
