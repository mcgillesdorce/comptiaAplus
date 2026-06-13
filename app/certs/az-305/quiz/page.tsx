"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { cn, shuffle } from "@/lib/utils";
import {
  questionsAZ305,
  AZ305_OBJECTIVES,
  AZ305_OBJECTIVE_ORDER,
  type AZ305Objective,
  type AZ305Question,
} from "@/data/azure/questions/1305";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
} from "lucide-react";

type Filter = AZ305Objective | "all";

export default function AZ305QuizPage() {
  const [started, setStarted] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [order, setOrder] = useState<AZ305Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: questionsAZ305.length,
      "1.0-identity-governance-monitoring": 0,
      "2.0-data-storage": 0,
      "3.0-business-continuity": 0,
      "4.0-infrastructure": 0,
    };
    for (const q of questionsAZ305) c[q.objective]++;
    return c;
  }, []);

  function start(f: Filter) {
    const pool = f === "all" ? questionsAZ305 : questionsAZ305.filter((q) => q.objective === f);
    setFilter(f);
    setOrder(shuffle(pool));
    setIndex(0);
    setSelected([]);
    setChecked(false);
    setScore(0);
    setFinished(false);
    setStarted(true);
  }

  function toggle(choiceId: string, multi: boolean) {
    if (checked) return;
    setSelected((prev) =>
      multi
        ? prev.includes(choiceId)
          ? prev.filter((c) => c !== choiceId)
          : [...prev, choiceId]
        : [choiceId]
    );
  }

  const current = order[index];

  function check() {
    if (!current || selected.length === 0) return;
    const correctIds = current.choices.filter((c) => c.correct).map((c) => c.id);
    const isCorrect =
      correctIds.length === selected.length &&
      correctIds.every((id) => selected.includes(id));
    if (isCorrect) setScore((s) => s + 1);
    setChecked(true);
  }

  function next() {
    if (index + 1 >= order.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected([]);
    setChecked(false);
  }

  // ── Start screen ──────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="space-y-6">
        <Link
          href="/certs/az-305"
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> AZ-305
        </Link>

        <header className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-wider text-sky-500 dark:text-sky-400">
            AZ-305 · Quiz
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Choose a topic
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Questions are shuffled. Answer, check, and review the explanation.
          </p>
        </header>

        <div className="space-y-2">
          <button
            onClick={() => start("all")}
            className="flex w-full items-center justify-between rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-500 to-blue-700 p-4 text-left text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99] dark:border-sky-900"
          >
            <div>
              <p className="font-semibold">📚 All objectives</p>
              <p className="text-xs text-sky-100">Mixed practice across every topic</p>
            </div>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
              {counts.all}
            </span>
          </button>

          {AZ305_OBJECTIVE_ORDER.map((obj) => (
            <button
              key={obj}
              onClick={() => start(obj)}
              disabled={counts[obj] === 0}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-sky-300 hover:shadow-sm active:scale-[0.99] disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {AZ305_OBJECTIVES[obj].emoji} {AZ305_OBJECTIVES[obj].short}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {AZ305_OBJECTIVES[obj].name}
                </p>
              </div>
              <span className="ml-3 flex-shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {counts[obj]}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score / order.length) * 100);
    return (
      <div className="space-y-6">
        <header className="space-y-1 text-center">
          <Trophy className="mx-auto h-12 w-12 text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {pct}%
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You got {score} of {order.length} correct
          </p>
        </header>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => start(filter)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
          >
            <RotateCcw className="h-4 w-4" /> Retake this set
          </button>
          <button
            onClick={() => setStarted(false)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Choose another topic
          </button>
          <Link
            href="/certs/az-305"
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Back to AZ-305
          </Link>
        </div>
      </div>
    );
  }

  // ── Question screen ───────────────────────────────────────────────
  if (!current) return null;
  const correctIds = current.choices.filter((c) => c.correct).map((c) => c.id);

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStarted(false)}
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Exit
        </button>
        <span className="font-mono text-xs text-slate-400">
          {index + 1} / {order.length}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-700 transition-all"
          style={{ width: `${((index + (checked ? 1 : 0)) / order.length) * 100}%` }}
        />
      </div>

      {/* Objective + type badge */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
          {AZ305_OBJECTIVES[current.objective].emoji}{" "}
          {AZ305_OBJECTIVES[current.objective].short}
        </span>
        {current.type === "multi" && (
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            Select all that apply
          </span>
        )}
      </div>

      {/* Prompt */}
      <h2 className="text-base font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
        {current.prompt}
      </h2>

      {/* Choices */}
      <div className="space-y-2">
        {current.choices.map((choice) => {
          const isSelected = selected.includes(choice.id);
          const isCorrect = choice.correct;
          let state: "idle" | "correct" | "wrong" | "missed" = "idle";
          if (checked) {
            if (isCorrect) state = "correct";
            else if (isSelected) state = "wrong";
          }
          return (
            <button
              key={choice.id}
              onClick={() => toggle(choice.id, current.type === "multi")}
              disabled={checked}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm transition-all active:scale-[0.99]",
                state === "idle" &&
                  (isSelected
                    ? "border-sky-400 bg-sky-50 dark:border-sky-500 dark:bg-sky-900/30"
                    : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-700 dark:bg-slate-800"),
                state === "correct" &&
                  "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-900/30",
                state === "wrong" &&
                  "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-900/30"
              )}
            >
              {checked && state === "correct" && (
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              )}
              {checked && state === "wrong" && (
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600 dark:text-rose-400" />
              )}
              <span
                className={cn(
                  "text-slate-800 dark:text-slate-100",
                  checked && state === "idle" && "text-slate-500 dark:text-slate-400"
                )}
              >
                {choice.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {checked && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Explanation
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {current.explanation}
          </p>
          {current.reference && (
            <p className="mt-2 text-xs font-medium text-sky-600 dark:text-sky-400">
              Reference: {current.reference}
            </p>
          )}
        </div>
      )}

      {/* Action button */}
      {!checked ? (
        <button
          onClick={check}
          disabled={selected.length === 0}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99] disabled:opacity-50"
        >
          Check answer
        </button>
      ) : (
        <button
          onClick={next}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.99] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {index + 1 >= order.length ? "See results" : "Next question"}
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {/* Live score */}
      <p className="text-center font-mono text-xs text-slate-400">
        Score: {score} / {checked ? index + 1 : index}
        {correctIds.length > 1 ? " · multi-answer" : ""}
      </p>
    </div>
  );
}
