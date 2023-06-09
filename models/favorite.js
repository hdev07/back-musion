import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favoriteSchema = new Schema(
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
    dateAdded: {
      type: Date,
      default: Date.now,
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Favorite = model("Favorite", favoriteSchema);
