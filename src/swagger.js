// src/swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NTC Bus Tracker API",
      version: "1.0.0",
      description: "API documentation for the Sri Lanka NTC Bus Tracker system",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      schemas: {
        Bus: {
          type: "object",
          required: ["number", "route", "capacity"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
            },
            number: {
              type: "string",
              description: "Bus number (e.g., NA-1234)",
            },
            route: {
              type: "string",
              description: "Route ID assigned to this bus",
            },
            capacity: {
              type: "integer",
              description: "Seating capacity of the bus",
            },
            status: {
              type: "string",
              description: "Current status of the bus (active, inactive, maintenance)",
            },
          },
          example: {
            _id: "64e4f8d9a2c56a1234abcd90",
            number: "NA-4582",
            route: "64e4f7d9a2c56a5678efgh12",
            capacity: 50,
            status: "active",
          },
        },
        Route: {
          type: "object",
          required: ["name", "start", "end"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
            },
            name: {
              type: "string",
              description: "Route name (e.g., Colombo to Kandy)",
            },
            start: {
              type: "string",
              description: "Starting point of the route",
            },
            end: {
              type: "string",
              description: "Ending point of the route",
            },
            distance: {
              type: "number",
              description: "Route distance in kilometers",
            },
          },
          example: {
            _id: "64e4f7d9a2c56a5678efgh12",
            name: "Colombo - Kandy",
            start: "Colombo",
            end: "Kandy",
            distance: 115,
          },
        },
        Trip: {
          type: "object",
          required: ["bus", "route", "departureTime", "arrivalTime"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
            },
            bus: {
              $ref: "#/components/schemas/Bus",
            },
            route: {
              $ref: "#/components/schemas/Route",
            },
            departureTime: {
              type: "string",
              format: "date-time",
              description: "Scheduled departure time",
            },
            arrivalTime: {
              type: "string",
              format: "date-time",
              description: "Scheduled arrival time",
            },
            status: {
              type: "string",
              description: "Trip status (scheduled, in-progress, completed, cancelled)",
            },
          },
          example: {
            _id: "64e4fabca2c56a90ijklmn34",
            bus: "64e4f8d9a2c56a1234abcd90",
            route: "64e4f7d9a2c56a5678efgh12",
            departureTime: "2025-09-25T08:30:00Z",
            arrivalTime: "2025-09-25T11:00:00Z",
            status: "scheduled",
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // scan route files for @swagger comments
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
