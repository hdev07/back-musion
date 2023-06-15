import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema(
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
    date: {
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

export default Comment = model("Comment", commentSchema);
