import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { 
  CompanyPrep, 
  PlacementRole, 
  Internship, 
  Certification, 
  Scholarship, 
  CodingPlatform 
} from './models/PlatformData.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const URI = process.env.MONGODB_URI;

const seedCareers = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(URI);
    console.log('✅ Connected.');

    console.log('🧹 Clearing old Career Data...');
    await CompanyPrep.deleteMany({});
    await PlacementRole.deleteMany({});
    await Internship.deleteMany({});
    await Certification.deleteMany({});
    await Scholarship.deleteMany({});
    await CodingPlatform.deleteMany({});

    /* ── 1. Company Prep ── */
    console.log('🌱 Seeding Companies...');
    await CompanyPrep.insertMany([
      {
        name: 'Google', industry: 'Product Based', eligibility: 'B.Tech/BE > 70%',
        hiringProcess: ['Online Assessment', 'Technical Interview 1', 'Technical Interview 2', 'Googlyness (HR)'],
        onlineAssessmentPattern: '2 Coding Questions (Medium-Hard) in 90 mins on HackerEarth.',
        technicalInterview: ['Data Structures', 'System Design', 'Algorithms'],
        hrInterview: ['Leadership principles', 'Conflict resolution'],
        salaryPackages: 'SDE-1: ₹25L - ₹45L', codingTopics: ['Graphs', 'DP', 'Trees'],
        aptitudeTopics: ['Not heavily tested'], placementTips: ['Focus heavily on LeetCode Hard problems.']
      },
      {
        name: 'TCS', industry: 'Service Based', eligibility: 'B.Tech > 60%, No active backlogs',
        hiringProcess: ['TCS NQT', 'Technical Interview', 'HR Interview'],
        onlineAssessmentPattern: 'Aptitude, Logical, Verbal, 2 Basic Coding Questions.',
        technicalInterview: ['Java/Python basics', 'SQL', 'DBMS'],
        hrInterview: ['Willingness to relocate', 'Bond signature'],
        salaryPackages: 'Ninja: ₹3.36L, Digital: ₹7L, Prime: ₹9L', codingTopics: ['Arrays', 'Strings', 'Math'],
        aptitudeTopics: ['Time & Work', 'Percentages', 'Profit & Loss'], placementTips: ['Clear NQT with a high score for Digital profile.']
      }
    ]);

    /* ── 2. Placement Roles ── */
    console.log('🌱 Seeding Placement Roles...');
    await PlacementRole.insertMany([
      {
        title: 'Software Engineer', requiredSkills: ['Java/C++', 'DSA', 'SQL'], prerequisites: ['Basic Programming'],
        beginnerProjects: ['Calculator', 'To-Do App'], intermediateProjects: ['Weather App', 'Blog API'], advancedProjects: ['E-Commerce Clone'],
        interviewQuestions: ['Reverse a linked list', 'Explain ACID properties'], resumeTips: ['Highlight coding contest ranks'],
        salaryRange: '₹5L - ₹30L', topHiringCompanies: ['Amazon', 'Google', 'TCS'], estimatedLearningTime: '6 Months'
      },
      {
        title: 'Data Scientist', requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'Statistics'], prerequisites: ['Mathematics'],
        beginnerProjects: ['Titanic Survival Prediction'], intermediateProjects: ['House Price Prediction'], advancedProjects: ['Stock Market Forecaster'],
        interviewQuestions: ['Explain Random Forest', 'P-value meaning'], resumeTips: ['Link Kaggle profile'],
        salaryRange: '₹6L - ₹25L', topHiringCompanies: ['MuSigma', 'Fractal', 'Meta'], estimatedLearningTime: '8 Months'
      }
    ]);

    /* ── 3. Internships ── */
    console.log('🌱 Seeding Internships...');
    await Internship.insertMany([
      { title: 'Google STEP Intern', type: 'Summer', company: 'Google', source: 'Google Careers', link: 'careers.google.com' },
      { title: 'AICTE Virtual Internship', type: 'Virtual', company: 'AICTE', source: 'AICTE Portal', link: 'internship.aicte-india.org' }
    ]);

    /* ── 4. Certifications ── */
    console.log('🌱 Seeding Certifications...');
    await Certification.insertMany([
      { name: 'AWS Solutions Architect', provider: 'AWS', level: 'Intermediate', duration: '3 Months', cost: '$150', officialWebsite: 'aws.amazon.com', skillsCovered: ['Cloud', 'EC2', 'S3'] },
      { name: 'Google Data Analytics', provider: 'Coursera', level: 'Beginner', duration: '6 Months', cost: '₹1200/month', officialWebsite: 'coursera.org', skillsCovered: ['SQL', 'R', 'Tableau'] }
    ]);

    /* ── 5. Scholarships ── */
    console.log('🌱 Seeding Scholarships...');
    await Scholarship.insertMany([
      { name: 'NSP Merit Scholarship', type: 'Government', eligibility: 'Class 12 > 80%', amount: '₹10,000/year', deadline: 'October 31', link: 'scholarships.gov.in' },
      { name: 'Reliance Foundation', type: 'Private', eligibility: 'UG Students', amount: 'Up to ₹2L', deadline: 'December 15', link: 'reliancefoundation.org' }
    ]);

    /* ── 6. Coding Platforms ── */
    console.log('🌱 Seeding Coding Platforms...');
    await CodingPlatform.insertMany([
      { name: 'LeetCode', website: 'leetcode.com', description: 'Best for interview prep.', beginnerProblems: ['Two Sum', 'Palindrome'], advancedProblems: ['Median of Two Sorted Arrays'], contestInfo: 'Weekly Saturday/Sunday' },
      { name: 'Codeforces', website: 'codeforces.com', description: 'Best for competitive programming.', beginnerProblems: ['Watermelon'], advancedProblems: ['Dynamic Programming Trees'], contestInfo: 'Div 1/2/3/4 Contests' }
    ]);

    console.log('✅ Career Hub Data Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedCareers();
