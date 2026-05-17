import type { Domain, WeaknessTag } from "@/lib/types";

export interface ReferenceTopic {
  slug: string;
  title: string;
  domain: Domain;
  priority: number; // higher = surfaced more prominently
  weaknessTags: WeaknessTag[]; // mapped to quiz accuracy for live sorting
  sections: ReferenceSection[];
}

export interface ReferenceSection {
  heading: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: "warning" | "info" | "success";
    title: string;
    body: string;
  };
}

export const referenceTopics: ReferenceTopic[] = [
  {
    slug: "jitter-vs-latency",
    title: "Jitter vs Latency",
    domain: "2.0-networking",
    priority: 10,
    weaknessTags: ["jitter-vs-latency"],
    sections: [
      {
        heading: "Why this matters to you",
        body: "You've missed this concept on BOTH practice exams. The distinction is simple but easy to confuse under exam pressure.",
        callout: {
          type: "warning",
          title: "Personal note",
          body: "VARIABLE delay = JITTER. CONSISTENT delay = LATENCY. Write this somewhere visible.",
        },
      },
      {
        heading: "The four metrics",
        table: {
          headers: ["Metric", "What it measures", "Trigger phrase"],
          rows: [
            ["Bandwidth", "Theoretical max capacity", "'rated speed', 'link capacity'"],
            ["Throughput", "Actual measured data delivered", "'real-world speed', 'measured'"],
            ["Latency", "Time A → B for a packet", "'delay', 'ping', 'RTT', 'how long'"],
            ["Jitter", "Variability in latency", "'variable', 'inconsistent', 'speeding up & slowing down'"],
          ],
        },
      },
      {
        heading: "VoIP example",
        body: "VoIP needs steady packet arrival. If packets arrive at irregular intervals, the voice sounds choppy or 'speeds up and slows down' even when total latency is fine. That's jitter. High but STEADY latency just sounds delayed (like a satellite call).",
      },
    ],
  },
  {
    slug: "fiber-connectors",
    title: "Fiber Optic Connectors",
    domain: "2.0-networking",
    priority: 10,
    weaknessTags: ["fiber-connectors", "smf-mmf"],
    sections: [
      {
        heading: "Why this matters to you",
        body: "Missed on both exams (you picked F-type once and SC once when the answer was ST). Lock in the shapes visually — the names are just abbreviations.",
        callout: {
          type: "warning",
          title: "F-type is NOT fiber",
          body: "F-type is the screw-on connector for COAX cable (cable TV, cable internet). Never pick it on a fiber question.",
        },
      },
      {
        heading: "Visual identification",
        image: "/diagrams/05_fiber_connectors.svg",
        imageAlt: "ST, SC, and LC fiber connectors side by side",
      },
      {
        heading: "Memorize these three",
        table: {
          headers: ["Connector", "Shape", "Mnemonic"],
          rows: [
            ["ST (Straight Tip)", "Round metal body, bayonet twist-lock", "'Stick & Twist'"],
            ["SC (Subscriber)", "Square plastic body, push-pull latch", "'Square Connector'"],
            ["LC (Lucent)", "Small square, RJ-style clip (half SC size)", "'Little Connector'"],
          ],
        },
      },
    ],
  },
  {
    slug: "printer-imaging",
    title: "Laser Printer Imaging Process",
    domain: "5.0-troubleshooting",
    priority: 9,
    weaknessTags: ["imaging-process", "printer-components"],
    sections: [
      {
        heading: "The 7-step sequence",
        body: "Memorize this order — it's tested as both a sequence-ordering PBQ AND as a 'which step does X' question.",
        image: "/diagrams/06_laser_process.svg",
        imageAlt: "Laser printer imaging process flowchart",
      },
      {
        heading: "Memory aid",
        callout: {
          type: "info",
          title: "Mnemonic",
          body: "Please Charge Every Day To Finish Cleaning = Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning",
        },
      },
      {
        heading: "Symptom → component",
        table: {
          headers: ["Symptom", "Failing component"],
          rows: [
            ["Blank pages / washed-out", "Primary charge roller"],
            ["White lines / missing data", "Laser/scanner unit"],
            ["Ghost images / repeating", "Imaging drum"],
            ["Toner doesn't stick to paper", "Transfer roller"],
            ["Toner rubs off / dust-like", "Fuser"],
            ["Paper jams / multiple sheets", "Pickup roller / separation pad"],
          ],
        },
      },
    ],
  },
  {
    slug: "motherboard",
    title: "Motherboard Components",
    domain: "3.0-hardware",
    priority: 9,
    weaknessTags: ["motherboard-id", "expansion-bus", "power-8pin", "power-24pin", "psu-connectors"],
    sections: [
      {
        heading: "Component map",
        body: "PBQ questions show a motherboard with one part circled. Learn this layout cold.",
        image: "/diagrams/01_motherboard.svg",
        imageAlt: "Full ATX motherboard with all components labeled",
      },
      {
        heading: "The 24-pin trap",
        callout: {
          type: "warning",
          title: "Mainboard Power vs PATA",
          body: "The 24-pin ATX is the LARGEST connector on the board (2×12 pin grid). PATA was a wide 40-pin RIBBON header on legacy boards. If you see a big pin block near the edge with 2 rows, it's MAINBOARD POWER.",
        },
      },
      {
        heading: "PCIe slot lengths",
        body: "All PCIe slots have identical pin pitch. They only differ in LENGTH. Order: x1 < x4 < x8 < x16.",
        image: "/diagrams/02_pcie_slots.svg",
        imageAlt: "PCIe slot sizes drawn to scale",
      },
      {
        heading: "Power connectors",
        image: "/diagrams/03_power_connectors.svg",
        imageAlt: "Power connector sizes side by side",
        table: {
          headers: ["Connector", "Pin count", "Purpose"],
          rows: [
            ["24-pin ATX", "24 (2×12)", "Mainboard power (LARGEST)"],
            ["8-pin EPS", "8 (often 4+4)", "CPU power (near socket)"],
            ["6+2 PCIe", "8 max", "GPU power (from PSU)"],
            ["SATA power", "15", "Drive power (L-shaped)"],
          ],
        },
      },
    ],
  },
  {
    slug: "memory",
    title: "Memory Types",
    domain: "3.0-hardware",
    priority: 9,
    weaknessTags: ["memory-types", "cache-hierarchy", "memory-form-factors", "ddr-generations", "ddr-compat", "virtual-memory", "dual-channel", "cache-access-times"],
    sections: [
      {
        heading: "DIMM vs SODIMM",
        body: "The single most common mistake: confusing desktop and laptop RAM form factors.",
        image: "/diagrams/04_memory_slots.svg",
        imageAlt: "DIMM vs SODIMM size comparison",
      },
      {
        heading: "Memory by purpose",
        table: {
          headers: ["Type", "Used for"],
          rows: [
            ["DIMM", "Desktop / server RAM (full size)"],
            ["SODIMM", "Laptop / SFF / NUC RAM (half size)"],
            ["ECC", "Server RAM with data integrity (detects + corrects errors)"],
            ["Non-parity", "Standard desktop RAM (no error checking)"],
            ["Virtual memory", "Disk space used as RAM overflow (pagefile/swap)"],
            ["VRAM / GDDR", "Graphics card memory (soldered to GPU)"],
            ["Cache (L1/L2/L3)", "Inside the CPU itself"],
          ],
        },
      },
      {
        heading: "Cache hierarchy",
        image: "/diagrams/08_cache_pyramid.svg",
        imageAlt: "Memory hierarchy pyramid",
        body: "Lower number = smaller + faster + closer to CPU core. L1 is inside each core (per-core). L2 is also per-core but bigger. L3 is shared across all cores.",
      },
    ],
  },
  {
    slug: "cabling",
    title: "Cabling & Wiring Standards",
    domain: "2.0-networking",
    priority: 8,
    weaknessTags: ["wiring-standards", "t568a-568b-crossover", "crosstalk", "split-pair", "cat-ratings", "attenuation", "emi-shielding"],
    sections: [
      {
        heading: "Categories at a glance",
        table: {
          headers: ["Category", "Max Speed", "Distance"],
          rows: [
            ["Cat 5", "100 Mbps", "100 m"],
            ["Cat 5e", "1 Gbps", "100 m"],
            ["Cat 6", "1 Gbps (10G to 55m)", "100 m"],
            ["Cat 6a", "10 Gbps", "100 m"],
            ["Cat 8", "25-40 Gbps", "30 m (data center only)"],
          ],
        },
        callout: {
          type: "info",
          title: "The 100m rule",
          body: "All twisted-pair ethernet maxes at 100 m. Beyond that = fiber or a switch/repeater. Cat 8 is the exception at 30m.",
        },
      },
      {
        heading: "Cable problems",
        table: {
          headers: ["Problem", "Symptom"],
          rows: [
            ["Crosstalk", "Pairs not twisted enough → signal leaks between pairs"],
            ["Split pair", "Wrong wires used as a pair → continuity passes, errors high"],
            ["Tx/Rx reverse", "Transmit and receive swapped → no link at all"],
            ["568A/568B mismatch", "Different standards each end → accidental crossover"],
            ["EMI", "External interference → intermittent issues"],
          ],
        },
      },
      {
        heading: "T-568A vs T-568B",
        image: "/diagrams/07_wiring_standards.svg",
        imageAlt: "T-568A vs T-568B color order",
        body: "Both ends same = straight-through. A on one end, B on other = crossover. T-568B is the modern standard for office/data center.",
      },
    ],
  },
  {
    slug: "ports",
    title: "Common Ports",
    domain: "2.0-networking",
    priority: 8,
    weaknessTags: ["ports"],
    sections: [
      {
        heading: "Memorize these",
        body: "Expect 4-6 port questions on the exam. Most-tested in your exams: 110 (POP3), 139 (NetBIOS), 445 (SMB).",
        table: {
          headers: ["Port", "Protocol", "Use"],
          rows: [
            ["20/21", "FTP", "File transfer"],
            ["22", "SSH/SFTP", "Secure shell"],
            ["23", "Telnet", "Legacy remote shell"],
            ["25", "SMTP", "Send email"],
            ["53", "DNS", "Name resolution"],
            ["67/68", "DHCP", "IP assignment"],
            ["80", "HTTP", "Web (unencrypted)"],
            ["110", "POP3", "Receive email (download)"],
            ["123", "NTP", "Network time"],
            ["137/138/139", "NetBIOS", "Legacy Windows file sharing"],
            ["143", "IMAP", "Receive email (sync)"],
            ["161/162", "SNMP", "Network management"],
            ["389", "LDAP", "Directory services"],
            ["443", "HTTPS", "Web (encrypted)"],
            ["445", "SMB", "Modern Windows file sharing"],
            ["3389", "RDP", "Remote desktop"],
          ],
        },
      },
    ],
  },
  {
    slug: "raid",
    title: "RAID Levels",
    domain: "3.0-hardware",
    priority: 7,
    weaknessTags: ["raid-2-drives", "raid-rebuild"],
    sections: [
      {
        heading: "Drive count is everything",
        table: {
          headers: ["RAID", "Min drives", "Fault tolerance", "Use case"],
          rows: [
            ["0", "2", "None", "Speed only"],
            ["1", "2", "Yes (mirror)", "2-drive redundancy"],
            ["5", "3", "Yes (1 drive)", "Speed + redundancy balance"],
            ["6", "4", "Yes (2 drives)", "Extra safety"],
            ["10", "4", "Yes", "Speed + redundancy"],
          ],
        },
        callout: {
          type: "warning",
          title: "2 drives + redundancy = RAID 1",
          body: "RAID 5 needs 3+. RAID 10 needs 4+. With exactly 2 drives, mirror (RAID 1) is the only redundant option.",
        },
      },
    ],
  },
];
