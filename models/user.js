import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error al encriptar contraseña");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};
export const User = model("User", userSchema);
