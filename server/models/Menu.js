import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  day: String,
  meal_type: String,
  food_items: [String]
});

export default mongoose.model("Menu", menuSchema);
