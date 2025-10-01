import mongoose from "mongoose";
import Location from "../models/Location.js";

/**
 * Create a new location entry
 */
export const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    const saved = await location.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Get all location entries
 */
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate("busId");
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get a location by ID
 */
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete a location by ID
 */
export const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) return res.status(404).json({ message: "Location not found" });
    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
