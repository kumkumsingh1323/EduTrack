import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Roadmap, Subject, Lesson } from './models/PlatformData.js';

dotenv.config();

async function seedSchool() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const findRoadmap = async (title) => {
      return await Roadmap.findOne({ title });
    };

    const addSubjectsAndLessons = async (roadmapTitle, type, meta, subjectsArr) => {
      const rm = await findRoadmap(roadmapTitle);
      if (!rm) {
        console.log(`Roadmap ${roadmapTitle} not found`);
        return;
      }
      if (type) rm.type = type;
      Object.assign(rm, meta);
      await rm.save();

      // Clear existing subjects for this roadmap to avoid duplicates
      const oldSubjects = await Subject.find({ roadmapId: rm._id });
      for (const s of oldSubjects) {
        await Lesson.deleteMany({ subjectId: s._id });
      }
      await Subject.deleteMany({ roadmapId: rm._id });

      for (let i = 0; i < subjectsArr.length; i++) {
        const sub = subjectsArr[i];
        const subject = await Subject.create({ roadmapId: rm._id, name: sub.name, description: `Learn ${sub.name}`, order: i + 1 });
        await Lesson.insertMany(sub.lessons.map((t, idx) => ({
          subjectId: subject._id, title: t, order: idx + 1,
          type: t.includes('Project') ? 'Project' : t.includes('Quiz') ? 'Quiz' : 'Video',
          content: `AI-generated content for ${t}`,
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Generic video for demo
        })));
      }
      console.log(`Seeded ${roadmapTitle}`);
    };

    await addSubjectsAndLessons('TS State Board', 'General', { duration: '1 Year' }, [
      { name: 'Mathematics', lessons: ['Real Numbers', 'Polynomials', 'Quadratic Equations', 'Trigonometry'] },
      { name: 'Physical Science', lessons: ['Heat', 'Acids, Bases & Salts', 'Refraction of Light', 'Structure of Atom'] },
      { name: 'Biological Science', lessons: ['Nutrition', 'Respiration', 'Transportation', 'Reproduction'] },
      { name: 'Social Studies', lessons: ['India: Relief Features', 'Ideas of Development', 'Production and Employment'] }
    ]);

    await addSubjectsAndLessons('AP State Board', 'General', { duration: '1 Year' }, [
      { name: 'Mathematics', lessons: ['Real Numbers', 'Polynomials', 'Quadratic Equations', 'Trigonometry'] },
      { name: 'Physical Science', lessons: ['Heat', 'Acids, Bases & Salts', 'Refraction of Light', 'Structure of Atom'] },
      { name: 'Biological Science', lessons: ['Nutrition', 'Respiration', 'Transportation', 'Reproduction'] },
      { name: 'Social Studies', lessons: ['India: Relief Features', 'Ideas of Development', 'Production and Employment'] }
    ]);

    await addSubjectsAndLessons('CBSE Syllabus', 'General', { duration: '1 Year' }, [
      { name: 'Mathematics', lessons: ['Number Systems', 'Algebra', 'Coordinate Geometry', 'Geometry'] },
      { name: 'Science', lessons: ['Chemical Substances', 'World of Living', 'Effects of Current'] },
      { name: 'Social Science', lessons: ['India and the Contemporary World', 'Contemporary India', 'Democratic Politics'] }
    ]);

    console.log('School seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedSchool();
