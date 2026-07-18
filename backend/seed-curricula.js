import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { Roadmap, Subject, Lesson } from './models/PlatformData.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

// YouTube search URL generator
const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' full tutorial in hindi')}`;

const ALL_CURRICULA = [
  // ─── 10th Class ─────────────────────────────────────────────────
  { title: 'AP State Board', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'Real Numbers', url: yt('Real Numbers class 10 AP Board') },
      { title: 'Polynomials', url: yt('Polynomials class 10') },
      { title: 'Pair of Linear Equations', url: yt('Linear equations two variables class 10') },
      { title: 'Quadratic Equations', url: yt('Quadratic Equations class 10') },
      { title: 'Arithmetic Progressions', url: yt('Arithmetic Progressions AP class 10') },
      { title: 'Trigonometry', url: yt('Trigonometry class 10 AP board') },
      { title: 'Statistics & Probability', url: yt('Statistics Probability class 10') },
    ]},
    { name: 'Physical Science', lessons: [
      { title: 'Heat', url: yt('Heat chapter class 10 physics') },
      { title: 'Acids, Bases & Salts', url: yt('Acids Bases Salts class 10 chemistry') },
      { title: 'Chemical Reactions', url: yt('Chemical Reactions class 10') },
      { title: 'Refraction of Light at Plane Surfaces', url: yt('Refraction light class 10 physics') },
      { title: 'Structure of Atom', url: yt('Structure of Atom class 10') },
    ]},
    { name: 'Biological Science', lessons: [
      { title: 'Nutrition', url: yt('Nutrition class 10 biology') },
      { title: 'Respiration', url: yt('Respiration class 10 biology') },
      { title: 'Transportation', url: yt('Transportation class 10 biology') },
      { title: 'Reproduction', url: yt('Reproduction class 10 biology') },
      { title: 'Coordination', url: yt('Coordination nervous system class 10') },
    ]},
    { name: 'Social Studies', lessons: [
      { title: 'India: Relief Features', url: yt('India Relief Features class 10 geography') },
      { title: 'Modern Period', url: yt('Modern Period class 10 history') },
      { title: 'Indian Economy', url: yt('Indian Economy class 10') },
    ]},
  ]},

  { title: 'TS State Board', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'Real Numbers', url: yt('Real Numbers class 10 TS Board') },
      { title: 'Sets', url: yt('Sets class 10 maths') },
      { title: 'Polynomials', url: yt('Polynomials class 10 TS') },
      { title: 'Quadratic Equations', url: yt('Quadratic Equations class 10 TS board') },
      { title: 'Trigonometry', url: yt('Trigonometry class 10 TS board') },
      { title: 'Statistics', url: yt('Statistics class 10') },
    ]},
    { name: 'Physical Science', lessons: [
      { title: 'Heat', url: yt('Heat chapter class 10') },
      { title: 'Acids, Bases & Salts', url: yt('Acids Bases Salts class 10') },
      { title: 'Refraction of Light', url: yt('Refraction Light class 10') },
      { title: 'Structure of Atom', url: yt('Structure of Atom class 10') },
    ]},
    { name: 'Biological Science', lessons: [
      { title: 'Nutrition', url: yt('Nutrition class 10 biology') },
      { title: 'Respiration', url: yt('Respiration class 10') },
      { title: 'Reproduction', url: yt('Reproduction class 10 biology') },
    ]},
  ]},

  { title: 'CBSE Syllabus', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'Real Numbers', url: 'https://www.youtube.com/watch?v=kz0EK0eWjuk' },
      { title: 'Polynomials', url: yt('Polynomials CBSE class 10') },
      { title: 'Linear Equations in Two Variables', url: yt('Linear Equations class 10 CBSE') },
      { title: 'Triangles', url: yt('Triangles CBSE class 10') },
      { title: 'Coordinate Geometry', url: yt('Coordinate Geometry CBSE class 10') },
      { title: 'Quadratic Equations', url: yt('Quadratic Equations CBSE class 10') },
      { title: 'Probability', url: yt('Probability CBSE class 10') },
    ]},
    { name: 'Science', lessons: [
      { title: 'Chemical Reactions & Equations', url: yt('Chemical Reactions Equations class 10 CBSE') },
      { title: 'Life Processes', url: yt('Life Processes CBSE class 10') },
      { title: 'Light – Reflection & Refraction', url: yt('Light Reflection Refraction class 10') },
      { title: 'Electricity', url: yt('Electricity class 10 CBSE') },
      { title: 'Magnetic Effects of Current', url: yt('Magnetic Effects Current class 10') },
    ]},
    { name: 'Social Science', lessons: [
      { title: 'Nationalism in Europe', url: yt('Nationalism Europe class 10 history') },
      { title: 'Resources and Development', url: yt('Resources Development class 10 geography') },
      { title: 'Democratic Politics', url: yt('Democratic Politics class 10') },
    ]},
  ]},

  { title: 'ICSE Syllabus', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'GST & Banking', url: yt('GST Banking ICSE class 10 maths') },
      { title: 'Quadratic Equations', url: yt('Quadratic Equations ICSE class 10') },
      { title: 'Matrices', url: yt('Matrices ICSE class 10') },
      { title: 'Trigonometry', url: yt('Trigonometry ICSE class 10') },
    ]},
    { name: 'Physics', lessons: [
      { title: 'Force & Work', url: yt('Force Work Energy ICSE class 10 physics') },
      { title: 'Light', url: yt('Light ICSE class 10 physics') },
      { title: 'Sound', url: yt('Sound ICSE class 10 physics') },
    ]},
    { name: 'Chemistry', lessons: [
      { title: 'Periodic Table', url: yt('Periodic Table ICSE class 10') },
      { title: 'Chemical Bonding', url: yt('Chemical Bonding ICSE class 10') },
      { title: 'Electrolysis', url: yt('Electrolysis ICSE class 10') },
    ]},
  ]},

  // ─── After 10th Career Options ────────────────────────────────────────────
  { title: 'After 10th Overview', subjects: [
    { name: 'Science Stream (MPC)', lessons: [
      { title: 'What is MPC?', url: yt('MPC stream after 10th class') },
      { title: 'Engineering Career Path', url: yt('Engineering career after MPC') },
      { title: 'JEE Preparation Basics', url: yt('JEE preparation strategy 11th class') },
    ]},
    { name: 'Commerce Stream (MEC/CEC)', lessons: [
      { title: 'What is Commerce Stream?', url: yt('Commerce stream MEC CEC after 10th') },
      { title: 'CA & Finance Careers', url: yt('CA career path after commerce') },
    ]},
    { name: 'Arts & Humanities (HEC)', lessons: [
      { title: 'Arts Streams Overview', url: yt('Arts Humanities stream after 10th') },
      { title: 'UPSC & Civil Services Path', url: yt('UPSC preparation after arts stream') },
    ]},
    { name: 'Vocational & Skill Courses', lessons: [
      { title: 'ITI & Polytechnic Overview', url: yt('ITI vs Polytechnic after 10th') },
      { title: 'Diploma Courses', url: yt('Diploma courses after 10th class') },
    ]},
  ]},

  { title: 'ITI Courses', subjects: [
    { name: 'Top ITI Trades', lessons: [
      { title: 'Electrician Trade Overview', url: yt('ITI Electrician trade complete guide') },
      { title: 'Fitter Trade Overview', url: yt('ITI Fitter trade syllabus career') },
      { title: 'COPA Trade Overview', url: yt('ITI COPA computer trade') },
      { title: 'Welder Trade Overview', url: yt('ITI Welder trade career') },
      { title: 'Mechanic Trade Overview', url: yt('ITI Mechanic trade motor vehicle') },
    ]},
    { name: 'After ITI Opportunities', lessons: [
      { title: 'Government Jobs via ITI', url: yt('Government jobs after ITI') },
      { title: 'Apprenticeship Programs', url: yt('Apprenticeship program after ITI India') },
      { title: 'Higher Studies After ITI', url: yt('Polytechnic admission after ITI') },
    ]},
  ]},

  // ─── Intermediate / 12th ───────────────────────────────────────────────────
  { title: 'JEE Main', subjects: [
    { name: 'Physics', lessons: [
      { title: 'Mechanics & Kinematics', url: 'https://www.youtube.com/watch?v=1sMVJ-RbPaE' },
      { title: 'Laws of Motion', url: yt('JEE Main Physics Laws of Motion') },
      { title: 'Work, Energy & Power', url: yt('JEE Main Work Energy Power') },
      { title: 'Rotational Motion', url: yt('JEE Main Rotational Motion') },
      { title: 'Waves & Thermodynamics', url: yt('JEE Main Waves Thermodynamics') },
    ]},
    { name: 'Chemistry', lessons: [
      { title: 'Physical Chemistry Basics', url: yt('JEE Main Physical Chemistry') },
      { title: 'Organic Chemistry Basics', url: yt('JEE Main Organic Chemistry') },
      { title: 'Inorganic Chemistry Basics', url: yt('JEE Main Inorganic Chemistry') },
    ]},
    { name: 'Mathematics', lessons: [
      { title: 'Algebra & Quadratics', url: yt('JEE Main Algebra maths') },
      { title: 'Trigonometry', url: yt('JEE Main Trigonometry complete') },
      { title: 'Calculus – Differential', url: yt('JEE Main Differential Calculus') },
      { title: 'Calculus – Integral', url: yt('JEE Main Integral Calculus') },
      { title: 'Coordinate Geometry', url: yt('JEE Main Coordinate Geometry') },
    ]},
  ]},

  { title: 'JEE Advanced', subjects: [
    { name: 'Advanced Physics', lessons: [
      { title: 'Electrostatics & Capacitors', url: yt('JEE Advanced Electrostatics') },
      { title: 'Current Electricity', url: yt('JEE Advanced Current Electricity') },
      { title: 'Magnetism & EMI', url: yt('JEE Advanced Magnetism EMI') },
      { title: 'Optics', url: yt('JEE Advanced Optics complete') },
      { title: 'Modern Physics', url: yt('JEE Advanced Modern Physics') },
    ]},
    { name: 'Advanced Chemistry', lessons: [
      { title: 'Equilibrium', url: yt('JEE Advanced Chemical Equilibrium') },
      { title: 'Electrochemistry', url: yt('JEE Advanced Electrochemistry') },
      { title: 'Organic Reaction Mechanisms', url: yt('JEE Advanced Organic Reactions') },
    ]},
    { name: 'Advanced Mathematics', lessons: [
      { title: 'Complex Numbers', url: yt('JEE Advanced Complex Numbers') },
      { title: 'Probability & Statistics', url: yt('JEE Advanced Probability') },
      { title: '3D Geometry & Vectors', url: yt('JEE Advanced 3D Geometry Vectors') },
    ]},
  ]},

  { title: 'NEET', subjects: [
    { name: 'Biology', lessons: [
      { title: 'Cell Biology & Cell Division', url: 'https://www.youtube.com/watch?v=aMLQBOiD0uQ' },
      { title: 'Plant Physiology', url: yt('NEET Plant Physiology complete') },
      { title: 'Human Physiology', url: yt('NEET Human Physiology complete') },
      { title: 'Genetics & Molecular Biology', url: yt('NEET Genetics Molecular Biology') },
      { title: 'Ecology', url: yt('NEET Ecology full chapter') },
      { title: 'Evolution', url: yt('NEET Evolution chapter') },
    ]},
    { name: 'Physics', lessons: [
      { title: 'Mechanics for NEET', url: yt('NEET Physics Mechanics') },
      { title: 'Optics & Modern Physics', url: yt('NEET Physics Optics Modern') },
    ]},
    { name: 'Chemistry', lessons: [
      { title: 'Organic Chemistry for NEET', url: yt('NEET Organic Chemistry') },
      { title: 'Inorganic Chemistry', url: yt('NEET Inorganic Chemistry') },
    ]},
  ]},

  { title: 'AP EAPCET', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'Algebra for EAPCET', url: yt('AP EAPCET Mathematics Algebra') },
      { title: 'Trigonometry for EAPCET', url: yt('AP EAPCET Trigonometry') },
      { title: 'Calculus for EAPCET', url: yt('AP EAPCET Calculus') },
    ]},
    { name: 'Physics', lessons: [
      { title: 'Mechanics', url: yt('AP EAPCET Physics Mechanics') },
      { title: 'Optics & Modern Physics', url: yt('AP EAPCET Physics Modern') },
    ]},
    { name: 'Chemistry', lessons: [
      { title: 'Physical Chemistry', url: yt('AP EAPCET Chemistry Physical') },
      { title: 'Organic Chemistry', url: yt('AP EAPCET Organic Chemistry') },
    ]},
  ]},

  { title: 'TS EAPCET', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'Algebra for EAPCET', url: yt('TS EAPCET Mathematics Algebra') },
      { title: 'Trigonometry', url: yt('TS EAPCET Trigonometry') },
      { title: 'Calculus', url: yt('TS EAPCET Calculus') },
    ]},
    { name: 'Physics', lessons: [
      { title: 'Mechanics & Kinematics', url: yt('TS EAPCET Physics Mechanics') },
    ]},
    { name: 'Chemistry', lessons: [
      { title: 'Physical Chemistry', url: yt('TS EAPCET Physical Chemistry') },
      { title: 'Organic Chemistry', url: yt('TS EAPCET Organic Chemistry') },
    ]},
  ]},

  // ─── B.Tech / Degree ──────────────────────────────────────────────────────
  { title: 'Data Structures', subjects: [
    { name: 'Arrays & Strings', lessons: [
      { title: 'Array Basics & Operations', url: 'https://www.youtube.com/watch?v=55l-aZ7_name-9-0K1s' },
      { title: 'Two Pointer Technique', url: yt('Two Pointer technique arrays') },
      { title: 'Sliding Window Algorithm', url: yt('Sliding Window algorithm problems') },
      { title: 'String Operations & Hashing', url: yt('String operations hashing DSA') },
    ]},
    { name: 'Linked Lists', lessons: [
      { title: 'Singly Linked List', url: yt('Singly Linked List implementation') },
      { title: 'Doubly Linked List', url: yt('Doubly Linked List operations') },
      { title: 'Linked List Problems', url: yt('Linked List interview problems') },
    ]},
    { name: 'Trees & Graphs', lessons: [
      { title: 'Binary Trees', url: yt('Binary Tree traversal BFS DFS') },
      { title: 'Binary Search Trees', url: yt('Binary Search Tree operations') },
      { title: 'Graph BFS & DFS', url: yt('Graph BFS DFS algorithm') },
      { title: 'Shortest Path Algorithms', url: yt('Dijkstra shortest path algorithm') },
    ]},
    { name: 'Dynamic Programming', lessons: [
      { title: 'DP Introduction & Memoization', url: yt('Dynamic Programming introduction memoization') },
      { title: 'Classic DP Problems', url: yt('Classic DP problems LCS knapsack') },
      { title: 'LeetCode DP Problems', url: yt('LeetCode Dynamic Programming problems') },
    ]},
  ]},

  { title: 'Algorithms', subjects: [
    { name: 'Sorting Algorithms', lessons: [
      { title: 'Bubble, Selection & Insertion Sort', url: yt('Bubble Selection Insertion Sort') },
      { title: 'Merge Sort & Quick Sort', url: yt('Merge Sort Quick Sort algorithm') },
      { title: 'Heap Sort & Counting Sort', url: yt('Heap Sort Counting Sort algorithm') },
    ]},
    { name: 'Searching', lessons: [
      { title: 'Linear & Binary Search', url: yt('Binary Search algorithm complete') },
      { title: 'Binary Search on Answer', url: yt('Binary Search on Answer technique') },
    ]},
    { name: 'Greedy & Divide & Conquer', lessons: [
      { title: 'Greedy Algorithms', url: yt('Greedy algorithms problems examples') },
      { title: 'Divide & Conquer', url: yt('Divide and Conquer algorithm') },
    ]},
  ]},

  { title: 'Operating Systems', subjects: [
    { name: 'Process Management', lessons: [
      { title: 'Processes & Threads', url: yt('OS Processes Threads concepts') },
      { title: 'CPU Scheduling Algorithms', url: yt('CPU Scheduling FCFS SJF Round Robin') },
      { title: 'Deadlocks & Prevention', url: yt('Deadlock OS concepts prevention') },
    ]},
    { name: 'Memory Management', lessons: [
      { title: 'Memory Allocation & Paging', url: yt('OS Memory Management Paging') },
      { title: 'Virtual Memory & Segmentation', url: yt('Virtual Memory Segmentation OS') },
    ]},
    { name: 'File Systems & I/O', lessons: [
      { title: 'File System Structure', url: yt('File System OS concepts') },
      { title: 'Disk Scheduling', url: yt('Disk Scheduling algorithms OS') },
    ]},
  ]},

  { title: 'DBMS', subjects: [
    { name: 'SQL Fundamentals', lessons: [
      { title: 'SQL Basics – DDL & DML', url: yt('SQL basics DDL DML beginners') },
      { title: 'Joins & Subqueries', url: yt('SQL Joins Subqueries complete') },
      { title: 'Aggregate Functions & GROUP BY', url: yt('SQL Aggregate Functions GROUP BY') },
      { title: 'Indexing & Performance', url: yt('SQL Indexing performance tuning') },
    ]},
    { name: 'Database Design', lessons: [
      { title: 'ER Diagrams & Normalization', url: yt('ER Diagram Normalization DBMS') },
      { title: '1NF, 2NF, 3NF Normalization', url: yt('Database Normalization 1NF 2NF 3NF') },
      { title: 'Transactions & ACID Properties', url: yt('ACID Properties Transactions DBMS') },
    ]},
  ]},

  { title: 'Computer Networks', subjects: [
    { name: 'Network Fundamentals', lessons: [
      { title: 'OSI & TCP/IP Model', url: yt('OSI model TCP IP layers explained') },
      { title: 'IP Addressing & Subnetting', url: yt('IP Addressing Subnetting CIDR') },
      { title: 'HTTP, FTP & DNS Protocols', url: yt('HTTP FTP DNS protocols explained') },
    ]},
    { name: 'Transport & Application Layer', lessons: [
      { title: 'TCP vs UDP', url: yt('TCP vs UDP difference explained') },
      { title: 'Sockets & Client-Server Model', url: yt('Socket programming client server') },
    ]},
  ]},

  { title: 'Web Development', subjects: [
    { name: 'HTML & CSS', lessons: [
      { title: 'HTML5 Fundamentals', url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU' },
      { title: 'CSS Flexbox & Grid', url: 'https://www.youtube.com/watch?v=phWxA89Dy94' },
      { title: 'Responsive Design & Media Queries', url: yt('Responsive Design CSS Media Queries') },
    ]},
    { name: 'JavaScript', lessons: [
      { title: 'JavaScript ES6+ Basics', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
      { title: 'DOM Manipulation', url: yt('DOM Manipulation JavaScript') },
      { title: 'Promises, Async/Await', url: yt('Promises Async Await JavaScript') },
      { title: 'Fetch API & REST Calls', url: yt('Fetch API JavaScript REST') },
    ]},
    { name: 'React', lessons: [
      { title: 'React Components & Props', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
      { title: 'useState & useEffect Hooks', url: yt('React Hooks useState useEffect') },
      { title: 'React Router', url: yt('React Router complete tutorial') },
      { title: 'State Management with Redux', url: yt('Redux React state management') },
    ]},
    { name: 'Node.js & Backend', lessons: [
      { title: 'Node.js Fundamentals', url: yt('Node.js complete beginners tutorial') },
      { title: 'Express.js & REST APIs', url: yt('Express.js REST API tutorial') },
      { title: 'MongoDB & Mongoose', url: yt('MongoDB Mongoose Node.js tutorial') },
      { title: 'Authentication with JWT', url: yt('JWT Authentication Node.js Express') },
    ]},
  ]},

  { title: 'Machine Learning', subjects: [
    { name: 'Foundations', lessons: [
      { title: 'Python for ML – NumPy & Pandas', url: yt('Python NumPy Pandas machine learning') },
      { title: 'Statistics & Probability for ML', url: yt('Statistics Probability machine learning') },
      { title: 'Linear Algebra for ML', url: yt('Linear Algebra machine learning') },
    ]},
    { name: 'Supervised Learning', lessons: [
      { title: 'Linear Regression', url: yt('Linear Regression machine learning') },
      { title: 'Logistic Regression', url: yt('Logistic Regression classification') },
      { title: 'Decision Trees & Random Forest', url: yt('Decision Tree Random Forest ML') },
      { title: 'SVM & KNN', url: yt('SVM KNN algorithm machine learning') },
    ]},
    { name: 'Unsupervised Learning', lessons: [
      { title: 'K-Means Clustering', url: yt('K-Means Clustering algorithm') },
      { title: 'Dimensionality Reduction PCA', url: yt('PCA dimensionality reduction') },
    ]},
    { name: 'Model Evaluation', lessons: [
      { title: 'Cross Validation & Overfitting', url: yt('Cross validation overfitting ML') },
      { title: 'Confusion Matrix & Metrics', url: yt('Confusion Matrix precision recall F1 score') },
    ]},
  ]},

  // ─── Higher Studies ───────────────────────────────────────────────────────
  { title: 'GATE Preparation', subjects: [
    { name: 'Engineering Mathematics', lessons: [
      { title: 'Linear Algebra & Matrices', url: yt('GATE Engineering Mathematics Linear Algebra') },
      { title: 'Calculus & Differential Equations', url: yt('GATE Calculus Differential Equations') },
      { title: 'Probability & Statistics', url: yt('GATE Probability Statistics') },
      { title: 'Discrete Mathematics', url: yt('GATE Discrete Mathematics') },
    ]},
    { name: 'CS Core Subjects', lessons: [
      { title: 'Data Structures & Algorithms for GATE', url: yt('GATE CSE Data Structures Algorithms') },
      { title: 'Operating Systems for GATE', url: yt('GATE Operating Systems complete') },
      { title: 'DBMS for GATE', url: yt('GATE DBMS complete preparation') },
      { title: 'Computer Networks for GATE', url: yt('GATE Computer Networks complete') },
      { title: 'Theory of Computation', url: yt('GATE Theory of Computation TOC') },
      { title: 'Compiler Design', url: yt('GATE Compiler Design complete') },
      { title: 'Computer Organization', url: yt('GATE Computer Organization Architecture') },
    ]},
    { name: 'GATE Strategy', lessons: [
      { title: 'GATE Exam Pattern & Syllabus', url: yt('GATE exam pattern 2025 CSE syllabus') },
      { title: 'GATE Previous Year Papers', url: yt('GATE CSE previous year questions') },
      { title: 'Mock Tests & Time Management', url: yt('GATE preparation strategy tips') },
    ]},
  ]},

  { title: 'M.Tech CSE', subjects: [
    { name: 'Advanced Algorithms', lessons: [
      { title: 'Advanced Data Structures', url: yt('Advanced Data Structures M.Tech') },
      { title: 'Approximation Algorithms', url: yt('Approximation Algorithms NP problems') },
    ]},
    { name: 'Research Methodology', lessons: [
      { title: 'Paper Writing & Research Process', url: yt('Research Methodology paper writing') },
      { title: 'Literature Survey & Review', url: yt('Literature Review research methodology') },
    ]},
  ]},

  { title: 'MBA Entrance', subjects: [
    { name: 'Quantitative Aptitude', lessons: [
      { title: 'Arithmetic & Percentage', url: yt('CAT MBA Quantitative Aptitude Arithmetic') },
      { title: 'Algebra & Number Systems', url: yt('CAT MBA Algebra Number Systems') },
      { title: 'Geometry & Mensuration', url: yt('CAT Geometry Mensuration MBA') },
    ]},
    { name: 'Verbal Ability', lessons: [
      { title: 'Reading Comprehension', url: yt('CAT Reading Comprehension MBA') },
      { title: 'Vocabulary & Grammar', url: yt('CAT Verbal Ability Grammar Vocabulary') },
    ]},
    { name: 'Data Interpretation', lessons: [
      { title: 'DI – Tables & Bar Charts', url: yt('CAT Data Interpretation Tables Charts') },
      { title: 'Logical Reasoning', url: yt('CAT Logical Reasoning MBA entrance') },
    ]},
  ]},

  // ─── Government Jobs ──────────────────────────────────────────────────────
  { title: 'UPSC Civil Services', subjects: [
    { name: 'General Studies I', lessons: [
      { title: 'Ancient & Medieval History', url: yt('UPSC Ancient Medieval History') },
      { title: 'Modern Indian History', url: yt('UPSC Modern History India freedom struggle') },
      { title: 'Indian & World Geography', url: yt('UPSC Geography Indian World') },
      { title: 'Indian Society & Culture', url: yt('UPSC Indian Society Culture') },
    ]},
    { name: 'General Studies II', lessons: [
      { title: 'Indian Polity & Constitution', url: yt('UPSC Indian Polity Constitution') },
      { title: 'Governance & Social Justice', url: yt('UPSC Governance Social Justice') },
      { title: 'International Relations', url: yt('UPSC International Relations IR') },
    ]},
    { name: 'General Studies III', lessons: [
      { title: 'Indian Economy', url: yt('UPSC Indian Economy complete') },
      { title: 'Science & Technology', url: yt('UPSC Science Technology current affairs') },
      { title: 'Environment & Ecology', url: yt('UPSC Environment Ecology') },
    ]},
    { name: 'CSAT', lessons: [
      { title: 'Comprehension & Decision Making', url: yt('UPSC CSAT Comprehension Decision Making') },
      { title: 'Basic Numeracy', url: yt('UPSC CSAT Basic Numeracy maths') },
    ]},
  ]},

  { title: 'SSC CGL', subjects: [
    { name: 'Quantitative Aptitude', lessons: [
      { title: 'Number Systems', url: yt('SSC CGL Number System Quantitative Aptitude') },
      { title: 'Percentage & Profit-Loss', url: yt('SSC CGL Percentage Profit Loss') },
      { title: 'Time & Work', url: yt('SSC CGL Time Work Speed Distance') },
      { title: 'Geometry & Mensuration', url: yt('SSC CGL Geometry Mensuration') },
    ]},
    { name: 'General Intelligence', lessons: [
      { title: 'Analogy & Classification', url: yt('SSC CGL Reasoning Analogy Classification') },
      { title: 'Coding Decoding', url: yt('SSC CGL Coding Decoding Reasoning') },
      { title: 'Puzzle & Seating Arrangement', url: yt('SSC CGL Puzzle Seating Arrangement') },
    ]},
    { name: 'English', lessons: [
      { title: 'Grammar & Error Spotting', url: yt('SSC CGL English Grammar Error Spotting') },
      { title: 'Vocabulary & Fill in Blanks', url: yt('SSC CGL Vocabulary Fill Blanks') },
      { title: 'Reading Comprehension', url: yt('SSC CGL Reading Comprehension English') },
    ]},
    { name: 'General Awareness', lessons: [
      { title: 'History & Geography', url: yt('SSC CGL General Awareness History Geography') },
      { title: 'Economy & Polity', url: yt('SSC CGL Economy Polity GK') },
      { title: 'Science & Current Affairs', url: yt('SSC CGL Science Current Affairs GK') },
    ]},
  ]},

  { title: 'SBI PO', subjects: [
    { name: 'Reasoning Ability', lessons: [
      { title: 'Syllogism & Inequalities', url: yt('SBI PO Reasoning Syllogism Inequalities') },
      { title: 'Puzzle & Seating Arrangement', url: yt('SBI PO Puzzle Seating Arrangement') },
    ]},
    { name: 'Quantitative Aptitude', lessons: [
      { title: 'Number Series & Simplification', url: yt('SBI PO Quantitative Aptitude Number Series') },
      { title: 'Data Interpretation', url: yt('SBI PO Data Interpretation') },
    ]},
    { name: 'English Language', lessons: [
      { title: 'Reading Comprehension', url: yt('SBI PO English Reading Comprehension') },
      { title: 'Cloze Test & Error Detection', url: yt('SBI PO Cloze Test Error Detection') },
    ]},
    { name: 'General Awareness', lessons: [
      { title: 'Banking Awareness', url: yt('Banking Awareness SBI PO current affairs') },
      { title: 'Current Affairs', url: yt('Current Affairs banking exams 2025') },
    ]},
  ]},

  { title: 'RRB NTPC', subjects: [
    { name: 'Mathematics', lessons: [
      { title: 'Number Systems & HCF LCM', url: yt('RRB NTPC Mathematics Number System HCF LCM') },
      { title: 'Time & Work, Speed Distance', url: yt('RRB NTPC Time Work Speed Distance') },
      { title: 'Algebra & Trigonometry', url: yt('RRB NTPC Algebra Trigonometry') },
    ]},
    { name: 'General Intelligence', lessons: [
      { title: 'Coding Decoding', url: yt('RRB NTPC Coding Decoding Reasoning') },
      { title: 'Analogy & Series', url: yt('RRB NTPC Analogy Series Reasoning') },
    ]},
    { name: 'General Awareness', lessons: [
      { title: 'Indian Railways GK', url: yt('Indian Railways GK RRB NTPC') },
      { title: 'Current Affairs & Science', url: yt('RRB NTPC Current Affairs Science GK') },
    ]},
  ]},

  // ─── Placement Roles ──────────────────────────────────────────────────────
  { title: 'Full Stack Developer', subjects: [
    { name: 'Frontend', lessons: [
      { title: 'HTML5 & CSS3 Fundamentals', url: 'https://www.youtube.com/watch?v=mU6anWqZJcc' },
      { title: 'JavaScript ES6+ & DOM', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
      { title: 'React.js Complete Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
    ]},
    { name: 'Backend', lessons: [
      { title: 'Node.js & Express.js', url: yt('Node.js Express.js complete course') },
      { title: 'MongoDB & Mongoose', url: yt('MongoDB Mongoose complete tutorial') },
      { title: 'REST API Design', url: yt('REST API design Node.js tutorial') },
      { title: 'JWT & Authentication', url: yt('JWT Authentication Node.js') },
    ]},
    { name: 'Deployment & DevOps', lessons: [
      { title: 'Docker Basics', url: yt('Docker tutorial beginners complete') },
      { title: 'Deploy on AWS / Vercel', url: yt('Deploy full stack app AWS Vercel') },
    ]},
  ]},

  { title: 'Frontend Developer', subjects: [
    { name: 'HTML & CSS Mastery', lessons: [
      { title: 'Semantic HTML5', url: yt('Semantic HTML5 complete tutorial') },
      { title: 'CSS Flexbox Mastery', url: 'https://www.youtube.com/watch?v=u044iM9xsWU' },
      { title: 'CSS Grid Complete', url: 'https://www.youtube.com/watch?v=9zBsdzdE4sM' },
      { title: 'CSS Animations & Transitions', url: yt('CSS Animations Transitions complete') },
    ]},
    { name: 'JavaScript Deep Dive', lessons: [
      { title: 'ES6+ Features', url: yt('JavaScript ES6 features complete') },
      { title: 'Closures & Prototypes', url: yt('JavaScript Closures Prototypes advanced') },
      { title: 'Async JavaScript', url: yt('Async JavaScript Promises Async Await') },
    ]},
    { name: 'React & Ecosystem', lessons: [
      { title: 'React Hooks Complete', url: yt('React Hooks complete guide all hooks') },
      { title: 'Redux Toolkit', url: yt('Redux Toolkit complete tutorial') },
      { title: 'Next.js Fundamentals', url: yt('Next.js complete tutorial beginners') },
    ]},
  ]},

  { title: 'Data Scientist', subjects: [
    { name: 'Python for Data Science', lessons: [
      { title: 'Python Basics for DS', url: yt('Python for Data Science beginners') },
      { title: 'NumPy & Pandas Mastery', url: yt('NumPy Pandas Data Science tutorial') },
      { title: 'Data Cleaning & EDA', url: yt('Data Cleaning EDA Python Pandas') },
    ]},
    { name: 'Statistics & ML', lessons: [
      { title: 'Descriptive & Inferential Statistics', url: yt('Statistics Data Science descriptive inferential') },
      { title: 'Regression Analysis', url: yt('Regression Analysis machine learning') },
      { title: 'Classification Algorithms', url: yt('Classification algorithms scikit-learn') },
      { title: 'Clustering Algorithms', url: yt('Clustering K-Means algorithms') },
    ]},
    { name: 'Visualization & Tools', lessons: [
      { title: 'Matplotlib & Seaborn', url: yt('Matplotlib Seaborn visualization Python') },
      { title: 'Tableau for Data Science', url: yt('Tableau complete tutorial data science') },
    ]},
  ]},

  { title: 'AI Engineer', subjects: [
    { name: 'Deep Learning', lessons: [
      { title: 'Neural Networks from Scratch', url: yt('Neural Networks from Scratch Python') },
      { title: 'TensorFlow & Keras', url: yt('TensorFlow Keras deep learning tutorial') },
      { title: 'PyTorch Complete', url: yt('PyTorch complete tutorial deep learning') },
      { title: 'CNNs for Computer Vision', url: yt('CNN Computer Vision PyTorch') },
      { title: 'RNNs & LSTMs', url: yt('RNN LSTM sequence model tutorial') },
    ]},
    { name: 'NLP & Transformers', lessons: [
      { title: 'Transformers & BERT', url: yt('Transformers BERT NLP tutorial') },
      { title: 'LangChain & RAG Systems', url: yt('LangChain RAG system tutorial') },
      { title: 'Building AI Chatbots', url: yt('Build AI chatbot LangChain GPT') },
    ]},
  ]},

  { title: 'DevOps Engineer', subjects: [
    { name: 'Linux & Scripting', lessons: [
      { title: 'Linux Command Line Basics', url: yt('Linux command line tutorial beginners') },
      { title: 'Shell Scripting & Bash', url: yt('Shell scripting bash tutorial complete') },
    ]},
    { name: 'Containerization', lessons: [
      { title: 'Docker Complete Course', url: yt('Docker complete course tutorial') },
      { title: 'Kubernetes Fundamentals', url: yt('Kubernetes tutorial beginners complete') },
    ]},
    { name: 'CI/CD & Cloud', lessons: [
      { title: 'Jenkins & GitHub Actions', url: yt('Jenkins GitHub Actions CI CD tutorial') },
      { title: 'AWS DevOps Tools', url: yt('AWS DevOps CodePipeline tutorial') },
      { title: 'Terraform Infrastructure as Code', url: yt('Terraform infrastructure as code tutorial') },
    ]},
  ]},

  { title: 'AWS Engineer', subjects: [
    { name: 'AWS Core Services', lessons: [
      { title: 'AWS EC2 & VPC', url: yt('AWS EC2 VPC tutorial beginners') },
      { title: 'AWS S3 & Storage', url: yt('AWS S3 storage complete tutorial') },
      { title: 'AWS RDS & DynamoDB', url: yt('AWS RDS DynamoDB database tutorial') },
      { title: 'AWS Lambda Serverless', url: yt('AWS Lambda serverless complete tutorial') },
    ]},
    { name: 'AWS Solutions Architect', lessons: [
      { title: 'AWS SAA-C03 Exam Prep', url: yt('AWS Solutions Architect SAA C03 exam prep') },
      { title: 'High Availability & Fault Tolerance', url: yt('AWS High Availability Fault Tolerance') },
    ]},
  ]},

  { title: 'Cyber Security Analyst', subjects: [
    { name: 'Network Security', lessons: [
      { title: 'TCP/IP & Network Protocols', url: yt('Network Security TCP IP protocols cybersecurity') },
      { title: 'Firewalls & IDS/IPS', url: yt('Firewalls IDS IPS cybersecurity') },
      { title: 'Wireshark Packet Analysis', url: yt('Wireshark packet analysis tutorial') },
    ]},
    { name: 'Ethical Hacking', lessons: [
      { title: 'Kali Linux & Penetration Testing', url: yt('Kali Linux penetration testing tutorial') },
      { title: 'OWASP Top 10 Vulnerabilities', url: yt('OWASP Top 10 security vulnerabilities') },
      { title: 'SQL Injection & XSS Attacks', url: yt('SQL Injection XSS ethical hacking') },
    ]},
    { name: 'Cryptography', lessons: [
      { title: 'Symmetric & Asymmetric Encryption', url: yt('Cryptography symmetric asymmetric encryption') },
      { title: 'SSL/TLS & PKI', url: yt('SSL TLS PKI certificate cybersecurity') },
    ]},
  ]},

  { title: 'Android Developer', subjects: [
    { name: 'Kotlin Basics', lessons: [
      { title: 'Kotlin for Android', url: yt('Kotlin for Android development complete') },
      { title: 'Object-Oriented Kotlin', url: yt('Kotlin OOP Android development') },
    ]},
    { name: 'Android Development', lessons: [
      { title: 'Android Studio Setup & UI', url: yt('Android Studio complete tutorial beginners') },
      { title: 'Activities & Fragments', url: yt('Android Activities Fragments tutorial') },
      { title: 'RecyclerView & Adapters', url: yt('Android RecyclerView Adapter tutorial') },
      { title: 'Retrofit & API Integration', url: yt('Android Retrofit API integration tutorial') },
    ]},
    { name: 'Jetpack & Architecture', lessons: [
      { title: 'Jetpack Compose', url: yt('Jetpack Compose tutorial beginners') },
      { title: 'MVVM Architecture', url: yt('Android MVVM Architecture tutorial') },
      { title: 'Room Database', url: yt('Android Room Database tutorial') },
    ]},
  ]},

  { title: 'Flutter Developer', subjects: [
    { name: 'Dart Language', lessons: [
      { title: 'Dart Programming Basics', url: yt('Dart programming language tutorial beginners') },
      { title: 'Dart OOP Concepts', url: yt('Dart OOP Classes Objects') },
    ]},
    { name: 'Flutter Fundamentals', lessons: [
      { title: 'Flutter Setup & Widgets', url: yt('Flutter complete tutorial beginners 2024') },
      { title: 'State Management – Provider', url: yt('Flutter Provider state management tutorial') },
      { title: 'Navigation & Routing', url: yt('Flutter Navigation Routing tutorial') },
      { title: 'API Integration with Dio', url: yt('Flutter Dio API integration tutorial') },
    ]},
  ]},

  { title: 'UI/UX Designer', subjects: [
    { name: 'Design Fundamentals', lessons: [
      { title: 'Color Theory & Typography', url: yt('Color Theory Typography UI Design') },
      { title: 'UX Research & User Personas', url: yt('UX Research User Personas Design') },
      { title: 'Wireframing Basics', url: yt('Wireframing UI UX tutorial') },
    ]},
    { name: 'Figma', lessons: [
      { title: 'Figma Complete Beginners', url: yt('Figma complete tutorial beginners 2024') },
      { title: 'Prototyping in Figma', url: yt('Figma prototyping tutorial') },
      { title: 'Design System & Components', url: yt('Figma Design System Components') },
    ]},
  ]},

  // ─── Polytechnic ──────────────────────────────────────────────────────────
  { title: 'C Programming', subjects: [
    { name: 'C Fundamentals', lessons: [
      { title: 'Variables, Data Types & I/O', url: yt('C programming tutorial beginners data types') },
      { title: 'Control Structures', url: yt('C programming loops if else control') },
      { title: 'Functions & Recursion', url: yt('C programming functions recursion') },
      { title: 'Arrays & Strings', url: yt('C programming arrays strings tutorial') },
      { title: 'Pointers', url: yt('C programming pointers complete tutorial') },
      { title: 'Structures & File I/O', url: yt('C programming structures file I/O') },
    ]},
  ]},

  { title: 'Java', subjects: [
    { name: 'Java Basics', lessons: [
      { title: 'Java Fundamentals & Setup', url: yt('Java programming complete beginners') },
      { title: 'OOP – Classes & Objects', url: yt('Java OOP classes objects inheritance') },
      { title: 'Exception Handling', url: yt('Java exception handling try catch') },
      { title: 'Collections Framework', url: yt('Java collections framework complete') },
    ]},
    { name: 'Advanced Java', lessons: [
      { title: 'JDBC & Database', url: yt('JDBC Java database connectivity tutorial') },
      { title: 'Spring Boot REST API', url: yt('Spring Boot REST API tutorial beginners') },
    ]},
  ]},
];

async function seedAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    let seeded = 0, skipped = 0;

    for (const item of ALL_CURRICULA) {
      const rm = await Roadmap.findOne({ title: item.title });
      if (!rm) {
        console.log(`⚠️  Roadmap not found: ${item.title}`);
        skipped++;
        continue;
      }

      // Clear existing subjects/lessons for this roadmap
      const oldSubs = await Subject.find({ roadmapId: rm._id });
      for (const s of oldSubs) await Lesson.deleteMany({ subjectId: s._id });
      await Subject.deleteMany({ roadmapId: rm._id });

      for (let i = 0; i < item.subjects.length; i++) {
        const sub = item.subjects[i];
        const subject = await Subject.create({
          roadmapId: rm._id,
          name: sub.name,
          description: `Learn ${sub.name} in depth`,
          order: i + 1
        });
        await Lesson.insertMany(sub.lessons.map((l, idx) => ({
          subjectId: subject._id,
          title: l.title,
          order: idx + 1,
          type: l.title.toLowerCase().includes('project') ? 'Project' : l.title.toLowerCase().includes('quiz') || l.title.toLowerCase().includes('mock') ? 'Quiz' : 'Video',
          content: `Study material for ${l.title}`,
          youtubeUrl: l.url
        })));
      }
      console.log(`✅ Seeded: ${item.title}`);
      seeded++;
    }

    console.log(`\n🎉 Done! Seeded ${seeded} roadmaps. Skipped ${skipped}.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seedAll();
