import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();

// GET all trips (populate bus and route)
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("busId", "plateNo operator capacity")
      .populate("routeId", "name start end stops");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET trip by ID (populate bus and route)
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("busId", "plateNo operator capacity")
      .populate("routeId", "name start end stops");
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
