import express from 'express';
import Student  from '../models/Student.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini if key is provided
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}


/* ═══════════════════════════════════════════════════════════
   ACADEMIC KNOWLEDGE BASE
   Each entry: { keywords[], response }
   Keywords are checked against the lower-cased user message.
═══════════════════════════════════════════════════════════ */
const KB = [

  /* ─── GATE ─────────────────────────────────────────────── */
  {
    keywords: ['gate exam', 'gate preparation', 'gate tips', 'crack gate', 'gate score'],
    response: `📘 **GATE Exam Guide**\n\n**What is GATE?**\nGraduate Aptitude Test in Engineering — gateway to M.Tech admissions and top PSU jobs (ONGC, BHEL, IOCL, etc.).\n\n**Marks distribution (CSE example):**\n| Section | Marks |\n|---|---|\n| Engineering Maths | 15 |\n| General Aptitude | 15 |\n| Technical (CSE) | 70 |\n\n**Winning Strategy:**\n✅ Complete GATE syllabus first — don't go beyond\n✅ Solve PYQs from 2010–2024 (most important!)\n✅ Weekly mock tests + topic-wise analysis\n✅ Make formula sheets and revise daily\n✅ Spend 6–8 hours/day for 6 months\n\n**Top Resources:**\n• 📺 Gate Smashers (YouTube) — excellent free content\n• 📚 Made Easy / ACE Academy books\n• 🔗 [Gate Smashers Playlist](https://www.youtube.com/@GateSmashers)\n\n*Ask me about any specific GATE subject!* 🎯`
  },
  {
    keywords: ['engineering mathematics', 'engg maths', 'gate maths', 'linear algebra', 'calculus gate', 'probability gate', 'discrete math'],
    response: `📐 **Engineering Mathematics (GATE)**\n\n**Syllabus Topics:**\n- **Linear Algebra** — Matrices, Eigenvalues, System of equations\n- **Calculus** — Limits, Derivatives, Integration, Partial derivatives\n- **Probability** — Bayes theorem, Distributions (Normal, Binomial, Poisson)\n- **Discrete Maths** — Sets, Relations, Graph Theory, Combinatorics\n- **Differential Equations** — 1st & 2nd order ODEs\n\n**High-weightage areas:** Linear Algebra + Probability ≈ 10 marks\n\n**Study Tips:**\n✅ Master rank of matrix and system of equations\n✅ Bayes theorem problems are frequently asked\n✅ Practice graph theory problems (MST, shortest path)\n\n📺 **YouTube:** [Gate Smashers — Engineering Maths](https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKLgSnkFiAQPyRZoMzF8R)\n\n*Which topic would you like to dive into?* 🔢`
  },
  {
    keywords: ['digital logic', 'digital circuits', 'boolean algebra', 'k-map', 'karnaugh', 'flip flop', 'logic gates'],
    response: `💡 **Digital Logic (GATE)**\n\n**Key Topics:**\n- Boolean Algebra & Logic Gates (AND, OR, NOT, NAND, NOR, XOR)\n- K-Map Simplification (2, 3, 4 variable)\n- Combinational Circuits (Adders, MUX, Decoder, Encoder)\n- Sequential Circuits (Flip-Flops: SR, JK, D, T)\n- Registers & Counters (Ripple, Synchronous)\n- Finite State Machines (Mealy & Moore)\n- Number Systems (Binary, Octal, Hex, BCD)\n\n**Exam Tips:**\n✅ K-Map questions — very common in GATE\n✅ Know timing diagrams for flip-flops\n✅ Understand Mealy vs Moore output logic\n\n📺 [Gate Smashers — Digital Logic](https://www.youtube.com/playlist?list=PLdo5W4Nhv31Y5GkMFgdFMPxbRSSUrGRpM)\n\n🔑 **Quick fact:** NAND and NOR are universal gates — you can build ANY logic circuit with just NAND (or just NOR) gates.`
  },
  {
    keywords: ['computer organization', 'computer architecture', 'pipelining', 'cache memory', 'instruction cycle', 'addressing modes'],
    response: `🖥️ **Computer Organization & Architecture (GATE)**\n\n**Core Topics:**\n- **Number Representation** — 2's complement, IEEE 754 floating point\n- **ALU Design** — Adder, subtractor, multiplier\n- **Instruction Cycle** — Fetch → Decode → Execute\n- **Addressing Modes** — Immediate, Register, Direct, Indirect, Indexed\n- **Pipelining** — Stages, hazards (structural/data/control), solutions\n- **Cache Memory** — Direct mapped, Set associative, Fully associative\n- **Virtual Memory** — TLB, Page tables, Thrashing\n- **I/O Organization** — DMA, Interrupts, Polling\n\n**GATE Weightage:** ~5–7 marks\n\n**Important Formulas:**\n- Pipeline speedup = n × k / (k + n - 1)\n- Cache hit ratio = hits / (hits + misses)\n\n📺 [Gate Smashers — COA](https://www.youtube.com/playlist?list=PLdo5W4Nhv31bfqa5_mPZ6UMbxKSA9dADk)`
  },
  {
    keywords: ['theory of computation', 'toc', 'automata', 'turing machine', 'regular language', 'context free grammar', 'cfg', 'pda', 'nfa', 'dfa'],
    response: `🤖 **Theory of Computation (GATE)**\n\n**Hierarchy of Languages:**\n\n  Regular  <  CFL  <  CSL  <  Recursively Enumerable\n  DFA/NFA     PDA     LBA     Turing Machine\n\n**Key Topics:**\n- **Finite Automata** — DFA, NFA, ε-NFA, conversion\n- **Regular Expressions** — Building and converting to DFA\n- **Pumping Lemma** — Proving non-regularity\n- **CFGs & PDAs** — Derivation, parse trees, ambiguity\n- **Turing Machines** — Design, decidability, halting problem\n- **Closure Properties** — Which operations preserve each language class\n- **Complexity** — P, NP, NP-complete, NP-hard\n\n**GATE Weightage:** ~7–10 marks (very important!)\n\n📺 [Gate Smashers — TOC](https://www.youtube.com/playlist?list=PLdo5W4Nhv31dEvBaQovzm5bsZ3PnzjMMq)\n\n🔑 **Key Insight:** The Halting Problem is undecidable — no program can always determine if another program halts.`
  },
  {
    keywords: ['algorithms', 'data structures', 'sorting', 'dynamic programming', 'dp', 'graph algorithm', 'greedy', 'backtracking', 'complexity', 'big o'],
    response: `⚡ **Algorithms & Data Structures (GATE)**\n\n**Core Sorting Algorithms:**\n| Algorithm | Best | Avg | Worst | Space |\n|---|---|---|---|---|\n| QuickSort | O(n log n) | O(n log n) | O(n²) | O(log n) |\n| MergeSort | O(n log n) | O(n log n) | O(n log n) | O(n) |\n| HeapSort | O(n log n) | O(n log n) | O(n log n) | O(1) |\n| BubbleSort | O(n) | O(n²) | O(n²) | O(1) |\n\n**Graph Algorithms:**\n- BFS, DFS — O(V+E)\n- Dijkstra — O(V² or E log V with heap)\n- Bellman-Ford — O(VE) — handles negative weights\n- Floyd-Warshall — O(V³) — all-pairs shortest path\n- Kruskal/Prim — MST algorithms\n\n**Dynamic Programming:** Overlapping subproblems + optimal substructure\n- 0/1 Knapsack, LCS, LIS, Matrix Chain Multiplication\n\n📺 [Gate Smashers — Algorithms](https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKLgSnkFiAQPyRZoMzF8R)`
  },
  {
    keywords: ['dbms', 'database', 'sql', 'normalization', 'er model', 'transaction', 'indexing', 'relational algebra'],
    response: `🗄️ **DBMS (GATE)**\n\n**Key Topics:**\n- **ER Model** — Entities, Attributes, Relationships, Cardinality\n- **Relational Model** — Keys (Primary, Foreign, Candidate, Super)\n- **SQL** — SELECT, JOIN (Inner, Outer, Cross), Subqueries, Aggregates\n- **Normalization** — 1NF → 2NF → 3NF → BCNF\n- **Transactions** — ACID properties, Serializability, 2PL\n- **Indexing** — B-Trees, B+ Trees, Hashing\n- **Relational Algebra** — σ (select), π (project), ⋈ (join), ∪, ∩, −\n\n**Normal Forms Quick Reference:**\n- **1NF:** No multivalued/composite attributes\n- **2NF:** 1NF + no partial dependency\n- **3NF:** 2NF + no transitive dependency\n- **BCNF:** Every determinant is a candidate key\n\n**GATE Weightage:** ~8–10 marks\n\n📺 [Gate Smashers — DBMS](https://www.youtube.com/playlist?list=PLdo5W4Nhv31b33kF6MKjt_OfR9oGGGK1u)`
  },
  {
    keywords: ['operating system', 'os gate', 'process scheduling', 'deadlock', 'memory management', 'file system', 'semaphore', 'mutex'],
    response: `⚙️ **Operating Systems (GATE)**\n\n**Core Topics:**\n- **Processes & Threads** — PCB, states, context switching\n- **CPU Scheduling** — FCFS, SJF, Round Robin, Priority, MLQF\n- **Synchronization** — Race condition, Mutex, Semaphore, Monitors\n- **Deadlock** — Conditions, Prevention, Avoidance (Banker's), Detection\n- **Memory Management** — Paging, Segmentation, Virtual memory\n- **Page Replacement** — FIFO, LRU, Optimal\n- **File Systems** — FAT, Inode, Disk scheduling (SSTF, SCAN, C-SCAN)\n\n**Scheduling Formulas:**\n- Turnaround time = Completion − Arrival\n- Waiting time = Turnaround − Burst\n- Response time = First execution − Arrival\n\n**GATE Weightage:** ~8–12 marks (very high!)\n\n📺 [Gate Smashers — OS](https://www.youtube.com/playlist?list=PLdo5W4Nhv31ZTn2P9vF_PNMa4tnx9oj8y)`
  },
  {
    keywords: ['computer networks', 'networking gate', 'tcp ip', 'osi model', 'routing', 'congestion', 'dns', 'http', 'ip address', 'subnet'],
    response: `🌐 **Computer Networks (GATE)**\n\n**OSI Layers (Remember: "Please Do Not Throw Sausage Pizza Away"):**\n| Layer | Name | Protocols |\n|---|---|---|\n| 7 | Application | HTTP, FTP, SMTP, DNS |\n| 6 | Presentation | SSL/TLS, JPEG |\n| 5 | Session | NetBIOS, RPC |\n| 4 | Transport | TCP, UDP |\n| 3 | Network | IP, ICMP, OSPF |\n| 2 | Data Link | Ethernet, PPP |\n| 1 | Physical | Cables, WiFi |\n\n**Important Formulas:**\n- Bandwidth × Propagation delay = Bandwidth-Delay Product\n- Throughput = Window size / RTT\n- Sliding Window: window size = 2^n - 1 (Go-Back-N), 2^(n-1) (Selective Repeat)\n\n**GATE Weightage:** ~8–10 marks\n\n📺 [Gate Smashers — Networks](https://www.youtube.com/playlist?list=PLdo5W4Nhv31dEvBaQovzm5bsZ3PnzjMMq)`
  },

  /* ─── UPSC ──────────────────────────────────────────────── */
  {
    keywords: ['upsc', 'ias', 'civil services', 'ias preparation', 'ias exam', 'upsc tips', 'prelims', 'mains'],
    response: `🏛️ **UPSC Civil Services Exam Guide**\n\n**Exam Structure:**\n- **Prelims** — 2 papers (GS Paper 1 + CSAT) — Objective\n- **Mains** — 9 papers (Essay + GS 1–4 + Optional × 2) — Descriptive\n- **Interview** — Personality test (275 marks)\n\n**GS Paper Topics:**\n- **GS 1:** History, Geography, Society\n- **GS 2:** Polity, Governance, IR\n- **GS 3:** Economy, Science, Environment, Security\n- **GS 4:** Ethics, Integrity, Aptitude\n\n**Preparation Strategy:**\n✅ NCERT books first (6th–12th) — builds foundation\n✅ The Hindu / Indian Express — daily reading\n✅ Vision IAS / Vajiram notes\n✅ Answer writing practice from Day 1 (mains)\n✅ Previous year papers — understand question patterns\n\n📺 [StudyIQ IAS](https://www.youtube.com/@StudyIQEducation) | [UPSC Wallah](https://www.youtube.com/@UPSCWallah)\n\n*Which UPSC subject do you want to study?* 🎯`
  },
  {
    keywords: ['indian history', 'ancient history', 'medieval history', 'modern history', 'freedom struggle', 'british india', 'mughal', 'harappa', 'maurya'],
    response: `📜 **Indian History (UPSC)**\n\n**Ancient India:**\n- Indus Valley Civilization (3300–1300 BCE) — Harappa, Mohenjo-daro\n- Vedic Age → Mahajanapadas → Mauryan Empire\n- **Mauryas:** Chandragupta → Bindusara → Ashoka (promoter of Buddhism)\n- Gupta Period — "Golden Age" of India\n\n**Medieval India:**\n- Delhi Sultanate (1206–1526) — 5 dynasties\n- **Mughal Empire:** Babur → Humayun → Akbar → Jahangir → Shah Jahan → Aurangzeb\n- Bhakti & Sufi movements\n- Vijayanagara Empire, Maratha Empire\n\n**Modern India:**\n- British East India Company → Plassey (1757) → Crown Rule\n- 1857 Revolt — First War of Independence\n- Indian National Congress (1885) → Gandhi → Non-Cooperation, Civil Disobedience, Quit India\n- Independence: 15 August 1947\n\n📺 [History by Unacademy IAS](https://www.youtube.com/@unacademyias) | [StudyIQ History](https://www.youtube.com/@StudyIQEducation)`
  },
  {
    keywords: ['geography upsc', 'indian geography', 'physical geography', 'climate india', 'rivers india', 'monsoon', 'soil types'],
    response: `🌍 **Geography (UPSC)**\n\n**Physical Geography:**\n- **Himalayas** — Young fold mountains, 3 ranges (Himadri, Himachal, Shiwalik)\n- **Northern Plains** — Bhangar (old alluvium) & Khadar (new alluvium)\n- **Peninsular Plateau** — Deccan Plateau, Eastern & Western Ghats\n- **Coastal Plains** — West Coast (narrow) vs East Coast (wide)\n\n**Rivers:**\n- Himalayan rivers (perennial): Indus, Ganga, Brahmaputra\n- Peninsular rivers (seasonal): Godavari, Krishna, Cauvery, Narmada\n\n**Indian Monsoon:**\n- SW Monsoon (June–Sept) — Main rainy season\n- NE Monsoon (Oct–Dec) — Tamil Nadu gets rain\n\n**Soil Types:**\n- Alluvial (most fertile), Black/Regur, Red & Yellow, Laterite, Arid/Desert\n\n📺 [Geography by Mrunal](https://www.youtube.com/@MrunalPatel) | [StudyIQ Geography](https://www.youtube.com/@StudyIQEducation)`
  },
  {
    keywords: ['polity', 'constitution', 'parliament', 'fundamental rights', 'directive principles', 'judiciary', 'federalism', 'amendment'],
    response: `⚖️ **Indian Polity (UPSC)**\n\n**Constitution at a Glance:**\n- Adopted: 26 Nov 1949 | Effective: 26 Jan 1950\n- Longest written constitution in the world\n- **Preamble:** Sovereign, Socialist, Secular, Democratic, Republic\n\n**Fundamental Rights (Part III):**\n- Right to Equality (Art 14–18)\n- Right to Freedom (Art 19–22)\n- Right against Exploitation (Art 23–24)\n- Right to Freedom of Religion (Art 25–28)\n- Cultural & Educational Rights (Art 29–30)\n- Right to Constitutional Remedies (Art 32) — "Heart of Constitution"\n\n**Directive Principles (Part IV):** Non-justiciable guidelines for state policy\n\n**Parliament:**\n- Lok Sabha (Lower House) — 545 members, 5-year term\n- Rajya Sabha (Upper House) — 245 members, 6-year term (permanent)\n\n📺 [Laxmikanth Polity by Unacademy](https://www.youtube.com/@unacademyias)\n\n📚 *Best book: M. Laxmikanth — Indian Polity*`
  },

  /* ─── School Subjects (9–10) ────────────────────────────── */
  {
    keywords: ['class 9', 'class 10', 'cbse', 'school maths', 'school science', 'ncert', '9th', '10th', 'board exam'],
    response: `📚 **Class 9–10 CBSE Study Guide**\n\n**Core Subjects:**\n- **Mathematics** — Real Numbers, Polynomials, Geometry, Trigonometry, Statistics\n- **Science** — Physics (Motion, Light), Chemistry (Atoms, Acids), Biology (Cells, Life)\n- **Social Science** — History, Civics, Geography, Economics\n- **English** — Literature, Grammar, Writing\n\n**Board Exam Tips:**\n✅ NCERT textbook is the Bible — every line matters\n✅ Solve NCERT examples + exercises first\n✅ Last 5 years' board papers — must solve\n✅ Make short notes for revision week\n✅ Diagrams in Science carry marks — practice drawing\n\n**Scoring Subjects:** Social Science & English are easiest to score 90+\n\n📺 [Vedantu Class 9–10](https://www.youtube.com/@VedantuClass910) | [NCERT Official](https://www.youtube.com/@ncertofficial)\n\n*Which specific subject or topic?* 📖`
  },
  {
    keywords: ['pythagorean', 'quadratic', 'polynomial', 'triangles', 'circle class 10', 'arithmetic progression', 'ap gp', 'statistics class'],
    response: `📐 **Class 10 Mathematics — Key Topics**\n\n**Quadratic Equations:**\nFormula: x = [-b ± √(b²-4ac)] / 2a\n- Discriminant: D > 0 → 2 real roots | D = 0 → 1 root | D < 0 → no real roots\n\n**Pythagoras Theorem:**\nIn right triangle: a² + b² = c² (c = hypotenuse)\n\n**Arithmetic Progressions:**\n- nth term: aₙ = a + (n-1)d\n- Sum of n terms: Sₙ = n/2 × [2a + (n-1)d]\n\n**Trigonometry (Important ratios):**\n| Angle | sin | cos | tan |\n|---|---|---|---|\n| 0° | 0 | 1 | 0 |\n| 30° | ½ | √3/2 | 1/√3 |\n| 45° | 1/√2 | 1/√2 | 1 |\n| 60° | √3/2 | ½ | √3 |\n| 90° | 1 | 0 | ∞ |\n\n**Areas:**\n- Circle: πr² | Circumference: 2πr\n- Sector area: (θ/360°) × πr²\n\n📺 [Khan Academy Maths](https://www.youtube.com/@khanacademy)`
  },
  {
    keywords: ['photosynthesis', 'respiration', 'cell', 'nervous system', 'digestive system', 'class 10 biology', 'life processes', 'heredity'],
    response: `🌱 **Class 10 Biology — Life Processes**\n\n**Photosynthesis:**\n6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n- Occurs in chloroplasts (green parts)\n- Light reaction (thylakoid) + Dark reaction/Calvin cycle (stroma)\n\n**Respiration:**\n- **Aerobic:** Glucose → CO₂ + Water + 38 ATP (in mitochondria)\n- **Anaerobic:** Glucose → Lactic acid (muscles) or Ethanol + CO₂ (yeast)\n\n**Digestive System Organs:**\nMouth → Oesophagus → Stomach → Small intestine → Large intestine → Anus\n- **Stomach:** HCl + Pepsin (protein digestion)\n- **Small intestine:** Bile (emulsification), Trypsin, Amylase\n\n**Cell Division:**\n- Mitosis — body growth (2 identical cells)\n- Meiosis — sex cell production (4 haploid cells)\n\n📺 [BYJU'S Biology](https://www.youtube.com/@ByjusClass9To12Science)`
  },

  /* ─── Intermediate (11–12) ──────────────────────────────── */
  {
    keywords: ['class 11', 'class 12', 'intermediate', '11th', '12th', 'plus two', 'jee', 'neet', 'physics wallah'],
    response: `📚 **Class 11–12 (Intermediate) Study Guide**\n\n**Science Stream Subjects:**\n- **Physics** — Mechanics, Waves, Optics, Electricity, Modern Physics\n- **Chemistry** — Physical, Organic, Inorganic\n- **Mathematics** — Calculus, Matrices, Trigonometry, Statistics\n- **Biology** (for NEET) — Botany + Zoology\n\n**Preparation Strategy:**\n✅ NCERT first — JEE & NEET are NCERT-based\n✅ Physics Wallah / Vedantu — excellent free classes\n✅ HC Verma for Physics concepts\n✅ OP Tondon / N Avasthi for Chemistry\n✅ RD Sharma / SL Loney for Maths\n\n📺 [Physics Wallah (PW)](https://www.youtube.com/@PhysicsWallah)\n📺 [Vedantu JEE/NEET](https://www.youtube.com/@VedantuJEENEET)\n\n*Which subject / topic would you like help with?* 🎓`
  },
  {
    keywords: ['newton law', 'kinematics', 'motion', 'force', 'gravitation', 'energy', 'momentum', 'rotational', 'wave', 'optics', 'current electricity', 'electrostatics'],
    response: `⚡ **Physics — Class 11/12 Key Formulas**\n\n**Kinematics:**\n- v = u + at\n- s = ut + ½at²\n- v² = u² + 2as\n\n**Newton's Laws:**\n- 1st: Inertia (no net force → no acceleration)\n- 2nd: F = ma\n- 3rd: Every action has equal & opposite reaction\n\n**Work & Energy:**\n- Work = F × d × cosθ\n- KE = ½mv² | PE = mgh\n- Power = Work/time = Fv\n\n**Waves:**\n- v = fλ (velocity = frequency × wavelength)\n- Speed of light = 3 × 10⁸ m/s\n\n**Ohm's Law:** V = IR\n- Resistors in series: R = R₁ + R₂ + ...\n- Resistors in parallel: 1/R = 1/R₁ + 1/R₂ + ...\n\n**Lenses:** 1/f = 1/v - 1/u | m = v/u\n\n📺 [Physics Wallah](https://www.youtube.com/@PhysicsWallah) — India's best free Physics`
  },
  {
    keywords: ['organic chemistry', 'inorganic chemistry', 'physical chemistry', 'mole concept', 'chemical bonding', 'equilibrium', 'electrochemistry', 'thermodynamics chem'],
    response: `⚗️ **Chemistry — Class 11/12**\n\n**Mole Concept:**\n- 1 mole = 6.022 × 10²³ particles (Avogadro's number)\n- Molar mass = mass of 1 mole in grams\n- Molarity (M) = moles of solute / litres of solution\n\n**Chemical Bonding:**\n- Ionic bond — electron transfer (NaCl)\n- Covalent bond — electron sharing (H₂O, CO₂)\n- Metallic bond — sea of electrons\n- Hybridization: sp³ (tetrahedral), sp² (planar), sp (linear)\n\n**Organic Chemistry Basics:**\n- Functional groups: –OH (alcohol), –COOH (acid), –NH₂ (amine), –CHO (aldehyde)\n- IUPAC naming rules\n- Reactions: Addition, Substitution, Elimination\n\n**Equilibrium (Le Chatelier's Principle):**\nIncreasing concentration of reactant → equilibrium shifts right\nIncreasing temperature → equilibrium shifts towards endothermic reaction\n\n📺 [Unacademy Chemistry](https://www.youtube.com/@unacademy) | [Physics Wallah Chemistry](https://www.youtube.com/@PhysicsWallah)`
  },
  {
    keywords: ['calculus', 'differentiation', 'integration', 'limits', 'matrix', 'determinant', 'probability maths', 'vector', 'three dimensional', '3d geometry'],
    response: `📊 **Mathematics — Class 11/12**\n\n**Differentiation Rules:**\n- d/dx(xⁿ) = nxⁿ⁻¹\n- d/dx(sin x) = cos x\n- d/dx(eˣ) = eˣ\n- d/dx(ln x) = 1/x\n- Chain Rule: d/dx[f(g(x))] = f'(g(x)) × g'(x)\n- Product Rule: d/dx(uv) = u'v + uv'\n\n**Integration:**\n- ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n- ∫sin x dx = -cos x + C\n- ∫eˣ dx = eˣ + C\n\n**Matrix Operations:**\n- Multiplication: (m×n) × (n×p) = (m×p) matrix\n- Determinant 2×2: |a b; c d| = ad - bc\n- Inverse: A⁻¹ = adj(A) / |A|\n\n**Probability:**\n- P(A∪B) = P(A) + P(B) - P(A∩B)\n- Conditional: P(A|B) = P(A∩B)/P(B)\n- Bayes: P(A|B) = P(B|A)×P(A) / P(B)\n\n📺 [Vedantu Maths](https://www.youtube.com/@VedantuMaths12) | [Physics Wallah Maths](https://www.youtube.com/@PhysicsWallah)`
  },

  /* ─── B.Tech ─────────────────────────────────────────────── */
  {
    keywords: ['btech', 'b.tech', 'engineering', 'cse', 'computer science engineering', 'ece', 'mechanical', 'civil engineering'],
    response: `🎓 **B.Tech Study Guide**\n\n**Common First-Year Subjects:**\n- Engineering Mathematics, Physics, Chemistry\n- Basic Programming (C/Python)\n- Engineering Drawing\n- English Communication\n\n**Branch-Specific Core Subjects:**\n\n**CSE:** DSA, OOPs (Java/C++), DBMS, OS, CN, Compiler Design, AI/ML\n\n**ECE:** Signals & Systems, Digital Electronics, Microprocessors, VLSI, Communication Systems\n\n**Mechanical:** Engineering Mechanics, Thermodynamics, Fluid Mechanics, Manufacturing, SOM\n\n**Civil:** Structural Analysis, Geotechnical, Hydraulics, Surveying, RCC Design\n\n**Study Tips:**\n✅ Understand concepts — don't just memorize\n✅ Do lab programs thoroughly\n✅ GATE preparation starts from 2nd year\n✅ Projects on GitHub — builds portfolio\n\n📺 [NPTEL Lectures](https://www.youtube.com/@iit) | [Gate Smashers](https://www.youtube.com/@GateSmashers)\n\n*Which branch and subject?* 🔧`
  },
  {
    keywords: ['data structure', 'dsa', 'linked list', 'tree', 'binary tree', 'stack', 'queue', 'heap', 'hash table', 'graph traversal', 'bfs dfs'],
    response: `🌳 **Data Structures & Algorithms (B.Tech CSE)**\n\n**Linear DS:**\n- **Array** — O(1) access, O(n) insertion\n- **Linked List** — O(n) access, O(1) insertion at head\n- **Stack** — LIFO | Push/Pop O(1) | Uses: recursion, undo, expression eval\n- **Queue** — FIFO | Enqueue/Dequeue O(1) | Uses: BFS, scheduling\n\n**Non-Linear DS:**\n- **Binary Tree** — Each node has ≤ 2 children\n- **BST** — Left < Root < Right | Search O(log n) avg\n- **AVL Tree** — Self-balancing BST | Height = O(log n) always\n- **Heap** — Min-Heap / Max-Heap | Insert/Delete O(log n)\n- **Graph** — Vertices + Edges | Directed/Undirected\n\n**Graph Traversals:**\n- BFS (breadth-first) — uses Queue — finds shortest path (unweighted)\n- DFS (depth-first) — uses Stack/Recursion — cycle detection, topological sort\n\n**Hashing:** Hash function + collision handling (Chaining / Open Addressing)\n\n📺 [Abdul Bari — Algorithms](https://www.youtube.com/@abdul_bari) | [CodeWithHarry DSA](https://www.youtube.com/@CodeWithHarry)`
  },
  {
    keywords: ['oops', 'object oriented', 'java', 'c++', 'class object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction'],
    response: `🧩 **Object-Oriented Programming (B.Tech CSE)**\n\n**4 Pillars of OOP:**\n\n**1. Encapsulation** — Binding data + methods together; hide data with private\n  private int age;  // hidden\n  public int getAge() { return age; }  // controlled access\n\n**2. Abstraction** — Show only what's necessary; hide implementation\n- Abstract classes + Interfaces in Java\n\n**3. Inheritance** — Child class inherits from parent\n- Types: Single, Multiple (Interface), Multi-level, Hierarchical, Hybrid\n- extends (class), implements (interface)\n\n**4. Polymorphism** — Same name, different behavior\n- **Compile-time** (Method Overloading) — same name, different params\n- **Runtime** (Method Overriding) — child overrides parent method\n\n**Java Key Concepts:**\n- Constructor, this, super, static, final keywords\n- Exception handling: try-catch-finally\n- Collections: ArrayList, HashMap, HashSet\n\n📺 [Telusko Java OOPs](https://www.youtube.com/@Telusko) | [CodeWithHarry Java](https://www.youtube.com/@CodeWithHarry)`
  },
  {
    keywords: ['machine learning', 'ml', 'artificial intelligence', 'ai', 'deep learning', 'neural network', 'nlp', 'regression', 'classification'],
    response: `🤖 **Artificial Intelligence & Machine Learning**\n\n**ML Categories:**\n- **Supervised Learning** — Labeled data → Classification & Regression\n- **Unsupervised Learning** — Unlabeled data → Clustering, Dimensionality Reduction\n- **Reinforcement Learning** — Agent learns from rewards\n\n**Key Algorithms:**\n| Algorithm | Type | Use Case |\n|---|---|---|\n| Linear Regression | Supervised | Predicting values |\n| Logistic Regression | Supervised | Classification |\n| Decision Tree | Supervised | Both |\n| Random Forest | Supervised | High accuracy |\n| K-Means | Unsupervised | Clustering |\n| SVM | Supervised | Classification |\n| Neural Networks | Deep Learning | Images, NLP |\n\n**Evaluation Metrics:**\n- Accuracy, Precision, Recall, F1-Score, ROC-AUC\n- MSE, RMSE for regression\n\n**Python Libraries:** NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch\n\n📺 [StatQuest ML](https://www.youtube.com/@statquest) | [3Blue1Brown — Neural Networks](https://www.youtube.com/@3blue1brown)`
  },

  /* ─── Study Tips & General ──────────────────────────────── */
  {
    keywords: ['study tips', 'how to study', 'study method', 'concentration', 'focus', 'memory', 'remember', 'revision'],
    response: `📖 **Effective Study Techniques**\n\n**Proven Methods:**\n\n**1. Pomodoro Technique** 🍅\n- Study 25 min → Break 5 min → Repeat 4× → Long break 30 min\n- Prevents burnout and maintains focus\n\n**2. Active Recall** 🧠\n- Close book → try to recall what you read\n- 3× more effective than re-reading\n\n**3. Spaced Repetition** 📅\n- Review after 1 day → 3 days → 1 week → 2 weeks\n- Use Anki app for automated scheduling\n\n**4. The Feynman Technique** 💡\n- Learn a concept → explain it to a 10-year-old\n- If you can't explain simply, you don't understand it yet\n\n**5. Mind Mapping** 🗺️\n- Draw concept maps instead of linear notes\n- Great for big topics like History, Polity\n\n**Environment Tips:**\n✅ No phone in study room (or use Forest app)\n✅ Study at the same time every day (habit building)\n✅ Good lighting, comfortable chair, no loud music\n✅ Stay hydrated — your brain is 73% water!\n\n*What subject are you finding difficult?* 💪`
  },
  {
    keywords: ['exam stress', 'anxiety', 'nervous', 'scared', 'exam fear', 'time management', 'schedule', 'study plan', 'routine'],
    response: `🧘 **Managing Exam Stress & Time**\n\n**Exam Anxiety Tips:**\n- Deep breathing: Inhale 4s → Hold 4s → Exhale 4s\n- Exercise 30 min/day — reduces cortisol (stress hormone)\n- 7–8 hours of sleep — memory consolidation happens during sleep\n- Talk to someone — don't bottle up stress\n\n**Time Management:**\n\n**Sample Daily Study Schedule:**\n| Time | Activity |\n|---|---|\n| 5:00 AM | Wake up, exercise |\n| 6:00–9:00 AM | Hard subject (fresh mind) |\n| 9:00–10:00 AM | Breakfast + break |\n| 10:00 AM–1:00 PM | Second subject |\n| 1:00–2:00 PM | Lunch + rest |\n| 2:00–5:00 PM | Practice problems |\n| 5:00–6:00 PM | Exercise/walk |\n| 6:00–9:00 PM | Revision + notes |\n| 9:00 PM | Dinner + wind down |\n| 10:30 PM | Sleep |\n\n**Remember:** Consistency beats intensity. 4 hours/day for 6 months > 12 hours/day for 2 weeks. 💪`
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste', 'help me'],
    response: `👋 **Hello! I'm your AI Study Assistant!**\n\nI can help you with:\n\n📚 **Subjects:** GATE, UPSC, Class 9–12, B.Tech\n🎯 **Exam Strategies:** Study plans, time management\n📝 **Concepts:** Detailed explanations with formulas\n🔗 **Resources:** YouTube playlists, best books\n💡 **Study Tips:** Memory techniques, focus methods\n\n**Just ask me anything like:**\n- *"Explain normalization in DBMS"*\n- *"What are Newton's laws?"*\n- *"How to prepare for GATE in 6 months?"*\n- *"Tips to score 90+ in boards"*\n- *"What is recursion in programming?"*\n\n*What would you like to learn today?* 🚀`
  },
  {
    keywords: ['python', 'programming', 'coding', 'recursion', 'function', 'loop', 'array python', 'class python'],
    response: `🐍 **Python Programming Fundamentals**\n\n**Basic Syntax:**\n\`\`\`python\n# Variables\nname = "Student"\nage = 20\n\n# Functions\ndef greet(name):\n    return f"Hello, {name}!"\n\n# Loops\nfor i in range(5):\n    print(i)  # 0 1 2 3 4\n\n# Lists\nnums = [1, 2, 3, 4, 5]\nnums.append(6)  # Add element\nnums.sort()      # Sort in place\n\`\`\`\n\n**Recursion Example:**\n\`\`\`python\ndef factorial(n):\n    if n <= 1: return 1      # base case\n    return n * factorial(n-1) # recursive case\n\nprint(factorial(5))  # 120\n\`\`\`\n\n**OOP in Python:**\n\`\`\`python\nclass Student:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def introduce(self):\n        return f"I am {self.name}, age {self.age}"\n\`\`\`\n\n📺 [CodeWithHarry Python](https://www.youtube.com/@CodeWithHarry) | [Corey Schafer Python](https://www.youtube.com/@coreyms)`
  }
];

