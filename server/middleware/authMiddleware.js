import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import your User model

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // 2. Extract the token from the "Bearer <token>" string
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token using your JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in the database and attach it to the request object
      // We use .select("-passwordHash") so we don't carry the password around
      req.user = await User.findById(decoded.id).select("-passwordHash");

      if (!req.user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      next(); // Move to the next function (the Controller)
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token found" });
  }
};