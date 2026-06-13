import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "StudyStack — CompTIA Cert Prep",
  description: "Adaptive CompTIA study app with smart quizzes, weakness tracking, and Professor Messer videos.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StudyStack",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F3864",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline script runs before paint to prevent dark-mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="h-dvh overflow-hidden antialiased">
        <DarkModeToggle />
        <div className="h-dvh overflow-y-auto overscroll-y-contain pb-[calc(6rem+env(safe-area-inset-bottom))]">
          <main className="mx-auto max-w-2xl px-4 pt-6">{children}</main>
        </div>
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  );
}
