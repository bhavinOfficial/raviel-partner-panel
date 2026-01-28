import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Stack,
} from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axiosInstance from "../Form/axiosInstance";

/* ================= TOOLTIP ================= */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: 1.5,
          borderRadius: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {payload[0].payload.label}
        </Typography>
        <Typography fontWeight={700}>
          {payload[0].value.toLocaleString()} Orders
        </Typography>
      </Paper>
    );
  }
  return null;
};

/* ================= COMPONENT ================= */
const OrderGrowth = ({ sellerId }) => {
  const [range, setRange] = useState("daily");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= API CALL ================= */
  const fetchOrderGrowth = async (tenure) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/partner/seller/${sellerId}/orders/growth`,
        {
          params: { timeTenure: tenure },
        }
      );

      const apiData = res?.data?.payload || [];

      const formattedData = apiData.map((item) => ({
        label: item.label,
        value: Number(item.value),
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Order Growth API Error:", error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    if (sellerId) {
      fetchOrderGrowth(range);
    }
  }, [range, sellerId]);

  /* ================= TOTAL ================= */
  const totalValue = useMemo(
    () => chartData.reduce((sum, item) => sum + item.value, 0),
    [chartData]
  );

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3}>
        {/* ===== Header ===== */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                letterSpacing: 1,
                mb: 1,
              }}
            >
              ORDER GROWTH
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {loading ? "—" : totalValue.toLocaleString()}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
              <TrendingUpIcon sx={{ fontSize: 16, color: "#16a34a" }} />
              <Typography
                variant="caption"
                sx={{ color: "#16a34a", fontWeight: 600 }}
              >
                +12.5% vs last period
              </Typography>
            </Stack>
          </Box>

          {/* ===== Toggle ===== */}
          <ToggleButtonGroup
            value={range}
            exclusive
            onChange={(e, val) => val && setRange(val)}
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              p: 0.3,
            }}
          >
            {["daily", "weekly", "annually"].map((item) => (
              <ToggleButton
                key={item}
                value={item}
                sx={{
                  px: 2,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  border: "none",
                  "&.Mui-selected": {
                    bgcolor: "#000",
                    color: "#fff",
                  },
                }}
              >
                {item}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        {/* ===== Chart ===== */}
        <Box>
          {loading ? (
            <Typography align="center">Loading...</Typography>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="lightFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#000" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 6"
                  stroke="#e5e7eb"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#000", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#000", fontSize: 12 }}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
                  }
                />

                <Tooltip content={<CustomTooltip />} cursor={false} />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={3}
                  fill="url(#lightFill)"
                  activeDot={{
                    r: 6,
                    fill: "#000",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrderGrowth;
