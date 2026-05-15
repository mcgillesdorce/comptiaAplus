**CompTIA A+ Core 1 (220-1101)**

**Deep-Dive Study Guide — Volume 2**

*Built from Practice Exams #1 and #2 — full topic refreshers*

Topics covered:

Cabling & Connectors • Memory & Storage • CPU & Cache • Motherboards & Buses • Form Factors • Printer Imaging • Boot Errors • Network Sharing • Performance Metrics

# **1. Cabling ****&**** Connectors — Full Refresher**

You missed Q18 (split pair vs crosstalk) and Q66 (ST connector). Cabling is one of the most heavily-tested A+ areas — 6-10 questions per exam covering copper, fiber, and the symptoms when cables go bad. Treat this section as a ground-up rebuild.

## **1.1 Copper cable categories**

CompTIA A+ tests Category (Cat) cabling extensively. Memorize the speed and max distance for each.

| **Category** | **Max Speed** | **Max Distance** | **Used For** |
| --- | --- | --- | --- |
| Cat 3 | 10 Mbps | 100 m | Old phone/ethernet (legacy) |
| Cat 5 | 100 Mbps | 100 m | Fast Ethernet (legacy) |
| Cat 5e | 1 Gbps | 100 m | Most modern home/office |
| Cat 6 | 1 Gbps (10 Gbps to 55 m) | 100 m / 55 m at 10G | Modern offices, some data centers |
| Cat 6a | 10 Gbps | 100 m | Data centers, high-density |
| Cat 7 | 10 Gbps | 100 m | Shielded enterprise (less common) |
| Cat 8 | 25-40 Gbps | 30 m | Data center server-to-switch only |

| **100 meter rule: **Every twisted-pair ethernet cable maxes out at 100 m (328 ft). Beyond that, you need a repeater, switch, or fiber. Cat 8 is the exception at 30 m — it's only for short runs in racks. This is the most-tested distance fact on the exam. |
| --- |

## **1.2 STP vs UTP — and why twists matter**

**UTP **(Unshielded Twisted Pair): standard ethernet cable. No metal shielding around the pairs. Cheap, flexible, easy to terminate.

**STP **(Shielded Twisted Pair): foil or braid shielding around each pair AND/OR the whole bundle. Resists EMI from motors, fluorescent lights, industrial equipment. More expensive, harder to terminate.

**The twists **in twisted pair cable are what cancel out electromagnetic interference between adjacent pairs. The TIGHTER the twist, the more interference is cancelled — that's how Cat 6 achieves higher speeds than Cat 5e on the same copper.

| **Q18 trap (the question you missed): **The cable was STP (shielded), but the PAIRS NEAR THE CONNECTOR weren't fully twisted. That untwisted section = no cancellation = adjacent pairs leak signal into each other = CROSSTALK. The shield doesn't help with internal pair-to-pair interference, only external EMI. |
| --- |

## **1.3 Copper cable problems — symptom matching**

This is the single most important table for cable troubleshooting questions:

| **Problem** | **Cause** | **Symptom** |
| --- | --- | --- |
| Crosstalk | Pairs not twisted enough / EMI leak between pairs | Intermittent connectivity, slow speeds, packet errors |
| Split pair | Wires from DIFFERENT pairs used together (e.g., wires 1&3 instead of 1&2) | Link works but with high error rate; passes basic continuity test but fails speed tests |
| Tx/Rx reverse | Transmit and receive pins swapped | No link at all; needs crossover or auto-MDIX |
| 568A/568B mismatch | One end wired A, other end wired B (without intent) | Creates accidental crossover; modern auto-MDIX may compensate |
| Open / Break | Wire physically broken | No link, fails continuity test |
| Short | Two conductors touching | No link, fails continuity test |
| EMI | External electromagnetic interference (motors, lights) | Intermittent issues, errors near interference sources |
| Attenuation | Signal loss over distance | Works near switch, fails at far end of run |

| **Crosstalk vs split pair — the key distinction: **CROSSTALK = signal LEAKS between adjacent pairs (electromagnetic bleed). Caused by untwisted/poorly-twisted pairs near connectors. SPLIT PAIR = pairs are WIRED WRONG — wires that should be partners are split across different pairs. A continuity tester will say 'pass' on split pair (1-1, 2-2, etc.) but a wire-map tester will show the pair groupings are wrong. |
| --- |

## **1.4 T-568A vs T-568B wiring**

Both are RJ-45 ethernet pin-outs. The only difference is the position of the green and orange pairs.

| **Pin** | **T-568A** | **T-568B** |
| --- | --- | --- |
| 1 | White/Green | White/Orange |
| 2 | Green | Orange |
| 3 | White/Orange | White/Green |
| 4 | Blue | Blue |
| 5 | White/Blue | White/Blue |
| 6 | Orange | Green |
| 7 | White/Brown | White/Brown |
| 8 | Brown | Brown |

