"use client";
import Link from "next/link";
import { useStudyStore } from "@/lib/store";
import {
  computeReadinessScore,
  computeWeaknessStats,
  daysUntilExam,
} from "@/lib/analytics";
import { WEAKNESS_PRIORITIES } from "@/lib/domains";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Brain,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
  PlayCircle,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CORE2_DOMAINS = [
  "1.0-operating-systems",
  "2.0-security",
  "3.0-software-troubleshooting",
  "4.0-operational-procedures",
].join(",");

const TOOLS = [
  {
    href: `/quiz/session?mode=weak&domains=${CORE2_DOMAINS}`,
    icon: Brain,
    label: "Smart Quiz",
    sublabel: "Recommended",
    highlight: true,
  },
  { href: "/quiz?cert=1202",        icon: Brain,       label: "Build a Quiz",  sublabel: "Custom" },
  { href: "/flashcards?cert=1202",  icon: Layers,      label: "Flashcards",    sublabel: "Quick review" },
  { href: "/videos?cert=1202",      icon: PlayCircle,  label: "Videos",        sublabel: "Prof. Messer" },
  { href: "/reference?cert=1202",   icon: BookOpen,    label: "Reference",     sublabel: "Study notes" },
  { href: "/progress?cert=1202",    icon: BarChart3,   label: "Progress",      sublabel: "Weak spot tracker" },
];

export default function APlus1202Hub() {
  const allStats    = useStudyStore((s) => s.questionStats);
  const streakDays  = useStudyStore((s) => s.streakDays);
  const sessions    = useStudyStore((s) => s.sessions);
  const targetDate  = useStudyStore((s) => s.targetExamDate);

  // Filter to 1202-only questions so progress is separate from Core 1
  const stats = Object.fromEntries(
    Object.entries(allStats).filter(([id]) => id.startsWith("1202-"))
  );

  const readiness      = computeReadinessScore(stats);
  const weaknessStats  = computeWeaknessStats(stats);
  const daysLeft       = daysUntilExam(targetDate);
  const totalAttempted = Object.values(stats).reduce((sum, s) => sum + s.attempts, 0);

  const topWeaknesses = weaknessStats
    .filter((w) => w.attempted > 0 && w.accuracyPct < 70)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> All certs
      </Link>

      {/* Header */}
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-wider text-amber-500 dark:text-amber-400">
          CompTIA A+ · 220-1202
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Hi Gilly. Ready to grind?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {/* Readiness Card */}
      <div
        className={cn(
          "rounded-3xl border p-6 shadow-sm",
          readiness.status === "not-ready"  && "border-red-200   bg-red-50   dark:border-red-900   dark:bg-red-950/40",
          readiness.status === "borderline" && "border-amber-200  bg-amber-50  dark:border-amber-900  dark:bg-amber-950/40",
          readiness.status === "ready"      && "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40",
          readiness.status === "confident"  && "border-blue-200   bg-blue-50   dark:border-blue-900   dark:bg-blue-950/40",
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
              A+ Core 2 Readiness
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {readiness.estimatedScore}%
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {readiness.message}
            </p>
          </div>
          <Target className="h-8 w-8 text-slate-400" />
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-700"
            style={{ width: `${readiness.estimatedScore}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-slate-500">
          <span>0</span>
          <span className="font-semibold">Pass: 72%</span>
          <span>100</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Flame}  label="Streak"    value={`${streakDays}d`}    color="text-orange-500" />
        <StatCard icon={Zap}    label="Attempted"  value={`${totalAttempted}`} color="text-blue-500" />
        <StatCard
          icon={Target}
          label={daysLeft !== null ? "Until exam" : "Sessions"}
          value={daysLeft !== null ? `${daysLeft}d` : `${sessions.length}`}
          color="text-emerald-500"
        />
      </div>

      {/* Top weaknesses */}
      {topWeaknesses.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
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
                href={`/quiz/session?weakness=${w.tag}&domains=${CORE2_DOMAINS}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-all hover:border-amber-300 hover:shadow-sm active:scale-[0.99]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {WEAKNESS_PRIORITIES[w.tag]?.label ?? w.tag}
                  </p>
                  {WEAKNESS_PRIORITIES[w.tag]?.note && (
                    <p className="mt-0.5 truncate text-xs text-red-600 dark:text-red-400">
                      {WEAKNESS_PRIORITIES[w.tag].note}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
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
                    <span className="font-mono text-xs tabular-nums text-slate-600 dark:text-slate-400">
                      {w.accuracyPct}% · {w.correct}/{w.attempted}
                    </span>
                  </div>
                </div>
                <ChevronRight className="ml-3 h-5 w-5 flex-shrink-0 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">
            No data yet — take a quiz to surface your weak areas
          </p>
        </div>
      )}

      {/* Study tools */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Study tools
        </h2>

        {/* Smart Quiz hero */}
        <Link
          href={`/quiz/session?mode=weak&domains=${CORE2_DOMAINS}`}
          className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 p-5 text-white shadow-md transition-all active:scale-[0.99]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-amber-200">
              Recommended
            </p>
            <p className="mt-1 text-xl font-bold">Smart Quiz</p>
            <p className="mt-1 text-sm text-amber-100">
              10 questions weighted to your weak areas
            </p>
          </div>
          <ChevronRight className="h-6 w-6" />
        </Link>

        {/* Tool grid */}
        <div className="grid grid-cols-2 gap-3">
          {TOOLS.filter((t) => !t.highlight).map(({ href, icon: Icon, label, sublabel }) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-all active:scale-[0.99] hover:border-amber-300"
            >
              <Icon className="h-4 w-4 text-slate-400" />
              <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {label}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                {sublabel}
              </p>
            </Link>
          ))}
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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-center">
      <Icon className={cn("mx-auto h-5 w-5", color)} />
      <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}
