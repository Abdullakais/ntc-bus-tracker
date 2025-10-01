import express from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  deleteLocation,
} from "../controllers/locationController.js";
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
 *     security:
 *       - bearerAuth: []
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
 * /api/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get("/:id", getLocationById);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
router.delete("/:id", auth, deleteLocation);

export default router;
