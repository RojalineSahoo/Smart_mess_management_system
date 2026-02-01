import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";

// 🛠️ FIX: This ensures the script always finds the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const run = async () => {
  try {
    // Safety Check: stop if MONGO_URI is missing
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env file. Check your path or variable name.");
    }

    console.log("🔵 Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 🔥 HARD RESET
    await User.deleteMany({});
    console.log("🧹 Old users deleted");

    const hash = await bcrypt.hash("password123", 10);

    const usersToCreate = [
      { name: "Admin User", email: "admin@test.com", passwordHash: hash, role: "admin", isActive: true },
      { name: "Student One", email: "student1@test.com", passwordHash: hash, role: "student", isActive: true },
      { name: "Student Two", email: "student2@test.com", passwordHash: hash, role: "student", isActive: true },
      { name: "Student Three", email: "student3@test.com", passwordHash: hash, role: "student", isActive: true },
      { name: "Student Four", email: "student4@test.com", passwordHash: hash, role: "student", isActive: true },
      { name: "Student Five", email: "student5@test.com", passwordHash: hash, role: "student", isActive: true },
    ];

    await User.create(usersToCreate);

    console.log("------------------------------------------");
    console.log("✅ SUCCESS: 1 Admin and 5 Students created.");
    console.log("🔑 Password for all accounts: password123");
    console.log("------------------------------------------");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

run();