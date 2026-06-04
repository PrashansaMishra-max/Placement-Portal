// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// CRITICAL: In ES Modules, you MUST explicitly include the '.js' extension for local files
import { Job } from './models/job.model.js';
import { Application } from './models/application.model.js';

dotenv.config();

// Rows mapped from your placement_portal_dataset files
const jobPostingsDataset = [
  { jobId: "1", company: "Google", domain: "Software", role: "SDE-II", ctc: 42, location: "New Delhi", openings: 27, eligibleBranches: ["ECE", "CSE"], minCgpa: 8.3, education: "B.Tech/B.E.", bond: "No Bond", deadline: "2025-06-15", status: "Open", contactPerson: "Sundar Pichai", contactEmail: "sundar@google.com" },
  { jobId: "2", company: "Google", domain: "Software", role: "Full Stack Developer", ctc: 42, location: "New Delhi", openings: 4, eligibleBranches: ["CH", "EE", "ME", "CE", "IT"], minCgpa: 8.2, education: "B.Tech/B.E.", bond: "No Bond", deadline: "2025-06-15", status: "Open", contactPerson: "Sundar Pichai", contactEmail: "sundar@google.com" },
  { jobId: "3", company: "Microsoft", domain: "Software", role: "Backend Engineer", ctc: 28, location: "Hyderabad", openings: 10, eligibleBranches: ["CSE", "EE", "CE"], minCgpa: 7.7, education: "B.Tech/B.E.", bond: "No Bond", deadline: "2025-06-18", status: "Open", contactPerson: "Satya N.", contactEmail: "satya@ms.com" },
  { jobId: "5", company: "Goldman Sachs", domain: "Finance/Tech", role: "Technology Analyst", ctc: 35, location: "Bengaluru", openings: 15, eligibleBranches: ["CH", "ME"], minCgpa: 7.8, education: "B.Tech/B.E.", bond: "No Bond", deadline: "2025-06-20", status: "Open", contactPerson: "Priya Mehta", contactEmail: "priya@gs.com" },
  { jobId: "34", company: "PhonePe", domain: "FinTech", role: "Backend Developer", ctc: 24, location: "Bengaluru", openings: 7, eligibleBranches: ["ECE", "IT", "BT", "CE"], minCgpa: 7.5, education: "B.Tech/B.E.", bond: "No Bond", deadline: "2025-06-21", status: "Open", contactPerson: "Rohan V.", contactEmail: "rohan@phonepe.com" }
];

const applicationsDataset = [
  { appId: 1, rollNo: "2021CS002", studentName: "Priya Kumar", company: "PhonePe", domain: "FinTech", roleApplied: "SDE-I", jobCtc: 24, currentRound: "Technical Round 2", applicationStatus: "In Progress", appliedDate: "2025-04-15" },
  { appId: 2, rollNo: "2021CS002", studentName: "Priya Kumar", company: "Wipro", domain: "IT Services", roleApplied: "System Engineer", jobCtc: 8, currentRound: "Technical Round 1", applicationStatus: "In Progress", appliedDate: "2025-05-19" },
  { appId: 3, rollNo: "2021CS002", studentName: "Priya Kumar", company: "Deloitte", domain: "Consulting", roleApplied: "Business Analyst", jobCtc: 18, currentRound: "Technical Round 1", applicationStatus: "In Progress", appliedDate: "2025-05-23" },
  { appId: 4, rollNo: "2021CS002", studentName: "Priya Kumar", company: "Google", domain: "Software", roleApplied: "SDE-I", jobCtc: 42, currentRound: "—", applicationStatus: "Not Eligible", appliedDate: "2025-03-22" },
  { appId: 6, rollNo: "2021ME004", studentName: "Vinay Agarwal", company: "Paytm", domain: "FinTech", roleApplied: "Product Engineer", jobCtc: 16, currentRound: "OA Submitted", applicationStatus: "In Progress", appliedDate: "2025-04-16" }
];

const seedDatabase = async () => {
    try {
        // Fallback URI definition if process.env isn't reading locally during execution
        const dbUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/placement_portal";
        
        await mongoose.connect(dbUri);
        console.log("⚡ Connected to MongoDB for database seeding...");

        // Clean out collection collections to avoid duplication anomalies
        await Job.deleteMany({});
        await Application.deleteMany({});
        console.log("🧹 Previous Job and Application matrices wiped out safely.");

        // Bulk seed rows matching your exact data attributes
        await Job.insertMany(jobPostingsDataset);
        await Application.insertMany(applicationsDataset);
        
        console.log("🎉 Dataset collections seeded onto MongoDB Cluster safely!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failure breakdown:", error);
        process.exit(1);
    }
};

seedDatabase();