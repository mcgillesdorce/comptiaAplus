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
  | "twisted-pair-theory"     // how twist cancels crosstalk
  // --- Section 5.3 Network Cable Types ---
  | "copper-tools"            // crimper, punchdown, tone generator/probe
  | "cable-testing-tools"     // wire map tester, certifier, TDR, OTDR
  | "network-tap"             // passive vs active taps
  | "coax-cabling"            // RG-6 vs RG-59, BNC, F-type
  // --- Section 2.1 Cables and Connectors ---
  | "usb-standards"           // USB 2.0/3.x/4 speeds, connector types
  | "display-cables"          // HDMI, DisplayPort, DVI specs
  | "thunderbolt"             // Thunderbolt 3/4 vs USB4
  | "sata-interface"          // SATA I/II/III, eSATA, Molex
  // --- Section 3.1 Power Supplies and Cooling ---
  | "psu-wattage"             // wattage calculation, 80 PLUS ratings
  | "psu-connectors"          // 24-pin ATX, PCIe 6/8-pin, SATA, Molex
  | "psu-types"               // modular, non-modular, redundant PSU
  | "cooling-systems"         // fans, heat sinks, thermal paste, liquid cooling
  // --- Section 4.2 Power and Disk Issues ---
  | "psu-troubleshoot"        // dead PSU symptoms, overheating, random shutdown
  | "post-codes"              // POST beep codes, LED indicators
  | "boot-sequence"           // UEFI boot order, boot configuration
  | "bsod-codes"              // BSOD stop codes, memory dumps
  | "drive-health"            // S.M.A.R.T., bad sectors, drive failure signs
  | "raid-rebuild"            // RAID degraded mode, rebuild, failure types
  // --- Section 5.4 Wireless Networking Types ---
  | "wifi-80211-standards"    // 802.11a/b/g/n/ac/ax/be specs
  | "wifi-frequency"          // 2.4 GHz vs 5 GHz vs 6 GHz properties
  | "wifi-6-ax"               // Wi-Fi 6/6E: OFDMA, MU-MIMO, BSS Coloring
  | "wifi-7-be"               // Wi-Fi 7: 6 GHz, 320 MHz channels, MLO
  | "short-range-wireless"    // Bluetooth, RFID, NFC
  // --- Section 6.1 Internet Connection Types ---
  | "internet-conn-types"     // DSL, cable, fiber, satellite, cellular overview
  | "dsl-types"               // ADSL vs SDSL vs VDSL speeds
  | "docsis"                  // cable modem / DOCSIS technology
  | "fiber-isp-types"         // FTTC, FTTP, FTTH, ONT
  | "cellular-data"           // 4G LTE, 5G NR, mobile broadband
  // --- Section 6.4 Network Configuration Concepts ---
  | "dhcp-process"            // DORA, scopes, leases, reservations
  | "dns-records"             // A, AAAA, CNAME, MX, TXT, PTR records
  | "dns-hierarchy"           // root, TLD, authoritative, recursive resolver
  | "vlan-config"             // 802.1Q tagging, trunking, voice VLAN
  | "vpn-types"               // site-to-site, remote access, SSL, IPsec
  // --- Section 7.2 Internet and Embedded Appliances ---
  | "proxy-server"            // forward vs reverse proxy, caching
  | "utm-spam-gateway"        // UTM, NGFW, spam filtering
  | "load-balancer"           // round-robin, session persistence, health checks
  | "embedded-scada"          // SCADA, ICS, PLC, embedded OS security
  | "iot-security"            // IoT vulnerabilities, default creds, segmentation
  // --- Section 7.3 Troubleshoot Networks ---
  | "wired-tshooting"         // no link light, cable test, NIC troubleshooting
  | "network-speed-tshooting" // duplex mismatch, bandwidth bottlenecks
  | "wireless-tshooting"      // RSSI, interference, wrong SSID, AP issues
  | "voip-tshooting"          // jitter, latency, QoS for VoIP
  // --- Section 10.2 Print Device Maintenance ---
  | "laser-imaging"           // 7-step laser printing process
  | "laser-maintenance"       // drum, fuser, toner, maintenance kit
  | "inkjet-thermal-impact"   // inkjet piezo/heat, thermal, impact dot matrix
  // --- Section 10.3 Troubleshoot Print Devices ---
  | "print-quality-issues"    // ghosting, fading, streaking, smearing
  | "print-feed-issues"       // paper jam, misfeed, double feed
  | "printer-connectivity"    // USB/network/wireless printer setup issues
  // --- Port & Protocol Numbers ---
  | "port-numbers";           // TCP/UDP port memorization for CompTIA A+

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
