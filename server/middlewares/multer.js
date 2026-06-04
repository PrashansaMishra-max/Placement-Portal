import multer from "multer";

// Configure storage in-memory so we can send it smoothly to Cloudinary
const storage = multer.memoryStorage();

// Create the upload middleware instance
export const singleUpload = multer({ storage }).single("file");