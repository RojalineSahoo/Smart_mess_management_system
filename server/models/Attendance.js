import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // Links to your User model
    required: true 
  },
  date: { 
    type: String, // Format: YYYY-MM-DD for easy querying
    required: true 
  },
  mealType: { 
    type: String, 
    enum: ["Breakfast", "Lunch", "Dinner"], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Applied", "Cancelled", "Consumed"], 
    default: "Applied" 
  }
}, { timestamps: true });

// Ensure a student can't apply for the same meal on the same date twice
attendanceSchema.index({ studentId: 1, date: 1, mealType: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);