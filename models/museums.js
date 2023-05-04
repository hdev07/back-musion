import mongoose from "mongoose";
const { Schema, model } = mongoose;

const museumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  address: {
    streetAddress: String,
    addressLocality: String,
    postalCode: String,
    addressCountry: {
      type: String,
      default: "México",
    },
  },
  telephone: String,
  url: String,
  openingHours: [String],
  priceRange: {
    general: Number,
    estudent: Number,
    inapam: Number,
  },
  review: {
    reviewRating: {
      ratingValue: Number,
      bestRating: {
        type: Number,
        default: 5,
      },
      worstRating: {
        type: Number,
        default: 1,
      },
    },
    author: String,
    datePublished: Date,
    description: String,
  },
  travelTime: Number,
  stayTime: Number,
});

export const Museum = model("Museum", museumSchema);
