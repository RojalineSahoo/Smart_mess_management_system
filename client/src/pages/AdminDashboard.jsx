/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [mealCount, setMealCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayCount, setTodayCount] = useState(null);

  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const tomorrowRes = await api.get("/admin/meals/tomorrow/count");
      const todayRes = await api.get("/admin/meals/today/count");

      setMealCount(tomorrowRes.data);
      setTodayCount(todayRes.data);
    } catch (err) {
      console.error("Failed to fetch admin counts");
    } finally {
      setLoading(false);
    }
  };

  fetchCounts();
}, []);


  if (loading) return <p>Loading admin dashboard...</p>;

return (
  <div style={{ padding: "16px", maxWidth: "600px" }}>
    <h2>Admin Dashboard</h2>

    {/* TODAY COUNT */}
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginTop: "16px",
      }}
    >
      <h3>Today’s Meal Count</h3>

      <p>
        <strong>Total Meals:</strong> {todayCount?.count ?? 0}
      </p>

      <small>Date: {todayCount?.date ?? "N/A"}</small>
    </div>

    {/* TOMORROW COUNT */}
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginTop: "16px",
      }}
    >
      <h3>Tomorrow’s Meal Count</h3>

      <p>
        <strong>Total Meals:</strong> {mealCount?.count ?? 0}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {mealCount?.status === "TENTATIVE" ? "🟡 Tentative" : "🟢 Final"}
      </p>

      <small>Date: {mealCount?.date ?? "N/A"}</small>
    </div>
  </div>
);
}

export default AdminDashboard;
