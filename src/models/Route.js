import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  start: {
    type: String,
    required: true,
    trim: true
  },
  end: {
    type: String,
    required: true,
    trim: true
  },
  stops: [{
    type: String,
    trim: true
  }]
}, { timestamps: true });

export default mongoose.model("Route", routeSchema);
