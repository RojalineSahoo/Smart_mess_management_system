import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function Login() {
  const [roll_no, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll_no, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="Roll Number"
            onChange={e => setRoll(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} className="btn-primary w-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
