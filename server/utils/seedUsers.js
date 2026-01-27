import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas connected");

    await User.deleteMany();

    const passwordHash = await bcrypt.hash("password123", 10);

    await User.create([
      {
        name: "Admin User",
        email: "admin@test.com",
        role: "admin",
        passwordHash,
        isActive: true,
      },
      {
        name: "Test Student",
        email: "student@test.com",
        role: "student",
        passwordHash,
        isActive: true,
      },
    ]);

    console.log("✅ Users seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

run();
