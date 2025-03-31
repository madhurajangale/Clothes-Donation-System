import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token || !jwtDecode(token)) return <Navigate to="/login" />;
  return children;
}
