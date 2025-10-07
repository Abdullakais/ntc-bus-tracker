import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Import routes ---
import busRoutes from './routes/busRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Fix for __dirname (since using ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// --- Dynamic Host Configuration ---
const deployedHost = process.env.RENDER_EXTERNAL_URL
  ? new URL(process.env.RENDER_EXTERNAL_URL).hostname
  : 'localhost:5000';

const deployedScheme = process.env.RENDER_EXTERNAL_URL ? 'https' : 'http';

// --- SWAGGER CONFIGURATION ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NTC Bus Tracker API',
      version: '1.0.0',
      description: 'RESTful API for managing inter-provincial buses, routes, and tracking locations in real-time.',
    },
    servers: [
      {
        url: `${deployedScheme}://${deployedHost}`,
        description: process.env.RENDER_EXTERNAL_URL
          ? 'Render Deployment Server'
          : 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Corrected paths for your structure
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- SERVE LANDING PAGE ---
// Go up one directory from /src to find index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/locations', locationRoutes);

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- SERVER LISTENER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
