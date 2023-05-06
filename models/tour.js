import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  museums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Museum",
    },
  ],
});

export const Tour = model("Tour", tourSchema);
