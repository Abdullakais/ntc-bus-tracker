import express from "express";
import { createLocation, getLocations, getLatestLocation } from "../controllers/locationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Bus location tracking endpoints
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all location records
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of all bus locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get("/", getLocations);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Add a new bus location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location added successfully
 */
router.post("/", auth, createLocation);

/**
 * @swagger
 * /api/locations/{busId}/latest:
 *   get:
 *     summary: Get the latest location of a specific bus
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest location of the bus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: No location found for the bus
 */
router.get("/:busId/latest", getLatestLocation);

export default router;
