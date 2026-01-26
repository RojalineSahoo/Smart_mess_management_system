import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET, // ✅ SAME SECRET
    { expiresIn: "7d" }     // longer so it won’t expire quickly
  );
};

export default generateToken;
