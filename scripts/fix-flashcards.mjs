import { readFileSync, writeFileSync } from "fs";

let src = readFileSync("app/flashcards/page.tsx", "utf8");

// ── Fix garbled emoji bytes (double-encoded UTF-8 via PowerShell) ──────────
const emojiMap = [
  ["\u00f0\u009f\u0094\u008c", "🔌"],
  ["\u00f0\u009f\u0094\u0097", "🔗"],
  ["\u00f0\u009f\u0093\u00ba", "📺"],
  ["\u00f0\u009f\u0094\u00a7", "🔧"],
  ["\u00f0\u009f\u0093\u00a1", "📡"],
  ["\u00f0\u009f\u008e\u00af", "🎯"],
  ["\u00f0\u009f\u0094\u009a", "📚"],
  ["\u00f0\u009f\u0092\u00a1", "💡"],
  ["\u00f0\u009f\u008e\u0089", "🎉"],
];
for (const [bad, good] of emojiMap) {
  while (src.includes(bad)) src = src.replace(bad, good);
}

// ── Move picker from top to below the card in study mode ──────────────────
// Remove the {picker} line that appears right after <div className="space-y-3">
// in the study-mode return (the one followed by a progress row comment)
src = src.replace(
  '<div className="space-y-3">\n      {picker}\n\n      {/* Progress row',
  '<div className="space-y-3">\n      {/* Progress row'
);

// Add picker section after the </AnimatePresence> closing tag (study mode end)
src = src.replace(
  "      </AnimatePresence>\n    </div>\n  );\n}",
  "      </AnimatePresence>\n\n      {/* Stack picker \u2014 change deck without leaving the page */}\n      <div className=\"border-t border-slate-100 pt-3\">\n        {picker}\n      </div>\n    </div>\n  );\n}"
);

writeFileSync("app/flashcards/page.tsx", src, "utf8");
console.log("done, lines:", src.split("\n").length);
