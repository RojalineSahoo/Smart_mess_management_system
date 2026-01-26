/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function StudentDashboard() {
  const [meal, setMeal] = useState(null);
  const [tomorrowStatus, setTomorrowStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ Apply for tomorrow's meal
  const handleApply = async () => {
    try {
      setActionLoading(true);
      const res = await api.post("/student/meals/apply");
      setTomorrowStatus({ status: res.data.status });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to apply");
    } finally {
      setActionLoading(false);
    }
  };


  // ✅ Cancel tomorrow's meal
  const handleCancel = async () => {
    try {
      setActionLoading(true);
      const res = await api.post("/student/meals/cancel");
      setTomorrowStatus({ status: res.data.status });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to cancel");
    } finally {
      setActionLoading(false);
    }
  };


  // ✅ Fetch data on load
  useEffect(() => {
    const fetchTodayMeal = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const res = await api.get(`/student/menu?date=${today}`);

        setMeal(res.data);
      } catch (err) {
        console.error("Failed to fetch today's meal");
      }
    };

    const fetchTomorrowStatus = async () => {
      try {
        const res = await api.get("/student/meals/tomorrow/status");
        setTomorrowStatus(res.data);
      } catch (err) {
        console.error("Failed to fetch tomorrow status");
      }
    };

    const loadData = async () => {
      await Promise.all([fetchTodayMeal(), fetchTomorrowStatus()]);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p>Loading student dashboard...</p>;

  return (
    <div>
      <h2>Student Dashboard</h2>

      {/* Tomorrow Meal Status */}
      <h3>Tomorrow’s Meal Status</h3>

      {tomorrowStatus?.status === "NOT_APPLIED" && (
        <button onClick={handleApply} disabled={actionLoading}>
        {actionLoading ? "Applying..." : "Apply for Tomorrow"}
        </button>
      )}

      {tomorrowStatus?.status === "APPLIED" && (
        <button onClick={handleCancel} disabled={actionLoading}>
        {actionLoading ? "Cancelling..." : "Cancel Tomorrow’s Meal"}</button>
      )}

      <p>
        <strong>Status:</strong>{" "}
        {tomorrowStatus?.status === "APPLIED" && "🟢 Applied"}
        {tomorrowStatus?.status === "CANCELLED" && "🔴 Cancelled"}
        {tomorrowStatus?.status === "NOT_APPLIED" && "⚪ Not Applied"}
      </p>


      {/* Today's Meal */}
      <h3>Today’s Meal</h3>

      {meal ? (
        <div>
          <p><strong>Breakfast:</strong> {meal.breakfast}</p>
          <p><strong>Lunch:</strong> {meal.lunch}</p>
          <p><strong>Dinner:</strong> {meal.dinner}</p>
        </div>
      ) : (
        <p>No meal data available</p>
      )}

    </div>
  );
}

export default StudentDashboard;
