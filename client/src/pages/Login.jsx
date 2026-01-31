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

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login({ email, password });

      navigate(
        user.role === "admin"
          ? "/admin/dashboard"
          : "/student/dashboard"
      );
    } catch (err) {
      setError("Invalid email or password");
    }
  };*/

  //gemini
  /*const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const user = await login({ email, password });
    // ... navigate logic
  } catch (err) {
    // Check if the server actually responded
    if (err.response) {
      // The server responded with a status code (401, 404, 500)
      console.log("Data:", err.response.data);
      setError(err.response.data.message || "Login Failed");
    } else if (err.request) {
      // The request was made but no response was received (Server down)
      setError("Server is not responding. Check if backend is running.");
    } else {
      // Something else happened in setting up the request
      setError("An unexpected error occurred.");
    }
  }
};*/
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
