"use client";
import { Suspense } from "react";
import { useStudyStore } from "@/lib/store";
import {
  computeDomainStats,
  computeWeaknessStats,
  computeReadinessScore,
} from "@/lib/analytics";
import { DOMAINS, WEAKNESS_PRIORITIES } from "@/lib/domains";
import { allQuestions } from "@/data/questions";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Calendar, TrendingUp, TrendingDown, Award, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const CORE2_DOMAINS = [
  "1.0-operating-systems",
  "2.0-security",
  "3.0-software-troubleshooting",
  "4.0-operational-procedures",
].join(",");

type FeedbackPriority = "low" | "medium" | "high";
const HIGH_PRIORITY_SIGNALS = ["crash", "cannot", "cant", "broken", "not working", "wont", "urgent", "security", "data loss"];
const MEDIUM_PRIORITY_SIGNALS = ["slow", "error", "bug", "issue", "fail", "problem", "confusing"];
const MAX_ISSUE_TITLE_TEXT_LENGTH = 70;
const MAX_SAFE_ISSUE_URL_LENGTH = 1800;

function truncateAtWordBoundary(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
}

function assessFeedbackPriority(input: string): FeedbackPriority {
  const text = input.toLowerCase().replace(/[’']/g, "");
  if (!text.trim()) return "low";

  if (HIGH_PRIORITY_SIGNALS.some((signal) => text.includes(signal))) return "high";
  if (MEDIUM_PRIORITY_SIGNALS.some((signal) => text.includes(signal))) return "medium";
  return "low";
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<div className="space-y-6" />}>
      <ProgressPageContent />
    </Suspense>
  );
}

