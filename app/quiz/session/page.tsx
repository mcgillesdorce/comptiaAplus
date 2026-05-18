"use client";
import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStudyStore } from "@/lib/store";
import { allQuestions } from "@/data/questions";
import {
  pickWeakQuestions,
  getQuestionsByWeakness,
  getReviewQuestions,
  computeSessionWeaknessResults,
} from "@/lib/analytics";
import { shuffle, cn } from "@/lib/utils";
import type { Question, Domain, WeaknessTag } from "@/lib/types";
import {
  X,
  Check,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";

function QuizSessionContent({ searchKey }: { searchKey: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const recordAnswer = useStudyStore((s) => s.recordAnswer);
  const toggleReview = useStudyStore((s) => s.toggleReview);
  const saveSession = useStudyStore((s) => s.saveSession);
  const bumpStreak = useStudyStore((s) => s.bumpStreak);
  const stats = useStudyStore((s) => s.questionStats);

  const mode = params.get("mode") as
    | "weak"
    | "review"
    | "all"
    | "domain"
    | null;
  const weakness = params.get("weakness") as WeaknessTag | null;
  const domainsParam = params.get("domains");
  const count = Number(params.get("n") ?? 10);
  const domainFilter = domainsParam?.split(",") as Domain[] | undefined;

  // Build the question set once for the current session query.
  const questions = useMemo<Question[]>(() => {
    const applyDomainFilter = (items: Question[]) =>
      domainFilter && domainFilter.length > 0
        ? items.filter((q) => domainFilter.includes(q.domain))
        : items;

    if (weakness) {
      return shuffle(applyDomainFilter(getQuestionsByWeakness(weakness))).slice(0, count);
    }
    if (mode === "review") {
      return shuffle(applyDomainFilter(getReviewQuestions(stats))).slice(0, count);
    }
    if (mode === "weak") {
      return pickWeakQuestions(stats, count, domainFilter, useStudyStore.getState().sessions);
    }
    if (domainFilter && domainFilter.length > 0) {
      return shuffle(allQuestions.filter((q) => domainFilter.includes(q.domain))).slice(0, count);
    }
    return shuffle(allQuestions).slice(0, count);
    // stats are intentionally snapshotted per session so the question set
    // does not reshuffle mid-quiz as answers are recorded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const [idx, setIdx] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt] = useState(() => Date.now());

  // Shuffle choices once per question so the correct answer isn't always in the same position
  const shuffledChoices = useMemo(
    () => (questions[idx] ? shuffle([...questions[idx].choices]) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idx]
  );

  // Handle empty question set
  if (questions.length === 0) {
    return (
      <div className="space-y-4 pt-12 text-center">
        <p className="text-lg text-slate-600">No questions match this mode yet.</p>
        <button
          onClick={() => router.push("/quiz")}
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
        >
          Pick another mode
        </button>
      </div>
    );
  }

  // Quiz finished
  if (idx >= questions.length) {
    const scorePct = Math.round((correctCount / questions.length) * 100);

    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        correctCount={correctCount}
        scorePct={scorePct}
        onFinish={() => {
          const sessionId = crypto.randomUUID();
          const weaknessResults = computeSessionWeaknessResults(questions, answers);
          const sessionMode =
            mode === "weak" ? "weak-areas" :
            mode === "review" ? "review-flagged" :
            mode === "all" ? "all" :
            "domain";
          saveSession({
            id: sessionId,
            startedAt,
            finishedAt: Date.now(),
            mode: sessionMode,
            domains: [],
            questionIds: questions.map((q) => q.id),
            answers,
            scorePct,
            weaknessResults,
          });
          bumpStreak();
          router.push(`/quiz/results?id=${sessionId}`);
        }}
        onRetry={() => {
          const retryParams = new URLSearchParams(window.location.search);
          retryParams.set("retry", String(Date.now()));
          router.push(`${window.location.pathname}?${retryParams.toString()}`);
        }}
      />
    );
  }

  const current = questions[idx];
  const correctIds = current.choices.filter((c) => c.correct).map((c) => c.id);
  const isMulti = current.type === "multi";

  const handleSelectChoice = (choiceId: string) => {
    if (showResult) return;
    if (isMulti) {
      setSelectedChoices((prev) =>
        prev.includes(choiceId)
          ? prev.filter((id) => id !== choiceId)
          : [...prev, choiceId]
      );
    } else {
      setSelectedChoices([choiceId]);
    }
  };

  const handleSubmit = () => {
    if (selectedChoices.length === 0) return;
    const isCorrect =
      selectedChoices.length === correctIds.length &&
      selectedChoices.every((id) => correctIds.includes(id));

    recordAnswer(current.id, isCorrect);
    setAnswers((a) => ({ ...a, [current.id]: selectedChoices }));
    if (isCorrect) setCorrectCount((c) => c + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedChoices([]);
    setIdx((i) => i + 1);
  };

  const stat = stats[current.id];

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/quiz")}
          className="rounded-full bg-slate-100 p-2"
        >
          <X className="h-5 w-5 text-slate-700" />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-brand-700 transition-all duration-500"
              style={{ width: `${((idx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <p className="font-mono text-sm font-semibold text-slate-700">
          {idx + 1}/{questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="space-y-4">
        {/* Source badge */}
        <div className="flex items-center gap-2">
          {current.source === "exam1-missed" && (
            <span className="rounded-full bg-red-100 px-2.5 py-1 font-mono text-xs font-medium text-red-700">
              Exam 1 missed
            </span>
          )}
          {current.source === "exam2-missed" && (
            <span className="rounded-full bg-red-100 px-2.5 py-1 font-mono text-xs font-medium text-red-700">
              Exam 2 missed
            </span>
          )}
          {current.source === "concept-builder" && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 font-mono text-xs font-medium text-amber-700">
              <Sparkles className="inline h-3 w-3 mr-0.5" />
              Drill
            </span>
          )}
          <button
            onClick={() => toggleReview(current.id)}
            className="ml-auto rounded-full p-1.5 transition-colors"
          >
            {stat?.markedForReview ? (
              <BookmarkCheck className="h-5 w-5 fill-amber-500 text-amber-500" />
            ) : (
              <Bookmark className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Prompt */}
        <p className="text-lg font-medium leading-snug text-slate-900">
          {current.prompt}
        </p>

        {/* Image */}
        {current.image && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.imageAlt ?? ""}
              className="w-full"
            />
          </div>
        )}

        {/* Multi-select hint */}
        {isMulti && !showResult && (
          <p className="font-mono text-xs text-slate-500">Select all that apply</p>
        )}

        {/* Choices */}
        <div className="space-y-2 pb-28">
          {shuffledChoices.map((choice) => {
            const selected = selectedChoices.includes(choice.id);
            const isCorrect = choice.correct;
            const showAsCorrect = showResult && isCorrect;
            const showAsIncorrect = showResult && selected && !isCorrect;

            return (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id)}
                disabled={showResult}
                className={cn(
                  "w-full rounded-xl border-2 p-4 text-left transition-all",
                  !showResult && !selected && "border-slate-200 bg-white active:scale-[0.99]",
                  !showResult && selected && "border-brand-700 bg-brand-50",
                  showAsCorrect && "border-emerald-500 bg-emerald-50",
                  showAsIncorrect && "border-red-500 bg-red-50",
                  showResult && !selected && !isCorrect && "border-slate-200 bg-white opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2",
                      !showResult && !selected && "border-slate-300",
                      !showResult && selected && "border-brand-700 bg-brand-700",
                      showAsCorrect && "border-emerald-500 bg-emerald-500",
                      showAsIncorrect && "border-red-500 bg-red-500"
                    )}
                  >
                    {showAsCorrect && <Check className="h-3 w-3 text-white" />}
                    {showAsIncorrect && <X className="h-3 w-3 text-white" />}
                    {!showResult && selected && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="flex-1 text-slate-900">{choice.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Explanation
            </p>
            <p className="mt-2 text-sm leading-relaxed">{current.explanation}</p>
            {current.triggerPhrase && (
              <p className="mt-3 rounded-lg bg-yellow-400/20 px-3 py-2 font-mono text-xs text-yellow-200">
                💡 {current.triggerPhrase}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer button */}
      <div className="sticky bottom-24 pt-2">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedChoices.length === 0}
            className={cn(
              "w-full rounded-2xl py-4 font-semibold text-white shadow-lg transition-all",
              selectedChoices.length === 0
                ? "bg-slate-300"
                : "bg-slate-900 active:scale-[0.99]"
            )}
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 py-4 font-semibold text-white shadow-lg active:scale-[0.99]"
          >
            {idx + 1 >= questions.length ? "See results" : "Next question"}
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function ResultsScreen({
  questions,
  correctCount,
  scorePct,
  onFinish,
  onRetry,
}: {
  questions: Question[];
  answers: Record<string, string[]>;
  correctCount: number;
  scorePct: number;
  onFinish: () => void;
  onRetry: () => void;
}) {
  const passed = scorePct >= 72;

  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col justify-center space-y-6 pt-8">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-wider text-slate-500">
          Quiz complete
        </p>
        <p className={cn(
          "mt-3 font-mono text-7xl font-bold tabular-nums",
          passed ? "text-emerald-600" : "text-slate-900"
        )}>
          {scorePct}%
        </p>
        <p className="mt-2 text-lg text-slate-700">
          {correctCount} of {questions.length} correct
        </p>
      </div>

      <div className={cn(
        "rounded-2xl border-2 p-5 text-center",
        passed
          ? "border-emerald-200 bg-emerald-50"
          : "border-amber-200 bg-amber-50"
      )}>
        <p className="font-semibold text-slate-900">
          {scorePct >= 90 ? "🎯 Outstanding."
            : scorePct >= 80 ? "💪 Strong."
            : scorePct >= 72 ? "✅ Above passing."
            : scorePct >= 60 ? "📈 Getting closer."
            : "🔁 More reps needed."}
        </p>
        <p className="mt-1 text-sm text-slate-700">
          {passed ? "Above the A+ pass threshold of 72%." : "A+ passes at 72%."}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onFinish}
          className="w-full rounded-2xl bg-slate-900 py-4 font-semibold text-white"
        >
          Back to home
        </button>
        <button
          onClick={onRetry}
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 font-semibold text-slate-900"
        >
          Retry similar quiz
        </button>
      </div>
    </div>
  );
}

function QuizSessionContentWithKey() {
  const params = useSearchParams();
  const searchKey = params.toString();

  return <QuizSessionContent key={searchKey} searchKey={searchKey} />;
}

export default function QuizSessionPage() {
  return (
    <Suspense fallback={<div className="pt-12 text-center text-slate-500">Loading...</div>}>
      <QuizSessionContentWithKey />
    </Suspense>
  );
}
