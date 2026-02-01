import axios from "axios";

const api = axios.create({
  // Use the live Render link so your local code AND the hosted site both work
  baseURL: "https://smart-mess-backend-0rvy.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
