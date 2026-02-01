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
    setError("");
    try {
      const user = await login({ email, password });
      navigate(user.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "80vh" // Centers vertically relative to the screen
    }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h2>
        
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        
        <input 
          placeholder="Email"
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        
        <input 
          type="password" 
          placeholder="Password"
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        
        <button type="submit" style={{
          padding: "12px",
          backgroundColor: "#0052cc",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "600"
        }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;