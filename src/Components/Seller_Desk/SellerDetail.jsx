import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

/* 🔹 SAME dummy data (later API thi replace kari sako) */
const SELLERS = [
  {
    sellerId: "XZY058",
    name: "Hemal Creation",
    email: "hemal@gmail.com",
    launchDate: "12-12-2025",
  },
  {
    sellerId: "XKHY08",
    name: "Khushal satani",
    email: "khushal@gmail.com",
    launchDate: "12-12-2025",
  },
  {
    sellerId: "KHU005",
    name: "Jayesh Bhayani",
    email: "jayesh@gmail.com",
    launchDate: "12-12-2025",
  },
];

const SellerDetail = () => {
  const { sellerId } = useParams();

  // 🔍 Find seller using route param
  const seller = SELLERS.find(
    (s) => s.sellerId === sellerId
  );

  if (!seller) {
    return (
      <Typography fontWeight={600}>
        Seller not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: "20px",
        p: 3,
        bgcolor: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box
          sx={{
            width: 14,
            height: 14,
            bgcolor: "#FF6F61",
            borderRadius: "50%",
          }}
        />
        <Typography variant="h5" fontWeight={700}>
          Seller Details
        </Typography>
      </Stack>

      {/* Details */}
      <Stack spacing={1.2}>
        <DetailRow label="Seller ID" value={seller.sellerId} />
        <DetailRow label="Seller Name" value={seller.name} />
        <DetailRow label="Seller Email" value={seller.email} />
        <DetailRow label="Launch Date" value={seller.launchDate} />
      </Stack>
    </Box>
  );
};

/* 🔹 Reusable Row */
const DetailRow = ({ label, value }) => (
  <Stack direction="row" spacing={4}>
    <Typography sx={{ minWidth: 130, fontWeight: 600 }}>
      {label}:
    </Typography>
    <Typography fontWeight={600}>{value || "-"}</Typography>
  </Stack>
);

export default SellerDetail;
