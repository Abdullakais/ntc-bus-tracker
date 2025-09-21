import dotenv from "dotenv";
import mongoose from "mongoose";
import Bus from "./src/models/Bus.js";
import Route from "./src/models/Route.js";
import Trip from "./src/models/Trip.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // clear old data
    await Bus.deleteMany();
    await Route.deleteMany();
    await Trip.deleteMany();

    // buses
    const buses = await Bus.insertMany([
      { plateNo: "NC-1234", operator: "NTC", capacity: 50 },
      { plateNo: "NB-5678", operator: "Private", capacity: 45 }
    ]);

    // routes
    const routes = await Route.insertMany([
      { name: "Colombo - Kandy", start: "Colombo", end: "Kandy", stops: ["Colombo", "Warakapola", "Kegalle", "Peradeniya", "Kandy"] },
      { name: "Galle - Jaffna", start: "Galle", end: "Jaffna", stops: ["Galle", "Colombo", "Anuradhapura", "Jaffna"] }
    ]);

    // trips (use _id from buses & routes)
    const trips = await Trip.insertMany([
      {
        busId: buses[0]._id,
        routeId: routes[0]._id,
        startTime: new Date(),
        status: "Scheduled"
      },
      {
        busId: buses[1]._id,
        routeId: routes[1]._id,
        startTime: new Date(),
        status: "Scheduled"
      }
    ]);

    console.log("✅ Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

connectDB().then(seedData);
