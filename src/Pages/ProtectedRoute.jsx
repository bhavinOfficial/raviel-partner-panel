import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../src/Components/context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  // ⏳ Wait until user data loads
  if (loading) return null; // or spinner

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isOnboardingCompleted =
    user?.payload?.isOnboardingCompleted;

  // 🔥 Force onboarding if not completed
  if (
    isOnboardingCompleted === false &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  // ✅ If onboarding completed, block onboarding page
  if (
    isOnboardingCompleted === true &&
    location.pathname === "/onboarding"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
