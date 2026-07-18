import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  studentId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fileName:     { type: String, required: true },
  originalName: { type: String, required: true },
  filePath:     { type: String, required: true },
  subject:      { type: String, default: 'General' },
  goal:         { type: String, required: true },
  fileSize:     { type: Number },
  mimeType:     { type: String }
}, { timestamps: true });

export default mongoose.model('Paper', paperSchema);
