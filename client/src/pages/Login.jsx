/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("STEP 1: Submit button clicked"); 
  setError("");

  try {
    console.log("STEP 2: Attempting to call login function...");
    const user = await login({ email, password });
    
    console.log("STEP 3: Login successful! User data:", user);
    navigate(user.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
  } catch (err) {
    console.error("STEP 4: The login failed. Here is the REAL error:", err);
    setError("Invalid email or password");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default Login;
