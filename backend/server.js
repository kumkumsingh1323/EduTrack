import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dns from 'dns';

// Force Google DNS so SRV records for Atlas resolve even if ISP DNS blocks them
dns.setServers(['8.8.8.8', '8.8.4.4']);


import authRoutes    from './routes/auth.js';
import progressRoutes from './routes/progress.js';
import paperRoutes   from './routes/papers.js';
import chatRoutes    from './routes/chat.js';
import platformRoutes from './routes/platform.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ── uploaded files ─────────────────────────────────────── */
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

/* ── static frontend (React Dist) ───────────────────────── */
const frontendDir = join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDir));

/* ── API routes ─────────────────────────────────────────── */
app.use('/api/auth',     authRoutes);
app.use('/api/students', progressRoutes);
app.use('/api/papers',   paperRoutes);
app.use('/api/chat',     chatRoutes);
app.use('/api/platform', platformRoutes);
app.get('/api/health',   (_req, res) => res.json({ status: 'ok', time: new Date() }));

/* ── SPA fallback ───────────────────────────────────────── */
app.get('*', (_req, res) => res.sendFile(join(frontendDir, 'index.html')));

/* ── MongoDB + start ────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
const URI  = process.env.MONGODB_URI;

if (!URI || URI.includes('<YOUR-CLUSTER>')) {
  console.error('❌  Please update .env: replace <YOUR-CLUSTER> with your Atlas cluster hostname.');
  process.exit(1);
}

mongoose.connect(URI)
  .then(() => {
    console.log('✅  Connected to MongoDB Atlas');
    app.listen(PORT, () =>
      console.log(`🚀  Server running → http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });
