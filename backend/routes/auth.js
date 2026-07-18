import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

/* ── POST /api/auth/register ──────────────────────────────── */
router.post('/register', async (req, res) => {
  try {
    const { name, age, gender, educationLevel, classBranch } = req.body;

    if (!name || !age || !gender || !educationLevel || !classBranch) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const student = await Student.create({
      name: name.trim(),
      age: Number(age),
      gender,
      educationLevel,
      classBranch: classBranch.trim()
    });

    res.status(201).json({
      success: true,
      student: {
        _id:            student._id,
        name:           student.name,
        age:            student.age,
        gender:         student.gender,
        educationLevel: student.educationLevel,
        classBranch:    student.classBranch,
        goal:           student.goal,
        completedLessons: student.completedLessons,
        streak:         student.streak,
        createdAt:      student.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

/* ── POST /api/auth/lookup ────────────────────────────────── */
router.post('/lookup', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required.' });

    const student = await Student.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
    }).select('-chatHistory');

    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
