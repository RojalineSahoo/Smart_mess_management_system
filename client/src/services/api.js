import axios from "axios";

 export const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Automatically attach the JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Authentication Calls
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);

// Meal Application Calls
export const applyMeal = (mealData) => API.post("/meals/apply", mealData);

// Admin Analytics
export const getLiveStats = (date) => API.get(`/admin/live-stats?date=${date}`);