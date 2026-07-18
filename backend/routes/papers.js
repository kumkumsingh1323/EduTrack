import express from 'express';
import multer  from 'multer';
import path    from 'path';
import fs      from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join }  from 'path';
import Paper from '../models/Paper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const uploadsDir = join(__dirname, '..', 'uploads');

/* ── multer storage ─────────────────────────────────────── */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename:    (_req, file, cb) => {
    const uniq = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniq + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext)
      ? cb(null, true)
      : cb(new Error('Only PDF, DOC, DOCX, and image files are allowed.'));
  }
});

const router = express.Router();

/* ── POST /api/papers/upload ─────────────────────────────── */
router.post('/upload', upload.single('paper'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
    const { studentId, subject, goal } = req.body;

    const paper = await Paper.create({
      studentId,
      fileName:     req.file.filename,
      originalName: req.file.originalname,
      filePath:     `/uploads/${req.file.filename}`,
      subject:      subject  || 'General',
      goal:         goal     || 'General',
      fileSize:     req.file.size,
      mimeType:     req.file.mimetype
    });

    res.status(201).json({ success: true, paper });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Upload failed.' });
  }
});

/* ── GET /api/papers/:studentId ──────────────────────────── */
router.get('/:studentId', async (req, res) => {
  try {
    const papers = await Paper.find({ studentId: req.params.studentId })
      .sort({ createdAt: -1 });
    res.json({ success: true, papers });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching papers.' });
  }
});

/* ── DELETE /api/papers/file/:id ─────────────────────────── */
router.delete('/file/:id', async (req, res) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id);
    if (paper) {
      const diskPath = join(uploadsDir, paper.fileName);
      if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath);
    }
    res.json({ success: true, message: 'Paper deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting paper.' });
  }
});

export default router;
