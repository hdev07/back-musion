import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    museum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Museum",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: String,
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
