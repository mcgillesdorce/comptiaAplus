"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Layers, BookOpen, BarChart3, Brain, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const homeHref = certContext === "1202" ? "/certs/a-plus-1202" : "/certs/a-plus-1201";

  const tabs = [
    { href: homeHref, label: "Home", icon: Home },
    { href: `/quiz${query}`, label: "Quiz", icon: Brain },
    { href: `/flashcards${query}`, label: "Cards", icon: Layers },
    { href: `/videos${query}`, label: "Videos", icon: PlayCircle },
    { href: `/reference${query}`, label: "Read", icon: BookOpen },
    { href: `/progress${query}`, label: "Stats", icon: BarChart3 },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-lg dark:border-slate-700/80 dark:bg-slate-900/95">
      <ul className="mx-auto flex max-w-2xl">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
