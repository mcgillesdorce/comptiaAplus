"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudyStore } from "@/lib/store";
import { pickWeakQuestions } from "@/lib/analytics";
import { allQuestions } from "@/data/questions";
import type { Question, WeaknessTag } from "@/lib/types";
import { shuffle, cn } from "@/lib/utils";
import { RotateCcw, X, Bookmark, BookmarkCheck } from "lucide-react";

type StackDef = {
  id: string;
  label: string;
  emoji: string;
  tags?: WeaknessTag[];
};

const STACKS: StackDef[] = [
  { id: "weak",        label: "Weak Areas",    emoji: "🎯" },
  { id: "ports",       label: "Port Numbers",  emoji: "🔌", tags: ["port-numbers"] },
  { id: "connectors",  label: "Connectors",    emoji: "🔗", tags: ["ports", "usb-standards", "thunderbolt", "coax-cabling", "fiber-connectors", "display-cables"] },
  { id: "display",     label: "Display Tech",  emoji: "📺", tags: ["display-tech", "display-cables", "laptop-display"] },
  { id: "cables",      label: "Cable Types",   emoji: "🔧", tags: ["cat-ratings", "t568a-568b-crossover", "wiring-standards", "emi-shielding", "crosstalk", "coax-cabling"] },
  { id: "networking",  label: "Networking",    emoji: "📡", tags: ["wifi-80211-standards", "wireless-channels", "internet-conn-types", "dhcp-process", "dns-records", "wireless-standards"] },
];

function buildDeck(
  stack: StackDef,
  stats: ReturnType<typeof useStudyStore.getState>["questionStats"],
  sessions: ReturnType<typeof useStudyStore.getState>["sessions"],
): Question[] {
  if (!stack.tags) return pickWeakQuestions(stats, 20, undefined, sessions);
  const filtered = allQuestions.filter((q) =>
    q.weaknessTags.some((t) => (stack.tags as WeaknessTag[]).includes(t))
  );
  return shuffle(filtered);
}

export default function FlashcardsPage() {
  const stats = useStudyStore((s) => s.questionStats);
  const sessions = useStudyStore((s) => s.sessions);
  const rateConfidence = useStudyStore((s) => s.rateConfidence);
  const toggleReview = useStudyStore((s) => s.toggleReview);
  const recordAnswer = useStudyStore((s) => s.recordAnswer);

  const [activeStackId, setActiveStackId] = useState("weak");
  const [deck, setDeck] = useState<Question[]>(() => buildDeck(STACKS[0], stats, sessions));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function handleSelectStack(stack: StackDef) {
    if (stack.id === activeStackId) return;
    setActiveStackId(stack.id);
    setDeck(buildDeck(stack, stats, sessions));
    setIdx(0);
    setFlipped(false);
  }

  if (deck.length === 0) {
    return (
      <div className="space-y-4">
        {/* Stack picker still visible even when empty */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-2 scrollbar-none">
          {STACKS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectStack(s)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                s.id === activeStackId
                  ? "bg-brand-700 text-white"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <div className="pt-8 text-center">
          <p className="text-slate-600">No flashcards in this stack yet.</p>
        </div>
      </div>
    );
  }

  if (idx >= deck.length) {
    return (
      <div className="space-y-4">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-2 scrollbar-none">
          {STACKS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectStack(s)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                s.id === activeStackId
                  ? "bg-brand-700 text-white"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
          <p className="text-4xl">🎉</p>
          <p className="text-xl font-semibold text-slate-900">Deck complete</p>
          <p className="text-sm text-slate-600">You reviewed {deck.length} cards</p>
          <button
            onClick={() => {
              const stack = STACKS.find((s) => s.id === activeStackId)!;
              setDeck(buildDeck(stack, stats, sessions));
              setIdx(0);
              setFlipped(false);
            }}
            className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white"
          >
            Restart this stack
          </button>
        </div>
      </div>
    );
  }

  const current = deck[idx];
  const correctChoice = current.choices.find((c) => c.correct);
  const stat = stats[current.id];

  const handleRate = (level: "low" | "medium" | "high") => {
    rateConfidence(current.id, level);
    // Also record as correct if high confidence, incorrect if low
    if (level === "high") recordAnswer(current.id, true);
    else if (level === "low") recordAnswer(current.id, false);
    setFlipped(false);
    setTimeout(() => setIdx((i) => i + 1), 200);
  };

  return (
    <div className="space-y-4">
      {/* Stack picker */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-2 scrollbar-none">
        {STACKS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelectStack(s)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
              s.id === activeStackId
                ? "bg-brand-700 text-white"
                : "bg-slate-100 text-slate-600",
            )}
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Flashcards
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Tap to flip
          </h1>
        </div>
        <p className="font-mono text-sm font-medium tabular-nums text-slate-500">
          {idx + 1}/{deck.length}
        </p>
      </div>

      {/* Progress */}
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-brand-700 transition-all duration-500"
          style={{ width: `${((idx + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="relative" style={{ perspective: 1200 }}>
        <motion.div
          key={current.id}
          className="relative h-[26rem] cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => setFlipped((f) => !f)}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-md"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Question
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReview(current.id);
                }}
              >
                {stat?.markedForReview ? (
                  <BookmarkCheck className="h-5 w-5 fill-amber-500 text-amber-500" />
                ) : (
                  <Bookmark className="h-5 w-5 text-slate-300" />
                )}
              </button>
            </div>
            <p className="mt-6 text-lg leading-snug text-slate-900">
              {current.prompt}
            </p>
            <div className="mt-auto flex items-center justify-center gap-2 text-slate-400">
              <RotateCcw className="h-4 w-4" />
              <p className="font-mono text-xs">Tap to reveal answer</p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-blue-50 p-6 shadow-md"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-wider text-brand-700">
              Answer
            </span>
            <p className="mt-3 text-xl font-bold text-slate-900">
              {correctChoice?.text}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {current.explanation}
            </p>
            {current.triggerPhrase && (
              <div className="mt-auto rounded-xl bg-yellow-100 p-3">
                <p className="font-mono text-xs font-medium text-yellow-900">
                  💡 {current.triggerPhrase}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Rating buttons (only show when flipped) */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-2"
          >
            <button
              onClick={() => handleRate("low")}
              className="rounded-2xl bg-red-100 py-3 font-semibold text-red-800 active:scale-[0.97]"
            >
              <X className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-xs">Again</span>
            </button>
            <button
              onClick={() => handleRate("medium")}
              className="rounded-2xl bg-amber-100 py-3 font-semibold text-amber-800 active:scale-[0.97]"
            >
              <RotateCcw className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-xs">Almost</span>
            </button>
            <button
              onClick={() => handleRate("high")}
              className="rounded-2xl bg-emerald-100 py-3 font-semibold text-emerald-800 active:scale-[0.97]"
            >
              <BookmarkCheck className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-xs">Got it</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
