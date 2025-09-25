import mongoose from "mongoose";
import dotenv from "dotenv";
import Bus from "./src/models/Bus.js";
import Route from "./src/models/Route.js";
import Trip from "./src/models/Trip.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    // Clear old data
    await Bus.deleteMany();
    await Route.deleteMany();
    await Trip.deleteMany();

    // Insert 25 buses
    const buses = await Bus.insertMany(
      Array.from({ length: 25 }, (_, i) => ({
        plateNo: `NC-${1001 + i}`,
        operator: i < 5 ? "NTC" : i < 10 ? "SLTB" : "Private",
        capacity: 40 + (i % 20) // varies between 40-59
      }))
    );

    // Insert 5 routes
    const routes = await Route.insertMany([
      {
        name: "Colombo - Kandy",
        start: "Colombo",
        end: "Kandy",
        stops: ["Pilimathalawa", "Kadugannawa", "Mawanella"]
      },
      {
        name: "Colombo - Galle",
        start: "Colombo",
        end: "Galle",
        stops: ["Panadura", "Kalutara", "Matara"]
      },
      {
        name: "Colombo - Jaffna",
        start: "Colombo",
        end: "Jaffna",
        stops: ["Kurunegala", "Vavuniya", "Kilinochchi"]
      },
      {
        name: "Colombo - Badulla",
        start: "Colombo",
        end: "Badulla",
        stops: ["Avissawella", "Balangoda", "Bandarawela"]
      },
      {
        name: "Kandy - Trincomalee",
        start: "Kandy",
        end: "Trincomalee",
        stops: ["Habarana", "Dambulla", "Kantale"]
      }
    ]);

    // Insert Trips for the next 7 days
    const trips = [];
    const today = new Date();

    for (let day = 0; day < 7; day++) {
      for (let r = 0; r < routes.length; r++) {
        for (let b = 0; b < 5; b++) { // 5 trips per route per day
          const bus = buses[(r * 5 + b) % buses.length];
          const startTime = new Date(today);
          startTime.setDate(today.getDate() + day);
          startTime.setHours(6 + b * 3, 0, 0); // 6AM, 9AM, 12PM, 3PM, 6PM
          const endTime = new Date(startTime);
          endTime.setHours(startTime.getHours() + 4); // ~4 hours journey

          trips.push({
            busId: bus._id,
            routeId: routes[r]._id,
            startTime,
            endTime,
            status: "Scheduled"
          });
        }
      }
    }

    await Trip.insertMany(trips);

    console.log(
      `✅ Seed data inserted: ${buses.length} buses, ${routes.length} routes, ${trips.length} trips`
    );

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedData();
