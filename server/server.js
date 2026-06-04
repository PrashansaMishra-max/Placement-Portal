// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// IMPORT YOUR EXISTING MODEL SCHEMAS
import { User } from './models/user.model.js';
import { Company } from './models/company.model.js';
import { Job } from './models/job.model.js';
import { Application } from './models/application.model.js';

dotenv.config();

const app = express();

// MIDDLEWARE LAYERS
app.use(cors());
app.use(express.json());

// DATABASE PLUG-IN CONNECTION
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/placement_portal";
mongoose.connect(MONGO_URI)
    .then(() => console.log("🌱 Successfully connected to Cloud Database Cluster via Mongoose"))
    .catch(err => console.error("Database connection failure:", err));

// ---------------------- AUTHENTICATION ENDPOINTS ----------------------

// 1. STUDENT/ADMIN REGISTRATION (SIGNUP)
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { rollNo, studentName, email, password, branch, cgpa, role } = req.body;

        // Validation fallback check
        if (!rollNo || !studentName || !email || !password || !branch || !cgpa) {
            return res.status(400).json({ message: "All processing registration fields are strictly required." });
        }

        // Check if user already exists via email or University Roll Number
        const userExists = await User.findOne({ $or: [{ email }, { rollNo }] });
        if (userExists) {
            return res.status(400).json({ message: "A profile with this Email or Roll Number already exists." });
        }

        // Encrypt the plain text password hash block
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Commit document to database collection
        const newUser = await User.create({
            rollNo,
            studentName,
            email,
            password: hashedPassword,
            branch,
            cgpa: Number(cgpa),
            role: role || 'student'
        });

        res.status(201).json({ message: "Registration matrix saved successfully!", userId: newUser._id });
    } catch (err) {
        console.error("❌ SIGNUP SYSTEM BREAKDOWN:", err.message);
        res.status(500).json({ message: "Internal Server Registration Error", error: err.message });
    }
});

// 2. USER CREDENTIAL VERIFICATION (LOGIN)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password components required." });
        }

        // Locate document inside user collection
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or account parameters." });
        }

        // Compare incoming plain-text with stored cryptographic password string
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password authorization signature." });
        }

        // Generate an authenticated JWT authorization token string
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_development_jwt_key_99x',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Authentication handshake complete.",
            token,
            user: {
                rollNo: user.rollNo,
                studentName: user.studentName,
                email: user.email,
                role: user.role,
                branch: user.branch,
                cgpa: user.cgpa
            }
        });
    } catch (err) {
        console.error("❌ LOGIN HANDSHAKE FAULT:", err.message);
        res.status(500).json({ message: "Internal Server Authentication Failure", error: err.message });
    }
});


// ---------------------- PORTAL METRICS ENDPOINTS ----------------------

// 3. GET ALL ACTIVE JOB POSTINGS
app.get('/api/jobs', async (req, res) => {
    try {
        const postings = await Job.find({});
        res.status(200).json(postings);
    } catch (err) {
        res.status(500).json({ message: "Extraction pipeline breakdown", error: err.message });
    }
});

// 4. GET SINGLE JOB DESCRIPTION CRITERIA BY ID 
app.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findOne({ jobId: req.params.id });
        if (!job) return res.status(404).json({ message: "Role criteria profile matrix not found." });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: "Database lookup processing failure", error: err.message });
    }
});

// 5. GET PIPELINE PROGRESS TRACK FOR A STUDENT USER VIA ROLL NO
app.get('/api/applications/:rollNo', async (req, res) => {
    try {
        const studentTrack = await Application.find({ rollNo: req.params.rollNo });
        res.status(200).json(studentTrack);
    } catch (err) {
        res.status(500).json({ message: "Tracking data search failed", error: err.message });
    }
});

// 6. GET SINGLE USER PROFILE MATRIX
app.get('/api/users/:rollNo', async (req, res) => {
    try {
        const studentProfile = await User.findOne({ rollNo: req.params.rollNo });
        if (!studentProfile) return res.status(404).json({ message: "Student profile record not found." });
        res.status(200).json(studentProfile);
    } catch (err) {
        res.status(500).json({ message: "User table query failure", error: err.message });
    }
});

// CORE LISTENING GATEWAY
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API Server running via server.js on port ${PORT}`));