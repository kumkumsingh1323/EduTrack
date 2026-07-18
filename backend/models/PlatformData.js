import mongoose from 'mongoose';

// 1. Education Levels (e.g., 10th, Intermediate, B.Tech)
export const EducationLevel = mongoose.model('EducationLevel', new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  order: Number
}));

// 2. Streams (e.g., MPC, CSE, Mechanical)
export const Stream = mongoose.model('Stream', new mongoose.Schema({
  educationLevelId: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationLevel' },
  name: { type: String, required: true },
  description: String
}));

// 3. Subjects & Roadmaps
export const Roadmap = mongoose.model('Roadmap', new mongoose.Schema({
  streamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' },
  title: String,
  description: String,
  estimatedMonths: Number,
  type: { type: String, enum: ['Exam', 'Job', 'HigherStudy', 'Skill', 'General'], default: 'General' },
  
  // Rich Metadata (Optional based on type)
  eligibility: String,
  ageLimit: String,
  examPattern: String,
  salary: String,
  officialWebsite: String,
  entranceExams: [String],
  topColleges: [String],
  fees: String,
  scholarships: String
}));

export const Subject = mongoose.model('Subject', new mongoose.Schema({
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' },
  name: String,
  description: String,
  order: Number
}));

export const Lesson = mongoose.model('Lesson', new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  title: String,
  type: { type: String, enum: ['Video', 'Reading', 'Project', 'Quiz'], default: 'Reading' },
  content: String,
  youtubeUrl: String,
  order: Number
}));

// 4. Jobs & Careers
export const Job = mongoose.model('Job', new mongoose.Schema({
  title: String,
  category: { type: String, enum: ['Government', 'Private', 'PSU', 'Placement'] },
  industry: String,
  eligibility: String,
  skills: [String],
  salary: String,
  description: String,
  applyLink: String
}));

export const PlacementTrack = mongoose.model('PlacementTrack', new mongoose.Schema({
  roleName: { type: String, required: true }, // e.g., MERN Stack Developer
  requiredSkills: [String],
  averagePackage: String,
  companies: [String]
}));

export const HigherStudy = mongoose.model('HigherStudy', new mongoose.Schema({
  programName: String, // e.g., M.Tech, MBA
  examsRequired: [String],
  topColleges: [String]
}));

// 5. Resources (Videos, Books, Quizzes)
export const Video = mongoose.model('Video', new mongoose.Schema({
  referenceId: { type: mongoose.Schema.Types.ObjectId }, // Can be Subject, Job, etc.
  title: String,
  youtubeUrl: String
}));

// ... existing Quiz code
export const Quiz = mongoose.model('Quiz', new mongoose.Schema({
  referenceId: { type: mongoose.Schema.Types.ObjectId },
  title: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String
  }]
}));

/* ==============================================================
   PHASE 2: CAREER HUB & PLACEMENTS EXPANSION
============================================================== */

export const CompanyPrep = mongoose.model('CompanyPrep', new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  eligibility: String,
  hiringProcess: [String],
  onlineAssessmentPattern: String,
  technicalInterview: [String],
  hrInterview: [String],
  salaryPackages: String,
  codingTopics: [String],
  aptitudeTopics: [String],
  placementTips: [String]
}));

export const PlacementRole = mongoose.model('PlacementRole', new mongoose.Schema({
  title: { type: String, required: true },
  requiredSkills: [String],
  prerequisites: [String],
  beginnerProjects: [String],
  intermediateProjects: [String],
  advancedProjects: [String],
  interviewQuestions: [String],
  resumeTips: [String],
  salaryRange: String,
  topHiringCompanies: [String],
  estimatedLearningTime: String
}));

export const Internship = mongoose.model('Internship', new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['Summer', 'Winter', 'Virtual', 'Paid', 'Free', 'Government', 'Startup'] },
  company: String,
  source: String, // LinkedIn, Internshala, etc.
  link: String
}));

export const Certification = mongoose.model('Certification', new mongoose.Schema({
  name: String,
  provider: String, // Google, Microsoft, AWS
  level: String,
  duration: String,
  cost: String,
  officialWebsite: String,
  skillsCovered: [String]
}));

export const Scholarship = mongoose.model('Scholarship', new mongoose.Schema({
  name: String,
  type: String, // Government, Merit, etc.
  eligibility: String,
  amount: String,
  deadline: String,
  link: String
}));

export const CodingPlatform = mongoose.model('CodingPlatform', new mongoose.Schema({
  name: String,
  website: String,
  description: String,
  beginnerProblems: [String],
  advancedProblems: [String],
  contestInfo: String
}));
