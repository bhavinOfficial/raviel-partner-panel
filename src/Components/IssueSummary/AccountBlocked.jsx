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
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../Form/axiosInstance";

const AccountBlocked = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  /* =========================
     🔹 FETCH BLOCKED SELLERS
  ========================= */
  const fetchBlockedSellers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/partner/fetch-all-sellers", {
        params: {
          sellerStatus: "inactive", // 🔴 IMPORTANT
        },
      });

      const mapped = (res.data?.payload || []).map((item, index) => ({
        id: index + 1,
        sellerId: item.sellerId || "-",
        name: item.sellerName || "-",
        email: item.sellerEmail?.trim() || "-",
        launchDate: item.launchingDate || "-",
        status: item.sellerStatus || "inactive",
        action: "Pending", // local UI state
      }));

      setData(mapped);
    } catch (error) {
      console.error("❌ Fetch blocked sellers error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedSellers();
  }, []);

  /* =========================
     🔹 FILTER DATA
  ========================= */
  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        row.sellerId
          .toLowerCase()
          .includes(searchId.toLowerCase()) &&
        row.email
          .toLowerCase()
          .includes(searchEmail.toLowerCase())
    );
  }, [data, searchId, searchEmail]);

  /* =========================
     🔹 ACTION CHANGE (LOCAL)
  ========================= */
  const handleActionChange = (id, value) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, action: value } : row
      )
    );
  };

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
          Blocked Account Details
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search by Seller Id"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            sx={{ width: 180 }}
          />
          <TextField
            size="small"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            sx={{ width: 180 }}
          />
        </Stack>
      </Stack>

      {/* TABLE */}
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#FF6B91",
                "& th": { color: "#000", fontWeight: 700 },
              }}
            >
              <TableCell>Seller ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Launch Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.sellerId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.launchDate}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {row.status}
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      size="small"
                      value={row.action}
                      onChange={(e) =>
                        handleActionChange(row.id, e.target.value)
                      }
                      sx={{
                        minWidth: 110,
                        fontWeight: 600,
                        bgcolor:
                          row.action === "Reviewed"
                            ? "#2EE66B"
                            : "#FF6B91",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      <MenuItem value="Reviewed">Reviewed</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
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

export default AccountBlocked;
