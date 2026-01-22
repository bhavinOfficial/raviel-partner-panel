import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../Form/axiosInstance";

const SellerWisePayout = ({ refreshKey }) => {
  const [totalFixed, setTotalFixed] = useState(0);
  const [totalNMV, setTotalNMV] = useState(0);
  const [finalPayout, setFinalPayout] = useState(0);

  useEffect(() => {
    const fetchPayoutSummary = async () => {
      try {
        const res = await axiosInstance.get("/user");

        const payload = res.data?.payload;

        setTotalFixed(payload?.totalFixedPayment ?? 0);
        setTotalNMV(payload?.totalNMVPayment ?? 0);
        setFinalPayout(payload?.finalPayout ?? 0);
      } catch (error) {
        console.error("Failed to fetch payout summary", error);
      }
    };

    fetchPayoutSummary();
  }, [refreshKey]); // 🔥 KEY POINT

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            bgcolor: "#36C76C",
          }}
        />
        <Box sx={{ paddingLeft: "20px", fontSize: "22px", fontWeight: "bold" }}>
          Seller Wise Payout
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 3 }}>
        <Box sx={{ width: "30%", bgcolor: "#FFCCDB", p: 3, borderRadius: 2 }}>
          <Typography>Total Fixed Payment</Typography>
          <Typography fontWeight="bold">₹{totalFixed}</Typography>
        </Box>

        <Box sx={{ width: "30%", bgcolor: "#DADAFF", p: 3, borderRadius: 2 }}>
          <Typography>Total NMV Payment</Typography>
          <Typography fontWeight="bold">₹{totalNMV}</Typography>
        </Box>

        <Box sx={{ width: "30%", bgcolor: "#DEFFEB", p: 3, borderRadius: 2 }}>
          <Typography>Final Payout</Typography>
          <Typography fontWeight="bold">₹{finalPayout}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerWisePayout;
