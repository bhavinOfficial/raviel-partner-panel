import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "./axiosInstance";
import { UserProvider } from "../context/UserProvider";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      const token = res.data.payload.accessToken;
      sessionStorage.setItem("token", token);
      // UserProvider()

      navigate("/home");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid email or password"
      );
      setOpenError(true);
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
            Welcome Back
          </Typography>

          <Typography mb={3} color="#635BFF">
            Login to your account
          </Typography>

          <TextField
            fullWidth
            label="Email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
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
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: "#635BFF" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* 🚀 LOGIN BUTTON */}
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
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* 🔁 REGISTER LINK */}
          <Typography
            mt={3}
            textAlign="center"
            fontSize={14}
            color="#071B2F"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#635BFF",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* ❌ ERROR SNACKBAR */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert  
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{
            background: "#FF7955",
            fontWeight: 500,
            borderRadius: 2,
          }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
