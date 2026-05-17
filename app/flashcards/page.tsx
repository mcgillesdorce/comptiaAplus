"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudyStore } from "@/lib/store";
import { pickWeakQuestions } from "@/lib/analytics";
import { allQuestions } from "@/data/questions";
import type { Question, WeaknessTag } from "@/lib/types";
import { shuffle, cn } from "@/lib/utils";
import { RotateCcw, X, Bookmark, BookmarkCheck, Check } from "lucide-react";

type TopicStack = { id: string; label: string; emoji: string; tags: WeaknessTag[] };

const TOPIC_STACKS: TopicStack[] = [
  { id: "ports",      label: "Port Numbers", emoji: "ðŸ”Œ", tags: ["port-numbers"] },
  { id: "connectors", label: "Connectors",   emoji: "ðŸ”—", tags: ["ports", "usb-standards", "thunderbolt", "coax-cabling", "fiber-connectors", "display-cables"] },
  { id: "display",    label: "Display Tech", emoji: "ðŸ“º", tags: ["display-tech", "display-cables", "laptop-display"] },
  { id: "cables",     label: "Cable Types",  emoji: "ðŸ”§", tags: ["cat-ratings", "t568a-568b-crossover", "wiring-standards", "emi-shielding", "crosstalk", "coax-cabling"] },
  { id: "networking", label: "Networking",   emoji: "ðŸ“¡", tags: ["wifi-80211-standards", "wireless-channels", "internet-conn-types", "dhcp-process", "dns-records", "wireless-standards"] },
];

const ALL_TOPIC_IDS = new Set(TOPIC_STACKS.map((s) => s.id));

function buildDeck(
  weakOn: boolean,
  topicIds: ReadonlySet<string>,
  stats: ReturnType<typeof useStudyStore.getState>["questionStats"],
  sessions: ReturnType<typeof useStudyStore.getState>["sessions"],
): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  const add = (qs: Question[]) => { for (const q of qs) { if (!seen.has(q.id)) { seen.add(q.id); out.push(q); } } };

  if (weakOn) add(pickWeakQuestions(stats, 20, undefined, sessions));

  if (topicIds.size > 0) {
    // "all" marker â†’ include every question
    if (topicIds.has("all")) {
      add(allQuestions);
    } else {
      const tags = new Set<string>();
      for (const id of topicIds) {
        const s = TOPIC_STACKS.find((x) => x.id === id);
        s?.tags.forEach((t) => tags.add(t));
      }
      add(allQuestions.filter((q) => q.weaknessTags.some((t) => tags.has(t))));
    }
  }
  return shuffle(out);
}

