import mongoose from "mongoose";

const mealEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["APPLIED", "CANCELLED"],
      required: true
    },

    locked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Ensure one meal entry per student per date
mealEntrySchema.index({ userId: 1, date: 1 }, { unique: true });

const MealEntry = mongoose.model("MealEntry", mealEntrySchema);

export default MealEntry;
