// scripts/append-ext7.js
// Appends 7 questions (ext7-q01..q07) sourced from Dion Practice Exam #4

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'questions', 'index.ts');
const content = fs.readFileSync(filePath, 'utf8');

const insertAt = content.lastIndexOf('];');
if (insertAt === -1) {
  console.error('Could not find ]; in index.ts');
  process.exit(1);
}

const newQuestions = `
  // ── EXT7: Dion Practice Exam #4 Missed / Notable Questions ──

  {
    id: "ext7-q01",
    domain: "3.0-hardware",
    difficulty: "medium",
    type: "single",
    source: "concept-builder",
    prompt: "A port cluster on a motherboard shows two similar-looking DVI connectors. Port F has a flat blade surrounded by 4 pins PLUS a long flat slot, while Port E is a 15-pin D-sub (VGA). What connector type is Port F?",
    image: "/diagrams/11_connector_types.svg",
    imageAlt: "Common connector types visual identification chart",
    choices: [
      { id: "a", text: "DVI-D", correct: true },
      { id: "b", text: "VGA", correct: false },
      { id: "c", text: "HDMI", correct: false },
      { id: "d", text: "DVI-I", correct: false },
    ],
    explanation: "DVI-D (Digital Only) has a flat blade with 24 pins arranged in three rows, but lacks the 4 extra analog pins found on DVI-I. DVI-I (Integrated) carries both digital and analog signals and has a wider flat slot with 4 surrounding pins, allowing it to connect to VGA monitors via an adapter. DVI-D cannot adapt to VGA. If the connector has the extra 4-pin cluster beside the flat blade, it is DVI-I; without it, it is DVI-D.",
    triggerPhrase: "DVI-D digital only vs DVI-I",
    weaknessTags: ["display-cables", "ports"],
  },
  {
    id: "ext7-q02",
    domain: "3.0-hardware",
    difficulty: "medium",
    type: "single",
    source: "concept-builder",
    prompt: "On a motherboard, a wide 40-pin ribbon-cable connector is circled. What type of connector is this?",
    image: "/diagrams/01_motherboard.svg",
    imageAlt: "Motherboard component layout diagram",
    choices: [
      { id: "a", text: "PATA connector", correct: true },
      { id: "b", text: "SATA connector", correct: false },
      { id: "c", text: "Audio connector", correct: false },
      { id: "d", text: "Front panel connector", correct: false },
    ],
    explanation: "PATA (Parallel ATA), also called IDE, uses a wide 40-pin ribbon cable connector on the motherboard. SATA uses a much smaller 7-pin L-shaped connector and a thin cable. PATA was the dominant storage interface before SATA and is easily identified by its wide rectangular header. Front panel connectors are a cluster of small 2-pin headers. Audio connectors are also small multi-pin headers.",
    triggerPhrase: "PATA IDE 40-pin ribbon connector motherboard",
    weaknessTags: ["storage-interfaces", "motherboard-components"],
  },
  {
    id: "ext7-q03",
    domain: "1.0-mobile",
    difficulty: "easy",
    type: "single",
    source: "concept-builder",
    prompt: "Jay is complaining that the cursor moves too fast across his laptop screen when using the trackpad. Which Windows 10 setting path lets him slow the cursor down?",
    choices: [
      { id: "a", text: "Settings > Devices > Touchpad > Speed", correct: true },
      { id: "b", text: "Settings > Devices > Mouse > Speed", correct: false },
      { id: "c", text: "Settings > Devices > Mouse > Touchpad sensitivity", correct: false },
      { id: "d", text: "Settings > Devices > Touchpad > Touchpad sensitivity", correct: false },
    ],
    explanation: "In Windows 10, trackpad cursor speed is controlled under Settings > Devices > Touchpad > Speed. There is a dedicated 'Touchpad' section separate from 'Mouse'. The Speed slider there adjusts how fast the pointer moves. 'Touchpad sensitivity' controls tap detection threshold (ignores accidental touches), not cursor movement speed. The Mouse section controls external mice, not the built-in trackpad.",
    triggerPhrase: "trackpad cursor speed Windows 10 settings",
    weaknessTags: ["laptop-display", "windows-settings"],
  },
  {
    id: "ext7-q04",
    domain: "2.0-networking",
    difficulty: "medium",
    type: "single",
    source: "concept-builder",
    prompt: "A network technician needs to connect two switches with a link capable of 10 Gbps throughput. Which media BEST meets this requirement?",
    choices: [
      { id: "a", text: "Fiber optic cable", correct: true },
      { id: "b", text: "Cat 5e cable", correct: false },
      { id: "c", text: "Coaxial cable", correct: false },
      { id: "d", text: "Cat 3 cable", correct: false },
    ],
    explanation: "Fiber optic cable is the best choice for a 10 Gbps switch-to-switch uplink. It supports 10GBASE-SR (short range) and 10GBASE-LR (long range) at 10 Gbps with very low latency and no electromagnetic interference. Cat 5e supports a maximum of 1 Gbps (1000BASE-T) and cannot handle 10 Gbps. Cat 6A can support 10GBASE-T in copper, but that was not an option. Coaxial and Cat 3 are far too slow for 10 Gbps.",
    triggerPhrase: "10 Gbps switch uplink fiber optic",
    weaknessTags: ["fiber-connectors", "cat-ratings", "network-speeds"],
  },
  {
    id: "ext7-q05",
    domain: "2.0-networking",
    difficulty: "hard",
    type: "single",
    source: "concept-builder",
    prompt: "The existing wireless network only allows three non-overlapping channels, causing interference with neighboring businesses. Which wireless standard should you implement to gain additional non-overlapping channels?",
    choices: [
      { id: "a", text: "802.11ac (Wi-Fi 5)", correct: true },
      { id: "b", text: "802.11b", correct: false },
      { id: "c", text: "802.11g", correct: false },
      { id: "d", text: "802.1q", correct: false },
    ],
    explanation: "The 2.4 GHz band (used by 802.11b and 802.11g) has only 3 non-overlapping channels (1, 6, and 11) in North America. 802.11ac operates exclusively on the 5 GHz band, which has 23+ non-overlapping 20 MHz channels, dramatically reducing co-channel interference in dense environments. 802.1q is a VLAN tagging standard (Layer 2), not a wireless standard. Moving to 802.11ac (5 GHz) directly solves the channel congestion problem.",
    triggerPhrase: "wireless non-overlapping channels 5GHz 802.11ac",
    weaknessTags: ["wireless-standards", "wifi-channels"],
  },
  {
    id: "ext7-q06",
    domain: "2.0-networking",
    difficulty: "medium",
    type: "single",
    source: "concept-builder",
    prompt: "Which of the following is an example of a valid IPv6 address?",
    choices: [
      { id: "a", text: "::1", correct: true },
      { id: "b", text: "00:AB:FA:B1:07:34", correct: false },
      { id: "c", text: "192:168:1:55", correct: false },
      { id: "d", text: "192.168.1.254", correct: false },
    ],
    explanation: "::1 is a valid IPv6 address -- it is the loopback address (equivalent to 127.0.0.1 in IPv4). The :: notation compresses consecutive groups of all-zero 16-bit blocks. IPv6 addresses use 128 bits written as up to 8 groups of 4 hexadecimal digits separated by colons. 00:AB:FA:B1:07:34 is a MAC address (48-bit, 12 hex digits with colons). 192.168.1.254 is an IPv4 address (dotted decimal notation). 192:168:1:55 is invalid -- it uses colons but the values are decimal octets, which is neither valid IPv4 nor valid IPv6.",
    triggerPhrase: "valid IPv6 address ::1 loopback",
    weaknessTags: ["ip-addressing", "ipv6"],
  },
  {
    id: "ext7-q07",
    domain: "3.0-hardware",
    difficulty: "easy",
    type: "single",
    source: "concept-builder",
    prompt: "What wiring standard (connector type) is used with POTS (Plain Old Telephone System)?",
    choices: [
      { id: "a", text: "RJ-11", correct: true },
      { id: "b", text: "F-type", correct: false },
      { id: "c", text: "RJ-45", correct: false },
      { id: "d", text: "ST", correct: false },
    ],
    explanation: "POTS (Plain Old Telephone System) uses RJ-11 connectors to terminate both ends of a standard phone line. RJ-11 is also used for DSL lines and VoIP ATA (Analog Telephony Adapter) devices. RJ-45 terminates copper twisted-pair Ethernet cable (8 contacts). F-type is used with coaxial cables for cable TV. ST, SC, LC, and MTRJ connectors are used for fiber optic cables.",
    triggerPhrase: "POTS telephone RJ-11 connector",
    weaknessTags: ["ports", "wiring-standards"],
  },
`;

const newContent = content.substring(0, insertAt) + newQuestions + '\n];';
fs.writeFileSync(filePath, newContent, 'utf8');

const lineCount = newContent.split('\n').length;
console.log(`Done! File now has ${lineCount} lines.`);
console.log('Appended 7 questions (ext7-q01 through ext7-q07).');
