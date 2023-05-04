import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  museum: {
    type: Schema.Types.ObjectId,
    ref: "Museum",
  },
  name: String,
  description: String,
  date: Date,
  image: String,
  url: String,
});

export const Event = model("Event", eventSchema);
