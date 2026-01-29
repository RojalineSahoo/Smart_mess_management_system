import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  console.log("🔥 LOGIN HIT ON LOCAL BACKEND");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // 🔴 CRITICAL GUARD
    if (!user.passwordHash) {
      console.error("❌ passwordHash is missing for user:", user.email);
      return res.status(400).json({ msg: "Password not set for this user" });
    }
    console.log("EMAIL:", user.email);
console.log("PLAIN PASSWORD:", password);
console.log("HASH IN DB:", user.passwordHash);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
console.log("BCRYPT MATCH:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

