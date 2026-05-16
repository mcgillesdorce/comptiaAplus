"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, BookOpen, BarChart3, Brain, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/flashcards", label: "Cards", icon: Layers },
  { href: "/videos", label: "Videos", icon: PlayCircle },
  { href: "/reference", label: "Read", icon: BookOpen },
  { href: "/progress", label: "Stats", icon: BarChart3 },
];

export function BottomNav() {
  const pathname = usePathname();

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
