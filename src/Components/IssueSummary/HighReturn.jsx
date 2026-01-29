import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../Form/axiosInstance";

const HighReturn = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  /* =========================
     🔹 FETCH API DATA
  ========================= */
  const fetchHighReturnSellers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/partner/cancelled-or-high-returned-by-sellers",
        {
          params: {
            highReturnsSellers: true,
            cancelledBySellers: false,
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
      console.error("❌ High Return API error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighReturnSellers();
  }, []);

  /* =========================
     🔹 FILTER (FIXED)
  ========================= */
  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        row.sellerId
          .toLowerCase()
          .includes(searchId.toLowerCase()) &&
        row.sellerEmailId
          .toLowerCase()
          .includes(searchEmail.toLowerCase())
    );
  }, [data, searchId, searchEmail]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px", py: 4 }}>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize={30} fontWeight={600}>
          High Return
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search by Seller Id"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <TextField
            size="small"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </Stack>
      </Stack>

      {/* TABLE */}
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#dcdcff" }}>
              <TableCell><b>Seller ID</b></TableCell>
              <TableCell><b>Seller Name</b></TableCell>
              <TableCell><b>Seller Email ID</b></TableCell>
              <TableCell><b>Phone Number</b></TableCell>
              <TableCell><b>Product Categories</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row) => (
                <TableRow key={row.id} hover>
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
      </Paper>
    </Container>
  );
};

export default HighReturn;
