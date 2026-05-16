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
  },
  {
    id: "a-plus-1202",
    name: "CompTIA A+ Core 2",
    code: "220-1202",
    tagline: "Coming soon",
    description:
      "OS, security, software troubleshooting, and operational procedures.",
    href: "#",
    active: false,
    gradient: "from-amber-600 to-orange-700",
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
  },
];
