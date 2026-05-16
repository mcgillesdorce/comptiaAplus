"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DOMAINS, WEAKNESS_PRIORITIES } from "@/lib/domains";
import { useStudyStore } from "@/lib/store";
import { computeWeaknessStats } from "@/lib/analytics";
import { allQuestions } from "@/data/questions";
import type { Domain } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Zap, Bookmark, RefreshCw, Filter, Target } from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [count, setCount] = useState(10);
  const stats = useStudyStore((s) => s.questionStats);

  const flaggedCount = Object.values(stats).filter((s) => s.markedForReview).length;
  const weaknessStats = computeWeaknessStats(stats);
  const lowAccuracyTags = weaknessStats.filter((w) => w.attempted > 0 && w.accuracyPct < 70);

  const toggleDomain = (d: Domain) => {
    setSelectedDomains((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const startCustomQuiz = () => {
    const params = new URLSearchParams();
    if (selectedDomains.length > 0) params.set("domains", selectedDomains.join(","));
    params.set("n", String(count));
    router.push(`/quiz/session?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <header className="pt-2">
        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">Quiz</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Pick your mode
        </h1>
      </header>

      {/* Smart Modes */}
      <section className="space-y-3">
        <Link
          href="/quiz/session?mode=weak"
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white shadow-md transition-all active:scale-[0.99]"
        >
          <Zap className="h-8 w-8 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-lg">Smart Quiz</p>
            <p className="text-sm text-brand-100">
              Auto-picks from your weakest areas
            </p>
          </div>
        </Link>

        {flaggedCount > 0 && (
          <Link
            href="/quiz/session?mode=review"
            className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 transition-all active:scale-[0.99]"
          >
            <Bookmark className="h-7 w-7 flex-shrink-0 fill-amber-500 text-amber-500" />
            <div className="flex-1">
              <p className="font-bold text-slate-900">Review Flagged</p>
              <p className="text-sm text-slate-600">
                {flaggedCount} {flaggedCount === 1 ? "question" : "questions"} you marked for review
              </p>
            </div>
          </Link>
        )}

        <Link
          href="/quiz/session?mode=all&n=15"
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all active:scale-[0.99]"
        >
          <RefreshCw className="h-7 w-7 flex-shrink-0 text-slate-700" />
          <div className="flex-1">
            <p className="font-bold text-slate-900">Mixed Practice</p>
            <p className="text-sm text-slate-600">
              15 questions across all domains, randomized
            </p>
          </div>
        </Link>

        <Link
          href="/quiz/session?mode=weak&n=20"
          className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 transition-all active:scale-[0.99]"
        >
          <Target className="h-7 w-7 flex-shrink-0 text-red-600" />
          <div className="flex-1">
            <p className="font-bold text-slate-900">Weak Areas Bootcamp</p>
            <p className="text-sm text-slate-600">
              20 questions targeting only your weakest topics
            </p>
          </div>
        </Link>
      </section>

      {/* Weakness Drills */}
      {lowAccuracyTags.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Drill a weakness</h2>
          <div className="grid gap-2">
            {lowAccuracyTags.slice(0, 5).map((w) => (
              <Link
                key={w.tag}
                href={`/quiz/session?weakness=${w.tag}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {WEAKNESS_PRIORITIES[w.tag]?.label ?? w.tag}
                  </p>
                  <p className="font-mono text-xs text-slate-500">
                    {w.accuracyPct}% accuracy · {w.attempted} attempts
                  </p>
                </div>
                <span className="rounded-full bg-red-100 px-2 py-0.5 font-mono text-xs font-medium text-red-700">
                  Weak
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Custom Quiz Builder */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-slate-700" />
          <h2 className="text-lg font-semibold text-slate-900">Custom quiz</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">
              Domains <span className="text-slate-400">(none = all)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(DOMAINS) as Domain[]).map((d) => {
                const active = selectedDomains.includes(d);
                const qCount = allQuestions.filter((q) => q.domain === d).length;
                return (
                  <button
                    key={d}
                    onClick={() => toggleDomain(d)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      active
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-slate-200 bg-white text-slate-700"
                    )}
                  >
                    {DOMAINS[d].name} ({qCount})
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Number of questions</p>
            <div className="flex gap-2">
              {[5, 10, 20, 30].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 font-mono font-medium transition-all",
                    count === n
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startCustomQuiz}
            className="w-full rounded-xl bg-slate-900 py-3.5 font-semibold text-white transition-all active:scale-[0.99]"
          >
            Start quiz
          </button>
        </div>
      </section>
    </div>
  );
}
