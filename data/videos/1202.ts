import type { WeaknessTag } from "@/lib/types";

export const PLAYLIST_ID_1202 = "PLG49S3nxzAnn7PDGQ17m5AYbDRhnW7vOb";

export interface MesserVideo1202 {
  index: number;
  id: string;         // YouTube video ID
  title: string;
  section: string;    // e.g. "1.1 – Operating Systems"
  duration: string;   // e.g. "12:59"
}

export const ALL_VIDEOS_1202: MesserVideo1202[] = [
  // ── Domain 1: Operating Systems ──────────────────────────────────
  { index:  0, id: "IhcZqUs1IF8", title: "Operating Systems Overview",          section: "1.1 – Operating Systems",           duration: "12:59" },
  { index:  1, id: "lwCu2rpXP1E", title: "File Systems",                        section: "1.1 – Operating Systems",           duration: "5:51"  },
  { index:  2, id: "SoDrALxWWTg", title: "Installing Operating Systems",         section: "1.2 – Installing Operating Systems", duration: "16:50" },
  { index:  3, id: "KUD7v9nHiL4", title: "Upgrading Windows",                   section: "1.2 – Installing Operating Systems", duration: "8:34"  },
  { index:  4, id: "B7JZ6rfH06Q", title: "An Overview of Windows",              section: "1.3 – Microsoft Windows",           duration: "9:09"  },
  { index:  5, id: "uvreKWR__FA", title: "Windows Features",                    section: "1.3 – Microsoft Windows",           duration: "8:54"  },
  { index:  6, id: "iyUyHTelPeQ", title: "Task Manager",                        section: "1.4 – The Windows OS",              duration: "4:52"  },
  { index:  7, id: "e0KInDq-6Pw", title: "The Microsoft Management Console",    section: "1.4 – The Windows OS",              duration: "15:22" },
  { index:  8, id: "kLIUVFTTdcA", title: "Additional Windows Tools",            section: "1.4 – The Windows OS",              duration: "12:25" },
  { index:  9, id: "iLgAwxmTSzI", title: "Windows Command Line Tools",          section: "1.5 – The Windows Command Line",    duration: "31:07" },
  { index: 10, id: "FOaw5aPO0ZI", title: "The Windows Network Command Line",    section: "1.5 – The Windows Command Line",    duration: "18:24" },
  { index: 11, id: "AhGWshIRcKw", title: "The Windows Control Panel",           section: "1.6 – Windows Settings",            duration: "23:09" },
  { index: 12, id: "0qfZtEZCvn0", title: "Windows Settings",                   section: "1.6 – Windows Settings",            duration: "6:34"  },
  { index: 13, id: "1OlbYiS-xHY", title: "Windows Network Technologies",        section: "1.7 – Windows Networking",          duration: "8:37"  },
  { index: 14, id: "ZmtkzwzVDaE", title: "Configuring Windows Firewall",        section: "1.7 – Windows Networking",          duration: "6:32"  },
  { index: 15, id: "wA0BV7FzH9Q", title: "Windows IP Address Configuration",    section: "1.7 – Windows Networking",          duration: "6:45"  },
  { index: 16, id: "Ir1Yhigsdtw", title: "Windows Network Connections",         section: "1.7 – Windows Networking",          duration: "13:08" },
  { index: 17, id: "6Xg4VbEfx88", title: "macOS Overview",                     section: "1.8 – macOS",                       duration: "11:24" },
  { index: 18, id: "vhf6FMK1BOk", title: "macOS System Preferences",            section: "1.8 – macOS",                       duration: "6:36"  },
  { index: 19, id: "J5aZyz-ng7A", title: "macOS Features",                     section: "1.8 – macOS",                       duration: "11:17" },
  { index: 20, id: "cpc3bHzWKG4", title: "Linux",                              section: "1.9 – Linux",                       duration: "11:11" },
  { index: 21, id: "ig0X_dR68Ac", title: "Linux Commands Part 1",              section: "1.9 – Linux",                       duration: "10:58" },
  { index: 22, id: "rtL8aKAFlqc", title: "Linux Commands Part 2",              section: "1.9 – Linux",                       duration: "10:31" },
  { index: 23, id: "G2Equ2pG7aY", title: "Installing Applications",            section: "1.10 – Installing Applications",    duration: "16:27" },
  { index: 24, id: "FTRbdIjK1DU", title: "Cloud Productivity Tools",           section: "1.11 – Cloud Productivity",         duration: "5:47"  },
  // ── Domain 2: Security ───────────────────────────────────────────
  { index: 25, id: "ZseOfNiOaYM", title: "Physical Security",                  section: "2.1 – Security Measures",           duration: "10:06" },
  { index: 26, id: "X1v63NhrcP4", title: "Physical Access Security",           section: "2.1 – Security Measures",           duration: "8:37"  },
  { index: 27, id: "xU_OoSXTVHA", title: "Logical Security",                   section: "2.1 – Security Measures",           duration: "10:38" },
  { index: 28, id: "4U0WRPkDPhM", title: "Authentication and Access",          section: "2.1 – Security Measures",           duration: "12:05" },
  { index: 29, id: "zAArPlmVssU", title: "Defender Antivirus",                 section: "2.2 – Windows Security",            duration: "5:01"  },
  { index: 30, id: "VecgTIZTG1g", title: "Windows Firewall",                   section: "2.2 – Windows Security",            duration: "5:20"  },
  { index: 31, id: "SR7tw10W5YU", title: "Windows Security Settings",          section: "2.2 – Windows Security",            duration: "13:44" },
  { index: 32, id: "GuWMKVTMD7k", title: "Active Directory",                   section: "2.2 – Windows Security",            duration: "27:40" },
  { index: 33, id: "oQV7ZLu25KI", title: "Wireless Encryption",                section: "2.3 – Wireless Security",           duration: "6:19"  },
  { index: 34, id: "zj9bqo_s0yE", title: "Authentication Methods",             section: "2.3 – Wireless Security",           duration: "7:58"  },
  { index: 35, id: "lB5VwnsUG3E", title: "Malware",                            section: "2.4 – Malware",                     duration: "17:23" },
  { index: 36, id: "u2oKe31twIU", title: "Anti-malware Tools",                 section: "2.4 – Malware",                     duration: "12:45" },
  { index: 37, id: "9xtzpbY1n9I", title: "Social Engineering",                 section: "2.5 – Social Engineering",          duration: "13:37" },
  { index: 38, id: "00dFDSv03EQ", title: "Denial of Service",                  section: "2.5 – Social Engineering",          duration: "4:52"  },
  { index: 39, id: "STiRgWoRtI4", title: "On-Path Attacks",                    section: "2.5 – Social Engineering",          duration: "7:02"  },
  { index: 40, id: "H3mG-ovnXJc", title: "Zero-Day Attacks",                   section: "2.5 – Social Engineering",          duration: "3:18"  },
  { index: 41, id: "JEBzY5QjYAY", title: "Password Attacks",                   section: "2.5 – Social Engineering",          duration: "10:23" },
  { index: 42, id: "3cgrALf45zs", title: "Insider Threats",                    section: "2.5 – Social Engineering",          duration: "2:30"  },
  { index: 43, id: "yAt4DO8dUNM", title: "SQL Injection Attacks",              section: "2.5 – Social Engineering",          duration: "6:18"  },
  { index: 44, id: "BIO49rnHCQM", title: "Cross-site Scripting",               section: "2.5 – Social Engineering",          duration: "7:54"  },
  { index: 45, id: "8HoIOlYk82g", title: "Business Email Compromise",          section: "2.5 – Social Engineering",          duration: "5:59"  },
  { index: 46, id: "iw3aytkhi_I", title: "Supply Chain Attacks",               section: "2.5 – Social Engineering",          duration: "8:04"  },
  { index: 47, id: "bReDIugJDyA", title: "Security Vulnerabilities",           section: "2.5 – Social Engineering",          duration: "8:47"  },
  { index: 48, id: "job81SfpQNU", title: "Removing Malware",                   section: "2.6 – Malware Removal",             duration: "11:30" },
  { index: 49, id: "6OR_EiHoG8k", title: "Security Best Practices",            section: "2.7 – Security Best Practices",     duration: "15:15" },
  { index: 50, id: "WNWFV4r_6Wk", title: "Mobile Device Security",             section: "2.8 – Mobile Device Security",      duration: "10:28" },
  { index: 51, id: "VCQpo2pas1o", title: "Data Destruction",                   section: "2.9 – Data Destruction",            duration: "6:04"  },
  { index: 52, id: "pq_CKhYYYVQ", title: "Securing a SOHO Network",            section: "2.10 – SOHO Networks",              duration: "15:03" },
  { index: 53, id: "aIcO1ZMj92U", title: "Browser Security",                   section: "2.11 – Browser Security",           duration: "18:56" },
  // ── Domain 3: Software Troubleshooting ───────────────────────────
  { index: 54, id: "qIenQsBAg2U", title: "Troubleshooting Windows",            section: "3.1 – Troubleshooting Windows",     duration: "17:30" },
  { index: 55, id: "F5NxaV7t6Bc", title: "Troubleshooting Mobile Devices",     section: "3.2 – Troubleshooting Mobile",      duration: "11:30" },
  { index: 56, id: "_nsBbRwyNMo", title: "Troubleshooting Mobile Device Security", section: "3.3 – Troubleshooting Mobile Security", duration: "12:16" },
  { index: 57, id: "OCLOLvwgdMY", title: "Troubleshooting Security Issues",    section: "3.4 – Troubleshooting Security",    duration: "10:16" },
  // ── Domain 4: Operational Procedures ─────────────────────────────
  { index: 58, id: "EzjHn6vvrsI", title: "Ticketing Systems",                  section: "4.1 – Documentation & Support",     duration: "13:48" },
  { index: 59, id: "aYp60Y9_bbg", title: "Asset Management",                   section: "4.1 – Documentation & Support",     duration: "4:51"  },
  { index: 60, id: "LVNSo06uPqM", title: "Document Types",                     section: "4.1 – Documentation & Support",     duration: "7:29"  },
  { index: 61, id: "AhcQlR73Bo4", title: "Change Management",                  section: "4.2 – Change Management",           duration: "21:42" },
  { index: 62, id: "xJc7-KM-Fsk", title: "Managing Backups",                   section: "4.3 – Backup and Recovery",         duration: "15:01" },
  { index: 63, id: "sDlVVU3oAlA", title: "Managing Electrostatic Discharge",   section: "4.4 – Safety",                      duration: "5:28"  },
  { index: 64, id: "JZ5Ht_wzyt8", title: "Safety Procedures",                  section: "4.4 – Safety",                      duration: "4:45"  },
  { index: 65, id: "FqWHM4Sws1M", title: "Environmental Impacts",              section: "4.5 – Environmental Impacts",       duration: "6:28"  },
  { index: 66, id: "jKhIYQioCE8", title: "Incident Response",                  section: "4.6 – Privacy and Policies",        duration: "6:43"  },
  { index: 67, id: "FnRB3yS_Qxo", title: "Privacy, Licensing, and Policies",  section: "4.6 – Privacy and Policies",        duration: "10:54" },
  { index: 68, id: "8kKg8RJHAFQ", title: "Professionalism",                    section: "4.7 – Communication",               duration: "4:47"  },
  { index: 69, id: "1mIkDOfjd_I", title: "Communication",                      section: "4.7 – Communication",               duration: "7:00"  },
  { index: 70, id: "nJKUP1twjbY", title: "Scripting Languages",                section: "4.8 – Scripting",                   duration: "6:00"  },
  { index: 71, id: "YTi7jALWueg", title: "Scripting Use Cases",                section: "4.8 – Scripting",                   duration: "8:28"  },
  { index: 72, id: "B-xa0hjmuAs", title: "Remote Access",                      section: "4.9 – Remote Access",               duration: "12:49" },
  { index: 73, id: "oofb6ROU7LM", title: "Managing AI",                        section: "4.10 – Artificial Intelligence",    duration: "10:38" },
];

