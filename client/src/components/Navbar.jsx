import { Link, useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (location.pathname === "/login") return null;
  if (!user) return null;

  return (
    <div
      style={{
        padding: "12px",
        borderBottom: "1px solid #ccc",
        marginBottom: "16px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        {user.role === "student" && (
          <>
            <Link to="/student/dashboard">Dashboard</Link>{" | "}
            <Link to="/student/notices">Notices</Link>{" | "}
            <Link to="/student/summary">Summary</Link>
          </>
        )}

        {user.role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>{" | "}
            <Link to="/admin/notices">Create Notice</Link>
          </>
        )}
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
