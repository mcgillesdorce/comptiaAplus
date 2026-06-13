import type { CertBundle } from "@/data/certs";

/**
 * Microsoft Azure certification bundles.
 * Kept in a separate folder so Azure data never bleeds into the CompTIA modules.
 */
export const AZURE_CERT_BUNDLES: CertBundle[] = [
  {
    id: "az-305",
    name: "Azure Infrastructure",
    code: "AZ-305",
    tagline: "Designing Microsoft Azure Infrastructure Solutions",
    description:
      "Design scalable, secure and resilient Azure solutions — identity & governance, data storage, business continuity, and infrastructure architecture.",
    href: "/certs/az-305",
    active: true,
    videoCount: 20,
    gradient: "from-sky-500 to-blue-700",
    jobOpenings: 78000,
    remoteOpenings: 39000,
    entryTitles: [
      "Azure Solutions Architect",
      "Cloud Infrastructure Engineer",
      "Cloud Solutions Architect",
      "Azure Administrator",
      "DevOps Engineer",
      "Cloud Consultant",
    ],
    avgPay: { min: 110000, max: 165000 },
  },
];
