import express from 'express';
import { 
  EducationLevel, 
  Stream, 
  Roadmap, 
  Job, 
  PlacementTrack, 
  HigherStudy 
} from '../models/PlatformData.js';

const router = express.Router();

/* ── 1. Get All Education Levels (10th, B.Tech, etc.) ── */
router.get('/education', async (req, res) => {
  try {
    const levels = await EducationLevel.find().sort('order');
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ── 2. Get Streams for a specific Education Level ── */
router.get('/streams/:educationLevelId', async (req, res) => {
  try {
    const streams = await Stream.find({ educationLevelId: req.params.educationLevelId });
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ── 3. Get Roadmaps for a specific Stream ── */
router.get('/roadmaps/:streamId', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ streamId: req.params.streamId });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ── 4. Get Jobs by Category (Government, Private) ── */
router.get('/jobs', async (req, res) => {
  try {
    const { category } = req.query; // e.g., ?category=Government
    const query = category ? { category } : {};
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ── 5. Get Placement Tracks ── */
router.get('/placements', async (req, res) => {
  try {
    const tracks = await PlacementTrack.find();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ── 6. Get Higher Studies ── */
router.get('/higher-studies', async (req, res) => {
  try {
    const studies = await HigherStudy.find();
    res.json(studies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ── 7. Get Detailed Roadmap Data (with Subjects and Lessons) ── */
import { Subject, Lesson } from '../models/PlatformData.js';

router.get('/roadmap-details/:roadmapId', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId).lean();
    if (!roadmap) return res.status(404).json({ error: 'Roadmap not found' });

    // Fetch all subjects for this roadmap
    const subjects = await Subject.find({ roadmapId: roadmap._id }).sort('order').lean();
    
    // For each subject, fetch its lessons
    for (let subject of subjects) {
      subject.lessons = await Lesson.find({ subjectId: subject._id }).sort('order').lean();
    }

    roadmap.subjects = subjects;
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ==============================================================
   PHASE 2: CAREER HUB & PLACEMENTS APIs
============================================================== */
import { CompanyPrep, PlacementRole, Internship, Certification, Scholarship, CodingPlatform } from '../models/PlatformData.js';

router.get('/careers/companies', async (req, res) => {
  try {
    const companies = await CompanyPrep.find().sort('name');
    res.json(companies);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/careers/placements', async (req, res) => {
  try {
    const roles = await PlacementRole.find().sort('title');
    res.json(roles);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/careers/internships', async (req, res) => {
  try { res.json(await Internship.find().sort('title')); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/careers/certifications', async (req, res) => {
  try { res.json(await Certification.find().sort('name')); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/careers/scholarships', async (req, res) => {
  try { res.json(await Scholarship.find().sort('name')); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/careers/coding-platforms', async (req, res) => {
  try { res.json(await CodingPlatform.find().sort('name')); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
