import { useState } from "react";
import api from "../services/api";

function AdminNotices() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/notices", {
        title,
        description,
        priority,
        effectiveFrom,
      });

      // show success message
      setSuccessMessage("✅ Notice created successfully");

      // reset form
      setTitle("");
      setDescription("");
      setPriority("NORMAL");
      setEffectiveFrom("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create notice");
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Create Notice</h2>

      {/* ✅ SUCCESS MESSAGE */}
      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        {/* Description */}
        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <br />

        {/* Priority */}
        <div>
          <label>Priority</label>
          <br />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="HIGH">HIGH</option>
            <option value="NORMAL">NORMAL</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        <br />

        {/* Effective Date */}
        <div>
          <label>Effective Date</label>
          <br />
          <input
            type="date"
            value={effectiveFrom}
            onChange={(e) => setEffectiveFrom(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Create Notice</button>
      </form>
    </div>
  );
}

export default AdminNotices;
