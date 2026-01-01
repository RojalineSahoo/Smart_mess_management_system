import { authHeader } from "../utils/authHeader";
import { API } from "../services/api.js";
;

export default function AdminPanel() {
  const addNotice = async () => {
    await fetch(`${API}/admin/notice`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({ content: "Menu updated" })
    });
  };

  return (
    <div className="p-6">
      <h2>Admin Panel</h2>
      <button onClick={addNotice} className="bg-blue-600 text-white px-4 py-2">
        Publish Notice
      </button>
    </div>
  );
}
