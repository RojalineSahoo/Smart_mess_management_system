/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

function MonthlySummary() {
  console.log("MonthlySummary mounted");

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const month = new Date().toISOString().slice(0, 7); // YYYY-MM
        const res = await api.get(
          `/student/meals/summary?month=${month}`
        );
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading summary...</p>;

  return (
    <div>
      <h2>Monthly Meal Summary</h2>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
}

export default MonthlySummary;
