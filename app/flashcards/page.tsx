"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudyStore } from "@/lib/store";
import { pickWeakQuestions } from "@/lib/analytics";
import { allQuestions } from "@/data/questions";
import type { Question, WeaknessTag } from "@/lib/types";
import { shuffle, cn } from "@/lib/utils";
import { RotateCcw, X, Bookmark, BookmarkCheck, ChevronLeft } from "lucide-react";

type Stack = {
  id: string;
  label: string;
  emoji: string;
  subtitle?: string;
  tags?: WeaknessTag[];
  isWeak?: boolean;
  isAll?: boolean;
};

const WEAK_STACK: Stack = {
  id: "weak",
  label: "Weak Points",
  emoji: "🎯",
  subtitle: "Questions you've struggled with most",
  isWeak: true,
};

const TOPIC_STACKS: Stack[] = [
  {
    id: "ports",
    label: "Port Numbers",
    emoji: "🔌",
    tags: ["port-numbers"],
  },
  {
    id: "connectors",
    label: "Connectors",
    emoji: "🔗",
    tags: ["ports", "usb-standards", "thunderbolt", "coax-cabling", "fiber-connectors", "display-cables"],
  },
  {
    id: "display",
    label: "Display Tech",
    emoji: "📺",
    tags: ["display-tech", "display-cables", "laptop-display"],
  },
  {
    id: "cables",
    label: "Cable Types",
    emoji: "🔧",
    tags: ["cat-ratings", "t568a-568b-crossover", "wiring-standards", "emi-shielding", "crosstalk", "coax-cabling"],
  },
  {
    id: "wireless",
    label: "Wireless Standards",
    emoji: "📶",
    tags: ["wifi-80211-standards", "wireless-channels", "wireless-standards", "wifi-frequency", "wifi-6-ax", "wifi-7-be", "ap-troubleshooting"],
  },
  {
    id: "networking",
    label: "Networking",
    emoji: "📡",
    tags: ["internet-conn-types", "dhcp-process", "dns-records"],
  },
  {
    id: "raid",
    label: "RAID & Storage",
    emoji: "💾",
    tags: ["raid-levels"],
  },
  {
    id: "cloud",
    label: "Cloud & VMs",
    emoji: "☁️",
    tags: ["cloud-models", "cloud-characteristics", "hypervisors", "virtualization-types"],
  },
  {
    id: "all",
    label: "All Topics",
    emoji: "📚",
    isAll: true,
  },
];

function buildDeck(
  stack: Stack,
  stats: ReturnType<typeof useStudyStore.getState>["questionStats"],
  sessions: ReturnType<typeof useStudyStore.getState>["sessions"],
): Question[] {
  if (stack.isWeak) return pickWeakQuestions(stats, 30, undefined, sessions);
  if (stack.isAll) return shuffle([...allQuestions]);
  const tagSet = new Set(stack.tags ?? []);
  return shuffle(allQuestions.filter((q) => q.weaknessTags.some((t) => tagSet.has(t))));
}

