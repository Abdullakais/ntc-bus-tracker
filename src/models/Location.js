import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - busId
 *         - latitude
 *         - longitude
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the location record
 *         busId:
 *           type: string
 *           description: The bus associated with this location
 *         latitude:
 *           type: number
 *           description: Current latitude of the bus
 *         longitude:
 *           type: number
 *           description: Current longitude of the bus
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When this location was recorded
 *       example:
 *         busId: "652a1bc1234567890def1234"
 *         latitude: 6.9271
 *         longitude: 79.8612
 *         timestamp: 2025-09-29T12:34:56Z
 */
const locationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Location", locationSchema);
