import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {

    if (!process.env.MONGO_URL) {
      console.error("mongo url error , maybe missing env");
      throw new Error("missing Mongo URL ");
    }
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed",error);
    process.exit(1);
  }
};

export default connectDB;
