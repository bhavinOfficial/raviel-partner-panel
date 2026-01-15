import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const OnBoarding = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    businessName: "",
    gstNumber: "",
    gstAddress: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    if (!form.role)
      newErrors.role = "Select role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 🔹 SUBMIT */
const handleSubmit = async () => {
  try {
    await axiosInstance.post("/user-business-details", form);

    // OPTIONAL: success message
    setSuccess(true);

    // 🔄 PAGE REFRESH (BEST WAY)
    window.location.reload();

  } catch (err) {
    alert("Onboarding failed");
    console.log(err);
  }
};



  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: "#DADAFF" }}
      >
        <Box
          sx={{
            width: 420,
            p: 4,
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: "0 20px 40px rgba(7,27,47,0.15)",
          }}
        >
          {/* HEADER */}
          <Typography
            variant="h5"
            fontWeight={700}
            color="#071B2F"
            mb={1}
          >
            Business Onboarding
          </Typography>

          <Typography color="#635BFF" mb={3}>
            Complete your business details
          </Typography>

          {/* BUSINESS NAME */}
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            error={!!errors.businessName}
            helperText={errors.businessName}
            sx={{ mb: 2 }}
          />

          {/* GST NUMBER */}
          <TextField
            fullWidth
            label="GST Number"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            error={!!errors.gstNumber}
            helperText={errors.gstNumber}
            sx={{ mb: 2 }}
          />

          {/* GST ADDRESS */}
          <TextField
            fullWidth
            label="GST Address"
            name="gstAddress"
            value={form.gstAddress}
            onChange={handleChange}
            multiline
            rows={3}
            error={!!errors.gstAddress}
            helperText={errors.gstAddress}
            sx={{ mb: 2 }}
          />

          {/* ROLE */}
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            sx={{ mb: 3 }}
          >
            {/* <MenuItem value="seller">Seller</MenuItem> */}
            <MenuItem value="partner">Partner</MenuItem>
          </TextField>

          {/* SUBMIT */}
          <Button
            fullWidth
            sx={{
              py: 1.4,
              borderRadius: 3,
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              background:
                "linear-gradient(135deg, #635BFF, #FF6692)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #4B44E0, #FF4F85)",
              },
            }}
            onClick={handleSubmit}
          >
            Complete Onboarding
          </Button>
        </Box>
      </Box>

      {/* ✅ SUCCESS MESSAGE */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ background: "#36C76C" }}
        >
          🎉 Onboarding completed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OnBoarding;
