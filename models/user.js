import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: { unique: true },
    },
    emailVerified: Boolean,
    confirmationToken: String,
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpires: Date,
    visitedMuseums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Museum",
      },
    ],
    favoritesMuseums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Museum",
      },
    ],
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    throw new Error("Error al encriptar contraseña");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);
