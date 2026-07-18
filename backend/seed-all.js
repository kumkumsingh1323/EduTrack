import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { 
  EducationLevel, Stream, Roadmap, Subject, Lesson,
  CompanyPrep, PlacementRole, Internship, Certification, Scholarship, CodingPlatform
} from './models/PlatformData.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();
const URI = process.env.MONGODB_URI;

const seed = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(URI);
    console.log('✅ Connected.');

    // ─── WIPE EVERYTHING ────────────────────────────────────────
    console.log('🧹 Clearing ALL collections...');
    await EducationLevel.deleteMany({});
    await Stream.deleteMany({});
    await Roadmap.deleteMany({});
    await Subject.deleteMany({});
    await Lesson.deleteMany({});
    await CompanyPrep.deleteMany({});
    await PlacementRole.deleteMany({});
    await Internship.deleteMany({});
    await Certification.deleteMany({});
    await Scholarship.deleteMany({});
    await CodingPlatform.deleteMany({});

    // ─── 1. EDUCATION LEVELS ────────────────────────────────────
    console.log('🌱 Seeding Education Levels...');
    const levelsData = [
      '10th', 'Intermediate', 'ITI', 'Polytechnic', 'Diploma',
      'Degree', 'B.Tech', 'Higher Studies', 'Government Jobs', 'Placement Preparation'
    ];
    const levels = await EducationLevel.insertMany(
      levelsData.map((name, i) => ({ name, order: i + 1 }))
    );
    const getLevelId = (name) => levels.find(l => l.name === name)._id;

    // ─── 2. STREAMS ─────────────────────────────────────────────
    console.log('🌱 Seeding Streams...');
    const streamsData = [
      // 10th
      { level: '10th', name: 'State Board' }, { level: '10th', name: 'CBSE' },
      { level: '10th', name: 'ICSE' }, { level: '10th', name: 'NIOS' },
      { level: '10th', name: 'Career Options' }, { level: '10th', name: 'Scholarships' },
      // Intermediate
      { level: 'Intermediate', name: 'MPC' }, { level: 'Intermediate', name: 'BiPC' },
      { level: 'Intermediate', name: 'MEC' }, { level: 'Intermediate', name: 'CEC' },
      { level: 'Intermediate', name: 'HEC' }, { level: 'Intermediate', name: 'Vocational' },
      // ITI
      { level: 'ITI', name: 'Electrician' }, { level: 'ITI', name: 'Fitter' },
      { level: 'ITI', name: 'Welder' }, { level: 'ITI', name: 'COPA' },
      { level: 'ITI', name: 'Mechanic' }, { level: 'ITI', name: 'Plumber' },
      // Polytechnic
      { level: 'Polytechnic', name: 'Civil' }, { level: 'Polytechnic', name: 'Mechanical' },
      { level: 'Polytechnic', name: 'EEE' }, { level: 'Polytechnic', name: 'ECE' },
      { level: 'Polytechnic', name: 'CSE' }, { level: 'Polytechnic', name: 'Automobile' },
      // Diploma
      { level: 'Diploma', name: 'All Branches' },
      // Degree
      { level: 'Degree', name: 'BA' }, { level: 'Degree', name: 'B.Com' },
      { level: 'Degree', name: 'B.Sc' }, { level: 'Degree', name: 'BBA' },
      { level: 'Degree', name: 'BCA' },
      // B.Tech
      { level: 'B.Tech', name: 'CSE' }, { level: 'B.Tech', name: 'IT' },
      { level: 'B.Tech', name: 'AI & ML' }, { level: 'B.Tech', name: 'Data Science' },
      { level: 'B.Tech', name: 'Cyber Security' }, { level: 'B.Tech', name: 'ECE' },
      { level: 'B.Tech', name: 'EEE' }, { level: 'B.Tech', name: 'Civil' },
      { level: 'B.Tech', name: 'Mechanical' },
      // Higher Studies
      { level: 'Higher Studies', name: 'M.Tech' }, { level: 'Higher Studies', name: 'MBA' },
      { level: 'Higher Studies', name: 'MCA' }, { level: 'Higher Studies', name: 'MS Abroad' },
      { level: 'Higher Studies', name: 'PhD' },
      // Government Jobs
      { level: 'Government Jobs', name: 'UPSC' }, { level: 'Government Jobs', name: 'SSC' },
      { level: 'Government Jobs', name: 'Banking' }, { level: 'Government Jobs', name: 'Railways' },
      { level: 'Government Jobs', name: 'Defence' }, { level: 'Government Jobs', name: 'PSU' },
      // Placement Preparation
      { level: 'Placement Preparation', name: 'Software Development' },
      { level: 'Placement Preparation', name: 'Data Science' },
      { level: 'Placement Preparation', name: 'AI & ML' },
      { level: 'Placement Preparation', name: 'Cloud & DevOps' },
      { level: 'Placement Preparation', name: 'Cyber Security' },
      { level: 'Placement Preparation', name: 'UI/UX Design' },
      { level: 'Placement Preparation', name: 'Mobile Development' },
    ];
    const streams = await Stream.insertMany(
      streamsData.map(s => ({ educationLevelId: getLevelId(s.level), name: s.name }))
    );
    const getStreamId = (levelName, streamName) => {
      const lid = getLevelId(levelName);
      return streams.find(s => s.educationLevelId.equals(lid) && s.name === streamName)._id;
    };

    // ─── 3. ROADMAPS FOR EVERY STREAM ───────────────────────────
    console.log('🌱 Seeding Roadmaps for all streams...');
    const roadmapDefs = [
      // 10th
      { l: '10th', s: 'State Board', titles: ['AP State Board', 'TS State Board', 'Karnataka Board', 'TN Board'] },
      { l: '10th', s: 'CBSE', titles: ['CBSE Syllabus', 'NCERT Solutions', 'Sample Papers', 'Previous Year Papers'] },
      { l: '10th', s: 'ICSE', titles: ['ICSE Syllabus', 'Selina Solutions', 'Practice Papers'] },
      { l: '10th', s: 'NIOS', titles: ['NIOS Syllabus', 'Open Schooling Guide'] },
      { l: '10th', s: 'Career Options', titles: ['After 10th Overview', 'Intermediate Streams', 'ITI Courses', 'Polytechnic Courses', 'Skill Development'] },
      { l: '10th', s: 'Scholarships', titles: ['NSP Scholarship', 'State Scholarships', 'Merit Scholarships'] },
      // Intermediate
      { l: 'Intermediate', s: 'MPC', titles: ['JEE Main', 'JEE Advanced', 'BITSAT', 'AP EAPCET', 'TS EAPCET', 'CUET', 'NDA', 'Engineering'] },
      { l: 'Intermediate', s: 'BiPC', titles: ['NEET', 'AIIMS', 'Nursing', 'Pharmacy', 'Agriculture', 'BSc', 'Biotechnology'] },
      { l: 'Intermediate', s: 'MEC', titles: ['CA', 'CS', 'CMA', 'B.Com Hons', 'BBA', 'Banking', 'MBA Entrance'] },
      { l: 'Intermediate', s: 'CEC', titles: ['CLAT', 'BA LLB', 'UPSC Preparation', 'SSC Exams', 'Degree Options'] },
      { l: 'Intermediate', s: 'HEC', titles: ['History Hons', 'Political Science', 'Economics', 'Sociology', 'Civil Services'] },
      { l: 'Intermediate', s: 'Vocational', titles: ['IT & ITES', 'Automobile', 'Healthcare', 'Agriculture', 'Retail'] },
      // ITI
      { l: 'ITI', s: 'Electrician', titles: ['Electrician Syllabus', 'Wiring & Installation', 'Motor Rewinding', 'Government Jobs for Electricians'] },
      { l: 'ITI', s: 'Fitter', titles: ['Fitter Syllabus', 'Benchwork', 'Assembly', 'PSU Jobs'] },
      { l: 'ITI', s: 'Welder', titles: ['Arc Welding', 'Gas Welding', 'TIG/MIG', 'Certification'] },
      { l: 'ITI', s: 'COPA', titles: ['Computer Fundamentals', 'MS Office', 'Web Design', 'Programming Basics'] },
      { l: 'ITI', s: 'Mechanic', titles: ['Motor Vehicle Mechanic', 'Diesel Mechanic', 'Workshop Practice'] },
      { l: 'ITI', s: 'Plumber', titles: ['Plumbing Fundamentals', 'Pipe Fitting', 'Sanitary Installation'] },
      // Polytechnic
      { l: 'Polytechnic', s: 'Civil', titles: ['Surveying', 'Building Construction', 'RCC Design', 'Estimation'] },
      { l: 'Polytechnic', s: 'Mechanical', titles: ['Thermodynamics', 'Workshop Technology', 'CAD/CAM', 'Manufacturing'] },
      { l: 'Polytechnic', s: 'EEE', titles: ['Circuit Theory', 'Power Systems', 'Electrical Machines', 'PLC'] },
      { l: 'Polytechnic', s: 'ECE', titles: ['Analog Electronics', 'Digital Electronics', 'Communication Systems', 'VLSI'] },
      { l: 'Polytechnic', s: 'CSE', titles: ['C Programming', 'Java', 'DBMS', 'Web Development', 'Networking'] },
      { l: 'Polytechnic', s: 'Automobile', titles: ['Engine Systems', 'Chassis', 'Transmission', 'EV Technology'] },
      // Diploma
      { l: 'Diploma', s: 'All Branches', titles: ['Engineering Graphics', 'Workshop Practice', 'Applied Mathematics', 'Project Work'] },
      // Degree
      { l: 'Degree', s: 'BA', titles: ['History', 'Political Science', 'Economics', 'English Literature', 'Sociology'] },
      { l: 'Degree', s: 'B.Com', titles: ['Accounting', 'Taxation', 'Business Law', 'Corporate Finance', 'Tally'] },
      { l: 'Degree', s: 'B.Sc', titles: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Electronics'] },
      { l: 'Degree', s: 'BBA', titles: ['Marketing Management', 'Financial Management', 'HR Management', 'Entrepreneurship'] },
      { l: 'Degree', s: 'BCA', titles: ['C & C++', 'Java', 'DBMS', 'Data Structures', 'Web Technologies', 'Python'] },
      // B.Tech
      { l: 'B.Tech', s: 'CSE', titles: ['Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Web Development', 'Machine Learning'] },
      { l: 'B.Tech', s: 'IT', titles: ['Software Engineering', 'Cloud Computing', 'Information Security', 'Big Data', 'IoT'] },
      { l: 'B.Tech', s: 'AI & ML', titles: ['Python for AI', 'Linear Algebra', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning'] },
      { l: 'B.Tech', s: 'Data Science', titles: ['Statistics', 'Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Big Data Analytics'] },
      { l: 'B.Tech', s: 'Cyber Security', titles: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Digital Forensics', 'SOC Analyst'] },
      { l: 'B.Tech', s: 'ECE', titles: ['Circuit Analysis', 'Signals & Systems', 'Embedded Systems', 'VLSI Design', 'Communication'] },
      { l: 'B.Tech', s: 'EEE', titles: ['Electrical Machines', 'Power Electronics', 'Control Systems', 'Power Systems'] },
      { l: 'B.Tech', s: 'Civil', titles: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation', 'Environmental Engineering'] },
      { l: 'B.Tech', s: 'Mechanical', titles: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing', 'Machine Design', 'CAD/CAM'] },
      // Higher Studies
      { l: 'Higher Studies', s: 'M.Tech', titles: ['GATE Preparation', 'M.Tech CSE', 'M.Tech ECE', 'Research Opportunities'] },
      { l: 'Higher Studies', s: 'MBA', titles: ['CAT Preparation', 'XAT', 'GMAT', 'Finance', 'Marketing', 'HR'] },
      { l: 'Higher Studies', s: 'MCA', titles: ['MCA Entrance', 'Software Development', 'Data Science Track'] },
      { l: 'Higher Studies', s: 'MS Abroad', titles: ['GRE Preparation', 'TOEFL/IELTS', 'SOP Writing', 'University Selection', 'Visa Process'] },
      { l: 'Higher Studies', s: 'PhD', titles: ['Research Methodology', 'Paper Writing', 'PhD in CS', 'PhD in Engineering'] },
      // Government Jobs
      { l: 'Government Jobs', s: 'UPSC', titles: ['UPSC Civil Services', 'IAS', 'IPS', 'IFS', 'CDS'] },
      { l: 'Government Jobs', s: 'SSC', titles: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD'] },
      { l: 'Government Jobs', s: 'Banking', titles: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RBI Grade B'] },
      { l: 'Government Jobs', s: 'Railways', titles: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP'] },
      { l: 'Government Jobs', s: 'Defence', titles: ['NDA', 'CDS', 'AFCAT', 'Indian Navy', 'Indian Army'] },
      { l: 'Government Jobs', s: 'PSU', titles: ['ISRO', 'DRDO', 'BHEL', 'ONGC', 'NTPC'] },
      // Placement Preparation
      { l: 'Placement Preparation', s: 'Software Development', titles: ['Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Java Developer', 'Python Developer'] },
      { l: 'Placement Preparation', s: 'Data Science', titles: ['Data Scientist', 'Data Analyst', 'Business Analyst', 'ML Engineer'] },
      { l: 'Placement Preparation', s: 'AI & ML', titles: ['AI Engineer', 'Deep Learning Engineer', 'NLP Engineer', 'Computer Vision Engineer'] },
      { l: 'Placement Preparation', s: 'Cloud & DevOps', titles: ['Cloud Engineer', 'AWS Engineer', 'Azure Engineer', 'DevOps Engineer'] },
      { l: 'Placement Preparation', s: 'Cyber Security', titles: ['Cyber Security Analyst', 'Ethical Hacker', 'SOC Analyst', 'Penetration Tester'] },
      { l: 'Placement Preparation', s: 'UI/UX Design', titles: ['UI/UX Designer', 'Product Designer', 'UX Researcher'] },
      { l: 'Placement Preparation', s: 'Mobile Development', titles: ['Android Developer', 'Flutter Developer', 'React Native Developer', 'iOS Developer'] },
    ];

    const allRoadmaps = [];
    for (const def of roadmapDefs) {
      const sid = getStreamId(def.l, def.s);
      for (const title of def.titles) {
        allRoadmaps.push({ streamId: sid, title, description: `Complete roadmap for ${title}` });
      }
    }
    await Roadmap.insertMany(allRoadmaps);

    // ─── 4. DETAILED SUBJECTS & LESSONS (for key roadmaps) ──────
    console.log('🌱 Seeding detailed subjects & lessons...');

    // Helper: find a roadmap by title
    const findRoadmap = async (title) => {
      const rm = await Roadmap.findOne({ title });
      if (!rm) { console.log(`⚠️ Roadmap not found: ${title}`); return null; }
      return rm;
    };
    const addSubjectsAndLessons = async (roadmapTitle, type, meta, subjectsArr) => {
      const rm = await findRoadmap(roadmapTitle);
      if (!rm) return;
      // Update type and metadata
      if (type) rm.type = type;
      Object.assign(rm, meta);
      await rm.save();

      for (let i = 0; i < subjectsArr.length; i++) {
        const sub = subjectsArr[i];
        const subject = await Subject.create({ roadmapId: rm._id, name: sub.name, description: `Learn ${sub.name}`, order: i + 1 });
        await Lesson.insertMany(sub.lessons.map((t, idx) => ({
          subjectId: subject._id, title: t, order: idx + 1,
          type: t.includes('Project') ? 'Project' : t.includes('Quiz') ? 'Quiz' : 'Video',
          content: `AI-generated content for ${t}`
        })));
      }
    };

    await addSubjectsAndLessons('Software Engineer', 'Job', { eligibility: 'B.Tech/BCA', salary: '6L - 24L' }, [
      { name: 'Programming', lessons: ['Variables & Data Types', 'Control Structures', 'OOP Concepts'] },
      { name: 'DSA', lessons: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'LeetCode Practice'] },
      { name: 'DBMS', lessons: ['SQL Basics', 'Normalization', 'Indexing & Transactions'] },
      { name: 'OS', lessons: ['Process Management', 'Memory Management', 'Deadlocks'] },
      { name: 'CN', lessons: ['OSI Model', 'TCP/IP', 'HTTP & DNS'] },
      { name: 'Projects', lessons: ['E-Commerce App (Project)', 'Chat App (Project)'] },
      { name: 'Interview Prep', lessons: ['Resume Building', 'Mock Interview'] }
    ]);

    await addSubjectsAndLessons('Full Stack Developer', 'Skill', { eligibility: 'Anyone', salary: '8L - 30L' }, [
      { name: 'HTML & CSS', lessons: ['Semantic HTML', 'Flexbox & Grid', 'Responsive Design'] },
      { name: 'JavaScript', lessons: ['ES6+', 'DOM Manipulation', 'Async/Await'] },
      { name: 'React', lessons: ['Components & Props', 'Hooks', 'Redux', 'React Router'] },
      { name: 'Node & Express', lessons: ['REST APIs', 'Middleware', 'JWT Auth'] },
      { name: 'MongoDB', lessons: ['Mongoose', 'Aggregation'] },
      { name: 'Deployment', lessons: ['Docker', 'AWS / Vercel', 'CI/CD Pipelines'] }
    ]);

    await addSubjectsAndLessons('AI Engineer', 'Skill', { eligibility: 'B.Tech / Math Background', salary: '10L - 40L' }, [
      { name: 'Python', lessons: ['Python Basics', 'Advanced Python'] },
      { name: 'Mathematics', lessons: ['Linear Algebra', 'Calculus', 'Probability'] },
      { name: 'Machine Learning', lessons: ['Supervised', 'Unsupervised', 'Model Evaluation'] },
      { name: 'Deep Learning', lessons: ['Neural Networks', 'TensorFlow / PyTorch', 'CNNs & RNNs'] },
      { name: 'NLP', lessons: ['Text Processing', 'Transformers', 'LangChain & RAG (Project)'] }
    ]);

    await addSubjectsAndLessons('Data Scientist', 'Skill', { eligibility: 'Graduation', salary: '6L - 25L' }, [
      { name: 'Python & SQL', lessons: ['Python for Data', 'SQL Queries', 'Pandas'] },
      { name: 'Statistics', lessons: ['Descriptive Stats', 'Inferential Stats', 'Hypothesis Testing'] },
      { name: 'Machine Learning', lessons: ['Regression', 'Classification', 'Clustering'] },
      { name: 'Visualization', lessons: ['Matplotlib', 'Seaborn', 'Tableau'] },
      { name: 'Projects', lessons: ['Titanic Prediction (Project)', 'Stock Forecast (Project)'] }
    ]);

    await addSubjectsAndLessons('UPSC Civil Services', 'Exam', {
      eligibility: 'Graduation in any discipline', ageLimit: '21-32', examPattern: 'Prelims + Mains + Interview', salary: '₹56,100+'
    }, [
      { name: 'History', lessons: ['Ancient India', 'Medieval India', 'Modern India'] },
      { name: 'Geography', lessons: ['Physical', 'Indian', 'World Geography'] },
      { name: 'Polity', lessons: ['Constitution', 'Governance', 'Panchayati Raj'] },
      { name: 'Economy', lessons: ['Macroeconomics', 'Indian Economy', 'Budget'] },
      { name: 'Current Affairs', lessons: ['Daily News', 'Monthly Magazines'] },
      { name: 'Mock Tests', lessons: ['Prelims Mock 1 (Quiz)', 'Prelims Mock 2 (Quiz)'] }
    ]);

    await addSubjectsAndLessons('JEE Main', 'Exam', {
      eligibility: 'Class 12 with PCM', examPattern: '90 Questions, 300 Marks', salary: 'N/A'
    }, [
      { name: 'Physics', lessons: ['Mechanics', 'Electrodynamics', 'Optics', 'Modern Physics'] },
      { name: 'Chemistry', lessons: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'] },
      { name: 'Mathematics', lessons: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry'] }
    ]);

    await addSubjectsAndLessons('NEET', 'Exam', {
      eligibility: 'Class 12 with PCB', examPattern: '200 Questions MCQ', salary: 'N/A'
    }, [
      { name: 'Physics', lessons: ['Mechanics', 'Thermodynamics', 'Optics'] },
      { name: 'Chemistry', lessons: ['Organic', 'Inorganic', 'Physical Chemistry'] },
      { name: 'Biology', lessons: ['Botany', 'Zoology', 'Genetics', 'Ecology'] }
    ]);

    await addSubjectsAndLessons('CAT Preparation', 'Exam', {
      eligibility: 'Graduation', examPattern: 'Quant + DILR + Verbal'
    }, [
      { name: 'Quantitative Aptitude', lessons: ['Number Systems', 'Algebra', 'Geometry', 'Arithmetic'] },
      { name: 'DILR', lessons: ['Tables & Charts', 'Logical Reasoning', 'Puzzles'] },
      { name: 'Verbal Ability', lessons: ['Reading Comprehension', 'Para Jumbles', 'Sentence Correction'] }
    ]);

    // ─── 5. COMPANIES ───────────────────────────────────────────
    console.log('🌱 Seeding Companies...');
    await CompanyPrep.insertMany([
      { name: 'Google', industry: 'Product Based', eligibility: 'B.Tech > 70%', hiringProcess: ['Online Assessment', 'Phone Screen', 'Technical Round 1', 'Technical Round 2', 'Googlyness (HR)'], onlineAssessmentPattern: '2 Coding Questions (Medium-Hard), 90 mins', technicalInterview: ['Data Structures', 'System Design', 'Algorithms'], hrInterview: ['Leadership', 'Teamwork'], salaryPackages: 'SDE-1: ₹25L - ₹45L', codingTopics: ['Graphs', 'DP', 'Trees', 'Binary Search'], aptitudeTopics: ['Not tested separately'], placementTips: ['Solve 300+ LeetCode problems', 'Focus on Medium/Hard'] },
      { name: 'Microsoft', industry: 'Product Based', eligibility: 'B.Tech > 65%', hiringProcess: ['Online Test', 'Group Fly Round', 'Technical Round 1', 'Technical Round 2', 'HR'], onlineAssessmentPattern: '3 Coding Questions, 75 mins on Codility', technicalInterview: ['DSA', 'OS', 'DBMS', 'System Design'], hrInterview: ['Why Microsoft?', 'Strengths'], salaryPackages: 'SDE: ₹20L - ₹44L', codingTopics: ['Arrays', 'Trees', 'DP', 'Greedy'], aptitudeTopics: ['Logical Reasoning'], placementTips: ['Practice on LeetCode Medium', 'Know OS and DBMS'] },
      { name: 'Amazon', industry: 'Product Based', eligibility: 'B.Tech > 60%', hiringProcess: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Bar Raiser', 'HR'], onlineAssessmentPattern: '2 Coding + Work Simulation, 90 mins', technicalInterview: ['DSA', 'System Design', 'Leadership Principles'], hrInterview: ['Amazon Leadership Principles', 'STAR Method'], salaryPackages: 'SDE-1: ₹28L - ₹45L', codingTopics: ['Graphs', 'DP', 'Trees', 'Sliding Window'], aptitudeTopics: ['Work style assessment'], placementTips: ['Master Amazon Leadership Principles', 'Focus on BFS/DFS'] },
      { name: 'TCS', industry: 'Service Based', eligibility: 'B.Tech > 60%, No backlogs', hiringProcess: ['TCS NQT', 'Technical Interview', 'HR Interview'], onlineAssessmentPattern: 'Aptitude + Verbal + 2 Coding Questions', technicalInterview: ['Java/Python basics', 'SQL', 'DBMS'], hrInterview: ['Willingness to relocate', 'Bond'], salaryPackages: 'Ninja: ₹3.36L, Digital: ₹7L, Prime: ₹9L', codingTopics: ['Arrays', 'Strings', 'Math'], aptitudeTopics: ['Time & Work', 'Percentages', 'Profit & Loss'], placementTips: ['Clear NQT with a high score for Digital'] },
      { name: 'Infosys', industry: 'Service Based', eligibility: 'B.Tech > 60%, No backlogs', hiringProcess: ['InfyTQ / HackWithInfy', 'Technical Interview', 'HR'], onlineAssessmentPattern: 'MCQs + 3 Coding Questions', technicalInterview: ['OOPs', 'DBMS', 'Java/Python'], hrInterview: ['Relocation', 'Career goals'], salaryPackages: 'SE: ₹3.6L, PP: ₹5L, DSE: ₹6.5L, SP: ₹9L', codingTopics: ['Sorting', 'Searching', 'Strings'], aptitudeTopics: ['Quant', 'Verbal', 'Logical'], placementTips: ['Participate in HackWithInfy for SP offer'] },
      { name: 'Wipro', industry: 'Service Based', eligibility: 'B.Tech > 60%', hiringProcess: ['Wipro NLTH', 'Technical Interview', 'HR'], onlineAssessmentPattern: 'Aptitude + Essay + Coding', technicalInterview: ['Basic Programming', 'SQL'], hrInterview: ['General HR questions'], salaryPackages: 'Project Engineer: ₹3.5L - ₹5L', codingTopics: ['Basic DS', 'String Manipulation'], aptitudeTopics: ['Verbal', 'Logical', 'Quant'], placementTips: ['Focus on aptitude and essay writing'] },
      { name: 'Zoho', industry: 'Product Based', eligibility: 'B.Tech/BCA, No % cutoff', hiringProcess: ['Written Test (C)', 'Advanced Coding', 'Technical Interview', 'HR'], onlineAssessmentPattern: '10 C Programming + 5 Advanced Coding', technicalInterview: ['Core Java/C', 'DBMS', 'Problem Solving'], hrInterview: ['Background', 'Goals'], salaryPackages: 'Member: ₹6L - ₹12L', codingTopics: ['C Programming', 'Pattern Programs', 'Data Structures'], aptitudeTopics: ['Aptitude MCQs'], placementTips: ['Master C programming and pointers'] },
      { name: 'Flipkart', industry: 'Product Based', eligibility: 'B.Tech > 70%', hiringProcess: ['Online Coding', 'Machine Coding', 'Problem Solving', 'System Design', 'HR'], onlineAssessmentPattern: '3 DSA problems, 90 mins', technicalInterview: ['DSA', 'System Design', 'Machine Coding'], hrInterview: ['Culture fit'], salaryPackages: 'SDE-1: ₹18L - ₹30L', codingTopics: ['DP', 'Graphs', 'Trees', 'System Design'], aptitudeTopics: ['Not tested'], placementTips: ['Practice Machine Coding rounds'] },
    ]);

    // ─── 6. PLACEMENT ROLES ─────────────────────────────────────
    console.log('🌱 Seeding Placement Roles...');
    await PlacementRole.insertMany([
      { title: 'Software Engineer', requiredSkills: ['Java/C++', 'DSA', 'SQL', 'OS', 'CN'], prerequisites: ['Basic Programming'], beginnerProjects: ['Calculator', 'To-Do App'], intermediateProjects: ['Weather App', 'Blog API'], advancedProjects: ['E-Commerce Platform', 'Real-time Chat'], interviewQuestions: ['Reverse a linked list', 'Explain ACID properties', 'What is a deadlock?'], resumeTips: ['Highlight coding contest ranks', 'Add GitHub link'], salaryRange: '₹5L - ₹30L', topHiringCompanies: ['Google', 'Amazon', 'TCS', 'Infosys'], estimatedLearningTime: '6 Months' },
      { title: 'Full Stack Developer', requiredSkills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'], prerequisites: ['Web basics'], beginnerProjects: ['Portfolio Website', 'Landing Page'], intermediateProjects: ['Blog Platform', 'Task Manager'], advancedProjects: ['E-Commerce', 'Social Media Clone'], interviewQuestions: ['Explain REST', 'What is virtual DOM?', 'JWT vs Sessions?'], resumeTips: ['Add live deployed projects'], salaryRange: '₹6L - ₹28L', topHiringCompanies: ['Flipkart', 'Zoho', 'Freshworks'], estimatedLearningTime: '8 Months' },
      { title: 'Data Scientist', requiredSkills: ['Python', 'ML', 'Statistics', 'SQL', 'Pandas'], prerequisites: ['Mathematics'], beginnerProjects: ['Titanic Survival'], intermediateProjects: ['House Price Prediction'], advancedProjects: ['Stock Market Forecaster'], interviewQuestions: ['Explain Random Forest', 'What is p-value?'], resumeTips: ['Link Kaggle profile'], salaryRange: '₹6L - ₹25L', topHiringCompanies: ['MuSigma', 'Fractal', 'Meta'], estimatedLearningTime: '8 Months' },
      { title: 'DevOps Engineer', requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS'], prerequisites: ['Networking basics'], beginnerProjects: ['Docker Compose setup'], intermediateProjects: ['CI/CD Pipeline'], advancedProjects: ['K8s Cluster'], interviewQuestions: ['Docker vs VM?', 'What is Terraform?'], resumeTips: ['Add AWS certifications'], salaryRange: '₹8L - ₹30L', topHiringCompanies: ['Amazon', 'Microsoft', 'Capgemini'], estimatedLearningTime: '6 Months' },
      { title: 'UI/UX Designer', requiredSkills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'], prerequisites: ['Design sense'], beginnerProjects: ['App Redesign'], intermediateProjects: ['Design System'], advancedProjects: ['Full Product Design'], interviewQuestions: ['Design process?', 'Usability testing?'], resumeTips: ['Portfolio with case studies'], salaryRange: '₹4L - ₹18L', topHiringCompanies: ['Google', 'Flipkart', 'Swiggy'], estimatedLearningTime: '4 Months' },
    ]);

    // ─── 7. INTERNSHIPS ─────────────────────────────────────────
    console.log('🌱 Seeding Internships...');
    await Internship.insertMany([
      { title: 'Google STEP Intern', type: 'Summer', company: 'Google', source: 'Google Careers', link: 'careers.google.com' },
      { title: 'Microsoft Engage', type: 'Summer', company: 'Microsoft', source: 'Microsoft Careers', link: 'careers.microsoft.com' },
      { title: 'Amazon SDE Intern', type: 'Summer', company: 'Amazon', source: 'Amazon Jobs', link: 'amazon.jobs' },
      { title: 'AICTE Virtual Internship', type: 'Virtual', company: 'AICTE', source: 'AICTE Portal', link: 'internship.aicte-india.org' },
      { title: 'Flipkart GRID', type: 'Summer', company: 'Flipkart', source: 'Unstop', link: 'unstop.com' },
      { title: 'TCS CodeVita Winner', type: 'Paid', company: 'TCS', source: 'TCS iON', link: 'codevita.tcsion.com' },
    ]);

    // ─── 8. CERTIFICATIONS ──────────────────────────────────────
    console.log('🌱 Seeding Certifications...');
    await Certification.insertMany([
      { name: 'AWS Solutions Architect', provider: 'AWS', level: 'Intermediate', duration: '3 Months', cost: '$150', officialWebsite: 'aws.amazon.com/certification', skillsCovered: ['EC2', 'S3', 'VPC', 'IAM'] },
      { name: 'Google Data Analytics', provider: 'Coursera', level: 'Beginner', duration: '6 Months', cost: '₹1200/month', officialWebsite: 'coursera.org', skillsCovered: ['SQL', 'R', 'Tableau', 'Spreadsheets'] },
      { name: 'NPTEL Programming in Java', provider: 'NPTEL', level: 'Beginner', duration: '12 Weeks', cost: 'Free (Exam ₹1000)', officialWebsite: 'nptel.ac.in', skillsCovered: ['Java', 'OOP', 'Collections'] },
      { name: 'Cisco CCNA', provider: 'Cisco', level: 'Intermediate', duration: '4 Months', cost: '$330', officialWebsite: 'cisco.com', skillsCovered: ['Networking', 'Routing', 'Switching'] },
      { name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', level: 'Beginner', duration: '1 Month', cost: '$99', officialWebsite: 'learn.microsoft.com', skillsCovered: ['Azure', 'Cloud Concepts', 'Services'] },
    ]);

    // ─── 9. SCHOLARSHIPS ────────────────────────────────────────
    console.log('🌱 Seeding Scholarships...');
    await Scholarship.insertMany([
      { name: 'NSP Merit Scholarship', type: 'Government', eligibility: 'Class 12 > 80%', amount: '₹10,000/year', deadline: 'October 31', link: 'scholarships.gov.in' },
      { name: 'Reliance Foundation', type: 'Private', eligibility: 'UG Students', amount: 'Up to ₹2L', deadline: 'December 15', link: 'reliancefoundation.org' },
      { name: 'AICTE Pragati (Girls)', type: 'Government', eligibility: 'Girl students in Tech', amount: '₹50,000/year', deadline: 'November 30', link: 'aicte-india.org' },
      { name: 'Tata Trust Scholarship', type: 'Private', eligibility: 'Economically weaker students', amount: 'Full tuition', deadline: 'August 31', link: 'tatatrusts.org' },
    ]);

    // ─── 10. CODING PLATFORMS ───────────────────────────────────
    console.log('🌱 Seeding Coding Platforms...');
    await CodingPlatform.insertMany([
      { name: 'LeetCode', website: 'leetcode.com', description: 'Best for interview prep', beginnerProblems: ['Two Sum', 'Palindrome Number', 'Valid Parentheses'], advancedProblems: ['Median of Two Sorted Arrays', 'Trapping Rain Water'], contestInfo: 'Weekly & Biweekly Contests (Sat/Sun)' },
      { name: 'Codeforces', website: 'codeforces.com', description: 'Best for competitive programming', beginnerProblems: ['Watermelon', 'Way Too Long Words'], advancedProblems: ['DP on Trees', 'Segment Trees'], contestInfo: 'Div 1/2/3/4 Contests, Rated' },
      { name: 'GeeksforGeeks', website: 'geeksforgeeks.org', description: 'Best for concept learning', beginnerProblems: ['Reverse Array', 'Check Prime'], advancedProblems: ['LRU Cache', 'Dijkstra'], contestInfo: 'Weekly Coding Contest' },
      { name: 'HackerRank', website: 'hackerrank.com', description: 'Best for skill certification', beginnerProblems: ['Solve Me First', 'Staircase'], advancedProblems: ['Matrix Rotation', 'Array Manipulation'], contestInfo: 'Skill Certifications Available' },
    ]);

    console.log('\n✅✅✅ COMPLETE DATABASE SEEDING FINISHED! ✅✅✅\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
