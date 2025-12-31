import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  content: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Notice", noticeSchema);
