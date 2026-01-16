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
import axiosInstance from "../Form/axiosInstance";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/logos/LOGO.png"
import registreimage from "../../assets/form/Untitled-2.png"

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
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

    if (!/^[0-9]{10}$/.test(form.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10 digit number";

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
      <Box>
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", height: "100%", padding: "10px 30px" }}>
          <Box sx={{ height: "70px" }}>
            <img src={logo} alt="" style={{ height: "100%", width: "100%" }} />
          </Box>
          <Typography
            component="a"
            href="mailto:support@raviel.in?subject=Support%20Request&body=Hello%20Support%20Team,"
            sx={{
              fontSize: "25px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
              transition: "all 0.2s ease",

              "&:hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
            }}
          >
            Help
          </Typography>


        </Box>
        {/* 🌈 PAGE BACKGROUND */}
        <Box sx={{
          background: "#ffffff",
          boxShadow: "0 20px 40px rgba(7,27,47,0.15)", width: "1000px", borderRadius: "20px", margin: "auto"
        }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ margin: "auto", }}
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
                { label: "phoneNumber", name: "phoneNumber" },
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
            <Box sx={{ width: "400px", paddingX: "50px" }}>
              <img src={registreimage} style={{ height: "100%", width: "100%" }} alt="" />
            </Box>

          </Box>
          <Box sx={{ padding: "20px" }}>
            <Typography component="ul" sx={{ pl: 2 ,color:"grey"}}>
              <Typography component="li">
                Create your account to get started with a secure and centralized business
                management platform.
              </Typography>
              <Typography component="li">
                Registration allows you to access your personal dashboard and begin setting
                up your business profile.
              </Typography>
              <Typography component="li">
                Enter basic personal and contact details to ensure account security and
                smooth communication.
              </Typography>
              <Typography component="li">
                After successful registration, you will be required to accept the Terms &
                Conditions.
              </Typography>
              <Typography component="li">
                Once registered, you can log in and view the dashboard, but tools will remain
                restricted.
              </Typography>
              <Typography component="li">
                Completing the business onboarding process is mandatory to unlock all
                platform features.
              </Typography>
            </Typography>
          </Box>

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
