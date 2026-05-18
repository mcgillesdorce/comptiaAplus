import type { WeaknessTag } from "@/lib/types";

export interface MesserVideo {
  id: string;        // YouTube video ID
  title: string;
  section: string;   // e.g. "2.3 – Wireless Networks"
  duration: string;  // human-readable
  index: number;     // position in the playlist
}

export const PLAYLIST_ID = "PLG49S3nxzAnnes8ZGI-OBlKEukHCX46N8";

export const ALL_VIDEOS: MesserVideo[] = [
  { index: 0,  id: "AIfIA7hEgrw", title: "How to Pass Your CompTIA A+ Exams", section: "0.0 – Intro",                        duration: "15:22" },
  { index: 1,  id: "zODZ0i-Iark", title: "Laptop Hardware",                    section: "1.1 – Laptop Hardware",             duration: "16:42" },
  { index: 2,  id: "Iis2-_89YvQ", title: "Connecting Mobile Devices",          section: "1.2 – Mobile Device Configuration", duration: "6:08" },
  { index: 3,  id: "14iM8lLBS0c", title: "Mobile Device Accessories",          section: "1.2 – Mobile Device Configuration", duration: "7:18" },
  { index: 4,  id: "1LADZLBV3vo", title: "Mobile Device Networks",             section: "1.3 – Mobile Device Connectivity",  duration: "10:14" },
  { index: 5,  id: "NhGi9M4JP7g", title: "Mobile Device Management",           section: "1.3 – Mobile Device Connectivity",  duration: "8:31" },
  { index: 6,  id: "RRFjKXxYJdM", title: "Introduction to IP",                 section: "2.1 – Ports and Protocols",         duration: "19:04" },
  { index: 7,  id: "_qGlbfZ44hg", title: "Common Ports",                       section: "2.1 – Ports and Protocols",         duration: "12:52" },
  { index: 8,  id: "aTuaEk5hnAs", title: "Wireless Network Technologies",      section: "2.2 – Wireless Networks",           duration: "7:16" },
  { index: 9,  id: "Z-9mkqi2ELI", title: "Network Services",                   section: "2.3 – Network Services",            duration: "17:03" },
  { index: 10, id: "lAHqO9sDVy4", title: "DNS Configuration",                  section: "2.4 – Network Configurations",      duration: "18:18" },
  { index: 11, id: "HwUqCZFx6wk", title: "DHCP",                               section: "2.4 – Network Configurations",      duration: "10:45" },
  { index: 12, id: "Z1wPgxsx4GI", title: "VLANs and VPNs",                     section: "2.4 – Network Configurations",      duration: "7:32" },
  { index: 13, id: "0hd6_bx0ydo", title: "Network Devices",                    section: "2.5 – Network Devices",             duration: "18:01" },
  { index: 14, id: "yubEz-ZEVwY", title: "IPv4 and IPv6",                      section: "2.6 – Network Connections",         duration: "8:45" },
  { index: 15, id: "nU5ko6cQWmc", title: "Assigning IP Addresses",             section: "2.6 – Network Connections",         duration: "8:26" },
  { index: 16, id: "iN2QnGFl06E", title: "Internet Connection Types",          section: "2.7 – Internet Connections",        duration: "7:33" },
  { index: 17, id: "PBEXIMeqRNY", title: "Network Types",                      section: "2.7 – Internet Connections",        duration: "4:46" },
  { index: 18, id: "CHQQgjtrhYU", title: "Network Tools",                      section: "2.8 – Network Tools",               duration: "11:48" },
  { index: 19, id: "xOyialyd4JU", title: "Display Types",                      section: "3.1 – Displays",                    duration: "9:13" },
  { index: 20, id: "fmrWo8swzyU", title: "Display Attributes",                 section: "3.1 – Displays",                    duration: "11:49" },
  { index: 21, id: "29X5Ho3m2KU", title: "Network Cables",                     section: "3.2 – Cables and Adapters",         duration: "12:14" },
  { index: 22, id: "1w42VC2_JYo", title: "568A and 568B Colors",               section: "3.2 – Cables and Adapters",         duration: "5:41" },
  { index: 23, id: "poQdq2APqic", title: "Optical Fiber",                      section: "3.2 – Cables and Adapters",         duration: "4:14" },
  { index: 24, id: "JGuVE-3CvT4", title: "Peripheral Cables",                  section: "3.2 – Cables and Adapters",         duration: "8:59" },
  { index: 25, id: "FK1b4stA2hk", title: "Video Cables",                       section: "3.2 – Cables and Adapters",         duration: "6:54" },
  { index: 26, id: "YM4pig2XYCo", title: "Storage Cables",                     section: "3.2 – Cables and Adapters",         duration: "4:10" },
  { index: 27, id: "3GkSvmeuhe8", title: "Adapters and Converters",            section: "3.2 – Cables and Adapters",         duration: "4:05" },
  { index: 28, id: "VO8C3lrWlVU", title: "Copper Connectors",                  section: "3.2 – Cables and Adapters",         duration: "8:33" },
  { index: 29, id: "Qxbp-c23cYY", title: "Fiber Connectors",                   section: "3.2 – Cables and Adapters",         duration: "2:49" },
  { index: 30, id: "JylKt1N6o0I", title: "An Overview of Memory",              section: "3.3 – Memory",                      duration: "8:38" },
  { index: 31, id: "HU-qsVtpnM0", title: "Memory Technologies",               section: "3.3 – Memory",                      duration: "8:44" },
  { index: 32, id: "UfLNl8-c9VM", title: "Storage Devices",                    section: "3.4 – Storage Devices",             duration: "14:54" },
  { index: 33, id: "5E16qftlfRY", title: "RAID",                               section: "3.4 – Storage Devices",             duration: "8:08" },
  { index: 34, id: "dbxM_LFMXpw", title: "Motherboards",                       section: "3.5 – Motherboards",                duration: "6:18" },
  { index: 35, id: "QvPX1XJwJH8", title: "Motherboard Expansion Slots",        section: "3.5 – Motherboards",                duration: "7:14" },
  { index: 36, id: "UjJwjjwa6Q0", title: "Motherboard Connections",            section: "3.5 – Motherboards",                duration: "5:45" },
  { index: 37, id: "O5wA53NYv1M", title: "Motherboard Compatibility",          section: "3.5 – Motherboards",                duration: "3:29" },
  { index: 38, id: "TgUxAM8rjyg", title: "The BIOS",                           section: "3.5 – Motherboards",                duration: "4:42" },
  { index: 39, id: "QfJkU0vD3gg", title: "BIOS Settings",                      section: "3.5 – Motherboards",                duration: "19:29" },
  { index: 40, id: "qLSV_lpM_Mk", title: "HSM and TPM",                        section: "3.5 – Motherboards",                duration: "7:47" },
  { index: 41, id: "4RPVQQd2sOM", title: "CPU Features",                        section: "3.5 – Motherboards",                duration: "5:13" },
  { index: 42, id: "KtipbKR8rqo", title: "Expansion Cards",                    section: "3.5 – Motherboards",                duration: "6:17" },
  { index: 43, id: "qC306MGytR8", title: "Cooling",                             section: "3.5 – Motherboards",                duration: "6:37" },
  { index: 44, id: "gK0SYCnWoIM", title: "Computer Power",                     section: "3.6 – Power",                       duration: "15:31" },
  { index: 45, id: "ctAOL7WyEUY", title: "Multifunction Devices",              section: "3.7 – Multifunction Devices",       duration: "14:25" },
  { index: 46, id: "hp2DfL6KxwA", title: "Laser Printer Maintenance",          section: "3.8 – Printers",                    duration: "7:30" },
  { index: 47, id: "qIIiTWNnWuQ", title: "Inkjet Printers",                    section: "3.8 – Printers",                    duration: "3:29" },
  { index: 48, id: "yRjKpaQQw1k", title: "Inkjet Printer Maintenance",         section: "3.8 – Printers",                    duration: "3:54" },
  { index: 49, id: "izk4zbSkUTg", title: "Thermal Printers",                   section: "3.8 – Printers",                    duration: "3:39" },
  { index: 50, id: "emKON9CAjks", title: "Thermal Printer Maintenance",        section: "3.8 – Printers",                    duration: "4:16" },
  { index: 51, id: "wkSlTGmPlWU", title: "Impact Printers",                    section: "3.8 – Printers",                    duration: "6:19" },
  { index: 52, id: "KCLqKxFsEOM", title: "Impact Printer Maintenance",         section: "3.8 – Printers",                    duration: "3:11" },
  { index: 53, id: "xXOIdDWUNGU", title: "Virtualization Concepts",            section: "4.1 – Cloud Computing",             duration: "5:45" },
  { index: 54, id: "wPB_C7hOY-8", title: "Virtualization Services",            section: "4.1 – Cloud Computing",             duration: "11:23" },
  { index: 55, id: "KZxAY5ssUxc", title: "Cloud Models",                       section: "4.2 – Client-side Virtualization",  duration: "9:48" },
  { index: 56, id: "XzNnFbY0dMQ", title: "Cloud Characteristics",              section: "4.2 – Client-side Virtualization",  duration: "6:50" },
  { index: 57, id: "HgeURynWn_w", title: "Troubleshooting Hardware",           section: "5.1 – Troubleshooting",             duration: "25:15" },
  { index: 58, id: "aVIuyHCNPCE", title: "Troubleshooting Storage Devices",   section: "5.2 – Troubleshooting Storage",     duration: "17:04" },
  { index: 59, id: "KXZu72i1eX8", title: "Troubleshooting Display Issues",     section: "5.3 – Troubleshooting Displays",    duration: "18:52" },
  { index: 60, id: "huQwiY4kiko", title: "Troubleshooting Mobile Devices",     section: "5.4 – Troubleshooting Mobile",      duration: "17:52" },
  { index: 61, id: "VBDS_kOHhVk", title: "Troubleshooting Networks",           section: "5.5 – Troubleshooting Networks",    duration: "15:14" },
  { index: 62, id: "_BhO_nYod0o", title: "Troubleshooting Printers",           section: "5.6 – Troubleshooting Printers",    duration: "11:55" },
];

