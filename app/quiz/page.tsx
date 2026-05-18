"use client";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { DOMAINS, WEAKNESS_PRIORITIES } from "@/lib/domains";
import { useStudyStore } from "@/lib/store";
import { computeWeaknessStats, computeUncoveredTopics } from "@/lib/analytics";
import { allQuestions } from "@/data/questions";
import type { Domain } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Zap, Bookmark, RefreshCw, Filter, Target, BookOpen, ChevronRight } from "lucide-react";

const CORE2_DOMAINS: Domain[] = [
  "1.0-operating-systems",
  "2.0-security",
  "3.0-software-troubleshooting",
  "4.0-operational-procedures",
];

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="space-y-6" />}>
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const is1202 = searchParams.get("cert") === "1202";
  const domainQuery = is1202 ? `&domains=${CORE2_DOMAINS.join(",")}` : "";
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [count, setCount] = useState(10);
  const stats = useStudyStore((s) => s.questionStats);
  const sessions = useStudyStore((s) => s.sessions);

  const scopedStats = useMemo(
    () =>
      is1202
        ? Object.fromEntries(Object.entries(stats).filter(([id]) => id.startsWith("1202-")))
        : stats,
    [is1202, stats]
  );

  const scopedSessions = useMemo(
    () =>
      is1202
        ? sessions.filter((s) => s.questionIds.some((id) => id.startsWith("1202-")))
        : sessions,
    [is1202, sessions]
  );

  const core2Tags = useMemo(() => {
    if (!is1202) return null;
    const tags = new Set<string>();
    for (const q of allQuestions) {
      if (CORE2_DOMAINS.includes(q.domain)) {
        for (const tag of q.weaknessTags) tags.add(tag);
      }
    }
    return tags;
  }, [is1202]);

  const flaggedCount = Object.entries(scopedStats).filter(([, s]) => s.markedForReview).length;
  const weaknessStats = computeWeaknessStats(scopedStats);
  const lowAccuracyTags = weaknessStats.filter((w) => w.attempted > 0 && w.accuracyPct < 70);
  const uncoveredTopics = useMemo(() => {
    const topics = computeUncoveredTopics(scopedSessions, 5);
    if (!core2Tags) return topics;
    return topics.filter((t) => core2Tags.has(t.tag));
  }, [core2Tags, scopedSessions]);
  const [showAllUncovered, setShowAllUncovered] = useState(false);
  const visibleUncovered = showAllUncovered ? uncoveredTopics : uncoveredTopics.slice(0, 5);
  const visibleDomains = useMemo(
    () => (is1202 ? CORE2_DOMAINS : (Object.keys(DOMAINS) as Domain[])),
    [is1202]
  );

  const toggleDomain = (d: Domain) => {
    setSelectedDomains((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const startCustomQuiz = () => {
    const params = new URLSearchParams();
    if (selectedDomains.length > 0) {
      params.set("domains", selectedDomains.join(","));
    } else if (is1202) {
      params.set("domains", CORE2_DOMAINS.join(","));
    }
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
          href={`/quiz/session?mode=weak&n=20${domainQuery}`}
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white shadow-md transition-all active:scale-[0.99]"
        >
          <Zap className="h-8 w-8 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-lg">Smart Quiz</p>
            <p className="text-sm text-brand-100">
              20 questions · auto-picks your weakest areas
            </p>
          </div>
        </Link>

        {flaggedCount > 0 && (
          <Link
            href={`/quiz/session?mode=review${domainQuery}`}
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
          href={`/quiz/session?mode=all&n=15${domainQuery}`}
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
          href={`/quiz/session?mode=weak&n=20${domainQuery}`}
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
                href={`/quiz/session?weakness=${w.tag}${domainQuery}`}
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

      {/* Uncovered Topics */}
      {uncoveredTopics.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-slate-700" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Not yet covered</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
              last 5 quizzes
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {scopedSessions.length === 0
              ? "No quizzes taken yet — all topics are uncovered."
              : `${uncoveredTopics.length} topic${uncoveredTopics.length === 1 ? "" : "s"} with available questions haven't appeared in your last ${Math.min(scopedSessions.length, 5)} quiz${Math.min(scopedSessions.length, 5) === 1 ? "" : "zes"}.`}
          </p>
          <div className="grid gap-2">
            {visibleUncovered.map((t) => (
              <Link
                key={t.tag}
                href={`/quiz/session?weakness=${t.tag}${domainQuery}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 transition-all active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {t.label}
                  </p>
                  <p className="font-mono text-xs text-slate-500">
                    {t.questionCount} question{t.questionCount === 1 ? "" : "s"} available
                  </p>
                </div>
                <div className="ml-3 flex items-center gap-2 flex-shrink-0">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    P{t.priority}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
          {uncoveredTopics.length > 5 && (
            <button
              onClick={() => setShowAllUncovered((v) => !v)}
              className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
            >
              {showAllUncovered
                ? "Show less"
                : `Show ${uncoveredTopics.length - 5} more topics`}
            </button>
          )}
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
              {visibleDomains.map((d) => {
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
