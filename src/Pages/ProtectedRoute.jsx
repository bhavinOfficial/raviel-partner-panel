import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../Components/context/UserProvider";

const isProfileIncomplete = (user) => {
  const profile = user?.payload;
  const business = profile?.userBusinessDetails;

  if (!profile) return true;

  // Mandatory personal
  if (!profile.firstName) return true;
  if (!profile.lastName) return true;
  if (!profile.phoneNumber) return true;

  // Mandatory business
  if (!business?.businessName) return true;
  if (!business?.gstNumber) return true;
  if (!business?.gstAddress) return true;

  return false;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;

  if (!token) return <Navigate to="/login" replace />;

  if (!user || !user.payload) return <Navigate to="/login" replace />;

  const incomplete = isProfileIncomplete(user);

  if (incomplete && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (!incomplete && location.pathname === "/onboarding") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
