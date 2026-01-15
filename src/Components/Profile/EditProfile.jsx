import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import axiosInstance from "../Form/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const profile = user?.payload;
  const business = profile?.userBusinessDetails;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessName: "",
    gstNumber: "",
    gstAddress: "",
  });

useEffect(() => {
  if (profile) {
    setForm({ 
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      phoneNumber: profile.phoneNumber || "",

      // ❌ BUSINESS DETAILS COMMENT
      businessName: business?.businessName || "",
      gstNumber: business?.gstNumber || "",
      gstAddress: business?.gstAddress || "",
    });
  }
}, [profile]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async () => {
  try {
    const res = await axiosInstance.put("/user", {
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,

      // ❌ BUSINESS DETAILS COMMENT
      // userBusinessDetails: {
        businessName: form.businessName,
        gstNumber: form.gstNumber,
        gstAddress: form.gstAddress,
      // },
    });

    setUser(res.data);
    navigate("/profile");
  } catch (err) {
    console.error("❌ Update failed", err);
  }
};


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 760,
          borderRadius: "24px",
          p: { xs: 3, md: 5 },
          bgcolor: "#FFFFFF",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <Typography
          fontSize={26}
          fontWeight={700}
          color="#071B2F"
          mb={1}
        >
          Edit Profile
        </Typography>

        <Typography fontSize={14} color="#071B2F" mb={4} sx={{ opacity: 0.7 }}>
          Update your personal and business details
        </Typography>

        {/* Personal Info */}
        <Typography
          fontWeight={600}
          color="#635BFF"
          mb={2}
        >
          Personal Information
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <TextField
          label="phoneNumber Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        />

        <Divider sx={{ my: 4, borderColor: "#DADAFF" }} />

        {/* Business Info */}
        <Box
          sx={{
            borderRadius: "16px",
            p: 3,
          }}
        >
          <Typography fontWeight={600} color="#071B2F" mb={2}>
            Business Information
          </Typography>

          <TextField
            label="Business Name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="GST Number"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="GST Address"
            name="gstAddress"
            value={form.gstAddress}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#635BFF",
              color: "#635BFF",
              borderRadius: "12px",
              textTransform: "none",
              py: 1.2,
            }}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#635BFF",
              borderRadius: "12px",
              textTransform: "none",
              py: 1.2,
              "&:hover": {
                bgcolor: "#5148e5",
              },
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditProfile;