/* ═══════════════════════════════════════════════════════════
   RESPONSE GENERATOR
═══════════════════════════════════════════════════════════ */
function generateResponse(message) {
  const msg = message.toLowerCase().trim();

  // Exact match on keywords
  for (const entry of KB) {
    if (entry.keywords.some(kw => msg.includes(kw))) {
      return entry.response;
    }
  }

  // Partial / fuzzy fallback
  const fallbacks = [
    { words: ['what is', 'explain', 'define', 'tell me about'], hint: 'specific topic' },
    { words: ['formula', 'equation', 'how to calculate'], hint: 'formula or calculation' },
    { words: ['exam', 'test', 'paper', 'question'], hint: 'exam preparation' },
    { words: ['best book', 'reference', 'resource', 'youtube'], hint: 'study resources' }
  ];

  for (const fb of fallbacks) {
    if (fb.words.some(w => msg.includes(w))) {
      return `🤔 I'd love to help with that **${fb.hint}**!\n\nCould you be a bit more specific? For example, which subject or topic are you asking about?\n\n**Try asking:**\n- "Explain normalization in DBMS"\n- "What is the Pythagorean theorem?"\n- "How to prepare for GATE OS?"\n- "Best YouTube channel for Physics"\n\n*I have knowledge about GATE, UPSC, School (9–10), Intermediate (11–12), and B.Tech subjects!* 📚`;
    }
  }

  return `🤔 I'm not sure about that specific question, but I'm here to help with your studies!\n\n**I can help with:**\n📘 GATE subjects (DBMS, OS, Networks, Algorithms, TOC, etc.)\n🏛️ UPSC (History, Geography, Polity, Economy)\n📚 School (Class 9–10 Maths, Science, Social)\n⚗️ Intermediate (Physics, Chemistry, Maths)\n💻 B.Tech (DSA, OOPs, AI/ML, Programming)\n\n*Try: "Explain [topic]" or "How to prepare for [exam]"* 🚀`;
}

