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
        const now = new Date();
        const month = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}`;

        // 🚀 PARALLEL API CALLS
        const [
          statusRes,
          summaryRes,
          noticeRes
        ] = await Promise.all([
          api.get("/student/meals/tomorrow/status"),
          api.get(`/student/meals/summary?month=${month}`),
          api.get("/student/notices")
        ]);

        setTomorrowStatus(statusRes.data);
        setSummary(summaryRes.data);
        setNotices(noticeRes.data || []);
      } catch (err) {
        console.error("Failed to load student dashboard", err);
        setError("Failed to load student dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading)
    return (
      <p>
        Loading dashboard…  
        <br />
        <small>(Server may take a few seconds to wake up)</small>
      </p>
    );

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "16px", maxWidth: "700px" }}>
      <h2>Student Dashboard</h2>

      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px" }}>
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

      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px" }}>
        <h3>Monthly Meal Summary</h3>
        <p>
          <strong>Total Meals:</strong> {summary?.totalMeals ?? 0}
        </p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px" }}>
        <h3>Notices</h3>
        {notices.length === 0 ? (
          <p>No active notices</p>
        ) : (
          <ul>
            {notices.map((n) => (
              <li key={n._id}>
                <strong>{n.title}</strong> — {n.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
