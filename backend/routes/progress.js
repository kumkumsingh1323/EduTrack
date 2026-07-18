import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

/* ── GET /api/students/:id ────────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-chatHistory');
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

/* ── PUT /api/students/:id/goal ───────────────────────────── */
router.put('/:id/goal', async (req, res) => {
  try {
    const { goal } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { goal, lastActive: Date.now() },
      { new: true }
    ).select('-chatHistory');
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating goal.' });
  }
});

/* ── PUT /api/students/:id/lessons ───────────────────────── */
router.put('/:id/lessons', async (req, res) => {
  try {
    const { completedLessons } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { completedLessons, lastActive: Date.now() },
      { new: true }
    ).select('-chatHistory');
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating lessons.' });
  }
});

export default router;
