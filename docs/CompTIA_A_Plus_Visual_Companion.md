**CompTIA A+ Core 1**

**Visual Companion Guide**

*Labeled diagrams for the components most often tested as PBQs*

Pair this with the Deep-Dive guide for full text explanations.

# **1. Motherboard Component Map**

The single most-tested PBQ pattern on the A+ exam: identify a circled component on a motherboard photo. Study this map until you can name every part on sight.

*ATX motherboard — generic component layout*

## **Where each component lives**

- **CPU socket: **Center of the board, square area with a metal lever arm. Surrounded by VRM heatsinks (power regulation).

- **DIMM slots (RAM): **Tall thin parallel slots right next to the CPU. Always 2 or 4 slots on consumer boards, more on server/HEDT.

- **24-pin ATX (mainboard power): **The LARGEST connector on the board, always near one edge. White or black plastic with 24 holes in a 2×12 grid. Supplies main power from the PSU.

- **8-pin EPS (CPU power): **Smaller square connector NEAR the CPU socket. Dedicated CPU power. Don't confuse with 24-pin.

- **PCIe slots: **Long horizontal slots below the CPU. The longest is x16 (GPU). See Diagram 2 for size comparison.

- **M.2 slot: **Long thin slot with a screw post at the end. For NVMe SSDs. Often near the CPU or between PCIe slots.

- **SATA ports: **Small L-shaped 7-pin connectors clustered at the edge. For 2.5/3.5 inch SSDs and HDDs.

- **CMOS battery: **Silver coin cell (CR2032). Maintains BIOS settings and the real-time clock when power is off.

- **Chipset: **Square heatsink-covered chip below the CPU area. Acts as the I/O hub for everything that isn't directly on the CPU.

- **Front panel header: **Small pin block near the edge. Connects to the case's power button, reset, LEDs, and front USB.

- **I/O panel: **Cluster of external ports on the back edge — USB, ethernet, audio, display outputs.

| **Common PBQ trap — PATA vs Mainboard Power: **On the exam, the 24-pin ATX mainboard power connector is sometimes confused with an old PATA (IDE) connector. PATA was a WIDE 40-pin RIBBON header on legacy boards, mostly absent on modern systems. If you see a large rectangular pin grid (2 rows × 12 columns) near the board edge, that's MAINBOARD POWER — not PATA. |
| --- |

# **2. PCIe Slot Size Identification**

PBQ questions often show a motherboard with one PCIe slot circled and ask you to identify which size it is. The trick: all PCIe slots look identical except for LENGTH.

*PCIe slot lengths drawn to scale*

## **How to identify a PCIe slot at a glance**

**PCIe x16: **Always the LONGEST slot, typically the topmost expansion slot. This is where the GPU goes. About 89 mm (3.5 inches) long.

**PCIe x8: **Roughly HALF the length of an x16 slot. Note: many physical x16-length slots are wired electrically as x8 — when in doubt, count by length only. About 56 mm long.

**PCIe x4: **About one-third the length of x16. Often used for NVMe-to-PCIe adapters and capture cards. About 39 mm long.

**PCIe x1: **The smallest — a tiny stub about 25 mm long. Used for sound cards, single-port NICs, and small add-in cards.

| **Rule of thumb: **Stack the slots in your head in size order: x1 < x4 < x8 < x16. Count what fraction of the longest slot the circled slot is — that gives you the answer. If the slot is ~half of the GPU slot, it's x8. |
| --- |

# **3. Power Connectors — Size ****&**** Purpose**

Knowing power connectors by size is the fastest way to ID them on a motherboard PBQ.

*Power connectors — size hierarchy*

## **Connector quick-ID**

- **24-pin ATX (Mainboard): **LARGEST connector on the board. 2 rows × 12 holes. Always near one edge of the board, usually the right side. Supplies all main power.

- **8-pin EPS (CPU): **Smaller, near the CPU socket. Often 4+4 (can split into two 4-pin sections). Dedicated to CPU power.

- **6+2-pin PCIe (GPU): **Lives on the POWER SUPPLY cables, not the motherboard. Plugs directly into the graphics card. Modern high-end GPUs may have multiple of these or use the 12VHPWR connector.

- **SATA Power: **L-shaped 15-pin connector from the PSU to each SSD/HDD. Not on the motherboard.

# **4. RAM Form Factors — DIMM vs SODIMM**

If a question shows you a stick of RAM or asks which type goes in a laptop, this image is the answer.

*DIMM (desktop) vs SODIMM (laptop) — drawn to scale*

## **Locking it in**

**DIMM **(Dual Inline Memory Module): Full-size, ~5.25 inches long. Always in DESKTOPS and SERVERS.

**SODIMM **(Small Outline DIMM): Roughly half the length. Always in LAPTOPS, NUCs, Small Form Factor PCs, and many All-in-One systems.

**Notch position: **Each DDR generation (DDR3, DDR4, DDR5) has the notch in a DIFFERENT spot. This physically prevents installing the wrong generation. You cannot force DDR4 into a DDR3 slot.

| **Memory question shortcuts: **Question mentions a LAPTOP and wants to install RAM = SODIMM. Question mentions a SERVER and wants data integrity = ECC. Question mentions overflow when RAM is full = virtual memory (pagefile). Question mentions graphics card memory = VRAM or GDDR. |
| --- |

