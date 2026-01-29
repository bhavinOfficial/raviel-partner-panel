import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axiosInstance from "../Form/axiosInstance";

const CanceledbySeller = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellerSearch, setSellerSearch] = useState("");

  /* =========================
     🔹 FETCH API DATA
  ========================= */
  const fetchCanceledBySellerOrders = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/partner/cancelled-or-high-returned-by-sellers",
        {
          params: {
            highReturnsSellers: false,
            cancelledBySellers: true,
          },
        }
      );

      const mapped = (res.data?.payload || []).map((item, index) => ({
        id: index + 1,
        sellerId: item.sellerId || "-",
        sellerName: item.sellerName || "-",
        sellerEmailId: item.sellerEmail?.trim() || "-",
        phoneNumber: item.phoneNumber?.trim() || "-",
        productCategories:
          Array.isArray(item.productCategories) &&
          item.productCategories.length > 0
            ? item.productCategories
            : ["N/A"],
      }));

      setData(mapped);
    } catch (error) {
      console.error("❌ Cancelled-by-seller API error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCanceledBySellerOrders();
  }, []);

  /* =========================
     🔹 FILTER (FIXED)
  ========================= */
  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      row.sellerId.toLowerCase().includes(sellerSearch.toLowerCase())
    );
  }, [data, sellerSearch]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px", py: 4 }}>
      <Box sx={{ p: 3, minHeight: "100vh" }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography fontSize={30} fontWeight={600}>
            Canceled by Seller Order Details
          </Typography>

          <TextField
            size="small"
            placeholder="Search by Seller Id"
            value={sellerSearch}
            onChange={(e) => setSellerSearch(e.target.value)}
          />
        </Box>

        {/* TABLE */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell sx={{ bgcolor: "#dcdcff" }} /> */}
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Seller ID</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Seller Name</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Seller Email ID</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Phone Number</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Product Categories</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row) => (
                    <TableRow key={row.id} hover>
                      {/* <TableCell width={40}>
                        <IconButton size="small">
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      </TableCell> */}

                      <TableCell>{row.sellerId}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>{row.sellerEmailId}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>
                        {row.productCategories.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default CanceledbySeller;
