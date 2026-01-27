/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function StudentDashboard() {
  const [tomorrowStatus, setTomorrowStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // 🔹 Fetch tomorrow meal status
        const statusRes = await api.get(
          "/student/meals/tomorrow/status"
        );
        setTomorrowStatus(statusRes.data);

        // 🔹 Fetch monthly summary (current month)
        const now = new Date();
        const month = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}`;

        const summaryRes = await api.get(
          `/student/meals/summary?month=${month}`
        );
        setSummary(summaryRes.data);

        // 🔹 Fetch active notices
        const noticeRes = await api.get("/student/notices");
        setNotices(noticeRes.data || []);
      } catch (err) {
        console.error("Failed to load student dashboard", err);
        setError("Failed to load student dashboard");
      } finally {
        // 🔴 THIS IS THE MOST IMPORTANT LINE
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  // 🔄 LOADING STATE
  if (loading) {
    return <p>Loading student dashboard...</p>;
  }

  // ❌ ERROR STATE
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "16px", maxWidth: "700px" }}>
      <h2>Student Dashboard</h2>

      {/* TOMORROW MEAL STATUS */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <h3>Tomorrow’s Meal Status</h3>

        <p>
          <strong>Status:</strong>{" "}
          {tomorrowStatus?.status === "APPLIED"
            ? "🟢 Applied"
            : tomorrowStatus?.status === "CANCELLED"
            ? "🔴 Cancelled"
            : "⚪ Not Applied"}
        </p>
      </div>

      {/* MONTHLY SUMMARY */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <h3>Monthly Meal Summary</h3>

        <p>
          <strong>Total Meals:</strong>{" "}
          {summary?.totalMeals ?? 0}
        </p>
      </div>

      {/* NOTICES */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <h3>Notices</h3>

        {notices.length === 0 ? (
          <p>No active notices</p>
        ) : (
          <ul>
            {notices.map((notice) => (
              <li key={notice._id}>
                <strong>{notice.title}</strong> —{" "}
                {notice.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
