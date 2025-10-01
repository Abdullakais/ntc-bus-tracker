// app.js (Example Structure)

import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from 'cors'; // 🔑 ADDED: Import CORS middleware

import busRoutes from "./routes/busRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
// Using the existing auth.js file in routes
import authRoutes from "./routes/auth.js"; 

dotenv.config();
const app = express();

// 1. --- MIDDLEWARE SECTION (MUST COME FIRST) ---
// THIS IS THE CRITICAL LINE: It parses incoming JSON requests
app.use(express.json()); 
app.use(cors()); // 🔑 Using the imported CORS middleware here
// ... other middleware ...

// --- START Dynamic Host Fix (CRITICAL FOR RENDER DEPLOYMENT) ---
const deployedHost = process.env.RENDER_EXTERNAL_URL
    ? new URL(process.env.RENDER_EXTERNAL_URL).hostname
    : 'localhost:5000';

const deployedScheme = process.env.RENDER_EXTERNAL_URL ? 'https' : 'http';
// --- END Dynamic Host Fix ---

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NTC Bus Tracker API",
      version: "1.0.0",
      description: "API for managing buses, routes, trips with authentication",
    },
    // Using dynamic server definition for local and Render environments
    servers: [
        { 
            url: `${deployedScheme}://${deployedHost}`, // FIX: Removed '/api' from the base URL
            description: process.env.RENDER_EXTERNAL_URL ? 'Render Deployment Server' : 'Local Development Server', 
        }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("🚍 NTC Bus Tracker API is running...");
});


// 2. --- ROUTES SECTION (MUST COME AFTER MIDDLEWARE) ---
app.use("/api/auth", authRoutes); // User registration/login (JWT generation)
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/locations", locationRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

export default app;
