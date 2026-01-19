import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../Components/context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  /* =========================
     1️⃣ LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        Loading...
      </div>
    );
  }

  /* =========================
     2️⃣ NOT AUTHENTICATED
  ========================= */
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  /* =========================
     3️⃣ TOKEN EXISTS BUT USER NOT READY
  ========================= */
  if (!user || !user.payload) {
    // Token exists but user data is invalid, clear token and redirect
    // sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  const { isOnboardingCompleted } = user.payload;

  /* =========================
     4️⃣ FORCE ONBOARDING
  ========================= */
  if (!isOnboardingCompleted && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  /* =========================
     5️⃣ BLOCK ONBOARDING AFTER COMPLETION
  ========================= */
  if (isOnboardingCompleted && location.pathname === "/onboarding") {
    return <Navigate to="/" replace />;
  }

  /* =========================
     6️⃣ ALLOW ACCESS
  ========================= */
  return children;
};

export default ProtectedRoute;
