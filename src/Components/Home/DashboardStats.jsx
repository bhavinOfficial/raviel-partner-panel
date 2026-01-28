import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PixIcon from "@mui/icons-material/Pix";

const DashboardStats = ({ statsData, loading }) => {
  console.log("📊 STATS RECEIVED:", statsData);

  const stats = [
    {
      title: "Total Order",
      value: statsData?.totalOrders ?? 0,
      bg: "#DADAFF",
      iconBg: "#635BFF",
      icon: <CurrencyRupeeIcon />,
    },
    {
      title: "Total GMV",
      value: statsData?.totalGMV ?? 0,
      bg: "#FDF5D9",
      iconBg: "#F8C20A",
      icon: <PixIcon />,
    },
    {
      title: "Pending Acceptance",
      value: statsData?.pendingAcceptance ?? 0,
      bg: "#FFCCDB",
      iconBg: "#FF6692",
      icon: <HourglassBottomIcon />,
    },
    {
      title: "My Payment",
      value: statsData?.myPayment ?? 0,
      bg: "#DEFFEB",
      iconBg: "#36C76C",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      title: "Problematic Order",
      value: statsData?.problematicOrder ?? 0,
      bg: "#FFCFC2",
      iconBg: "#FF7955",
      icon: <ReportProblemOutlinedIcon />,
    },
  ];

  if (loading) return null;

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
        bgcolor: "#fff",
        p: 3,
        borderRadius: 4,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {stats.map((item, i) => (
        <Box
          key={i}
          sx={{
            flex: "1 1 180px",
            minWidth: 180,
            bgcolor: item.bg,
            borderRadius: 4,
            p: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              mx: "auto",
              mb: 2.5,
              borderRadius: 2,
              bgcolor: item.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {item.icon}
          </Box>

          <Typography fontSize={16} fontWeight={500}>
            {item.title}
          </Typography>

          <Typography fontSize={20} fontWeight={700} mt={0.5}>
            {item.value.toLocaleString()}
          </Typography>

          <Button
            size="small"
            sx={{
              mt: 2.5,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: 12,
              bgcolor: "#fff",
              color: "#111",
              "&:hover": {
                bgcolor: "#000",
                color: "#fff",
              },
            }}
          >
            View details
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default DashboardStats;
