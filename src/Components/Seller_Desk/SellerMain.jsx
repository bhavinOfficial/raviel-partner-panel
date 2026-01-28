import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import SellerDetail from "./SellerDetail";
import StatsCards from "./StatsCards";
import OrderGrowth from "./OrderGrowth";
import axiosInstance from "../Form/axiosInstance";
import SkuDetailsCard from "./SkuDetailsCard";
import SellerDeskPayoutHistory from "./SellerDeskPayoutHistory";
import SellerDeskCodVsPrepaid from "./SellerDeskCodVsPrepaid";
import SellerAllOrderDetails from "./SellerAllOrderDetails";

const SellerMain = () => {
  const { id } = useParams();
  // console.log(id);

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("seller", seller.id);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/partner/fetch-all-sellers/");
        const sellers = res.data?.payload || [];

        const foundSeller = sellers.find(
          (item) =>
            item.id?.trim() === id?.trim() ||
            item.sellerId?.trim() === id?.trim()
        );

        if (!foundSeller) {
          console.warn("❌ Seller not found for ID:", id);
          setError("Seller not found");
          setSeller(null);
        } else {
          setSeller(foundSeller);
        }

      } catch (err) {
        console.error("❌ Error fetching seller:", err);
        setError("Failed to load seller");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  // 🔹 LOADING STATE
  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading seller details...</Typography>
      </Container>
    );
  }

  // 🔹 ERROR STATE
  if (error) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px" }}>
      <SellerDetail seller={seller} />

      <StatsCards seller={seller} />

      <Box
        mt={3}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1fr", // 👈 THIS creates exact ratio
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <OrderGrowth sellerId={id} />
        <SkuDetailsCard seller={seller} />
      </Box>
      <Box
        mt={3}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        <SellerDeskPayoutHistory seller={seller} />
        <SellerDeskCodVsPrepaid seller={seller} />
      </Box>
        <SellerAllOrderDetails seller={seller.id} />

    </Container>
  );
};

export default SellerMain;
