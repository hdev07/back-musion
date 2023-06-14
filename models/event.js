import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    museum: {
      type: Schema.Types.ObjectId,
      ref: "Museum",
    },
    name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    cost: Number,
    image: String,
    url: String,
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Event = model("Event", eventSchema);