# **5. Fiber Optic Connectors — Visual ID**

You missed fiber connector questions on both practice exams. The shapes are unmistakable once you see them side by side.

*ST, SC, and LC — the three fiber connectors you must recognize*

## **Three connectors, three shapes**

**ST — Straight Tip: **ROUND metal body with a bayonet twist-lock mechanism, similar to an old TV/cable BNC connector. Mnemonic: 'Stick and Twist'.

**SC — Subscriber Connector: **SQUARE plastic body with a push-pull latch. About the size of an RJ-45. Mnemonic: 'Square Connector'.

**LC — Lucent Connector: **Roughly HALF the size of SC, with a small clip that works like an RJ-45 clip. Used in modern high-density data centers (SFP modules). Mnemonic: 'Little Connector'.

| **Don****'****t get fooled: **If you see a connector with an F-type screw thread, that's COAX (cable TV), not fiber. If you see something that looks like an RJ-45 but with two fiber strands, that's MTRJ (rare). The three above (ST, SC, LC) are 95% of exam fiber questions. |
| --- |

# **6. Laser Printer Imaging Process**

Memorize this order verbatim — it's tested as a drag-and-drop PBQ AND as a multiple-choice question on nearly every exam.

*The 7-step laser imaging cycle*

## **Why the order matters**

- **Processing FIRST **— you can't do anything until the printer has the data.

- **Charging BEFORE Exposing **— you can't write to an uncharged drum. The laser neutralizes existing charge; if there's no charge to neutralize, nothing happens.

- **Developing BEFORE Transferring **— toner has to be on the drum before it can move to paper.

- **Fusing BEFORE Cleaning **— page must be done before the drum is prepped for the next.

- **Cleaning LAST **— resets the drum so the cycle can begin again.

| **Symptom-to-step quick lookup: **Failed CHARGING = blank/washed-out pages. Failed EXPOSING = white lines or missing data. Failed DEVELOPING = faded text. Failed TRANSFERRING = toner doesn't stick to paper. Failed FUSING = toner rubs off / dust-like coating. Failed CLEANING = ghost images / repeating spots from the previous page. |
| --- |

# **7. T-568A vs T-568B Wiring**

RJ-45 ethernet has two valid pinouts. The only difference is the position of the GREEN and ORANGE pairs.

*T-568A vs T-568B — only pins 1, 2, 3, 6 differ*

## **What you need to remember**

- **T-568B **is the modern standard for office and data center installations. Both ends wired B = straight-through cable.

- **T-568A **is the older standard, still used in some residential and government installs. Both ends wired A = straight-through cable.

- **A on one end and B on the other **= CROSSOVER cable. Used to connect like devices directly (PC ↔ PC, switch ↔ switch on older gear). Modern equipment has auto-MDIX which compensates for this.

- **ACCIDENTAL 568A/568B mismatch **creates an unintentional crossover. May or may not work depending on auto-MDIX support. The exam phrases this as 'wiring standard mismatch'.

# **8. Memory Hierarchy — Speed vs Distance**

The memory hierarchy is tested directly (Q16 on your Exam #1) and as background for many questions. The rule never changes: CLOSER to the CPU = FASTER but SMALLER.

*Memory hierarchy — fastest at the top, largest at the bottom*

## **Reading the pyramid**

- **Registers **are inside the CPU core itself — they hold values the CPU is actively working on right now.

- **L1 cache **is on each CPU core, dedicated to that core. Smallest and fastest cache level. THIS is what 'smallest and fastest cache closest to the processor' refers to.

- **L2 cache **is per-core, slightly larger and slower than L1.

- **L3 cache **is SHARED across all cores. Largest cache level, but slower than L1/L2.

- **System RAM **lives on DIMM modules off the CPU die. Way larger but ~100x slower than L1.

- **SSD / HDD **are storage — when RAM is full, the OS uses disk space as VIRTUAL MEMORY overflow.

| **The pattern that bit you: **On Q16 you picked L4 for 'smallest and fastest closest to CPU'. The relationship is inverse: lower number = smaller + faster + closer. L4 exists on some specialty CPUs but is BIGGER and SLOWER than L3, not closer. Memorize: L1 < L2 < L3 < (L4 if present) in both size and speed. |
| --- |

# **Quick reference card — recap**

Print this page and stick it next to your study area:

| **Visual cue** | **Identification** |
| --- | --- |
| Largest pin block on motherboard, 2×12 grid | 24-pin ATX (mainboard power) |
| Smaller pin block, near CPU socket | 8-pin EPS (CPU power) |
| Longest horizontal slot, often topmost | PCIe x16 (GPU) |
| Short PCIe slot, ~half the length of x16 | PCIe x8 |
| Tiny stub PCIe slot | PCIe x1 |
| Long stick of RAM, ~5 inches | DIMM (desktop) |
| Short stick of RAM, ~2.5 inches | SODIMM (laptop) |
| Round metal fiber connector with bayonet | ST |
| Square plastic fiber connector with push-pull | SC |
| Small fiber connector with RJ-style clip | LC |
| Silver coin cell on motherboard | CMOS battery (CR2032) |
| Long thin slot with screw post | M.2 slot (NVMe) |
| Small L-shaped 7-pin connector at edge | SATA data port |