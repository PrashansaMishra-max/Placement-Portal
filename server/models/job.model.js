// models/job.model.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobId: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    domain: { type: String },
    role: { type: String, required: true },
    ctc: { type: Number, required: true }, 
    location: { type: String },
    openings: { type: Number },
    eligibleBranches: [{ type: String }],  
    minCgpa: { type: Number, required: true },
    education: { type: String },
    bond: { type: String },
    deadline: { type: String },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    contactPerson: { type: String },
    contactEmail: { type: String }
}, { timestamps: true });

// Named export 'Job' with proper lowercase schema variable matching
export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);