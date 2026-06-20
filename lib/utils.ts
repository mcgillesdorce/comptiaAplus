export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function sanitizeChoiceText(text: string): string {
  let cleaned = text.trim();

  // Remove obvious giveaway markers accidentally left in source data.
  cleaned = cleaned
    .replace(/^\s*(?:✅|✔️|☑️)\s*/u, "")
    .replace(/^\s*(?:correct\s*answer|answer)\s*[:\-]\s*/i, "")
    .replace(/\s*\((?:correct(?:\s*answer)?|this\s+is\s+correct)\)\s*$/i, "");

  return cleaned || text;
}
