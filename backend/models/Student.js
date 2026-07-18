import mongoose from 'mongoose';

const chatMsgSchema = new mongoose.Schema({
  role:      { type: String, enum: ['user', 'bot'], required: true },
  message:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  age:            { type: Number, required: true, min: 5, max: 100 },
  gender:         { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  educationLevel: { type: String, required: true, enum: ['School', '10th', 'Intermediate', 'ITI', 'Diploma', 'Degree', 'B.Tech', 'M.Tech', 'MBA_MCA', 'Other'] },
  classBranch:    { type: String, required: true, trim: true },
  goal:           { type: String, default: null },
  completedLessons: { type: [String], default: [] },
  studyMinutes:   { type: Number, default: 0 },
  streak:         { type: Number, default: 0 },
  lastActive:     { type: Date, default: Date.now },
  chatHistory:    { type: [chatMsgSchema], default: [] }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
