const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/Listing.js");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

async function initDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database for seeding.");

    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);

    console.log(`Inserted ${initdata.data.length} listings into wanderlust.listings`);
  } catch (err) {
    console.error("Database seeding failed.");
    console.error(err.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

initDB();
