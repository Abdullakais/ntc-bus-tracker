import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  plateNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  operator: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  }
}, { timestamps: true });

export default mongoose.model("Bus", busSchema);
