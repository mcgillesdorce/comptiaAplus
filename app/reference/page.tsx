"use client";
import Link from "next/link";
import { referenceTopics } from "@/data/reference";
import { DOMAINS } from "@/lib/domains";
import { ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReferenceIndexPage() {
  // Sort by priority (Gilly's weak areas first)
  const sorted = [...referenceTopics].sort((a, b) => b.priority - a.priority);

  return (
    <div className="space-y-6">
      <header className="pt-2">
        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Reference
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Read & review
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Topics prioritized by your weak areas
        </p>
      </header>

      <div className="space-y-3">
        {sorted.map((topic) => (
          <Link
            key={topic.slug}
            href={`/reference/${topic.slug}`}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all active:scale-[0.99]"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50">
              <BookOpen className="h-5 w-5 text-brand-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">{topic.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {DOMAINS[topic.domain].name}
              </p>
            </div>
            {topic.priority >= 9 && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-red-700">
                Weak
              </span>
            )}
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
