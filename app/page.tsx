import Link from "next/link";
import {
  BookOpen,
  Brain,
  Briefcase,
  ChevronRight,
  DollarSign,
  Globe,
  Lock,
  PlayCircle,
  TrendingUp,
  Layers,
} from "lucide-react";
import { CERT_BUNDLES, type CertBundle } from "@/data/certs";

const AZURE_CERT_IDS = new Set(["az-305"]);
const COMPTIA_CERTS = CERT_BUNDLES.filter((c) => !AZURE_CERT_IDS.has(c.id));
const AZURE_CERTS = CERT_BUNDLES.filter((c) => AZURE_CERT_IDS.has(c.id));

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Brain,
    title: "Take adaptive quizzes",
    body: "210+ questions that learn from your answers and re-prioritise the topics you keep getting wrong.",
  },
  {
    step: "02",
    icon: PlayCircle,
    title: "Watch targeted videos",
    body: "Professor Messer's full 63-video course, surfaced by your weakest areas so you study smarter.",
  },
  {
    step: "03",
    icon: Layers,
    title: "Review with flashcards",
    body: "Drill key concepts with quick-fire cards whenever you have a spare five minutes.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Track your progress",
    body: "Weakness analytics show exactly which topics still need work so you never study blind.",
  },
];

function formatJobs(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}k+`;
  return `${n}+`;
}

export default function HomePage() {
  return (
    <div className="space-y-10 pb-4">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header className="pt-2 space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">
          StudyStack
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          Ace your CompTIA cert.
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
          An adaptive study app that finds your weak spots and targets them — so every minute you study actually counts.
        </p>
      </header>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          How it works
        </h2>
        <div className="space-y-3">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, body }) => (
            <div
              key={step}
              className="flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-4"
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <span className="font-mono text-[10px] font-bold text-brand-600 dark:text-brand-400">
                  {step}
                </span>
                <div className="rounded-xl bg-brand-50 dark:bg-brand-900/30 p-2">
                  <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cert catalog ──────────────────────────────────────────────────── */}
      <section className="space-y-6">
        {/* CompTIA */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            CompTIA certifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {COMPTIA_CERTS.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>

        {/* Microsoft Azure */}
        {AZURE_CERTS.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Azure certifications
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {AZURE_CERTS.map((cert) => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Career paths ──────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Where this takes you
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Entry-level titles that open up once you pass each cert.
          </p>
        </div>
        <div className="space-y-3">
          {CERT_BUNDLES.map((cert) => (
            <CareerCard key={cert.id} cert={cert} />
          ))}
        </div>
        <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500 text-center">
          Job figures: US listings across Indeed, LinkedIn &amp; Dice — May 2026
        </p>
      </section>
    </div>
  );
}

function CertCard({ cert }: { cert: CertBundle }) {
  const inner = (
    <div
      className={`relative flex flex-col h-full rounded-2xl overflow-hidden border transition-all active:scale-[0.98] ${
        cert.active
          ? "border-transparent shadow-md hover:shadow-lg"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 opacity-70"
      }`}
    >
      {/* Gradient header */}
      <div
        className={`bg-gradient-to-br ${cert.gradient} px-4 pt-4 pb-6 ${
          cert.active ? "" : "opacity-40"
        }`}
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70">
          {cert.code}
        </p>
        <p className="mt-0.5 text-base font-bold text-white leading-tight">
          {cert.name}
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 pt-3 pb-4 bg-white dark:bg-slate-800 -mt-3 rounded-t-2xl">
        {cert.active ? (
          <>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
              {cert.description}
            </p>
            <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-slate-400">
              {cert.questionCount && <span>{cert.questionCount} Qs</span>}
              {cert.videoCount && <span>{cert.videoCount} videos</span>}
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              Study now <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </>
        ) : (
          <>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {cert.description}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Lock className="h-3 w-3" /> Coming soon
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (!cert.active) return <div>{inner}</div>;

  return (
    <Link href={cert.href} className="flex flex-col">
      {inner}
    </Link>
  );
}

function CareerCard({ cert }: { cert: CertBundle }) {
  const gradientDot: Record<string, string> = {
    "a-plus-1201":   "bg-violet-500",
    "a-plus-1202":   "bg-amber-500",
    "network-plus":  "bg-sky-500",
    "security-plus": "bg-rose-500",
    "az-305":        "bg-blue-500",
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${gradientDot[cert.id] ?? "bg-slate-400"}`} />
          <div>
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              {cert.name}
            </span>
            <span className="ml-2 font-mono text-[10px] text-slate-400">{cert.code}</span>
          </div>
        </div>
        {cert.jobOpenings && (
          <div className="text-right">
            <p className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold justify-end">
              <Briefcase className="h-3 w-3" />{formatJobs(cert.jobOpenings)}
            </p>
            {cert.remoteOpenings && (
              <p className="flex items-center gap-1 font-mono text-[10px] text-sky-600 dark:text-sky-400 font-semibold justify-end">
                <Globe className="h-3 w-3" />{formatJobs(cert.remoteOpenings)} remote
              </p>
            )}
          </div>
        )}
      </div>
      {/* Job title pills */}
      {cert.entryTitles && (
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {cert.entryTitles.map((title) => (
            <span
              key={title}
              className="rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
            >
              {title}
            </span>
          ))}
        </div>
      )}
      {/* Average pay */}
      {cert.avgPay && (
        <div className="flex items-center gap-1.5 px-4 pb-3 font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400">
          <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
          Avg entry pay&nbsp;&nbsp;
          ${Math.round(cert.avgPay.min / 1000)}k–${Math.round(cert.avgPay.max / 1000)}k / yr
        </div>
      )}
    </div>
  );
}
