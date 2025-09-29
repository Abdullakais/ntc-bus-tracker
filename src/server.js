// src/server.js
import app from "./app.js";
import dotenv from "dotenv"; // 1. Import dotenv

// 2. Load environment variables immediately
dotenv.config();

// Ensure all environment variables needed are logged for debugging
console.log("Environment check:");
console.log(`MONGO_URI is set: ${!!process.env.MONGO_URI}`);
console.log(`JWT_SECRET is set: ${!!process.env.JWT_SECRET}`); // This should now print 'true'

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚍 Server running on http://localhost:${PORT}`);
});
