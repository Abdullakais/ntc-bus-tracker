import Trip from "../models/Trip.js";

// Get all trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("busId routeId");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new trip
export const addTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update trip location
export const updateTripLocation = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.location = { ...req.body, timestamp: new Date() };
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
