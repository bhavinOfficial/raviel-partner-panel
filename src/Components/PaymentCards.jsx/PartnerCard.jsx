import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Avatar,
  Container,
} from "@mui/material";
import { Check, RocketLaunch } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Form/axiosInstance";

/* 🎨 COLORS */
const COLORS = {
  primary: "#635BFF",
  dark: "#071B2F",
  success: "#36C76C",
  warning: "#F8C20A",
};

const PLAN_THEMES = [
  { color: "#635BFF", bg: "#DADAFF" },
  { color: "#36C76C", bg: "#DEFFEB" },
  { color: "#FF7955", bg: "#FFCFC2" },
  { color: "#FF6692", bg: "#FFCCDB" },
];

const PartnerCard = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSubscriptionPlans = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/subscription-plans", {
        params: {
          userType: "partner",
          planType: "monthly",
        },
        skipAuth: true,
      });

      const apiPlans = response.data.payload?.partner || [];

      const formattedPlans = apiPlans.map((plan, index) => {
        const theme = PLAN_THEMES[index % PLAN_THEMES.length];
        return {
          id: plan.id,
          name: plan.planName,
          description: plan.planDescription,
          price: plan.price,
          billingCycle: `/${plan.planType}`,
          popular: plan.isPopular,
          features:
            plan.subscriptionPlanKeyFeatures?.map(
              (f) => f.featureName
            ) || [],
          color: theme.color,
          bg: theme.bg,
        };
      });

      setPlans(formattedPlans);
    } catch (error) {
      console.error("Failed to fetch plans", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F8FAFF", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">

        <Typography variant="h3" align="center" fontWeight="bold">
          Partner Subscription Plans
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            mt: 6,
            pb: 2,
          }}
        >
          {plans.map((plan) => (
            <Box key={plan.id} sx={{ minWidth: 320 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  background: `linear-gradient(180deg, ${plan.bg}, #fff)`,
                }}
              >
                {plan.popular && (
                  <Chip
                    label="MOST POPULAR"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: COLORS.warning,
                      fontWeight: "bold",
                    }}
                  />
                )}

                <CardContent sx={{ p: 4 }}>
                  <Avatar
                    sx={{
                      bgcolor: plan.color,
                      width: 56,
                      height: 56,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <RocketLaunch />
                  </Avatar>

                  <Typography align="center" fontWeight="bold">
                    {plan.name}
                  </Typography>

                  <Typography align="center" color="text.secondary">
                    {plan.description}
                  </Typography>

                  <Typography
                    align="center"
                    variant="h4"
                    sx={{ color: plan.color, my: 2 }}
                  >
                    ₹{plan.price}
                    <Typography component="span" fontSize={14}>
                      {plan.billingCycle}
                    </Typography>
                  </Typography>

                  {plan.features.map((f, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1 }}>
                      <Check sx={{ color: COLORS.success }} />
                      <Typography variant="body2">{f}</Typography>
                    </Box>
                  ))}

                  {/* ✅ NAVIGATION BUTTON */}
                  <Button
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.4,
                      bgcolor: COLORS.primary,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Get Started
                  </Button>

                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PartnerCard;
