import { useState } from "react";
import api from "../services/api";

function AdminNotices() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/admin/notices", {
        title,
        description,
        priority,
        effectiveFrom,
      });

      setSuccessMessage("✅ Notice created successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("NORMAL");
      setEffectiveFrom("");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message || "❌ Failed to create notice"
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2 style = {{color: "white"}}>Create Notice</h2>

      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {errorMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "6px",
        }}
      >
        {/* Title */}
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%" }}
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
            style={{ width: "100%", minHeight: "80px" }}
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
