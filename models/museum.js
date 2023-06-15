import mongoose from "mongoose";
const { Schema, model } = mongoose;

const museumSchema = new Schema(
  {
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
    category: String,
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
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
    email: String,
    url: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
    },
    openingHours: [
      {
        day: String,
        startTime: Date,
        endTime: Date,
      },
    ],
    priceRange: {
      freeSunday: Boolean,
      general: Number,
      student: Number,
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
      datePublished: {
        type: Date,
        default: Date.now,
      },
      description: String,
    },
    travelTime: Number,
    stayTime: Number,
    registration_date: {
      type: Date,
      default: Date.now,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    amenities: [String],
    accessibility: {
      wheelchairAccessible: Boolean,
      assistedListeningSystem: Boolean,
      signLanguageInterpreters: Boolean,
    },
    images: [String],
  },
  { timestamps: true }
);

export const Museum = model("Museum", museumSchema);
