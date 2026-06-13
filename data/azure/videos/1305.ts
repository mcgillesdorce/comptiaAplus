import type { WeaknessTag } from "@/lib/types";

export const PLAYLIST_ID_AZ305 = "PLlVtbbG169nHSnaP4ae33yQUI3zcmP5nP";

export interface AzureVideo {
  index: number;
  id: string;         // YouTube video ID
  title: string;
  section: string;    // e.g. "1.0 – Identity & Governance"
  duration: string;   // e.g. "33:44"
}

/**
 * AZ-305 "Design Azure Infrastructure" study playlist
 * by John Savill's Technical Training.
 */
export const ALL_VIDEOS_AZ305: AzureVideo[] = [
  // ── Overview ─────────────────────────────────────────────────────
  { index:  0, id: "vq9LuCM4YP4", title: "AZ-305 Designing Microsoft Azure Infrastructure Solutions Study Cram", section: "0.0 – Study Cram",            duration: "3:38:35" },
  // ── Identity & Governance ────────────────────────────────────────
  { index:  1, id: "sVq7qjU9LNE", title: "Azure AD Renamed! Enter Microsoft Entra ID",                            section: "1.0 – Identity & Governance", duration: "4:32"    },
  { index:  2, id: "9P10hgPDRZg", title: "What are Azure AD External Identities?",                                 section: "1.0 – Identity & Governance", duration: "13:22"   },
  { index:  3, id: "WVNvoiA_ktw", title: "Azure AD App Registrations, Enterprise Apps and Service Principals",     section: "1.0 – Identity & Governance", duration: "33:44"   },
  { index:  4, id: "kP7KpfToMkg", title: "Azure Key Vault Deep Dive",                                              section: "1.0 – Identity & Governance", duration: "1:07:43" },
  // ── Business Continuity (Resilience) ─────────────────────────────
  { index:  5, id: "4nDRvZR2EjU", title: "Understanding Microsoft Azure Availability Zones",                       section: "2.0 – Business Continuity",   duration: "16:05"   },
  { index:  6, id: "F_1NPXrO4Qs", title: "Why Do Services Deploy to One Region?",                                  section: "2.0 – Business Continuity",   duration: "32:43"   },
  { index:  7, id: "lQlHWacM1N0", title: "Architecting for Application Requirements",                              section: "2.0 – Business Continuity",   duration: "1:12:13" },
  { index:  8, id: "3pSue9nm3Bg", title: "Composite SLA V2",                                                       section: "2.0 – Business Continuity",   duration: "27:45"   },
  // ── Infrastructure (Compute) ─────────────────────────────────────
  { index:  9, id: "s1H2HpSJ-cg", title: "Picking the Right Azure Load Balancing Solution",                       section: "3.0 – Infrastructure",       duration: "42:28"   },
  { index: 10, id: "10FQkdAuNR0", title: "Azure VM Size Overview",                                                 section: "3.0 – Infrastructure",       duration: "12:02"   },
  { index: 11, id: "E8Fx0mji5Ss", title: "Azure VM Modifiers (or Where Did My Temp Drive Go)",                    section: "3.0 – Infrastructure",       duration: "10:26"   },
  { index: 12, id: "LWA4SCALYCY", title: "Microsoft Azure Spot VM Deep Dive",                                      section: "3.0 – Infrastructure",       duration: "27:32"   },
  { index: 13, id: "oE9YCVjzaKs", title: "Azure Right Sizing and Scaling",                                         section: "3.0 – Infrastructure",       duration: "1:26:02" },
  // ── Data & Migration ─────────────────────────────────────────────
  { index: 14, id: "0gtpasITVnk", title: "DP-900 Data Fundamentals Study Cram v2",                                section: "4.0 – Data Platform",        duration: "2:28:01" },
  { index: 15, id: "Hf7ZTa_PlGU", title: "Overview of Migrating to Azure",                                         section: "4.0 – Data Platform",        duration: "55:32"   },
  // ── Storage ──────────────────────────────────────────────────────
  { index: 16, id: "gCotvBx-UrQ", title: "Azure Storage Account Types, Performance and Cost",                      section: "5.0 – Storage",              duration: "18:08"   },
  { index: 17, id: "4dKzFFwtPbA", title: "Cold Storage Tier",                                                      section: "5.0 – Storage",              duration: "32:31"   },
  { index: 18, id: "2nPZyLmciN4", title: "Azure Files and Azure NetApp Files",                                     section: "5.0 – Storage",              duration: "28:15"   },
  { index: 19, id: "rMKmbZ1SYQg", title: "Azure Networking Design Considerations",                                 section: "6.0 – Networking",           duration: "22:47"   },
];

/** Look up an AZ-305 video by YouTube ID */
export function getVideoAZ305ById(id: string): AzureVideo | undefined {
  return ALL_VIDEOS_AZ305.find((v) => v.id === id);
}

/** Get all AZ-305 videos for a given section string */
export function getVideosAZ305ForSection(section: string): AzureVideo[] {
  return ALL_VIDEOS_AZ305.filter((v) => v.section === section);
}

/**
 * Weakness-tag → video map. Empty for now — populate once AZ-305
 * questions (and their weakness tags) are imported.
 */
export const TAG_VIDEO_MAP_AZ305: Partial<Record<WeaknessTag, string[]>> = {};
