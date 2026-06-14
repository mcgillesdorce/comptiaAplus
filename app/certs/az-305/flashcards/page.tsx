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
import {
  useAZ305Store,
  useAZ305Hydrated,
  type AZ305Grade,
} from "@/lib/azure/az305-store";
import { orderSmartCards, getWeakItems } from "@/lib/azure/az305-analytics";
import { ChevronLeft, Target } from "lucide-react";

type Filter = AZ305Objective | "all" | "smart";

function answerText(q: AZ305Question): string {
  return q.choices
    .filter((c) => c.correct)
    .map((c) => c.text)
    .join("  •  ");
}

const GRADES: { grade: AZ305Grade; label: string; className: string }[] = [
  {
    grade: "again",
    label: "Again",
    className:
      "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
  },
  {
    grade: "hard",
    label: "Hard",
    className:
      "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  },
  {
    grade: "good",
    label: "Good",
    className:
      "border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
  },
  {
    grade: "easy",
    label: "Easy",
    className:
      "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
];

function masteryColor(m: number): string {
  if (m >= 0.75) return "bg-emerald-500";
  if (m >= 0.5) return "bg-sky-500";
  if (m >= 0.3) return "bg-amber-500";
  return "bg-rose-500";
}

export default function AZ305FlashcardsPage() {
  const cardStats = useAZ305Store((s) => s.cardStats);
  const rateCard = useAZ305Store((s) => s.rateCard);
  const hydrated = useAZ305Hydrated();

  const [active, setActive] = useState<Filter | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Cards sorted by exam objective, then by id (stable base order).
  const sorted = useMemo(() => {
    const orderIndex = (o: AZ305Objective) => AZ305_OBJECTIVE_ORDER.indexOf(o);
    return [...questionsAZ305].sort(
      (a, b) => orderIndex(a.objective) - orderIndex(b.objective) || a.id.localeCompare(b.id)
    );
  }, []);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: questionsAZ305.length,
      smart: questionsAZ305.length,
      "1.0-identity-governance-monitoring": 0,
      "2.0-data-storage": 0,
      "3.0-business-continuity": 0,
      "4.0-infrastructure": 0,
    };
    for (const q of questionsAZ305) c[q.objective]++;
    return c;
  }, []);

  const weakCount = useMemo(
    () => (hydrated ? getWeakItems(cardStats).length : 0),
    [hydrated, cardStats]
  );

  // Deck is rebuilt when a deck opens; smart + objective decks are ordered by
  // weakness so the cards you keep missing surface first. Re-ordering is frozen
  // while a deck is open (depends on `active`/`sorted` only) so cards don't jump
  // around mid-session as you rate them.
  const deck = useMemo(() => {
    if (!active) return [];
    if (active === "smart") return orderSmartCards(cardStats, sorted);
    const base = active === "all" ? sorted : sorted.filter((q) => q.objective === active);
    return orderSmartCards(cardStats, base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, sorted]);

  function openDeck(f: Filter) {
    setActive(f);
    setIndex(0);
    setFlipped(false);
  }

  function grade(g: AZ305Grade) {
    const current = deck[index];
    if (current) rateCard(current.id, g);
    if (index + 1 >= deck.length) {
      setFlipped(false);
      return;
    }
    setFlipped(false);
    setIndex((i) => i + 1);
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
            Attack your weak points
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Rate each card after you flip it — weak cards resurface sooner.
          </p>
        </header>

        {/* Smart review — primary deck */}
        <button
          onClick={() => openDeck("smart")}
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-400 to-orange-500 p-4 text-left text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99] dark:border-amber-700"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">🎯 Smart review</p>
              <p className="text-xs text-amber-50">Weak points first, adapts as you rate</p>
            </div>
          </div>
          {hydrated && weakCount > 0 && (
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
              {weakCount} weak
            </span>
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            or study by objective
          </span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => openDeck("all")}
            className="flex w-full items-center justify-between rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-500 to-blue-700 p-4 text-left text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99] dark:border-sky-900"
          >
            <div>
              <p className="font-semibold">📚 All objectives</p>
              <p className="text-xs text-sky-100">Every card, weakest first</p>
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
  const cardMastery = cardStats[card.id]?.mastery ?? 0.15;

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

      <div className="flex items-center gap-2">
        <span className="inline-block rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
          {AZ305_OBJECTIVES[card.objective].emoji} {AZ305_OBJECTIVES[card.objective].short}
        </span>
        {hydrated && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <span className={cn("h-2 w-2 rounded-full", masteryColor(cardMastery))} />
            {Math.round(cardMastery * 100)}%
          </span>
        )}
      </div>

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

      {/* Controls: rate when flipped, otherwise prompt to flip */}
      {flipped ? (
        <div className="space-y-2">
          <p className="text-center text-xs text-slate-400">How well did you know it?</p>
          <div className="grid grid-cols-4 gap-2">
            {GRADES.map(({ grade: g, label, className }) => (
              <button
                key={g}
                onClick={() => grade(g)}
                className={cn(
                  "rounded-2xl border px-2 py-3 text-sm font-semibold transition-all active:scale-[0.97]",
                  className
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.99] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          Reveal answer
        </button>
      )}
    </div>
  );
}
