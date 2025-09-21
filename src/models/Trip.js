import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  busId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Bus", 
    required: true 
  },
  routeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Route", 
    required: true 
  },
  startTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ["Scheduled", "In Progress", "Completed"], 
    default: "Scheduled" 
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date, default: Date.now }
  }
}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);
