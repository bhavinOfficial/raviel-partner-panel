import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import axiosInstance from "../Form/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user, refreshUser } = useUser();
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
    managerPhoneNumber: "",
    managerEmail: "",
  });

  const [loading, setLoading] = useState(false); // 🔑 LOADER STATE

  /* 🔄 Prefill form */
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        businessName: business?.businessName || "",
        gstNumber: business?.gstNumber || "",
        gstAddress: business?.gstAddress || "",
        managerPhoneNumber: business?.managerPhoneNumber || "",
        managerEmail: business?.managerEmail || "",
      });
    }
  }, [profile, business]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* 🚀 SAVE PROFILE */
  const handleSubmit = async () => {
    if (loading) return; // 🚫 prevent double click

    try {
      setLoading(true); // ⏳ start loader

      await axiosInstance.put("/user", {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        businessName: form.businessName,
        gstNumber: form.gstNumber,
        gstAddress: form.gstAddress,
        managerPhoneNumber: form.managerPhoneNumber,
        managerEmail: form.managerEmail,
      });

      await refreshUser();

      toast.success("Profile updated successfully 🎉");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper sx={{ maxWidth: 760, p: 5, borderRadius: "24px" }}>
        <Typography fontSize={26} fontWeight={700} mb={1}>
          Edit Profile
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Personal Info */}
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 3 }} />

        {/* Business Info */}
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
          sx={{ mb: 2 }}
        />
        <TextField
          label="Manager Phone (Optional)"
          name="managerPhoneNumber"
          value={form.managerPhoneNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Manager Email (Optional)"
          name="managerEmail"
          value={form.managerEmail}
          onChange={handleChange}
          fullWidth
        />

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            disabled={loading}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            sx={{ position: "relative" }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={22}
                  sx={{
                    color: "white",
                    mr: 1,
                  }}
                />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditProfile;
