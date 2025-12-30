require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN,
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wanderworld")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

async function fixListings() {
  const listings = await Listing.find({
    geometry: { $exists: false },
  });

  console.log(`Found ${listings.length} listings to update`);

  for (let listing of listings) {
    const geoData = await geocodingClient
      .forwardGeocode({
        query: `${listing.location}, ${listing.country}`,
        limit: 1,
      })
      .send();

    if (!geoData.body.features.length) continue;

    listing.geometry = {
      type: "Point",
      coordinates: geoData.body.features[0].geometry.coordinates,
    };

    await listing.save();
    console.log(`Updated: ${listing.title}`);
  }

  mongoose.connection.close();
}

fixListings();
