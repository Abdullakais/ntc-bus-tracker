import express from "express";
import Route from "../models/Route.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management endpoints
 */

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: List of all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 */
router.get("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Route created successfully
 */
router.post("/", async (req, res) => {
  try {
    const route = new Route(req.body);
    const savedRoute = await route.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Update a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) return res.status(404).json({ message: "Route not found" });
    res.json(updatedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Delete a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
