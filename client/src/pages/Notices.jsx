import { useEffect, useState } from "react";
import api from "../services/api";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get("/student/notices");
        setNotices(res.data);
      } catch (err) {
        console.error("Failed to fetch notices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return <p>Loading notices...</p>;
  }

  return (
    <div>
      <h2 style = {{color: "white"}}>Notices</h2>

      {notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice._id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px"
            }}
          >

            <h4>
              {notice.priority === "HIGH" && "🔴 "}
              {notice.priority === "NORMAL" && "🟡 "}
              {notice.priority === "LOW" && "🟢 "}
              {notice.title}
            </h4>

            <p>{notice.description}</p>

            <small>
              Effective from:{" "}
              {new Date(
                notice.effectiveDate || notice.createdAt
              ).toDateString()}
            </small>

          </div>
        ))
      )}
    </div>
  );
}

export default Notices;
