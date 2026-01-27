import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const stats = [
  {
    title: "Total Orders",
    value: "50,000",
    bg: "#E0E1FF",
  },
  {
    title: "GMV",
    value: "50,000",
    change: "7.6%",
    bg: "#E6FFEF",
  },
  {
    title: "Return Order",
    value: "50",
    change: "7.6%",
    bg: "#FFD6C9",
  },
  {
    title: "Return Order",
    value: "50",
    change: "7.6%",
    bg: "#FFF2C2",
  },
];

const StatsCards = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ width: "100%" ,paddingTop:"20px"}}
    >
      {stats.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            bgcolor: item.bg,
            borderRadius: "18px",
            p: 3,
            minHeight: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Title */}
          <Typography fontSize={18} fontWeight={600}>
            {item.title}
          </Typography>

          {/* Value + Growth */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontSize={26} fontWeight={700}>
              {item.value}
            </Typography>

            {item.change && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{
                  bgcolor: "#fff",
                  px: 1.2,
                  py: 0.4,
                  borderRadius: "8px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <Typography fontSize={13}>{item.change}</Typography>
                <ArrowUpwardIcon sx={{ fontSize: 14 }} />
              </Stack>
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default StatsCards;
