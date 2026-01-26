/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function MonthlySummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toISOString().slice(0, 7);
// example: "2026-01"

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get(`/student/meals/summary?month=${currentMonth}`);
        setSummary(res.data.summary || res.data);
      } catch (err) {
        console.error("Failed to load monthly summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading monthly summary...</p>;
  if (!summary) return <p>No data available</p>;

  return (
    <div style={{ maxWidth: "700px", padding: "16px" }}>
      <h2>Monthly Meal Summary</h2>

      {/* Summary Card */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <p><strong>Month:</strong> {summary.month}</p>
        <p><strong>Total Days:</strong> {summary.totalDays}</p>
        <p>🟢 <strong>Applied:</strong> {summary.applied}</p>
        <p>🔴 <strong>Cancelled:</strong> {summary.cancelled}</p>
      </div>

      {/* Meal History */}
      <h3>Meal History</h3>

      {summary.meals.length === 0 ? (
        <p>No meal records</p>
      ) : (
        <div>
          {summary.meals.map((meal) => (
            <div
              key={meal._id}
              style={{
                border: "1px solid #444",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {new Date(meal.date).toDateString()}
              </span>

              <span
                style={{
                  color: meal.status === "APPLIED" ? "lightgreen" : "salmon",
                  fontWeight: "bold",
                }}
              >
                {meal.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MonthlySummary;
