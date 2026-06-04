import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs); // Students don't necessarily need to be logged in to browse
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;