import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
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
      required: false,
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export const Category = model("Category", categorySchema);
