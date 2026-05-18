"use client";
import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { referenceTopics, type ReferenceTopic } from "@/data/reference";
import { DOMAINS } from "@/lib/domains";
import { useStudyStore } from "@/lib/store";
import { computeWeaknessStats } from "@/lib/analytics";
import { ChevronRight, BookOpen, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeaknessTag } from "@/lib/types";

const CORE2_DOMAINS = new Set([
  "1.0-operating-systems",
  "2.0-security",
  "3.0-software-troubleshooting",
  "4.0-operational-procedures",
]);

/** Lowest accuracy across the topic's weakness tags that have been attempted, or null if untested. */
function topicAccuracy(
  tags: WeaknessTag[],
  accuracyMap: Map<WeaknessTag, number>
): number | null {
  const attempted = tags.filter((t) => accuracyMap.has(t));
  if (attempted.length === 0) return null;
  return Math.min(...attempted.map((t) => accuracyMap.get(t)!));
}

/** Urgency score — higher = should appear first. */
function urgency(topic: ReferenceTopic, accuracyMap: Map<WeaknessTag, number>): number {
  const acc = topicAccuracy(topic.weaknessTags, accuracyMap);
  // Quiz data: 0% accuracy → urgency 110, 100% → urgency 10; tie-break by static priority
  if (acc !== null) return (100 - acc) + topic.priority * 0.1;
  // No data yet: show high-priority topics first (below quizzed topics)
  return topic.priority * 0.1;
}

export default function ReferenceIndexPage() {
  return (
    <Suspense fallback={<div className="space-y-6" />}>
      <ReferenceIndexContent />
    </Suspense>
  );
}

function ReferenceIndexContent() {
  const searchParams = useSearchParams();
  const is1202 = searchParams.get("cert") === "1202";
  const stats = useStudyStore((s) => s.questionStats);

  const scopedStats = useMemo(
    () =>
      is1202
        ? Object.fromEntries(Object.entries(stats).filter(([id]) => id.startsWith("1202-")))
        : stats,
    [is1202, stats]
  );

  const topics = useMemo(
    () => (is1202 ? referenceTopics.filter((t) => CORE2_DOMAINS.has(t.domain)) : referenceTopics),
    [is1202]
  );

  const hasData = Object.keys(scopedStats).length > 0;

  const accuracyMap = useMemo(() => {
    const map = new Map<WeaknessTag, number>();
    for (const w of computeWeaknessStats(scopedStats)) {
      map.set(w.tag, w.accuracyPct);
    }
    return map;
  }, [scopedStats]);

  const sorted = useMemo(
    () => [...topics].sort((a, b) => urgency(b, accuracyMap) - urgency(a, accuracyMap)),
    [accuracyMap, topics]
  );

  return (
    <div className="space-y-6">
      <header className="pt-2">
        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Reference
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Read & review
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {hasData
            ? "Ordered by your quiz accuracy — weakest topics first"
            : "Topics ordered by exam priority — take quizzes to personalise"}
        </p>
      </header>

      <div className="space-y-3">
        {sorted.map((topic) => {
          const acc = topicAccuracy(topic.weaknessTags, accuracyMap);
          const quizParams = new URLSearchParams({
            weakness: topic.weaknessTags[0],
            n: "10",
            ...(is1202 ? { domains: Array.from(CORE2_DOMAINS).join(",") } : {}),
          }).toString();

          return (
            <div key={topic.slug} className="flex items-stretch gap-2">
              <Link
                href={is1202 ? `/reference/${topic.slug}?cert=1202` : `/reference/${topic.slug}`}
                className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-4 transition-all active:scale-[0.99]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                  <BookOpen className="h-5 w-5 text-brand-700 dark:text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{topic.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {DOMAINS[topic.domain].name}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {acc !== null ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        acc < 60
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                          : acc < 80
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      )}
                    >
                      {acc}%
                    </span>
                  ) : topic.priority >= 9 ? (
                    <span className="rounded-full bg-red-100 dark:bg-red-900/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-300">
                      Weak
                    </span>
                  ) : null}
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </Link>

              {/* Quiz this topic */}
              <Link
                href={`/quiz/session?${quizParams}`}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-brand-700 dark:bg-brand-600 px-3 text-white shadow-sm transition-all active:scale-95"
                title="Quiz this topic"
              >
                <Zap className="h-4 w-4" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider">Quiz</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
