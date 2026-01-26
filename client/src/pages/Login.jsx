/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, logout } = useAuth(); // 👈 get logout also
  const navigate = useNavigate();

  useEffect(() => {
    setError(""); // clear error on page load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔐 AUTO-LOGOUT previous user
      logout(); // clears token + auth state

      const loggedInUser = await login({ email, password });

      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
