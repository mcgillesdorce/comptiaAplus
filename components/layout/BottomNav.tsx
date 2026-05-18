"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Home,
  Layers,
  BookOpen,
  BarChart3,
  Brain,
  PlayCircle,
  Monitor,
  Shield,
  Network,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CERT_BUNDLES } from "@/data/certs";

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inCore2Path = pathname.startsWith("/certs/a-plus-1202");
  const inCore1Path = pathname.startsWith("/certs/a-plus-1201");
  const certParam = searchParams.get("cert");
  const certContext = certParam === "1202" || inCore2Path
    ? "1202"
    : certParam === "1201" || inCore1Path
    ? "1201"
    : null;

  const query = certContext ? `?cert=${certContext}` : "";
  const isHomePage = pathname === "/";

  const iconByBundleId = {
    "a-plus-1201": Monitor,
    "a-plus-1202": Shield,
    "network-plus": Network,
    "security-plus": Shield,
  } as const;

  const labelByBundleId = {
    "a-plus-1201": "1201",
    "a-plus-1202": "1202",
    "network-plus": "Net+",
    "security-plus": "Sec+",
  } as const;

  const homeTabs = CERT_BUNDLES.map((cert) => ({
    href: cert.active ? cert.href : "#",
    label: labelByBundleId[cert.id as keyof typeof labelByBundleId] ?? cert.code,
    icon: iconByBundleId[cert.id as keyof typeof iconByBundleId] ?? BookOpen,
    disabled: !cert.active,
  }));

  const studyTabs = [
    { href: "/", label: "Home", icon: Home, disabled: false },
    { href: `/quiz${query}`, label: "Quiz", icon: Brain, disabled: false },
    { href: `/flashcards${query}`, label: "Cards", icon: Layers, disabled: false },
    { href: `/videos${query}`, label: "Videos", icon: PlayCircle, disabled: false },
    { href: `/reference${query}`, label: "Read", icon: BookOpen, disabled: false },
    { href: `/progress${query}`, label: "Stats", icon: BarChart3, disabled: false },
  ];

  const tabs = isHomePage ? homeTabs : studyTabs;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-lg dark:border-slate-700/80 dark:bg-slate-900/95">
      <ul className="mx-auto flex max-w-2xl">
        {tabs.map(({ href, label, icon: Icon, disabled }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              {disabled ? (
                <span className="flex cursor-not-allowed flex-col items-center gap-1 py-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                  <Icon className="h-5 w-5" />
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
                    active ? "text-brand-700 dark:text-brand-300" : "text-slate-500 dark:text-slate-400"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
