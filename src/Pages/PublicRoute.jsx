import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  // 🔐 If already logged in, block auth pages only
  if (token && ["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/partner-card" replace />;
  }

  return children;
};

export default PublicRoute;
