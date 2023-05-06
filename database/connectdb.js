import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

try {
  await mongoose.connect(uri);
  console.log("Connected to DB successfully");
} catch (error) {
  console.error("Error connecting to DB: ", error);
}
