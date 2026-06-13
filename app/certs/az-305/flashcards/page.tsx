"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  questionsAZ305,
  AZ305_OBJECTIVES,
  AZ305_OBJECTIVE_ORDER,
  type AZ305Objective,
  type AZ305Question,
} from "@/data/azure/questions/1305";
import { ChevronLeft, RotateCcw, ArrowRight, ArrowLeft } from "lucide-react";

type Filter = AZ305Objective | "all";

function answerText(q: AZ305Question): string {
  return q.choices
    .filter((c) => c.correct)
    .map((c) => c.text)
    .join("  •  ");
}

export default function AZ305FlashcardsPage() {
  const [active, setActive] = useState<Filter | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Cards always sorted by exam objective, then by id.
  const sorted = useMemo(() => {
    const orderIndex = (o: AZ305Objective) => AZ305_OBJECTIVE_ORDER.indexOf(o);
    return [...questionsAZ305].sort(
      (a, b) => orderIndex(a.objective) - orderIndex(b.objective) || a.id.localeCompare(b.id)
    );
  }, []);

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

  const deck = useMemo(() => {
    if (!active || active === "all") return sorted;
    return sorted.filter((q) => q.objective === active);
  }, [active, sorted]);

  function openDeck(f: Filter) {
    setActive(f);
    setIndex(0);
    setFlipped(false);
  }

  function go(dir: 1 | -1) {
    setFlipped(false);
    setIndex((i) => Math.min(Math.max(i + dir, 0), deck.length - 1));
  }

  // ── Deck picker ───────────────────────────────────────────────────
  if (!active) {
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
            AZ-305 · Flashcards
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Study by exam objective
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cards are grouped and ordered by AZ-305 exam objective.
          </p>
        </header>

        <div className="space-y-2">
          <button
            onClick={() => openDeck("all")}
            className="flex w-full items-center justify-between rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-500 to-blue-700 p-4 text-left text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99] dark:border-sky-900"
          >
            <div>
              <p className="font-semibold">📚 All objectives</p>
              <p className="text-xs text-sky-100">Every card, ordered by objective</p>
            </div>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
              {counts.all}
            </span>
          </button>

          {AZ305_OBJECTIVE_ORDER.map((obj) => (
            <button
              key={obj}
              onClick={() => openDeck(obj)}
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

  // ── Card viewer ───────────────────────────────────────────────────
  const card = deck[index];
  if (!card) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActive(null)}
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Decks
        </button>
        <span className="font-mono text-xs text-slate-400">
          {index + 1} / {deck.length}
        </span>
      </div>

      <span className="inline-block rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
        {AZ305_OBJECTIVES[card.objective].emoji} {AZ305_OBJECTIVES[card.objective].short}
      </span>

      {/* Flip card */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative block min-h-[20rem] w-full"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={flipped ? "back" : "front"}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex min-h-[20rem] w-full flex-col justify-center rounded-3xl border p-6 text-left shadow-sm",
              flipped
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
                : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
            )}
          >
            {!flipped ? (
              <>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-slate-400">
                  Question {card.type === "multi" ? "· select all that apply" : ""}
                </p>
                <p className="text-base font-medium leading-relaxed text-slate-900 dark:text-slate-100">
                  {card.prompt}
                </p>
                <p className="mt-4 text-xs text-slate-400">Tap to reveal answer</p>
              </>
            ) : (
              <>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-emerald-500">
                  Answer
                </p>
                <p className="text-base font-semibold leading-relaxed text-emerald-900 dark:text-emerald-200">
                  {answerText(card)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {card.explanation}
                </p>
                {card.reference && (
                  <p className="mt-2 text-xs font-medium text-sky-600 dark:text-sky-400">
                    Reference: {card.reference}
                  </p>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" /> Prev
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.99] dark:bg-white dark:text-slate-900"
        >
          <RotateCcw className="h-4 w-4" /> Flip
        </button>
        <button
          onClick={() => go(1)}
          disabled={index + 1 >= deck.length}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
