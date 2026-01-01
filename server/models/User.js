import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  roll_no: String,
  password: String,
  branch: String,
  room_no: String,
  role: { type: String, default: "student" }
});

export default mongoose.model("User", userSchema);