// Map each weakness tag to the most relevant video IDs (in priority order)
export const TAG_VIDEO_MAP: Partial<Record<WeaknessTag, string[]>> = {
  "jitter-vs-latency":      ["VBDS_kOHhVk", "RRFjKXxYJdM"],
  "fiber-connectors":       ["Qxbp-c23cYY", "poQdq2APqic"],
  "raid-2-drives":          ["5E16qftlfRY", "aVIuyHCNPCE"],
  "printer-components":     ["ctAOL7WyEUY", "hp2DfL6KxwA", "_BhO_nYod0o"],
  "mobile-pbq":             ["zODZ0i-Iark", "huQwiY4kiko"],
  "ports":                  ["_qGlbfZ44hg", "VO8C3lrWlVU"],
  "cabling-faults":         ["29X5Ho3m2KU", "CHQQgjtrhYU"],
  "memory-types":           ["JylKt1N6o0I", "HU-qsVtpnM0"],
  "cache-hierarchy":        ["4RPVQQd2sOM"],
  "form-factors":           ["dbxM_LFMXpw"],
  "multitenancy":           ["KZxAY5ssUxc", "XzNnFbY0dMQ", "xXOIdDWUNGU"],
  "boot-errors":            ["HgeURynWn_w", "TgUxAM8rjyg", "QfJkU0vD3gg"],
  "wireless-standards":     ["aTuaEk5hnAs"],
  "wireless-channels":      ["aTuaEk5hnAs"],
  "ap-troubleshooting":     ["aTuaEk5hnAs", "VBDS_kOHhVk"],
  "display-tech":           ["xOyialyd4JU", "fmrWo8swzyU"],
  "laptop-display":         ["xOyialyd4JU", "KXZu72i1eX8"],
  "imaging-process":        ["ctAOL7WyEUY", "hp2DfL6KxwA", "_BhO_nYod0o"],
  "expansion-bus":          ["QvPX1XJwJH8", "KtipbKR8rqo"],
  "wiring-standards":       ["1w42VC2_JYo", "29X5Ho3m2KU"],
  "motherboard-id":         ["dbxM_LFMXpw", "UjJwjjwa6Q0"],
  "printer-sharing":        ["ctAOL7WyEUY", "Z-9mkqi2ELI"],
  "port-flapping":          ["VBDS_kOHhVk", "0hd6_bx0ydo"],
  "crosstalk":              ["29X5Ho3m2KU", "CHQQgjtrhYU"],
  "split-pair":             ["29X5Ho3m2KU", "CHQQgjtrhYU"],
  "attenuation":            ["29X5Ho3m2KU", "poQdq2APqic"],
  "emi-shielding":          ["29X5Ho3m2KU"],
  "cat-ratings":            ["29X5Ho3m2KU"],
  "ddr-compat":             ["JylKt1N6o0I"],
  "ddr-generations":        ["JylKt1N6o0I"],
  "ecc-servers":            ["HU-qsVtpnM0"],
  "virtual-memory":         ["HU-qsVtpnM0"],
  "memory-form-factors":    ["JylKt1N6o0I", "HU-qsVtpnM0"],
  "dual-channel":           ["HU-qsVtpnM0"],
  "cache-access-times":     ["4RPVQQd2sOM"],
  "m2-slots":               ["dbxM_LFMXpw", "UfLNl8-c9VM"],
  "power-8pin":             ["gK0SYCnWoIM", "UjJwjjwa6Q0"],
  "power-24pin":            ["gK0SYCnWoIM", "UjJwjjwa6Q0"],
  "smf-mmf":                ["poQdq2APqic", "Qxbp-c23cYY"],
  "t568a-568b-crossover":   ["1w42VC2_JYo"],
  "twisted-pair-theory":    ["29X5Ho3m2KU"],
  "copper-tools":           ["29X5Ho3m2KU", "VO8C3lrWlVU"],
  "cable-testing-tools":    ["CHQQgjtrhYU", "29X5Ho3m2KU"],
  "network-tap":            ["0hd6_bx0ydo"],
  "coax-cabling":           ["29X5Ho3m2KU", "VO8C3lrWlVU"],
  // --- Section 2.1 ---
  "usb-standards":          ["JGuVE-3CvT4", "VO8C3lrWlVU"],
  "display-cables":         ["FK1b4stA2hk", "xOyialyd4JU"],
  "thunderbolt":            ["JGuVE-3CvT4", "FK1b4stA2hk"],
  "sata-interface":         ["YM4pig2XYCo", "UfLNl8-c9VM"],
  // --- Section 3.1 ---
  "psu-wattage":            ["gK0SYCnWoIM"],
  "psu-connectors":         ["gK0SYCnWoIM", "UjJwjjwa6Q0"],
  "psu-types":              ["gK0SYCnWoIM"],
  "cooling-systems":        ["qC306MGytR8"],
  // --- Section 4.2 ---
  "psu-troubleshoot":       ["HgeURynWn_w", "gK0SYCnWoIM"],
  "post-codes":             ["HgeURynWn_w", "TgUxAM8rjyg"],
  "boot-sequence":          ["TgUxAM8rjyg", "QfJkU0vD3gg"],
  "bsod-codes":             ["HgeURynWn_w"],
  "drive-health":           ["aVIuyHCNPCE"],
  "raid-rebuild":           ["5E16qftlfRY", "aVIuyHCNPCE"],
  // --- Section 5.4 ---
  "wifi-80211-standards":   ["aTuaEk5hnAs"],
  "wifi-frequency":         ["aTuaEk5hnAs"],
  "wifi-6-ax":              ["aTuaEk5hnAs"],
  "wifi-7-be":              ["aTuaEk5hnAs"],
  "short-range-wireless":   ["aTuaEk5hnAs", "1LADZLBV3vo"],
  // --- Section 6.1 ---
  "internet-conn-types":    ["iN2QnGFl06E", "PBEXIMeqRNY"],
  "dsl-types":              ["iN2QnGFl06E"],
  "docsis":                 ["iN2QnGFl06E"],
  "fiber-isp-types":        ["iN2QnGFl06E", "poQdq2APqic"],
  "cellular-data":          ["iN2QnGFl06E", "1LADZLBV3vo"],
  // --- Section 6.4 ---
  "dhcp-process":           ["HwUqCZFx6wk"],
  "dns-records":            ["lAHqO9sDVy4"],
  "dns-hierarchy":          ["lAHqO9sDVy4"],
  "vlan-config":            ["Z1wPgxsx4GI"],
  "vpn-types":              ["Z1wPgxsx4GI"],
  // --- Section 7.2 ---
  "proxy-server":           ["0hd6_bx0ydo", "Z-9mkqi2ELI"],
  "utm-spam-gateway":       ["0hd6_bx0ydo"],
  "load-balancer":          ["0hd6_bx0ydo"],
  "embedded-scada":         ["0hd6_bx0ydo"],
  "iot-security":           ["0hd6_bx0ydo"],
  // --- Section 7.3 ---
  "wired-tshooting":        ["VBDS_kOHhVk", "CHQQgjtrhYU"],
  "network-speed-tshooting":["VBDS_kOHhVk"],
  "wireless-tshooting":     ["VBDS_kOHhVk"],
  "voip-tshooting":         ["VBDS_kOHhVk", "Z-9mkqi2ELI"],
  // --- Section 10.2 ---
  "laser-imaging":          ["hp2DfL6KxwA", "ctAOL7WyEUY"],
  "laser-maintenance":      ["hp2DfL6KxwA"],
  "inkjet-thermal-impact":  ["qIIiTWNnWuQ", "izk4zbSkUTg", "wkSlTGmPlWU"],
  // --- Section 10.3 ---
  "print-quality-issues":   ["_BhO_nYod0o"],
  "print-feed-issues":      ["_BhO_nYod0o"],
  "printer-connectivity":   ["_BhO_nYod0o", "ctAOL7WyEUY"],
  // --- Port & Protocol Numbers ---
  "port-numbers":            [],
  // --- RAID Levels ---
  "raid-levels":             [],
  // --- Cloud Computing ---
  "cloud-models":            [],
  "cloud-characteristics":   [],
  // --- Virtualization ---
  "hypervisors":             [],
  "virtualization-types":    [],
};

// Utility: get a video by its YouTube ID
export function getVideoById(id: string): MesserVideo | undefined {
  return ALL_VIDEOS.find((v) => v.id === id);
}

// Utility: get deduplicated videos for a set of tags, ordered by relevance
export function getVideosForTags(tags: WeaknessTag[]): MesserVideo[] {
  const seen = new Set<string>();
  const result: MesserVideo[] = [];
  for (const tag of tags) {
    const ids = TAG_VIDEO_MAP[tag] ?? [];
    for (const id of ids) {
      if (!seen.has(id)) {
        seen.add(id);
        const v = getVideoById(id);
        if (v) result.push(v);
      }
    }
  }
  return result;
}
