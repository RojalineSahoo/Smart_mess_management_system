/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [mealCount, setMealCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await api.get("/admin/meals/tomorrow/count");
        setMealCount(res.data);
      } catch (err) {
        console.error("Failed to fetch meal count");
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div style={{ padding: "16px", maxWidth: "600px" }}>
      <h2>Admin Dashboard</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <h3>Tomorrow’s Meal Count</h3>

        <p>
          <strong>Total Meals:</strong> {mealCount.count}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {mealCount.status === "TENTATIVE" ? "🟡 Tentative" : "🟢 Final"}
        </p>

        <small>Date: {mealCount.date}</small>
      </div>
    </div>
  );
}

export default AdminDashboard;
