import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⏳ wait until auth state is loaded
  if (loading) {
    return <p>Loading...</p>;
  }

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ logged in
  return children;
};

export default ProtectedRoute;
