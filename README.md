# Gilly's A+ Study App

Personalized CompTIA A+ Core 1 study app built around YOUR specific weak points from Practice Exams #1 and #2.

## What makes this app yours

This isn't a generic A+ study tool. It's pre-loaded with:

- **Every question you've missed** across both practice exams (28 questions, tagged by source)
- **Concept-builder drills** for the patterns that keep biting you (jitter vs latency, fiber connectors, printer imaging, etc.)
- **Weakness priority scoring** — the home screen always surfaces your top 3 weak areas first
- **Smart Quiz mode** that picks questions weighted by:
  - Whether you missed it on a real practice exam (highest priority)
  - Your accuracy on that question's weakness tags
  - How long ago you last saw it
  - Whether you flagged it for review
- **Exam recovery tracking** — see at a glance: "X of Y questions you originally missed are now mastered"
- **Trigger phrases** from your study guide shown after every answer
- **Embedded diagrams** for motherboards, fiber connectors, RAM, PCIe slots, cache pyramid, T-568A/B, laser imaging, and power connectors

## Tech stack

- Next.js 15 (App Router)
- TypeScript strict mode
- Tailwind CSS v4
- Zustand + localStorage middleware (no backend needed)
- Framer Motion (flashcard flip)
- Lucide icons

## Setup

```bash
cd aplus-study-gilly
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/aplus-study-gilly.git
git push -u origin main
```

Then on [vercel.com](https://vercel.com):
1. New Project → Import from GitHub → select the repo
2. Framework auto-detected as Next.js
3. No env vars needed
4. Deploy

Optional: add a custom domain like `aplus.gillyhealth.com` by adding a CNAME from your DNS provider pointing to `cname.vercel-dns.com`.

## Project structure

```
aplus-study-gilly/
├── app/
│   ├── layout.tsx                Root layout with mobile-first viewport
│   ├── page.tsx                  Home — readiness % + top weak spots
│   ├── globals.css               Tailwind v4 + custom theme
│   ├── flashcards/page.tsx       Swipeable card deck
│   ├── quiz/
│   │   ├── page.tsx              Mode picker (Smart, Review Flagged, Custom)
│   │   └── session/page.tsx      Active quiz with feedback + explanations
│   ├── reference/
│   │   ├── page.tsx              Topic index (sorted by your priority)
│   │   └── [slug]/page.tsx       Topic detail with diagrams
│   └── progress/page.tsx         Full stats dashboard
├── components/
│   └── layout/BottomNav.tsx      Fixed mobile tab bar
├── lib/
│   ├── types.ts                  All TypeScript types
│   ├── domains.ts                A+ domain metadata + YOUR weakness priorities
│   ├── store.ts                  Zustand store w/ localStorage
│   ├── analytics.ts              Smart question picker + readiness scoring
│   └── utils.ts                  cn(), shuffle, time formatting
├── data/
│   ├── questions/index.ts        All ~35 personalized questions
│   └── reference.ts              Reference page content
├── public/
│   └── diagrams/                 8 SVG diagrams from your study guide
└── ... config files
```

## Key files to customize as you study

### `data/questions/index.ts`
Add new questions as you encounter weak spots. Each question has:
- `weaknessTags` — pick from `WeaknessTag` union in `lib/types.ts`
- `source` — "exam1-missed", "exam2-missed", "drill", or "concept-builder"
- `triggerPhrase` — the memory hook (shown after answering)

### `lib/domains.ts`
The `WEAKNESS_PRIORITIES` map controls which weak areas surface first. Adjust priorities (1-10) based on what you find yourself struggling with most.

### `lib/analytics.ts`
The `pickWeakQuestions` algorithm weights questions by:
```
priority = (weakness_boost + source_boost)
         × performance_score (1 - accuracy)
         × log(days_since_last_seen + 2)
         × review_flag_boost (2x if flagged)
```
Tune these multipliers if the Smart Quiz feels off.

## How to use it

1. **First session:** open `/`, hit "Smart Quiz" on the home page. Take 10 questions.
2. **Daily routine:** the home page now shows your weakest 3 topics. Tap any one to drill it.
3. **Before bed:** open `/flashcards` for passive review.
4. **Stuck on a topic:** `/reference/<slug>` shows the diagrams and explanations from your study guide.
5. **Pre-exam check:** `/progress` shows your overall readiness % and recovery from exam misses.

## Adding more questions

When you take Practice Exam #3 or run into a new gap:

1. Open `data/questions/index.ts`
2. Add an entry following the existing pattern
3. Mark `source: "exam3-missed"` or `"drill"` as appropriate
4. Tag with the matching `weaknessTags`
5. Commit and push — Vercel auto-deploys

## Pre-loaded weakness priorities

Sorted by how often these patterns have bitten you:

| Priority | Tag | Notes |
|---|---|---|
| 10 | jitter-vs-latency | Missed on BOTH exams |
| 10 | fiber-connectors | Missed on BOTH exams |
| 9 | imaging-process | |
| 9 | printer-components | |
| 9 | memory-types | DIMM/SODIMM/ECC/Virtual |
| 9 | motherboard-id | PBQ heavy |
| 8 | cabling-faults | Crosstalk vs split pair |
| 8 | raid-2-drives | |
| 8 | ports | Esp 110, 139, 445 |
| 7 | cache-hierarchy | L1/L2/L3 |
| 7 | form-factors | mITX trap |
| ... | (more in `lib/domains.ts`) | |

## Mobile install (iOS)

1. Open the deployed URL in Safari on your phone
2. Tap Share → "Add to Home Screen"
3. Opens like a native app (no browser chrome)

You'll likely want to add an `apple-touch-icon.png` to `public/` and a `manifest.json` if you want full PWA polish.

## What's NOT included (intentionally)

- No backend / database (localStorage is enough for cert prep)
- No auth (you're the only user)
- No timed full-exam mode (use Dion's actual practice exams for that; this is for daily drilling)
- No notifications (avoid distraction — open the app when YOU choose)

## Next steps after deploy

1. Take the Smart Quiz a few times. Watch the weakness leaderboard on `/progress` rebalance.
2. As you master the originally-missed questions, the algorithm naturally promotes new ones.
3. Retake Practice Exam #2 (the real Dion one) and add any new misses to `data/questions/index.ts`.
4. When estimated readiness hits 85%+ and you've cleared most exam-1 and exam-2 misses, schedule the real exam.
