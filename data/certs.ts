export interface CertBundle {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  href: string;
  active: boolean;
  questionCount?: number;
  videoCount?: number;
  /** Tailwind gradient utility classes for the card header */
  gradient: string;
  /** Approximate total job postings on major boards (US, updated May 2026) */
  jobOpenings?: number;
  /** Approximate remote-only subset of jobOpenings */
  remoteOpenings?: number;
  /** Entry-level job titles this cert unlocks */
  entryTitles?: string[];
  /** Entry-level average annual pay range (USD) */
  avgPay?: { min: number; max: number };
}

export const CERT_BUNDLES: CertBundle[] = [
  {
    id: "a-plus-1201",
    name: "CompTIA A+",
    code: "220-1201",
    tagline: "Core 1 — 2025/26 Edition",
    description:
      "Hardware, mobile devices, networking, virtualization & troubleshooting. The first half of the A+ certification.",
    href: "/certs/a-plus-1201",
    active: true,
    questionCount: 210,
    videoCount: 63,
    gradient: "from-violet-600 to-indigo-700",
    jobOpenings: 54000,
    remoteOpenings: 19000,
    entryTitles: [
      "Help Desk Technician",
      "IT Support Specialist",
      "Desktop Support Technician",
      "Field Service Technician",
      "PC Technician",
      "Technical Support Representative",
    ],
    avgPay: { min: 38000, max: 62000 },
  },
  {
    id: "a-plus-1202",
    name: "CompTIA A+ Core 2",
    code: "220-1202",
    tagline: "Core 2 — 2025/26 Edition",
    description:
      "OS, security, software troubleshooting, and operational procedures.",
    href: "/certs/a-plus-1202",
    active: true,
    questionCount: 210,
    videoCount: 74,
    gradient: "from-amber-600 to-orange-700",
    jobOpenings: 54000,
    remoteOpenings: 19000,
    entryTitles: [
      "IT Support Specialist",
      "Help Desk Analyst",
      "Systems Support Technician",
      "End-User Computing Technician",
      "IT Operations Technician",
      "Desktop Support Analyst",
    ],
    avgPay: { min: 38000, max: 62000 },
  },
  {
    id: "network-plus",
    name: "CompTIA Network+",
    code: "N10-009",
    tagline: "Coming soon",
    description:
      "Networking infrastructure, protocols, performance and security fundamentals.",
    href: "#",
    active: false,
    gradient: "from-sky-600 to-blue-700",
    jobOpenings: 41000,
    remoteOpenings: 14000,
    entryTitles: [
      "Network Technician",
      "Junior Network Administrator",
      "NOC Technician",
      "Network Support Specialist",
      "Junior Systems Administrator",
      "IT Infrastructure Technician",
    ],
    avgPay: { min: 48000, max: 74000 },
  },
  {
    id: "security-plus",
    name: "CompTIA Security+",
    code: "SY0-701",
    tagline: "Coming soon",
    description:
      "Threats, vulnerabilities, authentication, cryptography and risk management.",
    href: "#",
    active: false,
    gradient: "from-rose-600 to-pink-700",
    jobOpenings: 89000,
    remoteOpenings: 38000,
    entryTitles: [
      "SOC Analyst (Tier I)",
      "Junior Security Analyst",
      "Cybersecurity Technician",
      "Information Security Analyst",
      "Security Operations Analyst",
      "Vulnerability Assessment Technician",
    ],
    avgPay: { min: 60000, max: 92000 },
  },
];
