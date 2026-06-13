"use client";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ListVideo,
  PlayCircle,
  Brain,
  Layers,
} from "lucide-react";
import { ALL_VIDEOS_AZ305 } from "@/data/azure/videos/1305";
import { questionsAZ305 } from "@/data/azure/questions/1305";

const SECTIONS = Array.from(
  ALL_VIDEOS_AZ305.reduce((map, v) => {
    map.set(v.section, (map.get(v.section) ?? 0) + 1);
    return map;
  }, new Map<string, number>())
).map(([section, count]) => ({ section, count }));

export default function AZ305Hub() {
  const totalVideos = ALL_VIDEOS_AZ305.length;
  const totalQuestions = questionsAZ305.length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> All certs
      </Link>

      {/* Header */}
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-wider text-sky-500 dark:text-sky-400">
          Microsoft Azure · AZ-305
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Designing Azure Infrastructure
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Design identity, governance, data storage, business continuity and
          infrastructure solutions on Microsoft Azure.
        </p>
      </header>

      {/* Hero card */}
      <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500 to-blue-700 p-6 text-white shadow-sm dark:border-sky-900">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-sky-100">
              Study Playlist
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight">{totalVideos}</p>
            <p className="mt-1 text-sm text-sky-100">
              curated videos by John Savill&apos;s Technical Training
            </p>
          </div>
          <ListVideo className="h-8 w-8 text-sky-200" />
        </div>
        <Link
          href="/videos?cert=az305"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition-all hover:bg-white/25 active:scale-[0.99]"
        >
          <PlayCircle className="h-4 w-4" /> Start watching
        </Link>
      </div>

      {/* Practice: quizzes & flashcards */}
      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/certs/az-305/quiz"
          className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-sky-300 hover:shadow-sm active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-sky-50 p-2 dark:bg-sky-900/30">
              <Brain className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {totalQuestions}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Quiz
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Practice by objective
            </p>
          </div>
        </Link>

        <Link
          href="/certs/az-305/flashcards"
          className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-sky-300 hover:shadow-sm active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-sky-50 p-2 dark:bg-sky-900/30">
              <Layers className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {totalQuestions}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Flashcards
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sorted by exam objective
            </p>
          </div>
        </Link>
      </section>

      {/* Curriculum overview */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          What you&apos;ll cover
        </h2>
        <div className="space-y-2">
          {SECTIONS.map(({ section, count }) => (
            <Link
              key={section}
              href="/videos?cert=az305"
              className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-all hover:border-sky-300 hover:shadow-sm active:scale-[0.99]"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {section}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" /> {count} video{count !== 1 ? "s" : ""}
                </p>
              </div>
              <ChevronRight className="ml-3 h-5 w-5 flex-shrink-0 text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
