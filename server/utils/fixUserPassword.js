import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });


const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const password = "123456"; // choose a known password
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.findOne({ roll_no: "YOUR_ROLL_NO" });

  if (!user) {
    console.log("User not found");
    process.exit();
  }

  user.password = hashed;
  await user.save();

  console.log("Password fixed for user:", user.roll_no);
  process.exit();
};

run();