- **Both ends 568A or both ends 568B = **straight-through cable (PC ↔ switch)

- **One end 568A, other end 568B = **crossover cable (PC ↔ PC, switch ↔ switch on older gear)

- **T-568B **is the standard for modern office and data center installations.

## **1.5 Connector types — full reference**

| **Connector** | **Cable Type** | **Used For** |
| --- | --- | --- |
| RJ-45 | Cat 5/5e/6/6a/7 (UTP/STP) | Ethernet |
| RJ-11 | Twisted pair, 4 pin | Telephone, DSL |
| F-type | Coaxial (RG-6, RG-59) | Cable TV, cable modem |
| BNC | Coaxial | Older networks, video, RF |
| RS-232 / DB-9 | Serial cable | Console access, legacy peripherals |
| ST (fiber) | Fiber optic | Round, BAYONET twist-lock (old-style) |
| SC (fiber) | Fiber optic | Square, push-pull (most common datacom) |
| LC (fiber) | Fiber optic | Small, RJ-style clip (modern SFP/high-density) |
| MTRJ (fiber) | Fiber optic | Looks like RJ-45 but for fiber (rare) |
| Lightning | Apple proprietary | iPhone/iPad up to iPhone 14 |
| USB-C | Universal | Phones, laptops, monitors, peripherals |

| **Fiber connector visual cues (Q66 — what bit you): **ST = round metal barrel with bayonet twist-lock. Looks like an old BNC TV connector. SC = square plastic body with a push-pull mechanism. LC = small square with a clip like RJ-45. You picked SC for what was an ST (round bayonet). Memorize: 'ST = Stick & Twist' = round bayonet. The connectors with two side-by-side dark plugs and metal collars in your exam image were ST. |
| --- |

## **1.6 Other cable types**

| **Cable** | **Connector** | **Purpose** |
| --- | --- | --- |
| RG-6 | F-type | Cable TV, cable modem internet |
| RG-59 | F-type / BNC | Older CCTV, short coax runs |
| Plenum-rated | Various | Fire-resistant jacket for air ducts/plenum spaces |
| Direct burial | Various | Outdoor underground runs |
| Single-mode fiber (SMF) | ST, SC, LC | Long distance (km+), yellow jacket, laser source |
| Multi-mode fiber (MMF) | ST, SC, LC | Short distance (datacenter), orange/aqua jacket, LED source |
| DisplayPort | DP | Video, computer to monitor (royalty-free) |
| HDMI | HDMI | Video + audio (TVs, monitors) |
| VGA | DB-15 | Analog video (legacy) |
| DVI | DVI-D/I/A | Digital/analog video (legacy) |
| Thunderbolt 3/4 | USB-C shape | Up to 40 Gbps, video + data + power |

| **Single-mode vs Multi-mode fiber: **Single-mode (SMF) = one path for light, uses a laser, goes long distances (10+ km), yellow jacket. Multi-mode (MMF) = many paths, uses LED, short distances (up to 2 km), orange or aqua jacket. SMF is for between buildings or telco. MMF is for within a data center. |
| --- |

# **2. Memory (RAM) — Full Refresher**

You missed Q20 (virtual memory), Q37 (ECC for server fault tolerance), and Q75 (SODIMM for laptop). Memory is 5-7 questions per exam. Build the full mental model.

## **2.1 Memory form factors (the physical stick)**

| **Type** | **Size** | **Use Case** | **Pins (DDR4 example)** |
| --- | --- | --- | --- |
| DIMM | Full-size (~5.25 in) | Desktops, servers | 288 |
| SODIMM | Half-size (~2.66 in) | Laptops, small form factor PCs, NUCs | 260 |
| MicroDIMM | Tiny | Ultraportables (rare today) | varies |

| **Q75 — RAM for a laptop: **Laptops use SODIMM (Small Outline DIMM). Always. If a question mentions 'laptop' + 'RAM', the answer is SODIMM. DIMM is desktop-only. GDDR is graphics memory (soldered to GPU, not user-installable). VRAM is the general term for video RAM. |
| --- |

## **2.2 DDR generations — speed and pin count**

| **Generation** | **DIMM Pins** | **SODIMM Pins** | **Voltage** | **Speed (typical)** |
| --- | --- | --- | --- | --- |
| DDR1 | 184 | 200 | 2.5 V | 200-400 MT/s |
| DDR2 | 240 | 200 | 1.8 V | 400-1066 MT/s |
| DDR3 | 240 | 204 | 1.5 V | 800-2133 MT/s |
| DDR4 | 288 | 260 | 1.2 V | 1600-3200 MT/s |
| DDR5 | 288 | 262 | 1.1 V | 4800-8400 MT/s |

| **Critical: **Different DDR generations are NOT compatible — they have different notch positions to physically prevent installing the wrong type. DDR4 won't fit in a DDR3 slot. Same pin count between DDR3 and DDR4 DIMMs (240 vs 288) — they're physically incompatible. |
| --- |

