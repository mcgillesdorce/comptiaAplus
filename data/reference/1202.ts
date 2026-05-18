import type { ReferenceTopic } from "@/data/reference";

export const referenceTopics1202: ReferenceTopic[] = [
  {
    slug: "1202-windows-tools-cli",
    title: "Windows Tools and Command Line",
    domain: "1.0-operating-systems",
    priority: 10,
    weaknessTags: ["windows-tools", "windows-cli"],
    sections: [
      {
        heading: "High-yield admin tools",
        table: {
          headers: ["Tool", "Use case"],
          rows: [
            ["Task Manager", "Processes, startup impact, performance counters"],
            ["MMC", "Centralized snap-ins (Event Viewer, Services, Device Manager)"],
            ["msconfig", "Boot options and selective startup"],
            ["regedit", "Registry edits for advanced troubleshooting"],
          ],
        },
      },
      {
        heading: "CLI commands to memorize",
        table: {
          headers: ["Command", "Purpose"],
          rows: [
            ["ipconfig /all", "View full NIC addressing and DNS"],
            ["chkdsk", "Scan and repair file system errors"],
            ["sfc /scannow", "Repair protected system files"],
            ["diskpart", "Partition and volume management"],
          ],
        },
      },
    ],
  },
  {
    slug: "1202-malware-workflow",
    title: "Malware Types and Removal Workflow",
    domain: "2.0-security",
    priority: 10,
    weaknessTags: ["malware-types", "malware-removal", "pc-sec-tshooting"],
    sections: [
      {
        heading: "Common malware families",
        table: {
          headers: ["Type", "Typical symptom"],
          rows: [
            ["Ransomware", "Encrypted files and payment demand"],
            ["Rootkit", "Stealth persistence, hidden processes"],
            ["Spyware", "Tracking and credential theft"],
            ["Fileless malware", "Runs in memory via scripts/macros"],
          ],
        },
      },
      {
        heading: "CompTIA flow",
        body: "Identify and isolate first, then disable restore/autoplay, remediate, schedule scans, re-enable protections, and educate users after verification.",
      },
    ],
  },
  {
    slug: "1202-auth-wireless-security",
    title: "Authentication and Wireless Security",
    domain: "2.0-security",
    priority: 9,
    weaknessTags: ["logical-security", "wireless-security", "soho-security"],
    sections: [
      {
        heading: "Protocol hierarchy",
        table: {
          headers: ["Control", "Exam-ready takeaway"],
          rows: [
            ["WPA3", "Modern default for personal/enterprise Wi-Fi"],
            ["RADIUS", "Central auth for enterprise wireless"],
            ["MFA", "Something you know + have + are"],
            ["Least privilege", "Grant minimum required access"],
          ],
        },
      },
    ],
  },
  {
    slug: "1202-windows-security-hardening",
    title: "Windows Security Hardening",
    domain: "2.0-security",
    priority: 9,
    weaknessTags: ["windows-security", "security-hardening", "browser-security"],
    sections: [
      {
        heading: "Core controls",
        table: {
          headers: ["Feature", "What to verify"],
          rows: [
            ["BitLocker", "System and removable drive encryption enabled"],
            ["UAC", "Prompt elevation for admin actions"],
            ["Defender + Firewall", "Real-time protection and host filtering"],
            ["Patch policy", "OS and app updates on schedule"],
          ],
        },
      },
    ],
  },
  {
    slug: "1202-software-troubleshooting",
    title: "Software Troubleshooting Playbooks",
    domain: "3.0-software-troubleshooting",
    priority: 9,
    weaknessTags: ["windows-tshooting", "mobile-app-tshooting", "mobile-sec-tshooting"],
    sections: [
      {
        heading: "Windows failures",
        body: "For startup and BSOD issues, verify recent changes, check Event Viewer, use safe mode/recovery options, and validate storage and memory health before reinstalling.",
      },
      {
        heading: "Mobile failures",
        body: "For app crashes or battery drain, validate OS/app version, permissions, storage, and background sync behavior before factory reset.",
      },
    ],
  },
  {
    slug: "1202-ticketing-change-management",
    title: "Ticketing and Change Management",
    domain: "4.0-operational-procedures",
    priority: 8,
    weaknessTags: ["ticketing-systems", "change-management"],
    sections: [
      {
        heading: "Ticket quality checklist",
        table: {
          headers: ["Field", "Why it matters"],
          rows: [
            ["Impact + urgency", "Determines proper priority and SLA"],
            ["Repro steps", "Makes escalation faster and cleaner"],
            ["Resolution notes", "Builds searchable team knowledge"],
            ["User confirmation", "Validates closure quality"],
          ],
        },
      },
      {
        heading: "Change process",
        body: "Document request, assess risk, schedule window, test in sandbox, secure approval, execute, then verify and keep rollback ready.",
      },
    ],
  },
  {
    slug: "1202-backup-recovery",
    title: "Backup and Recovery Strategy",
    domain: "4.0-operational-procedures",
    priority: 9,
    weaknessTags: ["backup-recovery"],
    sections: [
      {
        heading: "3-2-1 rule",
        body: "Keep 3 copies of data, on 2 media types, with 1 copy off-site or immutable/offline.",
      },
      {
        heading: "Backup types",
        table: {
          headers: ["Type", "Speed", "Restore complexity"],
          rows: [
            ["Full", "Slowest backup", "Fastest restore"],
            ["Incremental", "Fast backups", "Slower restore chain"],
            ["Differential", "Medium backup time", "Faster restore than incremental"],
          ],
        },
      },
    ],
  },
  {
    slug: "1202-remote-access-scripting-ai",
    title: "Remote Access, Scripting, and AI Safety",
    domain: "4.0-operational-procedures",
    priority: 7,
    weaknessTags: ["remote-access", "scripting", "ai-management"],
    sections: [
      {
        heading: "Remote access tools",
        table: {
          headers: ["Tool", "Typical use"],
          rows: [
            ["RDP", "Windows GUI administration"],
            ["SSH", "Secure terminal management"],
            ["VPN", "Encrypted remote network access"],
            ["RMM", "Centralized endpoint support"],
          ],
        },
      },
      {
        heading: "AI usage guardrails",
        body: "Do not place regulated or sensitive data in public AI tools, validate outputs for hallucinations, and require human review for production changes.",
      },
    ],
  },
];
