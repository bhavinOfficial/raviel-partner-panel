import React, { useState } from "react";
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

const SellerWisePayoutSummary = ({ rows = [], loading }) => {
  const INITIAL_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  return (
    <Box sx={{ pt: 3, width: "100%" }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} fontSize={18} mb={3}>
          Seller Wise Fixed Payout Summary
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : rows.length === 0 ? (
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
                  {rows.slice(0, visibleCount).map((row) => (
                    <TableRow key={`${row.id}-${row.month}`}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.sellerId}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>₹{row.fixed}</TableCell>

                      {/* 🔒 STATIC TOGGLE (READ ONLY) */}
                      <TableCell>
                        <Switch
                          checked={Boolean(
                            row.fixedPaymentReceivedOrNot
                          )}
                          // disabled   // 👈 no interaction
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {rows.length > INITIAL_COUNT && (
              <Box display="flex" justifyContent="center" mt={2} gap={2}>
                <Button onClick={() => setVisibleCount(rows.length)}>
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
