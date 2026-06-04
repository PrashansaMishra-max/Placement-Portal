import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // 1. Added CORS import
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// 2. CORS Configuration (Essential for Frontend-Backend connection)
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true                // Required for sending/receiving cookies (JWT)
};
app.use(cors(corsOptions));

// 3. Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. Routes (Order: Logic before specific routes)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB(); 
    console.log(`Ignition started... Server is listening at port ${PORT}`);
});