function ProgressPageContent() {
  const searchParams = useSearchParams();
  const is1202 = searchParams.get("cert") === "1202";
  const stats = useStudyStore((s) => s.questionStats);
  const sessions = useStudyStore((s) => s.sessions);
  const targetDate = useStudyStore((s) => s.targetExamDate);
  const setTargetDate = useStudyStore((s) => s.setTargetDate);
  const resetProgress = useStudyStore((s) => s.resetProgress);
  const [feedbackText, setFeedbackText] = useState("");
  const [screenshotFileName, setScreenshotFileName] = useState<string | null>(null);
  const [feedbackSubmitError, setFeedbackSubmitError] = useState<string | null>(null);

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

  const domainStats = computeDomainStats(scopedStats);
  const weaknessStats = computeWeaknessStats(scopedStats);
  const readiness = computeReadinessScore(scopedStats);

  const totalAttempted = Object.values(scopedStats).reduce((s, x) => s + x.attempts, 0);
  const totalCorrect = Object.values(scopedStats).reduce((s, x) => s + x.correct, 0);
  const overallAccuracy = totalAttempted === 0 ? 0 : Math.round((totalCorrect / totalAttempted) * 100);
  const feedbackPriority = useMemo(() => assessFeedbackPriority(feedbackText), [feedbackText]);

  const exam1Missed = allQuestions.filter((q) => q.source === "exam1-missed");
  const exam2Missed = allQuestions.filter((q) => q.source === "exam2-missed");
  const exam1Mastered = exam1Missed.filter((q) => {
    const s = stats[q.id];
    return s && s.attempts > 0 && s.correct / s.attempts >= 0.7;
  }).length;
  const exam2Mastered = exam2Missed.filter((q) => {
    const s = stats[q.id];
    return s && s.attempts > 0 && s.correct / s.attempts >= 0.7;
  }).length;

  return (
    <div className="space-y-6">
      <header className="pt-2">
        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Progress
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Where you stand
        </h1>
      </header>

      {/* Readiness summary */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-brand-700" />
          <p className="font-semibold text-slate-900">{is1202 ? "A+ Core 2 readiness" : "A+ Core 1 readiness"}</p>
        </div>
        <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-slate-900">
          {readiness.estimatedScore}%
        </p>
        <p className="mt-1 text-sm text-slate-600">{readiness.message}</p>
      </div>

      {!is1202 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Practice exam recovery</h2>
          <p className="text-sm text-slate-600">
            Track how many of your originally-missed questions you&apos;ve now mastered.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <RecoveryCard
              label="Exam 1"
              mastered={exam1Mastered}
              total={exam1Missed.length}
            />
            <RecoveryCard
              label="Exam 2"
              mastered={exam2Mastered}
              total={exam2Missed.length}
            />
          </div>
        </section>
      )}

      {/* Weakness leaderboard */}
      {weaknessStats.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">By topic</h2>
            <span className="font-mono text-xs text-slate-500">
              sorted by accuracy
            </span>
          </div>
          <div className="space-y-2">
            {weaknessStats.slice(0, 12).map((w) => {
              const label = WEAKNESS_PRIORITIES[w.tag]?.label ?? w.tag;
              const note = WEAKNESS_PRIORITIES[w.tag]?.note;
              return (
                <Link
                  key={w.tag}
                  href={is1202 ? `/quiz/session?weakness=${w.tag}&domains=${CORE2_DOMAINS}` : `/quiz/session?weakness=${w.tag}`}
                  className="block rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{label}</p>
                    <div className="flex items-center gap-2">
                      {w.accuracyPct >= 80 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      ) : w.accuracyPct < 50 ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : null}
                      <span
                        className={cn(
                          "font-mono text-sm font-semibold tabular-nums",
                          w.accuracyPct >= 80 ? "text-emerald-600" :
                          w.accuracyPct >= 60 ? "text-amber-600" :
                          "text-red-600"
                        )}
                      >
                        {w.accuracyPct}%
                      </span>
                    </div>
                  </div>
                  {note && w.accuracyPct < 70 && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      {note}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          w.accuracyPct >= 80 ? "bg-emerald-500" :
                          w.accuracyPct >= 60 ? "bg-amber-500" :
                          "bg-red-500"
                        )}
                        style={{ width: `${w.accuracyPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">
                      {w.correct}/{w.attempted}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* By domain */}
      {domainStats.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">By domain</h2>
          <div className="space-y-2">
            {domainStats.map((d) => (
              <div
                key={d.domain}
                className="rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {DOMAINS[d.domain].name}
                  </p>
                  <span className="font-mono text-sm font-semibold tabular-nums text-slate-900">
                    {d.accuracyPct}%
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-slate-500">
                  {d.questionsCorrect}/{d.questionsAttempted} • last:{" "}
                  {d.lastStudied ? formatRelativeTime(d.lastStudied) : "never"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent sessions */}
      {scopedSessions.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Recent sessions</h2>
          <div className="space-y-2">
            {scopedSessions.slice(-5).reverse().map((s) => (
              <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">
                    {s.questionIds.length} questions · {s.mode}
                  </p>
                  <span className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-xs font-medium",
                    s.scorePct >= 80 ? "bg-emerald-100 text-emerald-700" :
                    s.scorePct >= 60 ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {s.scorePct}%
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-slate-500">
                  {formatRelativeTime(s.finishedAt)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Settings */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar className="h-4 w-4" />
              Target exam date
            </label>
            <input
              type="date"
              value={targetDate ?? ""}
              onChange={(e) => setTargetDate(e.target.value || null)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
            />
          </div>
          <button
            onClick={() => {
              if (confirm("Reset all progress? This cannot be undone.")) {
                resetProgress();
              }
            }}
            className="w-full rounded-lg border border-red-200 bg-red-50 py-2.5 font-medium text-red-700"
          >
            Reset all progress
          </button>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Feedback</h3>
          <p className="text-xs text-slate-600">
            Share feedback or attach a screenshot. A GitHub issue will be prefilled with a priority check.
          </p>
          <textarea
            value={feedbackText}
            onChange={(e) => {
              setFeedbackText(e.target.value);
              setFeedbackSubmitError(null);
            }}
            rows={4}
            placeholder="Describe the issue you ran into..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
          />
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="feedback-screenshot">
              Screenshot (optional)
            </label>
            <input
              id="feedback-screenshot"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setScreenshotFileName(file?.name ?? null);
                setFeedbackSubmitError(null);
              }}
              className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700"
            />
          </div>
          <p className="text-xs text-slate-500">
            Priority check:{" "}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[11px] uppercase",
                feedbackPriority === "high"
                  ? "bg-red-100 text-red-700"
                  : feedbackPriority === "medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
              )}
            >
              {feedbackPriority}
            </span>
          </p>
          <button
            onClick={() => {
              const trimmedFeedback = feedbackText.trim();
              if (!trimmedFeedback && !screenshotFileName) {
                setFeedbackSubmitError("Please enter feedback or attach a screenshot before submitting.");
                return;
              }
              setFeedbackSubmitError(null);

              const repoOwner = "mcgillesdorce";
              const repoName = "comptiaAplus";
              const issueTitle = trimmedFeedback
                ? `[Feedback][${feedbackPriority.toUpperCase()}] ${truncateAtWordBoundary(trimmedFeedback, MAX_ISSUE_TITLE_TEXT_LENGTH)}`
                : `[Feedback][${feedbackPriority.toUpperCase()}] Screenshot-only report`;
              const issueBody = [
                "## Feedback submission",
                "",
                `**Priority (auto-filtered):** ${feedbackPriority.toUpperCase()}`,
                "",
                "**Feedback**",
                trimmedFeedback || "(No feedback text provided)",
                "",
                `**Screenshot file:** ${screenshotFileName ?? "None attached"}`,
              ].join("\n");

              const issueUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
              if (issueUrl.length > MAX_SAFE_ISSUE_URL_LENGTH) {
                setFeedbackSubmitError("Your feedback is too long to submit automatically. Please shorten it and try again.");
                return;
              }
              window.open(issueUrl, "_blank", "noopener,noreferrer");
            }}
            className="w-full rounded-lg bg-slate-900 py-2.5 font-medium text-white"
          >
            Create feedback issue
          </button>
          {feedbackSubmitError && (
            <p className="text-xs font-medium text-red-600">{feedbackSubmitError}</p>
          )}
        </div>
        <p className="text-center font-mono text-xs text-slate-400">
          Overall accuracy: {overallAccuracy}% · {totalAttempted} total attempts
        </p>
      </section>
    </div>
  );
}

function RecoveryCard({
  label,
  mastered,
  total,
}: {
  label: string;
  mastered: number;
  total: number;
}) {
  const pct = total === 0 ? 0 : Math.round((mastered / total) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-slate-900">
        {mastered}<span className="text-base text-slate-400">/{total}</span>
      </p>
      <p className="mt-1 text-xs text-slate-600">{pct}% mastered</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-brand-700 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
