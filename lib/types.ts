export type Domain =
  | "1.0-mobile"
  | "2.0-networking"
  | "3.0-hardware"
  | "4.0-virtualization-cloud"
  | "5.0-troubleshooting";

export type Difficulty = "easy" | "medium" | "hard";

// Personal weakness tags — track Gilly's specific gaps
export type WeaknessTag =
  | "jitter-vs-latency"       // missed on BOTH exams
  | "fiber-connectors"        // missed on both exams (F and SC)
  | "raid-2-drives"
  | "printer-components"
  | "mobile-pbq"
  | "ports"
  | "cabling-faults"
  | "memory-types"
  | "cache-hierarchy"
  | "form-factors"
  | "multitenancy"
  | "boot-errors"
  | "wireless-standards"
  | "wireless-channels"
  | "ap-troubleshooting"
  | "display-tech"
  | "laptop-display"
  | "imaging-process"
  | "expansion-bus"
  | "wiring-standards"
  | "motherboard-id"
  | "printer-sharing"
  | "port-flapping"
  // --- New granular weak-area tags ---
  | "crosstalk"               // near-end crosstalk from untwisted pairs
  | "split-pair"              // wire-map split pair fault
  | "attenuation"             // signal loss over long runs
  | "emi-shielding"           // STP vs UTP in EMI environments
  | "cat-ratings"             // Cat 5e/6/6a/7/8 specs + distances
  | "ddr-compat"              // DDR notch positions and incompatibility
  | "ddr-generations"         // DDR1-5 specs and voltage
  | "ecc-servers"             // ECC/RDIMM for server use
  | "virtual-memory"          // pagefile / virtual RAM
  | "memory-form-factors"     // DIMM vs SODIMM vs LPDDR
  | "dual-channel"            // dual-channel mode pairing rules
  | "cache-access-times"      // L1/L2/L3 speed comparisons
  | "m2-slots"                // M.2 form factor naming (2280 etc)
  | "power-8pin"              // 8-pin EPS CPU power connector
  | "power-24pin"             // 24-pin ATX motherboard power
  | "smf-mmf"                 // single-mode vs multi-mode fiber
  | "t568a-568b-crossover"    // pin assignments and crossover rules
  | "twisted-pair-theory";    // how twist cancels crosstalk

export interface Choice {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  type: "single" | "multi";
  prompt: string;
  image?: string;
  imageAlt?: string;
  choices: Choice[];
  explanation: string;
  triggerPhrase?: string;
  weaknessTags: WeaknessTag[];
  // Mark questions that came from Gilly's actual missed exam questions
  source: "exam1-missed" | "exam2-missed" | "drill" | "concept-builder";
}

export interface QuestionStat {
  questionId: string;
  attempts: number;
  correct: number;
  lastSeen: number;
  confidence: "low" | "medium" | "high";
  markedForReview: boolean;
}

export interface QuizSession {
  id: string;
  startedAt: number;
  finishedAt: number;
  mode: "weak-areas" | "domain" | "all" | "review-flagged" | "trigger-phrase";
  domains: Domain[];
  questionIds: string[];
  answers: Record<string, string[]>;
  scorePct: number;
  /** Per-weakness breakdown for trend tracking. Optional for backward compat with old sessions. */
  weaknessResults?: Record<string, { correct: number; total: number }>;
}

export interface DomainStats {
  domain: Domain;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracyPct: number;
  lastStudied: number;
}

export interface WeaknessStats {
  tag: WeaknessTag;
  attempted: number;
  correct: number;
  accuracyPct: number;
}

export interface WeaknessTrend {
  tag: WeaknessTag;
  label: string;
  allTimeAccuracy: number;
  latestAccuracy: number;
  prev5Accuracy: number | null;
  trend: "improving" | "declining" | "stable" | "new";
  delta: number;
}
