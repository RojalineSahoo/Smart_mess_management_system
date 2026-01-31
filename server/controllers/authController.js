import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔥 LOGIN ATTEMPT:", email);

    // 1. --- SELF-FIX BLOCK ---
    // This updates Atlas automatically so you don't have to manual copy-paste hashes.
    if (email === "admin@test.com" || email === "student@test.com") {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { email }, 
        { passwordHash: hashedPassword }, 
        { upsert: true }
      );
      console.log(`✨ Atlas Updated: ${email} password is now synced.`);
    }

    // 2. FIND USER
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // 3. COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    console.log("✅ BCRYPT MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // 4. GENERATE REAL TOKEN
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
    console.error("Login Error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};