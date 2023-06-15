import mongoose from "mongoose";
const { Schema, model } = mongoose;

const opinionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
    },
    comment: {
      type: String,
      required: true,
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Opinion = model("Opinion", opinionsSchema);
