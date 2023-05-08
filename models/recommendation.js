import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recommendationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  museum: {
    type: Schema.Types.ObjectId,
    ref: "Museum",
  },
  score: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Recommendation = model("Recommendation", recommendationSchema);
