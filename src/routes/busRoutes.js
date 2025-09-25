import express from "express";
import Bus from "../models/Bus.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bus
 *   description: Bus management endpoints
 */

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Bus]
 *     responses:
 *       200:
 *         description: List of all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Bus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Bus data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus not found
 */
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Bus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 */
router.post("/", async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update a bus by ID
 *     tags: [Bus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBus) return res.status(404).json({ message: "Bus not found" });
    res.json(updatedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID
 *     tags: [Bus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) return res.status(404).json({ message: "Bus not found" });
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
