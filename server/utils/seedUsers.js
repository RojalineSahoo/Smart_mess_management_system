import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const run = async () => {
  console.log("🔵 Connecting to DB:", process.env.MONGO_URI);

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  // 🔥 HARD RESET
  await User.deleteMany({});
  console.log("🧹 Old users deleted");

  // 🔑 ONE PASSWORD FOR BOTH
  const hash = await bcrypt.hash("password123", 10);

  await User.create([
    {
      name: "Admin User",
      email: "admin@test.com",
      passwordHash: hash,
      role: "admin",
      isActive: true,
    },
    {
      name: "Test Student",
      email: "student@test.com",
      passwordHash: hash,
      role: "student",
      isActive: true,
    },
  ]);

  console.log("✅ Users created with password123");
  process.exit();
};

run();
