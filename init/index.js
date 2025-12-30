const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderworld";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

async function initDB() {
  await Listing.deleteMany({});
  console.log("All old listings deleted");
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "693e626cd519e2abaaa11cf7",
  }));
  // Insert the sample data
  await Listing.insertMany(initData.data);
  console.log("Sample data inserted successfully");
}

initDB();
