import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api.js";

export default function Login() {
  const [roll_no, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
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
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-gray-800 p-6 rounded text-white w-80">
        <h2 className="text-xl mb-4">Welcome Back</h2>
        <input className="w-full mb-3 p-2" placeholder="Roll No" onChange={e => setRoll(e.target.value)} />
        <input type="password" className="w-full mb-3 p-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 py-2" onClick={login}>Login</button>
      </div>
    </div>
  );
}
