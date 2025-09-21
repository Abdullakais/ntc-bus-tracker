import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import busRoutes from "./routes/busRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("🚍 NTC Bus Tracker API is running...");
});

// Mount routes
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/trips", tripRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

export default app;
