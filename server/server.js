process.env.NODE_OPTIONS = "--dns-result-order=ipv4first";

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log("MongoDB connected");
  console.log(`Server is running on port ${PORT}`);
});
