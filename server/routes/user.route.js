import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js"; // 1. Import your multer middleware

const router = express.Router();

// 2. Add singleUpload right before your controllers
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);

// Also add it here since profile updates can include a new photo
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);

export default router;