// ── Picker screen ─────────────────────────────────────────────────────────────
function PickerScreen({ onPick }: { onPick: (s: Stack) => void }) {
  return (
    <div className="space-y-4 pt-2">
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
        Choose a stack to study
      </p>

      {/* Weak Points — featured */}
      <button
        onClick={() => onPick(WEAK_STACK)}
        className="flex w-full items-center gap-4 rounded-2xl border-2 border-amber-400 bg-amber-50 px-5 py-4 text-left transition-all active:scale-[0.98]"
      >
        <span className="text-3xl">{WEAK_STACK.emoji}</span>
        <div>
          <p className="font-bold text-amber-900">{WEAK_STACK.label}</p>
          <p className="text-xs text-amber-700">{WEAK_STACK.subtitle}</p>
        </div>
      </button>

      {/* Topic grid */}
      <div className="grid grid-cols-2 gap-2">
        {TOPIC_STACKS.map((s) =>
          s.isAll ? (
            <button
              key={s.id}
              onClick={() => onPick(s)}
              className="col-span-2 flex items-center gap-3 rounded-2xl bg-slate-800 px-5 py-3 text-left text-white transition-all active:scale-[0.98]"
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className="font-semibold">{s.label}</span>
            </button>
          ) : (
            <button
              key={s.id}
              onClick={() => onPick(s)}
              className="flex flex-col items-start gap-1 rounded-2xl bg-brand-700 px-4 py-3 text-left text-white transition-all active:scale-[0.97]"
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-sm font-semibold leading-snug">{s.label}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function FlashcardsPage() {
  const stats          = useStudyStore((s) => s.questionStats);
  const sessions       = useStudyStore((s) => s.sessions);
  const rateConfidence = useStudyStore((s) => s.rateConfidence);
  const toggleReview   = useStudyStore((s) => s.toggleReview);
  const recordAnswer   = useStudyStore((s) => s.recordAnswer);

  const [activeStack, setActiveStack] = useState<Stack | null>(null);
  const [deck,        setDeck]        = useState<Question[]>([]);
  const [idx,         setIdx]         = useState(0);
  const [flipped,     setFlipped]     = useState(false);

  function handlePick(s: Stack) {
    setActiveStack(s);
    setDeck(buildDeck(s, stats, sessions));
    setIdx(0);
    setFlipped(false);
  }

  function handleBack() {
    setActiveStack(null);
    setDeck([]);
    setIdx(0);
    setFlipped(false);
  }

  function handleRestart() {
    if (!activeStack) return;
    setDeck(buildDeck(activeStack, stats, sessions));
    setIdx(0);
    setFlipped(false);
  }

  function handleRate(level: "low" | "medium" | "high") {
    const q = deck[idx];
    if (!q) return;
    rateConfidence(q.id, level);
    if (level === "high") recordAnswer(q.id, true);
    else if (level === "low") recordAnswer(q.id, false);
    setFlipped(false);
    setTimeout(() => setIdx((i) => i + 1), 200);
  }

  // ── No stack selected ──
  if (!activeStack) return <PickerScreen onPick={handlePick} />;

  // ── Empty deck (no matching questions yet) ──
  if (deck.length === 0) {
    return (
      <div className="space-y-4 pt-2">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-slate-500"
        >
          <ChevronLeft className="h-4 w-4" /> Change stack
        </button>
        <p className="pt-8 text-center text-sm text-slate-500">
          No cards found for this stack yet — keep studying the quiz!
        </p>
      </div>
    );
  }

  // ── Deck complete ──
  if (idx >= deck.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <p className="text-5xl">🎉</p>
        <p className="text-xl font-bold text-slate-900">Deck complete!</p>
        <p className="text-sm text-slate-500">{deck.length} cards reviewed</p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="rounded-xl bg-brand-700 px-5 py-2.5 font-semibold text-white"
          >
            Restart
          </button>
          <button
            onClick={handleBack}
            className="rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700"
          >
            Pick stack
          </button>
        </div>
      </div>
    );
  }

  // ── Studying ──
  const current       = deck[idx];
  const correctChoice = current.choices.find((c) => c.correct);
  const stat          = stats[current.id];

  return (
    <div className="space-y-3">
      {/* Top bar: back + counter */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 rounded-lg px-1 py-0.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>
            {activeStack.emoji} {activeStack.label}
          </span>
        </button>
        <p className="font-mono text-xs tabular-nums text-slate-400">
          {idx + 1} / {deck.length}
        </p>
      </div>

      {/* Progress bar */}
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
          className="relative h-[22rem] cursor-pointer"
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
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
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
            <p className="mt-4 text-base leading-snug text-slate-900">
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
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="font-mono text-xs uppercase tracking-wider text-brand-700">
              Answer
            </span>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {correctChoice?.text}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
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

      {/* Rating buttons */}
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
