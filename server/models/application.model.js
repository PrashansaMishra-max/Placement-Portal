// models/application.model.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    appId: { type: Number, required: true, unique: true },
    rollNo: { type: String, required: true },
    studentName: { type: String, required: true },
    company: { type: String, required: true },
    domain: { type: String },
    roleApplied: { type: String, required: true },
    jobCtc: { type: Number },
    currentRound: { type: String, default: '—' },
    applicationStatus: { type: String, enum: ['In Progress', 'Selected', 'Rejected', 'Not Eligible'], default: 'In Progress' },
    appliedDate: { type: String }
}, { timestamps: true });

// Named export 'Application' with capitalization protection
export const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);