## **2.3 Memory features — ECC, parity, channels**

| **Feature** | **What It Does** | **Use Case** |
| --- | --- | --- |
| Non-parity | No error checking | Standard desktop RAM |
| Parity | Detects single-bit errors (can't correct) | Older systems, mostly obsolete |
| ECC | Error-Correcting Code — detects AND corrects single-bit errors | Servers, workstations, mission-critical |
| Single-channel | RAM operates one stick at a time | Budget systems, single DIMM installs |
| Dual-channel | 2 sticks operate in parallel = 2x bandwidth | Most modern desktops (install in pairs) |
| Triple-channel | 3 sticks in parallel | Older Intel X58 (rare now) |
| Quad-channel | 4 sticks in parallel | HEDT / workstation / server platforms |
| Buffered/Registered (RDIMM) | Has buffer chip between memory and CPU | Servers — improves stability at high capacity |
| Unbuffered (UDIMM) | Direct connection, no buffer | Standard desktop RAM |

| **Q37 — server memory with corruption protection: **Servers need ECC. The keyword in the question is 'continue working even if there is an issue that corrupts data in memory.' ECC catches and CORRECTS single-bit errors automatically. Dual-channel improves PERFORMANCE, not data integrity. Non-parity = no protection. Always: server + data integrity = ECC. |
| --- |

## **2.4 Memory by purpose**

| **Type** | **What It Is** | **Where Used** |
| --- | --- | --- |
| RAM (system) | Main memory — temporary working space for OS and apps | Motherboard DIMM/SODIMM slots |
| VRAM | Video RAM — general term for memory on a GPU | Graphics cards |
| GDDR (3/5/6/6X) | Graphics DDR — specific high-speed VRAM type | Soldered to GPU board |
| HBM | High Bandwidth Memory — stacked VRAM | Workstation/AI GPUs |
| Cache (L1/L2/L3) | Tiny ultra-fast SRAM inside the CPU | CPU die |
| Virtual memory | Hard disk space used as RAM overflow (pagefile/swap) | Disk — invisible to user |
| ROM / Flash | Non-volatile storage | BIOS/UEFI chip |

| **Q20 — temporary storage on HDD when RAM is full: **That's VIRTUAL MEMORY (called pagefile.sys on Windows, swap on Linux). The OS uses disk space as overflow when physical RAM runs out. It's slow because disk is slower than RAM, but it prevents out-of-memory crashes. NOT VRAM (that's graphics memory). |
| --- |

# **3. CPU ****&**** Cache Hierarchy**

## **3.1 The cache pyramid**

Memory access in a modern PC happens in a strict hierarchy. Closest to the CPU = fastest but smallest. Furthest = slowest but largest.

| **Level** | **Size (typical)** | **Speed** | **Location** |
| --- | --- | --- | --- |
| CPU Registers | Bytes | ~1 cycle | Inside CPU core |
| L1 cache | 32-128 KB per core | 2-4 cycles | On each CPU core (split: instruction + data) |
| L2 cache | 256 KB - 1 MB per core | 10-12 cycles | Per core, slightly farther |
| L3 cache | 4-128 MB shared | 30-50 cycles | Shared across all cores |
| System RAM | 8-128 GB | 200-300 cycles | Off-chip DIMMs |
| SSD | TB | ~100,000 cycles | Storage bus |
| HDD | TB | ~10 million cycles | Storage bus |

| **Q16 — smallest and fastest cache closest to CPU: **L1. Always L1. The rule: lower number = smaller + faster + closer. L1 < L2 < L3 in both size and distance. L4 cache exists on some CPUs but is even SLOWER and bigger than L3, not closer. You inverted the direction. |
| --- |

## **3.2 CPU sockets you should recognize**

| **Socket Family** | **CPU Vendor** | **Generation / Use** |
| --- | --- | --- |
| LGA 1200 | Intel | 10th/11th gen Core (2020-2021) |
| LGA 1700 | Intel | 12th/13th/14th gen Core (current consumer) |
| LGA 2066 | Intel | HEDT Core X-series |
| LGA 3647 / 4189 | Intel | Xeon server |
| AM4 | AMD | Ryzen 1000-5000 series |
| AM5 | AMD | Ryzen 7000+ series (current) |
| TR4 / sTRX4 / sTR5 | AMD | Threadripper HEDT |
| SP3 / SP5 | AMD | EPYC server |

## **3.3 CPU features the exam tests**

- **Multi-core: **Multiple physical CPU cores on one die (dual, quad, hex, octa, etc.)

- **Hyperthreading / SMT: **Each core can run 2 threads (Intel = Hyperthreading, AMD = SMT). 4 cores + HT = 8 logical processors.

- **32-bit vs 64-bit: **32-bit CPUs max out at 4 GB addressable RAM. 64-bit CPUs handle terabytes.

- **Virtualization (Intel VT-x / AMD-V): **Required for running VMs and Hyper-V/WSL2. Often disabled in BIOS by default.

- **ARM vs x86/x64: **ARM (Apple Silicon, mobile, Snapdragon laptops) = low power. x86/x64 = traditional PC architecture.

# **4. Motherboards, Buses ****&**** Form Factors**

## **4.1 Form factors — size hierarchy**

You missed Q12 (smallest form factor). Memorize this order from LARGEST to SMALLEST:

| **Form Factor** | **Size** | **Notes** |
| --- | --- | --- |
| E-ATX (Extended ATX) | 12 × 13 in | High-end / dual-socket / extreme builds |
| ATX | 12 × 9.6 in | Standard desktop tower |
| mATX (Micro-ATX) | 9.6 × 9.6 in | Compact desktop, fewer expansion slots |
| Mini-ITX (mITX) | 6.7 × 6.7 in | Smallest mainstream — SFF builds, HTPCs |
| Nano-ITX / Pico-ITX | <5 in | Embedded / industrial (rare on A+) |

| **Q12 — smallest form factor: **mITX (Mini-ITX) at 6.7 inches square. Don't get tricked by 'ITX' as a separate option — on the A+ exam, ITX alone isn't a real form factor name; mITX/Mini-ITX is the actual standard. Size order from biggest to smallest: E-ATX > ATX > mATX > mITX. |
| --- |

## **4.2 Motherboard components — visual ID**

Q83 (PATA vs USB connector PBQ): the 24-pin (or 20+4 pin) ATX MAINBOARD POWER connector is a large rectangular block of pins, usually white or black, near one edge of the board. PATA was a wide 40-pin ribbon-cable header on OLDER boards; modern boards rarely have it.

| **Component** | **Visual Cue** | **Purpose** |
| --- | --- | --- |
| 24-pin ATX (Mainboard power) | Largest connector on board, white block, 24 holes in 2x12 layout | Main power from PSU |
| 4/8-pin CPU power (EPS) | Smaller square near CPU socket | Dedicated CPU power |
| CPU socket | Square area in center w/ pins or pads, lever arm | Holds the processor |
| DIMM slots | Tall thin parallel slots near CPU, clips on both ends | RAM |
| PCIe x16 | Longest expansion slot | GPU |
| PCIe x8 / x4 / x1 | Progressively shorter slots | Add-in cards |
| SATA ports | Small L-shaped 7-pin connectors at edge | Drive data |
| M.2 slot | Long thin slot with screw post | NVMe SSDs |
| CMOS battery | Silver coin cell (CR2032) | Maintains BIOS settings |
| Front panel header | Pin grid near edge, for case buttons/LEDs | Power/reset/LEDs/USB |
| Fan headers | 4-pin (PWM) or 3-pin connectors | Case/CPU fans |
| PATA / IDE (legacy) | Wide 40-pin ribbon header (no longer on modern boards) | Legacy hard drives |
| AGP (legacy) | Brown slot, between PCI and CPU (90s/2000s only) | Old graphics cards |

## **4.3 Expansion buses — PCI vs PCIe vs AGP**

Q65: PCIe uses point-to-point lanes. Memorize this distinction cold.

| **Bus** | **Architecture** | **Era** | **Speed** |
| --- | --- | --- | --- |
| ISA | Parallel shared bus | 1980s-1990s | 8/16 MHz, ~16 MB/s |
| PCI | Parallel SHARED bus (all devices share bandwidth) | Mid 1990s-2000s | 133 MB/s shared |
| AGP | Point-to-point, GPU only | Late 1990s-2000s | 266 MB/s to 2.1 GB/s |
| PCI-X | Wider/faster parallel PCI (servers) | Early 2000s | Up to 1 GB/s |
| PCIe | Point-to-point LANES (each device gets dedicated bandwidth) | 2003-present | x1: 1 GB/s (Gen 3); x16: 16 GB/s (Gen 3); doubles each gen |

| **Q65 — point-to-point lanes: **That's PCIe (PCI Express). Old PCI used a SHARED parallel bus — all devices fought for the same bandwidth. PCIe gives each slot its own dedicated lane(s) point-to-point with the chipset/CPU. That's why a PCIe x16 GPU isn't bottlenecked by a PCIe x1 sound card in the same system. |
| --- |

### **PCIe generations**

| **Generation** | **Year** | **Per-lane speed** | **x16 total** |
| --- | --- | --- | --- |
| PCIe 1.0 | 2003 | 250 MB/s | 4 GB/s |
| PCIe 2.0 | 2007 | 500 MB/s | 8 GB/s |
| PCIe 3.0 | 2010 | ~1 GB/s | ~16 GB/s |
| PCIe 4.0 | 2017 | ~2 GB/s | ~32 GB/s |
| PCIe 5.0 | 2019 | ~4 GB/s | ~64 GB/s |
| PCIe 6.0 | 2022 | ~8 GB/s | ~128 GB/s |

# **5. Printers — Imaging Process ****&**** Sharing**

## **5.1 The 7-step laser imaging process**

You missed Q57 (process order). MEMORIZE THIS SEQUENCE — it's tested verbatim on the exam:

| **#** | **Step** | **What Happens** |
| --- | --- | --- |
| 1 | Processing | Printer receives and processes the data (raster image / page description) |
| 2 | Charging | Primary charge roller applies uniform negative charge (~-600V) to the drum |
| 3 | Exposing | Laser writes the image on the drum, neutralizing charge where toner should stick |
| 4 | Developing | Toner is attracted to the discharged (exposed) areas of the drum |
| 5 | Transferring | Transfer roller charges the PAPER, pulling toner from drum onto paper |
| 6 | Fusing | Fuser applies HEAT + PRESSURE to melt toner permanently onto the paper |
| 7 | Cleaning | Drum is cleaned/discharged in preparation for the next page |

| **Memory device: **'Please Charge Every Day To Finish Cleaning' = Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning. Always starts with Processing (the data has to come in first). Always ends with Cleaning (drum prep for the next page). Charging comes BEFORE Exposing (you can't write to an uncharged drum). |
| --- |

## **5.2 Printer component failure → symptom**

| **Component** | **Job** | **Symptom if Failed** |
| --- | --- | --- |
| Pickup roller | Grabs paper from tray | Paper jams, won't feed, multiple sheets |
| Separation pad | Ensures only ONE sheet feeds | Multiple sheets pulled at once |
| Primary charge roller | Charges DRUM uniformly | Blank pages, washed-out output |
| Imaging drum | Holds the electrostatic image | Ghost images, repeating spots |
| Laser/scanner unit | Writes image to drum | White lines, missing data |
| Toner cartridge | Holds toner powder | Faded prints, streaks when low |
| Transfer roller/belt | Charges PAPER so toner jumps to it | Toner doesn't stick, faint output |
| Fuser assembly | Melts toner onto paper (heat + pressure) | Toner rubs off, dust-like coating, smearing |
| Duplexer | Flips paper for 2-sided printing | Duplex jams, no 2-sided output |

## **5.3 Inkjet ****&**** thermal printers**

- **Inkjet: **Print head sprays liquid ink through nozzles. Issues: clogged nozzles → use cleaning utility. Belt/carriage moves the head.

- **Thermal: **Heats specially-coated paper to create the image. No ink, no toner. Used for receipts, shipping labels. Replacement: thermal paper + occasionally clean the heating element.

- **Impact (dot matrix): **Pins strike a ribbon against paper. Used for multi-part forms (carbon copy). Replacement: ribbon.

- **3D printers: **Filament (FDM) or resin (SLA). Bed leveling, filament jams are the common issues.

## **5.4 Printer sharing methods (Q55)**

Q55: friend's printer is broken, they need to share yours, NO additional cost. Answer: enable Windows Printer Sharing.

| **Method** | **Cost** | **How** |
| --- | --- | --- |
| Windows Printer Sharing | Free | Share via Settings → Printers → Properties → Sharing tab |
| Print server appliance | $$ | Dedicated hardware to share a USB printer over network |
| Wireless print server | $$ | USB printer → wireless adapter → network |
| Network printer | $$$ | Buy a printer with built-in ethernet/WiFi |
| Cloud print | Free/varies | Service-based (e.g., Mopria, manufacturer apps) |

# **6. Boot Errors ****&**** Storage Troubleshooting**

## **6.1 ****'****OS not found****'**** / ****'****Operating System not found****'**** (Q71)**

You picked 'repartition the hard disk' — that would DESTROY data. The correct first step is much less destructive.

### **Troubleshooting ladder (least to most destructive)**

| **Step** | **Action** | **When** |
| --- | --- | --- |
| 1 | Check BIOS/UEFI — is the drive detected? | Always first |
| 2 | Check boot order — is the OS drive first? | If detected but won't boot |
| 3 | Check SATA/power cables | If drive not detected |
| 4 | Boot from install media → repair → bootrec /fixmbr (BIOS) or bcdboot (UEFI) | MBR / boot record damage |
| 5 | bootrec /fixboot, /rebuildbcd | Boot configuration data damaged |
| 6 | Run chkdsk | Suspected file system corruption (not OS not found) |
| 7 | Reinstall OS over existing partition | OS files damaged but data wanted preserved |
| 8 | Repartition + clean install | LAST RESORT — wipes data |

| **Q71 trap: **'OS not found' typically means the MBR (Master Boot Record) or boot configuration is corrupted, but the drive and OS files are fine. REPAIR THE MBR — non-destructive, takes 30 seconds. Repartitioning wipes everything. chkdsk scans files but won't fix a missing boot record. Always pick the LEAST destructive working fix. |
| --- |

## **6.2 Common boot/storage errors and fixes**

| **Error / Symptom** | **Likely Cause** | **Fix** |
| --- | --- | --- |
| No boot device | BIOS doesn't see drive or boot order wrong | Check BIOS, cables, boot order |
| Operating system not found | MBR/boot record corruption | bootrec /fixmbr, /fixboot, /rebuildbcd |
| BOOTMGR is missing | Boot manager file missing/corrupt | Startup repair / bcdboot |
| NTLDR is missing | Boot loader missing (old Windows) | Repair install |
| Inaccessible boot device (BSOD) | Storage driver / partition issue | Boot to Safe Mode, check drivers |
| S.M.A.R.T. failure / clicking | Drive is dying — back up NOW | Replace drive, restore from backup |
| Bad sectors | Surface damage on platters | chkdsk /r — relocates data; plan replacement |
| RAID degraded | One drive in RAID failed | Replace failed drive, let array rebuild |

## **6.3 Storage device types**

| **Type** | **Interface** | **Speed** | **Notes** |
| --- | --- | --- | --- |
| HDD (mechanical) | SATA | 100-200 MB/s | 5400/7200/10K RPM; cheapest per GB |
| SSD (SATA) | SATA | 500-550 MB/s | Limited by SATA bus |
| SSD (NVMe Gen 3) | PCIe x4 M.2 | ~3,500 MB/s | Standard NVMe |
| SSD (NVMe Gen 4) | PCIe x4 M.2 | ~7,000 MB/s | Current high-end consumer |
| SSD (NVMe Gen 5) | PCIe x4 M.2 | ~14,000 MB/s | Newest, needs heatsink |
| External (USB 3.x) | USB-A / USB-C | ~1 GB/s max | Portable |
| External (Thunderbolt) | USB-C shape | Up to 5 GB/s | Mac/high-end laptops |

# **7. Network Performance Metrics — Deep Dive**

Q78 (you missed jitter again — second exam in a row). Lock this in permanently.

| **Metric** | **Definition** | **Real-world Example** | **Trigger Phrase** |
| --- | --- | --- | --- |
| Bandwidth | Theoretical max capacity of the link | 1 Gbps ethernet rated speed | 'rated speed', 'theoretical max', 'link capacity' |
| Throughput | Actual measured data delivered | Speed test shows 750 Mbps on a 1 Gbps link | 'actual', 'real-world', 'measured' |
| Latency | Time a single packet takes A → B | Ping = 30 ms RTT | 'delay', 'ping', 'RTT', 'how long' |
| Jitter | VARIABILITY in latency | Some packets arrive in 30 ms, others in 80 ms — speeding up/slowing down | 'variable', 'inconsistent', 'speeding up and slowing down', 'choppy VoIP', 'video stutters' |
| Packet loss | % of packets that never arrive | 5% loss = 1 in 20 packets dropped | 'dropped', 'missing' |

| **Why jitter destroys VoIP: **Voice and video are real-time. They need a STEADY stream of packets at fixed intervals. If packets arrive irregularly (jitter), the receiver hears the voice speed up, slow down, or sound robotic. A high but CONSISTENT latency (say, 200ms steady) sounds delayed but understandable. A low but VARIABLE latency (avg 50ms but jumps 20-200ms) sounds choppy. |
| --- |

| **Q78 — locked-in pattern: **ANY question where Jason/Tim/whoever's voice 'speeds up and slows down' or 'isn't consistent' or 'isn't a steady pace' = JITTER. You missed this on Exam 2 (Q69) AND Exam 1 (Q78). This is now your #1 'never miss again' fact. |
| --- |

# **8. Master Trigger-Phrase Index (v2)**

Updated with every pattern across both exams. Flashcard this entire table.

| **If the question says…** | **Almost certainly the answer is…** |
| --- | --- |
| '5 GHz only' + 'highest throughput' / 'longest 5GHz range' | 802.11ac |
| 3 APs on 2.4 GHz, no interference | Channels 1, 6, 11 at 20 MHz |
| 'highest channel width' on 2.4 GHz | TRAP — wider = MORE interference on 2.4 GHz |
| STP cable, pairs untwisted near connector | Crosstalk |
| Wires from different pairs used together | Split pair |
| No link at all between PC and switch | Tx/Rx reverse or bad cable |
| Ethernet in office or data center | T-568B / Cat 5e or 6 |
| Phone line | RJ-11 |
| Cable internet / cable TV | RG-6 with F-type |
| Serial console | RS-232 |
| Round bayonet twist-lock fiber | ST |
| Square push-pull fiber | SC |
| Small clip, half size of SC fiber | LC |
| Long distance fiber, yellow jacket | Single-mode |
| Short distance fiber, orange/aqua jacket | Multi-mode |
| Laptop + add RAM | SODIMM |
| Server + data corruption protection | ECC |
| Disk used as RAM overflow | Virtual memory / pagefile |
| Graphics card memory | VRAM / GDDR |
| 2 sticks for 2x bandwidth | Dual-channel |
| Smallest + fastest cache, closest to CPU | L1 |
| Largest cache, shared across cores | L3 |
| Run virtual machines | Enable VT-x / AMD-V |
| Smallest mainstream form factor | mITX (Mini-ITX) |
| Large 24-pin connector on motherboard | Mainboard / ATX power |
| Point-to-point lanes between board components | PCIe |
| Shared parallel bus, older | PCI |
| Old brown slot for graphics (90s/2000s) | AGP |
| 2 drives + redundancy | RAID 1 (mirror) |
| 3+ drives, balance speed + redundancy | RAID 5 |
| 4+ drives, max speed + redundancy | RAID 10 |
| Speed only, no redundancy | RAID 0 |
| Variable delay / VoIP speeds up & slows down | Jitter |
| Time for packet to travel A → B | Latency |
| Theoretical link speed | Bandwidth |
| Actual measured speed | Throughput |
| Imaging process order | Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning |
| Ghost images on printout | Imaging drum |
| Toner rubs off / dust-like coating | Fuser |
| Charge applied to PAPER | Transfer roller |
| Charge applied to DRUM | Primary charge roller |
| Paper jams / multiple sheets fed | Pickup roller / separation pad |
| Share USB printer at no extra cost | Enable Windows Printer Sharing |
| Dim screen, image visible with flashlight | Inverter (CCFL) or backlight (LED) |
| No backlight needed, energy efficient | OLED |
| Port flapping, 2 hosts affected | Duplicate MAC address |
| 'OS not found' error | Repair the MBR (bootrec /fixmbr) |
| Drive clicking / S.M.A.R.T. warning | Back up + replace drive |
| File system errors | chkdsk |
| POP3 | 110 |
| IMAP | 143 |
| SMTP | 25 |
| NetBIOS (legacy file sharing) | 137, 138, 139 |
| SMB (modern Windows sharing) | 445 |
| RDP | 3389 |
| HTTPS | 443 |
| SSH | 22 |
| DNS | 53 |
| Multiple customers share physical hardware securely | Multitenancy |

# **9. Drill questions (Dion-style)**

**Q1. **An STP cable is run in a manufacturing area with motors and fluorescent lights. A user complains of intermittent network drops. The technician finds the cable pairs are not twisted properly near the connector. What is the most likely issue?

   A. EMI from external sources

   B. Crosstalk between pairs

   C. Split pair

   D. Open wire

**Answer: ***B — Crosstalk*

**Why: **The SHIELDING blocks external EMI. But shielding doesn't help with INTERNAL pair-to-pair leakage. Untwisted pairs near the connector = crosstalk.

**Q2. **A user reports their laptop is slow and they want to upgrade RAM. Which type should they install?

   A. DIMM

   B. SODIMM

   C. GDDR5

   D. VRAM

**Answer: ***B — SODIMM*

**Why: **Laptops use SODIMM (Small Outline DIMM). DIMM = desktop. GDDR5/VRAM = graphics memory.

**Q3. **A server administrator needs RAM that can detect AND correct single-bit memory errors. Which should be selected?

   A. Non-parity

   B. Parity

   C. ECC

   D. Dual-channel

**Answer: ***C — ECC*

**Why: **ECC = Error-Correcting Code. Parity only DETECTS. Non-parity does neither. Dual-channel is a performance feature, not data integrity.

**Q4. **A workstation displays 'Operating System not found' at boot. Which is the FIRST and LEAST destructive fix to try?

   A. Run chkdsk

   B. Repair the MBR

   C. Repartition the disk

   D. Replace the hard drive

**Answer: ***B — Repair the MBR*

**Why: **MBR (Master Boot Record) damage is the most common cause and least destructive to fix. Repartition wipes data. chkdsk fixes files, not the boot record.

**Q5. **Which is the SMALLEST mainstream motherboard form factor?

   A. ATX

   B. mATX

   C. mITX

   D. E-ATX

**Answer: ***C — mITX*

**Why: **Order from largest to smallest: E-ATX > ATX > mATX > mITX. Mini-ITX at 6.7×6.7 inches is the smallest mainstream form factor.

**Q6. **What is the smallest and fastest CPU cache, located closest to the processor cores?

   A. L1

   B. L2

   C. L3

   D. L4

**Answer: ***A — L1*

**Why: **L1 cache is on each CPU core, smallest (~32-128 KB), fastest (~1-4 cycles). Lower number = smaller + faster + closer.

**Q7. **Which type of memory uses temporary hard disk space when physical RAM is full?

   A. VRAM

   B. ECC

   C. Virtual memory

   D. GDDR5

**Answer: ***C — Virtual memory*

**Why: **Virtual memory (pagefile/swap) is disk space used as RAM overflow. VRAM/GDDR5 are graphics memory. ECC is data integrity.

**Q8. **Which expansion bus uses dedicated point-to-point lanes between the chipset and each device?

   A. AGP

   B. PCI

   C. PCI-X

   D. PCIe

**Answer: ***D — PCIe*

**Why: **PCIe gives each slot its own lane(s). PCI was a shared parallel bus. AGP was point-to-point but only for graphics. PCI-X was just a wider/faster PCI for servers.

**Q9. **Place the laser printer imaging steps in correct order:

   A. Cleaning, charging, developing, exposing, transferring, fusing, processing

   B. Processing, charging, exposing, developing, transferring, fusing, cleaning

   C. Charging, processing, exposing, transferring, developing, fusing, cleaning

   D. Developing, processing, charging, exposing, cleaning, transferring, fusing

**Answer: ***B — Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning*

**Why: **Data comes in first (Processing). Drum must be charged before being written to. Toner sticks to discharged areas. Transfer to paper, fuse, then clean drum for next page.

**Q10. **A user wants to share their USB-connected printer with a coworker at no additional cost. What should they do?

   A. Buy a wireless print server

   B. Buy an inexpensive printer for the coworker

   C. Enable Windows Printer Sharing

   D. Create a guest account for the coworker

**Answer: ***C — Enable Windows Printer Sharing*

**Why: **Free and built-in to Windows. Coworker connects to it as a network printer over the LAN. A guest account doesn't share the printer; a print server costs money.

**Q11. **Which fiber connector uses a round body with a bayonet twist-lock mechanism?

   A. SC

   B. ST

   C. LC

   D. MTRJ

**Answer: ***B — ST*

**Why: **ST = Straight Tip = round + bayonet. SC = square push-pull. LC = small with RJ-style clip. 'Stick and Twist' for ST.

**Q12. **During a VoIP call, the recipient hears the speaker's voice randomly speeding up and slowing down. Which metric explains this?

   A. Latency

   B. Bandwidth

   C. Jitter

   D. Throughput

**Answer: ***C — Jitter*

**Why: **Inconsistent voice pacing = variable delay between packets = jitter. Latency would be a consistent delay. Bandwidth/throughput are about capacity, not timing variation.

**Q13. **A technician finds a wide 40-pin ribbon cable header on an older motherboard. What is this?

   A. SATA

   B. PATA / IDE

   C. USB header

   D. Front panel header

**Answer: ***B — PATA / IDE*

**Why: **PATA (Parallel ATA, also called IDE) used 40-pin ribbon cables for drives. Modern boards use SATA (small L-shaped 7-pin connector).

**Q14. **A technician needs to identify the largest motherboard connector that supplies main power to the board. What is it called?

   A. CPU power (EPS)

   B. Mainboard power (24-pin ATX)

   C. PATA connector

   D. Front panel header

**Answer: ***B — Mainboard power (24-pin ATX)*

**Why: **The 24-pin (or 20+4 pin) ATX connector is the largest on the board and supplies main power from the PSU. EPS is a smaller 4/8-pin CPU-only connector.

# **10. Action plan**

You're at 60% on Exam #2 and unknown on Exam #1. Target: 80%+ on both within 10 days. Here's the sequence:

## **Week 1**

- Day 1 — Cabling deep dive (Section 1). Drill questions 1, 11. Make flashcards for crosstalk vs split pair vs Tx/Rx reverse.

- Day 2 — Memory (Section 2). Drill questions 2, 3, 7. Lock in SODIMM/DIMM/ECC/virtual memory.

- Day 3 — CPU/Cache + Motherboards (Sections 3 & 4). Drills 5, 6, 8, 13, 14. Study a motherboard photo until you can ID everything.

- Day 4 — Printers (Section 5). Drill questions 9, 10. Recite the imaging process out loud from memory.

- Day 5 — Troubleshooting + Performance (Sections 6 & 7). Drill questions 4, 12.

- Day 6 — Section 8 trigger-phrase index. Flashcards. Recall cold from memory.

- Day 7 — Retake Practice Exam #1. Target 75%+.

## **Week 2**

- Day 8-9 — Review missed questions from Exam #1 retake. Drill weak domains specifically.

- Day 10 — Retake Practice Exam #2. Target 80%+.

| **Pass criterion: **When you hit 80%+ on both practice exams TWICE each (different attempts, not the same day), you're ready for the real A+ Core 1. The cert is 650/900 to pass (~72%), but practice exams are tuned harder than the real thing, so 80% on practice = comfortable margin on the real exam. |
| --- |

| **Habit lock-in for jitter: **You missed jitter on BOTH exams. Write this on a sticky note above your monitor: 'Variable delay = jitter. Consistent delay = latency.' Read it daily for the next 7 days. Don't let it bite you a third time. |
| --- |