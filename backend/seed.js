import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { 
  EducationLevel, 
  Stream, 
  Roadmap
} from './models/PlatformData.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(URI);
    console.log('✅ Connected.');

    console.log('🧹 Clearing old data...');
    await EducationLevel.deleteMany({});
    await Stream.deleteMany({});
    await Roadmap.deleteMany({});

    console.log('🌱 Seeding Education Levels...');
    const levelsData = [
      '10th', 'Intermediate', 'ITI', 'Polytechnic', 'Diploma', 
      'Degree', 'B.Tech', 'Higher Studies', 'Government Jobs', 'Placement Preparation'
    ];
    
    const levels = await EducationLevel.insertMany(
      levelsData.map((name, index) => ({ name, order: index + 1 }))
    );

    const getLevelId = (name) => levels.find(l => l.name === name)._id;

    console.log('🌱 Seeding Streams (Level 2 Navigation)...');
    const streamsData = [
      // 10th
      { level: '10th', name: 'State Board' }, { level: '10th', name: 'CBSE' }, { level: '10th', name: 'ICSE' }, { level: '10th', name: 'NIOS' }, { level: '10th', name: 'Career Options' }, { level: '10th', name: 'Government Jobs' }, { level: '10th', name: 'Skill Courses' }, { level: '10th', name: 'Scholarships' },
      
      // Intermediate
      { level: 'Intermediate', name: 'MPC' }, { level: 'Intermediate', name: 'BiPC' }, { level: 'Intermediate', name: 'MEC' }, { level: 'Intermediate', name: 'CEC' }, { level: 'Intermediate', name: 'HEC' }, { level: 'Intermediate', name: 'Vocational' },
      
      // ITI
      { level: 'ITI', name: 'Electrician' }, { level: 'ITI', name: 'Fitter' }, { level: 'ITI', name: 'Welder' }, { level: 'ITI', name: 'COPA' }, { level: 'ITI', name: 'Mechanic' }, { level: 'ITI', name: 'Plumber' }, { level: 'ITI', name: 'Turner' },
      
      // Polytechnic
      { level: 'Polytechnic', name: 'Civil' }, { level: 'Polytechnic', name: 'Mechanical' }, { level: 'Polytechnic', name: 'EEE' }, { level: 'Polytechnic', name: 'ECE' }, { level: 'Polytechnic', name: 'CSE' }, { level: 'Polytechnic', name: 'Automobile' },
      
      // Diploma
      { level: 'Diploma', name: 'All branches' },
      
      // Degree
      { level: 'Degree', name: 'BA' }, { level: 'Degree', name: 'B.Com' }, { level: 'Degree', name: 'B.Sc' }, { level: 'Degree', name: 'BBA' }, { level: 'Degree', name: 'BCA' },
      
      // B.Tech
      { level: 'B.Tech', name: 'CSE' }, { level: 'B.Tech', name: 'IT' }, { level: 'B.Tech', name: 'AI' }, { level: 'B.Tech', name: 'AI & ML' }, { level: 'B.Tech', name: 'AI & DS' }, { level: 'B.Tech', name: 'Cyber Security' }, { level: 'B.Tech', name: 'Data Science' }, { level: 'B.Tech', name: 'ECE' }, { level: 'B.Tech', name: 'EEE' }, { level: 'B.Tech', name: 'Civil' }, { level: 'B.Tech', name: 'Mechanical' }, { level: 'B.Tech', name: 'Chemical' }, { level: 'B.Tech', name: 'Biotechnology' }, { level: 'B.Tech', name: 'Robotics' }, { level: 'B.Tech', name: 'IoT' }, { level: 'B.Tech', name: 'Aerospace' },
      
      // Higher Studies
      { level: 'Higher Studies', name: 'M.Tech' }, { level: 'Higher Studies', name: 'MBA' }, { level: 'Higher Studies', name: 'MCA' }, { level: 'Higher Studies', name: 'MS' }, { level: 'Higher Studies', name: 'ME' }, { level: 'Higher Studies', name: 'PhD' }, { level: 'Higher Studies', name: 'Abroad Studies' },
      
      // Government Jobs
      { level: 'Government Jobs', name: 'UPSC' }, { level: 'Government Jobs', name: 'SSC' }, { level: 'Government Jobs', name: 'Banking' }, { level: 'Government Jobs', name: 'Railways' }, { level: 'Government Jobs', name: 'Defence' }, { level: 'Government Jobs', name: 'PSU' }, { level: 'Government Jobs', name: 'State PSC' },
      
      // Placement Preparation
      { level: 'Placement Preparation', name: 'Software Development' }, { level: 'Placement Preparation', name: 'Data Science' }, { level: 'Placement Preparation', name: 'AI' }, { level: 'Placement Preparation', name: 'Cloud' }, { level: 'Placement Preparation', name: 'Cyber Security' }, { level: 'Placement Preparation', name: 'DevOps' }, { level: 'Placement Preparation', name: 'Testing' }, { level: 'Placement Preparation', name: 'UI/UX' }
    ];

    const streams = await Stream.insertMany(
      streamsData.map(s => ({ educationLevelId: getLevelId(s.level), name: s.name }))
    );

    const getStreamId = (levelName, streamName) => {
      const lid = getLevelId(levelName);
      return streams.find(s => s.educationLevelId.equals(lid) && s.name === streamName)._id;
    };

    console.log('🌱 Seeding Roadmaps (Level 3 Navigation)...');
    
    // As per user request: "Inside MPC, Inside BiPC, Inside MEC, Inside CEC"
    const roadmapsData = [
      // MPC Roadmaps
      { stream: 'MPC', level: 'Intermediate', titles: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'AP EAPCET (EAMCET)', 'TS EAPCET', 'CUET', 'NDA', 'IISER', 'IIIT', 'NIT', 'IIT', 'Engineering', 'Skills', 'Jobs'] },
      
      // BiPC Roadmaps
      { stream: 'BiPC', level: 'Intermediate', titles: ['NEET', 'AIIMS', 'Nursing', 'Pharmacy', 'Agriculture', 'Veterinary', 'BSc', 'Biotechnology', 'Allied Health Sciences'] },
      
      // MEC Roadmaps
      { stream: 'MEC', level: 'Intermediate', titles: ['CA', 'CS', 'CMA', 'B.Com', 'BBA', 'Banking', 'Finance', 'MBA'] },
      
      // CEC Roadmaps
      { stream: 'CEC', level: 'Intermediate', titles: ['CLAT', 'BA LLB', 'UPSC', 'SSC', 'Banking', 'Degree'] }
    ];

    const allRoadmaps = [];
    roadmapsData.forEach(data => {
      const sid = getStreamId(data.level, data.stream);
      data.titles.forEach(title => {
        allRoadmaps.push({ streamId: sid, title, description: `Dynamic roadmap for ${title}` });
      });
    });

    await Roadmap.insertMany(allRoadmaps);

    console.log('✅ Massive Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
