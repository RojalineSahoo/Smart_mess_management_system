import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("⏳ Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Stop trying after 5 seconds
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ CONNECTION ERROR DETAILS:");
    console.error(`Error Name: ${error.name}`);
    console.error(`Error Message: ${error.message}`);
    if (error.reason) {
      console.error("Reason Object:", JSON.stringify(error.reason, null, 2));
    }
    process.exit(1);
  }
};

export default connectDB;