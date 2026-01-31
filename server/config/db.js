import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if(!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from .env file");
    }
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000 
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};
export default connectDB;