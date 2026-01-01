import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { roll_no, password } = req.body;
  const user = await User.findOne({ roll_no });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  res.json({
    user,
    token: generateToken(user)
  });
};