// â”€â”€ Picker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Picker({
  weakOn,
  topicIds,
  onToggleWeak,
  onToggleTopic,
  onToggleAll,
}: {
  weakOn: boolean;
  topicIds: ReadonlySet<string>;
  onToggleWeak: () => void;
  onToggleTopic: (id: string) => void;
  onToggleAll: () => void;
}) {
  const allOn = topicIds.has("all") || topicIds.size === ALL_TOPIC_IDS.size;

  return (
    <div className="flex gap-2.5 pt-2">
      {/* â”€â”€ Left column: Weak Points â”€â”€ */}
      <div className="flex w-[38%] flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Weak</p>
        <button
          onClick={onToggleWeak}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border-2 py-3 transition-all active:scale-[0.97]",
            weakOn
              ? "border-amber-400 bg-amber-400 text-white"
              : "border-slate-200 bg-slate-50 text-slate-500",
          )}
        >
          <span className="text-2xl">ðŸŽ¯</span>
          <span className="text-[11px] font-bold leading-tight">Weak{"\n"}Points</span>
          {weakOn && <Check className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* â”€â”€ Right column: Topics multi-select â”€â”€ */}
      <div className="flex flex-1 flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Topics</p>
        <div className="flex flex-col gap-1.5">
          {TOPIC_STACKS.map((s) => {
            const on = topicIds.has(s.id) || topicIds.has("all");
            return (
              <button
                key={s.id}
                onClick={() => onToggleTopic(s.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all active:scale-[0.97]",
                  on ? "bg-brand-700 text-white" : "bg-slate-100 text-slate-600",
                )}
              >
                <span>{s.emoji}</span>
                <span className="flex-1 text-left">{s.label}</span>
                {on && <Check className="h-3.5 w-3.5 shrink-0 opacity-80" />}
              </button>
            );
          })}
          {/* All Topics */}
          <button
            onClick={onToggleAll}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all active:scale-[0.97]",
              allOn ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-500",
            )}
          >
            <span>ðŸ“š</span>
            <span className="flex-1 text-left">All Topics</span>
            {allOn && <Check className="h-3.5 w-3.5 shrink-0 opacity-80" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// â”€â”€ Main page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function FlashcardsPage() {
  const stats   = useStudyStore((s) => s.questionStats);
  const sessions = useStudyStore((s) => s.sessions);
  const rateConfidence = useStudyStore((s) => s.rateConfidence);
  const toggleReview   = useStudyStore((s) => s.toggleReview);
  const recordAnswer   = useStudyStore((s) => s.recordAnswer);

  const [weakOn,    setWeakOn]    = useState(true);
  const [topicIds,  setTopicIds]  = useState<Set<string>>(new Set());
  const [deck,      setDeck]      = useState<Question[]>(() => buildDeck(true, new Set(), stats, sessions));
  const [idx,       setIdx]       = useState(0);
  const [flipped,   setFlipped]   = useState(false);

  function rebuild(weak: boolean, ids: Set<string>) {
    setDeck(buildDeck(weak, ids, stats, sessions));
    setIdx(0);
    setFlipped(false);
  }

  function handleToggleWeak() {
    const next = !weakOn;
    setWeakOn(next);
    rebuild(next, topicIds);
  }

  function handleToggleTopic(id: string) {
    const next = new Set(topicIds);
    next.has(id) ? next.delete(id) : next.add(id);
    next.delete("all"); // clear "all" marker if a specific topic is toggled
    setTopicIds(next);
    rebuild(weakOn, next);
  }

  function handleToggleAll() {
    const next = new Set(topicIds);
    if (next.has("all")) {
      next.clear();
    } else {
      next.clear();
      next.add("all");
    }
    setTopicIds(next);
    rebuild(weakOn, next);
  }

  const picker = (
    <Picker
      weakOn={weakOn}
      topicIds={topicIds}
      onToggleWeak={handleToggleWeak}
      onToggleTopic={handleToggleTopic}
      onToggleAll={handleToggleAll}
    />
  );

  if (deck.length === 0) {
    return (
      <div className="space-y-4">
        {picker}
        <p className="pt-6 text-center text-sm text-slate-500">
          Select at least one stack above to start.
        </p>
      </div>
    );
  }

  if (idx >= deck.length) {
    return (
      <div className="space-y-4">
        {picker}
        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
          <p className="text-4xl">ðŸŽ‰</p>
          <p className="text-xl font-semibold text-slate-900">Deck complete</p>
          <p className="text-sm text-slate-500">{deck.length} cards reviewed</p>
          <button
            onClick={() => rebuild(weakOn, topicIds)}
            className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  const current      = deck[idx];
  const correctChoice = current.choices.find((c) => c.correct);
  const stat         = stats[current.id];

  function handleRate(level: "low" | "medium" | "high") {
    rateConfidence(current.id, level);
    if (level === "high") recordAnswer(current.id, true);
    else if (level === "low") recordAnswer(current.id, false);
    setFlipped(false);
    setTimeout(() => setIdx((i) => i + 1), 200);
  }

  return (
    <div className="space-y-3">
      {picker}

      {/* Progress row */}
      <div className="flex items-center gap-3 pt-1">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-brand-700 transition-all duration-500"
            style={{ width: `${((idx + 1) / deck.length) * 100}%` }}
          />
        </div>
        <p className="font-mono text-xs tabular-nums text-slate-500">{idx + 1}/{deck.length}</p>
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
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Question</span>
              <button onClick={(e) => { e.stopPropagation(); toggleReview(current.id); }}>
                {stat?.markedForReview
                  ? <BookmarkCheck className="h-5 w-5 fill-amber-500 text-amber-500" />
                  : <Bookmark className="h-5 w-5 text-slate-300" />}
              </button>
            </div>
            <p className="mt-4 text-base leading-snug text-slate-900">{current.prompt}</p>
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
            <span className="font-mono text-xs uppercase tracking-wider text-brand-700">Answer</span>
            <p className="mt-2 text-xl font-bold text-slate-900">{correctChoice?.text}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{current.explanation}</p>
            {current.triggerPhrase && (
              <div className="mt-auto rounded-xl bg-yellow-100 p-3">
                <p className="font-mono text-xs font-medium text-yellow-900">ðŸ’¡ {current.triggerPhrase}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Rating */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-2"
          >
            <button onClick={() => handleRate("low")}
              className="rounded-2xl bg-red-100 py-3 font-semibold text-red-800 active:scale-[0.97]">
              <X className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-xs">Again</span>
            </button>
            <button onClick={() => handleRate("medium")}
              className="rounded-2xl bg-amber-100 py-3 font-semibold text-amber-800 active:scale-[0.97]">
              <RotateCcw className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-xs">Almost</span>
            </button>
            <button onClick={() => handleRate("high")}
              className="rounded-2xl bg-emerald-100 py-3 font-semibold text-emerald-800 active:scale-[0.97]">
              <BookmarkCheck className="mx-auto h-5 w-5" />
              <span className="mt-1 block text-xs">Got it</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


