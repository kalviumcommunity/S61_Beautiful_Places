const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    placeName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    primaryAttraction: {
      type: String,
      required: true,
    },
    yearOfEstablishment: {
      type: String,
      required: false, // Year of Establishment may not be available for all places
    },
    description: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      required: true,
    },
    visitorCount: {
      type: String,
      required: true,
    },
    nearbyAccommodations: {
      type: [String],
      required: true,
    },
    nearbyRestaurants: {
      type: [String],
      required: true,
    },
    suitableWeather: {
      type: String,
      required: true,
    },
    keyFeatures: {
      type: [String],
      required: true,
    },
    totalAmountCollectionPerDay: {
      type: String,
      required: true,
    },
  });

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = { PlaceModel };
