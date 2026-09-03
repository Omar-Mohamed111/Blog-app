import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any route element with this to require login.
// e.g. <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!token) return <Navigate to="/login" replace />;

  return children;
}
