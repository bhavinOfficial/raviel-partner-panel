import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "./axiosInstance";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    role: "partner",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";

    if (!/^[0-9]{10}$/.test(form.mobile))
      newErrors.mobile = "Enter valid 10 digit number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter valid email";

    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await axiosInstance.post("/user/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <>
      {/* 🌈 PAGE BACKGROUND */}
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: "#DADAFF" }}
      >
        {/* 🧊 FORM CARD */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          sx={{
            width: 400,
            p: 4,
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: "0 20px 40px rgba(7,27,47,0.15)",
          }}
        >
          <Typography
            variant="h5"
            mb={1}
            fontWeight={700}
            color="#071B2F"
          >
            Create Account
          </Typography>

          <Typography mb={3} color="#635BFF">
            Partner Registration
          </Typography>

          {/* INPUT FIELDS */}
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Mobile", name: "mobile" },
            { label: "Email", name: "email" },
          ].map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          ))}

          {/* PASSWORD FIELD */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#635BFF" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* REGISTER BUTTON */}
          <Button
            fullWidth
            type="submit"
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
          >
            Register
          </Button>

          {/* 🔁 LOGIN LINK */}
          <Typography
            mt={3}
            textAlign="center"
            fontSize={14}
            color="#071B2F"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#635BFF",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* ✅ SUCCESS SNACKBAR */}
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert
          severity="success"
          variant="filled"
          sx={{
            background: "#36C76C",
            fontSize: 15,
          }}
        >
          🎉 Registered Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
