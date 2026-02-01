/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function StudentDashboard() {
  const [tomorrowStatus, setTomorrowStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [notices, setNotices] = useState([]);
  const [menu, setMenu] = useState(null); 
  const [tomorrowMenu, setTomorrowMenu] = useState(null); // ✅ Added Tomorrow Menu State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // ✅ Fetching Today's Menu AND Tomorrow's Menu
        const [statusRes, summaryRes, noticeRes, todayMenuRes, tomorrowMenuRes] = await Promise.all([
          api.get("/student/meals/tomorrow/status"),
          api.get(`/student/meals/summary?month=${month}`),
          api.get("/student/notices"),
          api.get("/student/menu/today"),
          api.get("/student/menu/tomorrow") // ✅ New API call
        ]);

        setTomorrowStatus(statusRes.data);
        setSummary(summaryRes.data);
        setNotices(noticeRes.data || []);
        setMenu(todayMenuRes.data.menu);
        setTomorrowMenu(tomorrowMenuRes.data.menu); // ✅ Save Tomorrow's Menu
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

      {/* 📅 TOMORROW'S MEAL STATUS (Tomorrow Menu Added Inside Here) */}
      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px", borderRadius: "8px" }}>
        <h3>Tomorrow’s Meal Status</h3>

        {/* ✅ TOMORROW'S MENU PREVIEW */}
        <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "4px", marginBottom: "12px" }}>
          <p style={{ margin: "0 0 5px 0", color: "#3b82f6", fontWeight: "bold" }}>Tomorrow's Menu Preview:</p>
          {tomorrowMenu ? (
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              🍳 {tomorrowMenu.breakfast} | 🍛 {tomorrowMenu.lunch} | 🥗 {tomorrowMenu.dinner}
            </p>
          ) : (
            <p style={{ margin: 0, color: "#aaa", fontSize: "0.9rem" }}>Menu not updated for tomorrow yet.</p>
          )}
        </div>

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