/* ═══════════════════════════════════════════════════════════
   ROUTES
═══════════════════════════════════════════════════════════ */


/* ── POST /api/chat ───────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { studentId, message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required.' });

    let response = '';

    // Check if we can use Gemini AI
    if (process.env.GEMINI_API_KEY) {
      try {
        if (!genAI) {
          genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        }
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          systemInstruction: "You are EduBot, an interactive, highly knowledgeable academic tutor. Solve math/science problems step-by-step, answer any subject queries (GATE, UPSC, School, B.Tech), keep your tone helpful, and provide neat markdown responses."
        });

        // Retrieve conversation history to act like ChatGPT
        let history = [];
        if (studentId) {
          const studentObj = await Student.findById(studentId).select('chatHistory');
          if (studentObj && studentObj.chatHistory) {
            // Take the last 10 messages for conversational context
            const lastMsgs = studentObj.chatHistory.slice(-10);
            history = lastMsgs.map(h => ({
              role: h.role === 'bot' ? 'model' : 'user',
              parts: [{ text: h.message }]
            }));
          }
        }

        // Start chat with history
        const chatSession = model.startChat({ history });
        const result = await chatSession.sendMessage(message);
        response = result.response.text();
      } catch (aiErr) {
        console.error('Gemini API Error, falling back to KB:', aiErr.message);
        response = generateResponse(message);
      }
    } else {
      // Fallback to offline rule-based knowledge base
      response = generateResponse(message);
    }

    // Persist to chat history if studentId provided
    if (studentId) {
      await Student.findByIdAndUpdate(studentId, {
        $push: {
          chatHistory: {
            $each: [
              { role: 'user', message },
              { role: 'bot',  message: response }
            ]
          }
        }
      });
    }

    res.json({ success: true, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat error.' });
  }
});

/* ── GET /api/chat/:studentId ─────────────────────────────── */
router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).select('chatHistory');
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    // Return last 60 messages
    const history = student.chatHistory.slice(-60);
    res.json({ success: true, chatHistory: history });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

