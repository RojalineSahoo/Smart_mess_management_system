import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  roll_no: { type: String, unique: true },
  password: String,
  branch: String,
  room_no: String,
  role: { type: String, enum: ["student", "admin"], default: "student" }
});

export default mongoose.model("User", userSchema);
