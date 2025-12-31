import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { roll_no, password } = req.body;
  const user = await User.findOne({ roll_no });

  if (!user) return res.status(401).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: "Invalid credentials" });

  const token = generateToken(user);

  res.json({ user, token });
};
