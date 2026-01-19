import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "./axiosInstance";
import logo from "../../assets/logos/LOGO.png"
import toast from "react-hot-toast";

// 👉 replace with your illustration image
import loginIllustration from "../../assets/form/Group 4.png";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    const toastId = toast.loading("Logging you in...");

    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", res.data.payload.accessToken);
      toast.success("Login successful", { id: toastId });
      window.location.href = "/partner-card";

    } catch (err) {
      toast.error("Invalid email or password", { id: toastId });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* 🌈 PAGE BACKGROUND */}
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 2 }}
        >

          {/* 🧊 MAIN CARD */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 1000,
              bgcolor: "#fff",
              borderRadius: "30px",
              p: 3,
              position: "relative",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            }}
          >
            {/* 🔹 TOP RIGHT HELP */}


            <Box display="flex">
              {/* ================= LEFT LOGIN ================= */}
              <Box
                flex={1}
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={1}
                >
                  Login
                </Typography>

                <Typography color="text.secondary" mb={3}>
                  Login to access your dashboard
                </Typography>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >

                  <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label="Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword((p) => !p)
                            }
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Remember me"
                    />
                    <Typography
                      color="#FF6B6B"
                      fontSize={14}
                      sx={{ cursor: "pointer" }}
                    >
                      Forgot Password
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    disabled={loading}
                    onClick={handleLogin}
                    sx={{bgcolor:"#3968eb",color:"black"}}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                </Box>
                <Typography
                  mt={3}
                  fontSize={14}
                  textAlign="center"
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#FF6B6B",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Register now
                  </Link>
                </Typography>
              </Box>

              {/* ================= RIGHT IMAGE ================= */}
              <Box
                flex={1}
                display={{ xs: "none", md: "flex" }}
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "500px",
                  borderRadius: "20px",
                  p: 3,
                }}
              >
                <img
                  src={loginIllustration}
                  alt="login"
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Box>

            {/* ================= BOTTOM INFO ================= */}
            <Box mt={4} sx={{ width: "100%" }}>
              {[
                "Log in securely to enter your account and access the main dashboard with an overview of all platform features",
                "After login, users are guided to complete the mandatory business onboarding process for account activation",
                "The dashboard remains fully visible, allowing users to explore the interface and understand available tools",
                "All operational tools stay locked and cannot be used until onboarding details are successfully submitted",
                "Features such as product listing, inventory management, billing, label tools, and settlements remain disabled",
                "Onboarding requires valid business and contact details to ensure compliance and proper system setup",
                "Clear system prompts and alerts guide users to finish onboarding without confusion",
                "Partial or incomplete onboarding restricts access across the entire platform",
                "Only after onboarding is completed and verified, full access to all tools and services is unlocked",
                "Once activated, users can manage their business operations smoothly from a single dashboard"
              ].map((txt, i) => (
                <Typography key={i} fontSize={16} mb={0.5} sx={{ color: "grey" }}>
                  • {txt}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>


    </>
  );
};

export default Login;
