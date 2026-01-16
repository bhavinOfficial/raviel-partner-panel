import {
  Avatar,
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import { useUser } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const SeeProfile = () => {
  const navigate = useNavigate();
  /* 🔹 USER FROM CONTEXT */
  const { user, loading } = useUser();
  // console.log("hello", user);

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>No user data</Typography>;

  const profile = user.payload;
  const business = profile?.userBusinessDetails;


  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          px: 1,
        }}
      >
        <Typography fontSize={24} fontWeight={600} color="#071B2F">
          My Profile
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#635BFF",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>

      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gap: 4,
        }}
      >
        {/* Left Profile Panel */}
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 4,
            p: 4,
            textAlign: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              bgcolor: "#635BFF",
              fontSize: 48,
              fontWeight: 600,
            }}
          >
            {profile?.firstName?.[0]?.toUpperCase() || "U"}
          </Avatar>

          <Typography fontSize={20} fontWeight={600}>
            {profile?.firstName} {profile?.lastName}
          </Typography>

          <Typography color="text.secondary" fontSize={14}>
            {profile?.role?.toUpperCase()}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography fontSize={14} color="text.secondary">
            Account Status
          </Typography>

          <Typography
            fontWeight={600}
            sx={{
              color: profile?.isOnboardingCompleted ? "#36C76C" : "#F8C20A",
              cursor: profile?.isOnboardingCompleted ? "default" : "pointer",
              textDecoration: profile?.isOnboardingCompleted ? "none" : "underline",
            }}
            onClick={() => {
              if (!profile?.isOnboardingCompleted) {
                navigate("/onboarding");
              }
            }}
          >
            {profile?.isOnboardingCompleted
              ? "Onboarding Completed"
              : "Complete Your Onboarding"}
          </Typography>

        </Box>

        {/* Right Details Panel */}
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 4,
            p: 4,
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <Typography fontSize={18} fontWeight={600} mb={3}>
            Personal Information
          </Typography>

          <InfoRow label="Email" value={profile?.email} />
          <InfoRow label="Phone" value={profile?.phoneNumber} />
          <InfoRow
            label="Created At"
            value={
              profile?.createdAt
                ? new Date(profile.createdAt).toLocaleString()
                : "-"
            }
          />
          <InfoRow
            label="Last Login"
            value={
              profile?.lastLoginDate
                ? new Date(profile.lastLoginDate).toLocaleString()
                : "-"
            }
          />
          {/* Business Information */}
          {business && (
            <>
              <Divider sx={{ my: 4 }} />

              <Typography fontSize={18} fontWeight={600} mb={3}>
                Business Information
              </Typography>

              <InfoRow label="Business Name" value={business?.businessName} />
              <InfoRow label="GST Number" value={business?.gstNumber} />
              <InfoRow label="GST Address" value={business?.gstAddress} />
              <InfoRow label="Manager Phone Number" value={business?.managerPhoneNumber} />
              <InfoRow label="Manager Email" value={business?.managerEmail} />
            </>
          )}

        </Box>
      </Box>
    </Box>
  );
};

const InfoRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1.5,
      borderBottom: "1px solid #eee",
    }}
  >
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={500}>{value || "-"}</Typography>
  </Box>
);

export default SeeProfile;

