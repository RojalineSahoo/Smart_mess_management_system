import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  date: String,
  meal_type: String,
  is_skipped: Boolean,
  preference: String
});

export default mongoose.model("Attendance", attendanceSchema);
