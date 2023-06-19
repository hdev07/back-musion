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
        startTime: String,
        endTime: String,
      },
    ],
    priceRange: {
      freeSunday: Boolean,
      general: Number,
      student: Number,
      inapam: Number,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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
    visitCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Método para calcular el rating promedio y actualizar el campo "rating"
museumSchema.methods.calculateRating = function () {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.total = 0;
    this.rating.count = 0;
  } else {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / this.reviews.length;

    this.rating.average = averageRating;
    this.rating.total = totalRating;
    this.rating.count = this.reviews.length;
  }

  return this.save();
};

export const Museum = model("Museum", museumSchema);
