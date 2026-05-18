"use client";
import { useParams, useRouter } from "next/navigation";
import { referenceTopics } from "@/data/reference";
import { DOMAINS } from "@/lib/domains";
import { ArrowLeft, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CORE2_DOMAINS = new Set([
  "1.0-operating-systems",
  "2.0-security",
  "3.0-software-troubleshooting",
  "4.0-operational-procedures",
]);

export default function ReferenceDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const topic = referenceTopics.find((t) => t.slug === params.slug);
  const isCore2Topic = topic ? CORE2_DOMAINS.has(topic.domain) : false;
  const quickQuizHref = isCore2Topic
    ? "/quiz/session?n=10&domains=1.0-operating-systems,2.0-security,3.0-software-troubleshooting,4.0-operational-procedures"
    : "/quiz/session?n=10";

  if (!topic) {
    return (
      <div className="pt-12 text-center">
        <p className="text-slate-600">Topic not found.</p>
        <Link href="/reference" className="mt-4 inline-block text-brand-700 underline">
          Back to topics
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-6 pt-2">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="-ml-2 flex items-center gap-1 rounded-lg p-2 font-mono text-xs uppercase tracking-wider text-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-500">
          {DOMAINS[topic.domain].name}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {topic.title}
        </h1>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {topic.sections.map((section, i) => (
          <section key={i} className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">{section.heading}</h2>

            {section.body && (
              <p className="text-base leading-relaxed text-slate-700">
                {section.body}
              </p>
            )}

            {section.image && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image}
                  alt={section.imageAlt ?? ""}
                  className="w-full"
                />
              </div>
            )}

            {section.table && (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      {section.table.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="px-3 py-2 text-left font-semibold text-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri} className="border-t border-slate-200">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-slate-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.callout && (
              <div
                className={cn(
                  "flex gap-3 rounded-xl border-2 p-4",
                  section.callout.type === "warning" && "border-amber-200 bg-amber-50",
                  section.callout.type === "info" && "border-blue-200 bg-blue-50",
                  section.callout.type === "success" && "border-emerald-200 bg-emerald-50"
                )}
              >
                {section.callout.type === "warning" && (
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600" />
                )}
                {section.callout.type === "info" && (
                  <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                )}
                {section.callout.type === "success" && (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                )}
                <div>
                  <p className="font-semibold text-slate-900">
                    {section.callout.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{section.callout.body}</p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA to quiz */}
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 text-center">
        <p className="font-semibold text-slate-900">Test yourself on this topic</p>
        <Link
          href={quickQuizHref}
          className="mt-3 inline-block rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white"
        >
          Take a quick quiz
        </Link>
      </div>
    </article>
  );
}
