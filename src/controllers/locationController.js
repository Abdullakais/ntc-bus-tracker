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
 * Get the latest location of a bus
 */
export const getLatestLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ busId: req.params.busId })
      .sort({ timestamp: -1 });
    if (!location) return res.status(404).json({ message: "No location found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
