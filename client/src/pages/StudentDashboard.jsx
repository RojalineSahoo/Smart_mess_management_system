/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function StudentDashboard() {
  const [tomorrowStatus, setTomorrowStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [notices, setNotices] = useState([]);
  const [menu, setMenu] = useState(null); // ✅ Added Menu State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // ✅ Fetching all 4 pieces of data at once
        const [statusRes, summaryRes, noticeRes, menuRes] = await Promise.all([
          api.get("/student/meals/tomorrow/status"),
          api.get(`/student/meals/summary?month=${month}`),
          api.get("/student/notices"),
          api.get("/student/menu/today") 
        ]);

        setTomorrowStatus(statusRes.data);
        setSummary(summaryRes.data);
        setNotices(noticeRes.data || []);
        setMenu(menuRes.data.menu); // ✅ Saving menu data
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
    return <p>Loading dashboard... <br /><small>(Server may take a few seconds to wake up)</small></p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "16px", maxWidth: "700px", fontFamily: "sans-serif", color: "#fff" }}>
      
      {/* 🟢 DYNAMIC RECOGNITION HEADING */}
      <h2 style={{ textTransform: "capitalize", color: "white" }}>
        {summary?.studentName ? `${summary.studentName}'s Dashboard` : "Student Dashboard"}
      </h2>

      {/* 🍴 TODAY'S MENU SECTION */}
      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
        <h3 style={{ marginTop: 0 }}>🍴 Today's Menu</h3>
        {menu ? (
          <div>
            <p><strong>Breakfast:</strong> {menu.breakfast}</p>
            <p><strong>Lunch:</strong> {menu.lunch}</p>
            <p><strong>Dinner:</strong> {menu.dinner}</p>
          </div>
        ) : (
          <p style={{ color: "#aaa" }}>No menu updated for today.</p>
        )}
      </div>

      {/* 📅 TOMORROW'S MEAL STATUS */}
      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
        <h3>Tomorrow’s Meal Status</h3>
        <p>
          <strong>Status:</strong>{" "}
          {tomorrowStatus?.status === "APPLIED"
            ? "🟢 Applied"
            : tomorrowStatus?.status === "CANCELLED"
            ? "🔴 Cancelled"
            : "⚪ Not Applied"}
        </p>

        {tomorrowStatus?.locked && (
          <p style={{ 
            color: "#ff4d4d", 
            marginTop: "8px", 
            fontWeight: "bold",
            padding: "8px",
            border: "1px solid #ff4d4d",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 77, 77, 0.1)"
          }}>
            🔒 Finalized: Changes are closed for tomorrow (Cutoff 10:30 PM)
          </p>
        )}

        {(tomorrowStatus?.status === "NOT_APPLIED" || tomorrowStatus?.status === "CANCELLED") && (
          <button
            disabled={tomorrowStatus?.locked}
            style={{ 
              marginTop: "8px", 
              cursor: tomorrowStatus?.locked ? "not-allowed" : "pointer",
              opacity: tomorrowStatus?.locked ? 0.5 : 1,
              padding: "8px 16px"
            }}
            onClick={async () => {
              await api.post("/student/meals/apply");
              const res = await api.get("/student/meals/tomorrow/status");
              setTomorrowStatus(res.data);
            }}
          >
            Apply for Tomorrow
          </button>
        )}

        {tomorrowStatus?.status === "APPLIED" && (
          <button
            disabled={tomorrowStatus?.locked}
            style={{ 
              marginTop: "8px", 
              cursor: tomorrowStatus?.locked ? "not-allowed" : "pointer",
              backgroundColor: tomorrowStatus?.locked ? "#ccc" : "#ff4d4d",
              color: tomorrowStatus?.locked ? "#666" : "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px"
            }}
            onClick={async () => {
              await api.post("/student/meals/cancel");
              const res = await api.get("/student/meals/tomorrow/status");
              setTomorrowStatus(res.data);
            }}
          >
            Cancel Tomorrow’s Meal
          </button>
        )}
      </div>

      {/* 💰 SUMMARY SECTION */}
      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
        <h3>Monthly Meal Summary</h3>
        <p><strong>Total Meals:</strong> {summary?.summary?.totalMeals ?? 0}</p>
        <p><strong>Estimated Bill:</strong> ₹{summary?.summary?.estimatedBill ?? 0}</p>
      </div>

      {/* 📢 NOTICES SECTION */}
      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
        <h3>📢 Notices</h3>
        {notices.length === 0 ? (
          <p>No active notices</p>
        ) : (
          <ul style={{ paddingLeft: "20px" }}>
            {notices.map((n) => (
              <li key={n._id} style={{ marginBottom: "8px" }}>
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