/* ═══════════════════════════════════════════════════════════
   GENERATE AI CAREER ROADMAP (DYNAMIC)
═══════════════════════════════════════════════════════════ */
router.post('/roadmap', async (req, res) => {
  const { educationLevel, stream } = req.body;
  if (!genAI) {
    return res.status(503).json({ error: 'AI is not configured. Please add GEMINI_API_KEY to .env' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are a professional Career Counselor for Indian students. 
      The student's Education Level is: ${educationLevel}.
      Their chosen stream/branch/exam is: ${stream}.
      
      Generate a comprehensive career roadmap containing 3 different highly relevant career paths/jobs for this student.
      Return the data strictly as a JSON array of objects. Do not include markdown code blocks, just pure JSON.
      
      Each object must exactly match this structure:
      {
        "Job Title": "String",
        "Category": "Government or Private",
        "Industry": "String",
        "Eligibility": "String",
        "Required Skills": ["Skill 1", "Skill 2", "Skill 3"],
        "Minimum Qualification": "String",
        "Experience": "Fresher or Experienced",
        "Average Salary": "String in INR (e.g., ₹5,00,000 - ₹8,00,000)",
        "Hiring Companies": ["Comp 1", "Comp 2"],
        "Official Apply Website": "URL",
        "Job Description": "String",
        "Career Growth": "String",
        "Work Location": "String",
        "Job Type": "String",
        "Selection Process": "String",
        "Required Certifications": "String"
      }
    `;

    const result = await model.generateContent(prompt);
    let aiResponse = result.response.text();
    
    // Clean up potential markdown formatting from AI output
    aiResponse = aiResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    const careersArray = JSON.parse(aiResponse);
    res.json({ success: true, careers: careersArray });

  } catch (error) {
    console.error('AI Roadmap Error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap. Please try again.' });
  }
});

export default router;