/** Look up a 1202 video by YouTube ID */
export function getVideo1202ById(id: string): MesserVideo1202 | undefined {
  return ALL_VIDEOS_1202.find((v) => v.id === id);
}

/** Get all 1202 videos for a given section string */
export function getVideos1202ForSection(section: string): MesserVideo1202[] {
  return ALL_VIDEOS_1202.filter((v) => v.section === section);
}

export const TAG_VIDEO_MAP_1202: Partial<Record<WeaknessTag, string[]>> = {
  "os-types": ["IhcZqUs1IF8", "6Xg4VbEfx88", "cpc3bHzWKG4"],
  "file-systems": ["lwCu2rpXP1E"],
  "os-install": ["SoDrALxWWTg", "KUD7v9nHiL4"],
  "windows-tools": ["iyUyHTelPeQ", "e0KInDq-6Pw", "kLIUVFTTdcA"],
  "windows-cli": ["iLgAwxmTSzI", "FOaw5aPO0ZI"],
  "windows-security": ["zAArPlmVssU", "VecgTIZTG1g", "SR7tw10W5YU"],
  "wireless-security": ["oQV7ZLu25KI", "zj9bqo_s0yE"],
  "malware-types": ["lB5VwnsUG3E", "u2oKe31twIU"],
  "malware-removal": ["job81SfpQNU"],
  "social-engineering": ["9xtzpbY1n9I", "8HoIOlYk82g"],
  "attack-types": ["00dFDSv03EQ", "STiRgWoRtI4", "H3mG-ovnXJc", "yAt4DO8dUNM", "BIO49rnHCQM"],
  "security-hardening": ["6OR_EiHoG8k", "aIcO1ZMj92U"],
  "mobile-security": ["WNWFV4r_6Wk"],
  "data-destruction": ["VCQpo2pas1o"],
  "soho-security": ["pq_CKhYYYVQ"],
  "browser-security": ["aIcO1ZMj92U"],
  "windows-tshooting": ["qIenQsBAg2U"],
  "mobile-app-tshooting": ["F5NxaV7t6Bc"],
  "mobile-sec-tshooting": ["_nsBbRwyNMo"],
  "pc-sec-tshooting": ["OCLOLvwgdMY"],
  "ticketing-systems": ["EzjHn6vvrsI", "LVNSo06uPqM"],
  "change-management": ["AhcQlR73Bo4"],
  "backup-recovery": ["xJc7-KM-Fsk"],
  "safety-esd": ["sDlVVU3oAlA", "JZ5Ht_wzyt8"],
  "environmental": ["FqWHM4Sws1M"],
  "privacy-licensing": ["jKhIYQioCE8", "FnRB3yS_Qxo"],
  "scripting": ["nJKUP1twjbY", "YTi7jALWueg"],
  "remote-access": ["B-xa0hjmuAs"],
  "ai-management": ["oofb6ROU7LM"],
};

export function getVideos1202ForTags(tags: WeaknessTag[]): MesserVideo1202[] {
  const seen = new Set<string>();
  const result: MesserVideo1202[] = [];
  for (const tag of tags) {
    const ids = TAG_VIDEO_MAP_1202[tag] ?? [];
    for (const id of ids) {
      if (seen.has(id)) continue;
      seen.add(id);
      const video = getVideo1202ById(id);
      if (video) result.push(video);
    }
  }
  return result;
}
