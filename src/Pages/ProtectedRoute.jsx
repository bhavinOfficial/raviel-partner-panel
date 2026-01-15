import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../src/Components/context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  if (loading) return null;

  // 🔒 Not logged in
  if (!token) {
    if (location.pathname === "/login") return children;
    return <Navigate to="/login" replace />;
  }

  // ⛔ Token exists but user missing
  if (!user?.payload) {
    return <Navigate to="/login" replace />;
  }

  const isOnboardingCompleted = user.payload.isOnboardingCompleted;

  // 🔁 Force onboarding
  if (
    isOnboardingCompleted === false &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  // 🚫 Block onboarding after completion
  if (
    isOnboardingCompleted === true &&
    location.pathname === "/onboarding"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
