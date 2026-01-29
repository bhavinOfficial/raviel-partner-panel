import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Button,
} from "@mui/material";
import axiosInstance from "../Form/axiosInstance";

const SellerWisePayoutSummary = ({ rows = [], loading, onToggle }) => {

  const INITIAL_COUNT = 5;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [tableRows, setTableRows] = useState([]);
  const [updatingSellerId, setUpdatingSellerId] = useState(null);

  /* ================= Sync props → local ================= */
  useEffect(() => {
    // console.log("📦 ROWS RECEIVED IN SellerWisePayoutSummary:",rows);
    setTableRows(rows);
  }, [rows]);

  /* ================= Toggle update (FINAL API) ================= */
 const handleToggle = async (row) => {
  const newValue = !row.fixedPaymentReceivedOrNot;

  // optimistic UI
  setTableRows((prev) =>
    prev.map((r) =>
      r.sellerId === row.sellerId && r.month === row.month
        ? { ...r, fixedPaymentReceivedOrNot: newValue }
        : r
    )
  );

  setUpdatingSellerId(row.sellerId);

  try {
    await onToggle(row.sellerId, newValue, "Fixed");
  } catch {
    // rollback
    setTableRows((prev) =>
      prev.map((r) =>
        r.sellerId === row.sellerId && r.month === row.month
          ? { ...r, fixedPaymentReceivedOrNot: !newValue }
          : r
      )
    );
  } finally {
    setUpdatingSellerId(null);
  }
};


  return (
    <Box sx={{ pt: 3, width: "100%" }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} fontSize={18} mb={3}>
          Seller Wise Fixed Payout Summary
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : tableRows.length === 0 ? (
          <Typography align="center">No sellers found</Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#36C76C" }}>
                    <TableCell>Month</TableCell>
                    <TableCell>Seller Id</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell>Fixed Payment</TableCell>
                    <TableCell>Received</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableRows.slice(0, visibleCount).map((row) => (
                    <TableRow key={`${row.sellerId}-${row.month}`}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.sellerId}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>₹{row.fixed}</TableCell>

                      <TableCell>
                        <Switch
                          checked={Boolean(row.fixedPaymentReceivedOrNot)}
                          onChange={() => handleToggle(row)}
                          disabled={updatingSellerId === row.sellerId}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {tableRows.length > INITIAL_COUNT && (
              <Box display="flex" justifyContent="center" mt={2} gap={2}>
                <Button onClick={() => setVisibleCount(tableRows.length)}>
                  Show More
                </Button>
                <Button onClick={() => setVisibleCount(INITIAL_COUNT)}>
                  Show Less
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default SellerWisePayoutSummary;
