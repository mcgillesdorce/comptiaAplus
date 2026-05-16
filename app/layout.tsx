import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Gilly's A+ Study",
  description: "Personalized CompTIA A+ Core 1 study app",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "A+ Study",
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
      <body className="min-h-screen pb-24 antialiased">
        <DarkModeToggle />
        <main className="mx-auto max-w-2xl px-4 pt-6">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
