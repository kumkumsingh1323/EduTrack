import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { 
  Stream, 
  Roadmap,
  Subject,
  Lesson
} from './models/PlatformData.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const URI = process.env.MONGODB_URI;

const seedDetailedRoadmaps = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(URI);
    console.log('✅ Connected.');

    console.log('🧹 Clearing old Subjects and Lessons...');
    await Subject.deleteMany({});
    await Lesson.deleteMany({});

    // Helper to find a stream by name
    const getStreamId = async (streamName) => {
      const stream = await Stream.findOne({ name: streamName });
      if (!stream) throw new Error(`Stream not found: ${streamName}`);
      return stream._id;
    };

    // Helper to create a complete roadmap
    const createRoadmap = async (streamName, title, type, metadata, subjectsArray) => {
      console.log(`🌱 Creating Roadmap: ${title}...`);
      const streamId = await getStreamId(streamName);
      
      // Delete if already exists to prevent duplicates
      await Roadmap.deleteOne({ streamId, title });

      const roadmap = await Roadmap.create({
        streamId,
        title,
        description: `Detailed AI Roadmap for ${title}`,
        estimatedMonths: 6,
        type,
        ...metadata
      });

      for (let i = 0; i < subjectsArray.length; i++) {
        const subData = subjectsArray[i];
        const subject = await Subject.create({
          roadmapId: roadmap._id,
          name: subData.name,
          description: `Master ${subData.name} from scratch`,
          order: i + 1
        });

        const lessons = subData.lessons.map((title, idx) => ({
          subjectId: subject._id,
          title: title,
          type: title.includes('Project') ? 'Project' : title.includes('Quiz') ? 'Quiz' : 'Video',
          content: `Detailed notes, videos, and practice problems for ${title} will be loaded dynamically by the AI.`,
          youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
          order: idx + 1
        }));
        
        await Lesson.insertMany(lessons);
      }
    };

    /* ── 1. Placement Preparation Roadmaps ── */

    await createRoadmap('Software Development', 'Software Engineer', 'Job', {
      eligibility: 'B.Tech/B.E/MCA or equivalent in Computer Science',
      salary: '6 LPA - 24 LPA'
    }, [
      { name: 'Programming', lessons: ['Variables & Data Types', 'Control Structures', 'Functions & Pointers', 'OOP Concepts'] },
      { name: 'DSA', lessons: ['Arrays & Strings', 'Linked Lists & Trees', 'Graphs & DP', 'LeetCode Practice'] },
      { name: 'DBMS', lessons: ['SQL Basics', 'Normalization', 'Indexing & Transactions', 'NoSQL DBs'] },
      { name: 'OS', lessons: ['Process Management', 'Memory Management', 'Deadlocks'] },
      { name: 'CN', lessons: ['OSI Model', 'TCP/IP', 'HTTP & DNS'] },
      { name: 'Projects', lessons: ['E-Commerce App (Project)', 'Chat App (Project)'] },
      { name: 'Interview Prep', lessons: ['Resume Building', 'Mock Interview (Video)'] }
    ]);

    await createRoadmap('Software Development', 'Full Stack Developer', 'Skill', {
      eligibility: 'Anyone with a passion for coding',
      salary: '8 LPA - 30 LPA'
    }, [
      { name: 'HTML & CSS', lessons: ['Semantic HTML', 'CSS Flexbox & Grid', 'Responsive Design', 'Tailwind CSS'] },
      { name: 'JavaScript', lessons: ['ES6+ Features', 'DOM Manipulation', 'Async/Await & Promises'] },
      { name: 'React', lessons: ['Components & Props', 'Hooks (useState, useEffect)', 'Redux & Context API', 'React Router'] },
      { name: 'Node & Express', lessons: ['RESTful APIs', 'Middleware', 'Authentication (JWT)'] },
      { name: 'MongoDB', lessons: ['Mongoose Schemas', 'Aggregation Framework'] },
      { name: 'Deployment', lessons: ['Docker Basics', 'AWS EC2 / Vercel', 'CI/CD Pipelines'] }
    ]);

    await createRoadmap('AI', 'AI Engineer', 'Skill', {
      eligibility: 'B.Tech / Strong Math Background',
      salary: '10 LPA - 40 LPA'
    }, [
      { name: 'Python', lessons: ['Python Basics', 'Advanced Python'] },
      { name: 'Mathematics', lessons: ['Linear Algebra', 'Calculus', 'Probability'] },
      { name: 'Data Processing', lessons: ['NumPy', 'Pandas', 'Data Visualization'] },
      { name: 'Machine Learning', lessons: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'] },
      { name: 'Deep Learning', lessons: ['Neural Networks', 'TensorFlow / PyTorch', 'CNNs & RNNs'] },
      { name: 'NLP & LLM', lessons: ['Text Processing', 'Transformers (BERT, GPT)', 'LangChain & RAG (Project)'] }
    ]);

    /* ── 2. Government Exams Roadmaps ── */

    await createRoadmap('UPSC', 'UPSC Civil Services', 'Exam', {
      eligibility: 'Graduation in any discipline',
      ageLimit: '21 - 32 Years (General)',
      examPattern: 'Prelims, Mains, Interview',
      salary: '₹56,100 + Allowances',
      officialWebsite: 'upsc.gov.in'
    }, [
      { name: 'History', lessons: ['Ancient India', 'Medieval India', 'Modern India & Freedom Struggle'] },
      { name: 'Geography', lessons: ['Physical Geography', 'Indian Geography', 'World Geography'] },
      { name: 'Polity', lessons: ['Constitution of India', 'Governance', 'Panchayati Raj'] },
      { name: 'Economy', lessons: ['Macroeconomics', 'Indian Economy', 'Budget & Survey'] },
      { name: 'Current Affairs', lessons: ['Daily News Analysis', 'Monthly Magazines'] },
      { name: 'Mock Tests', lessons: ['Prelims Mock Test 1 (Quiz)', 'Prelims Mock Test 2 (Quiz)'] }
    ]);

    /* ── 3. Higher Studies Roadmaps ── */

    await createRoadmap('MBA', 'Master of Business Administration', 'HigherStudy', {
      eligibility: 'Graduation with 50%',
      entranceExams: ['CAT', 'XAT', 'GMAT', 'MAT'],
      topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'ISB Hyderabad'],
      fees: '₹10L - ₹30L',
      scholarships: 'Available for top rankers and EWS'
    }, [
      { name: 'CAT Preparation', lessons: ['Quantitative Aptitude', 'Logical Reasoning', 'Data Interpretation', 'Verbal Ability'] },
      { name: 'Finance Specialization', lessons: ['Corporate Finance', 'Investment Banking', 'Financial Modeling'] },
      { name: 'Marketing Specialization', lessons: ['Consumer Behavior', 'Digital Marketing', 'Brand Management'] }
    ]);

    console.log('✅ Detailed Seed Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDetailedRoadmaps();
