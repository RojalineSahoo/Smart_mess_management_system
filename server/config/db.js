import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("USING MONGO_URI",process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default connectDB;
