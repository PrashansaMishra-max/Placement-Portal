// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    cgpa: { type: Number, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);