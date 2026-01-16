import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";
import lockimageonboarding from "../../assets/form/lock.png";
import logo from "../../assets/logos/LOGO.png";

const OnBoarding = () => {
  const [form, setForm] = useState({
    businessName: "",
    gstNumber: "",
    gstAddress: "",
    role: "",
    managerPhoneNumber: "",
    managerEmail: "",
  });

  const [errors, setErrors] = useState({});

  /* 🔹 HANDLE INPUT */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* 🔹 VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!form.businessName.trim())
      newErrors.businessName = "Business name is required";

    if (!/^[0-9A-Z]{15}$/.test(form.gstNumber))
      newErrors.gstNumber = "Enter valid 15-digit GST number";

    if (!form.gstAddress.trim())
      newErrors.gstAddress = "GST address is required";

    if (!form.role) newErrors.role = "Select role";

    if (
      form.managerPhoneNumber &&
      !/^[6-9]\d{9}$/.test(form.managerPhoneNumber)
    )
      newErrors.managerPhoneNumber =
        "Enter valid 10-digit phone number";

    if (
      form.managerEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.managerEmail)
    )
      newErrors.managerEmail = "Enter valid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 🔹 SUBMIT */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axiosInstance.post("/user-business-details", form);

      toast.success("🎉 Onboarding completed successfully!");

      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error("❌ Onboarding failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "10px 30px",
        }}
      >
        <Box sx={{ height: "70px" }}>
          <img src={logo} alt="logo" style={{ height: "100%" }} />
        </Box>

        <Typography
          component="a"
          href="mailto:support@raviel.in?subject=Support%20Request"
          sx={{
            fontSize: "25px",
            fontWeight: 600,
            textDecoration: "none",
            color: "black",
            "&:hover": {
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
        >
          Help
        </Typography>
      </Box>

      {/* CONTENT */}
      <Box display="flex" justifyContent="center" p={2}>
        <Paper sx={{ maxWidth: 1100, p: 3, borderRadius: 4 }}>
          <Typography fontSize={30} fontWeight={700}>
            Onboarding
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              alignItems: "center",
            }}
          >
            {/* FORM */}
            <Box>
              <TextField fullWidth label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} error={!!errors.businessName} helperText={errors.businessName} sx={{ mb: 2 }} />
              <TextField fullWidth label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} error={!!errors.gstNumber} helperText={errors.gstNumber} sx={{ mb: 2 }} />
              <TextField fullWidth multiline rows={3} label="GST Address" name="gstAddress" value={form.gstAddress} onChange={handleChange} error={!!errors.gstAddress} helperText={errors.gstAddress} sx={{ mb: 2 }} />
              <TextField fullWidth label="Manager Phone Number (Optional)" name="managerPhoneNumber" value={form.managerPhoneNumber} onChange={handleChange} error={!!errors.managerPhoneNumber} helperText={errors.managerPhoneNumber} sx={{ mb: 2 }} />
              <TextField fullWidth label="Manager Email (Optional)" name="managerEmail" value={form.managerEmail} onChange={handleChange} error={!!errors.managerEmail} helperText={errors.managerEmail} sx={{ mb: 2 }} />

              <TextField select fullWidth label="Role" name="role" value={form.role} onChange={handleChange} error={!!errors.role} helperText={errors.role} sx={{ mb: 3 }}>
                <MenuItem value="partner">Partner</MenuItem>
              </TextField>

              <Button fullWidth sx={{ py: 1.3, fontWeight: 600, color: "#fff", background: "#5A5DF0" }} onClick={handleSubmit}>
                Submit
              </Button>
            </Box>

            {/* IMAGE */}
            <Box display="flex" justifyContent="center">
              <img src={lockimageonboarding} alt="lock" />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default OnBoarding;
