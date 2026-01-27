import React, { useEffect, useState } from "react";
import {
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
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Form/axiosInstance";
import toast from "react-hot-toast";

const MysellerTable = () => {
  const navigate = useNavigate();

  // 🔹 STATES
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [skuInput, setSkuInput] = useState({});
  const [updatingSellerId, setUpdatingSellerId] = useState(null);

  // 🔹 FETCH SELLERS
  const fetchAllSellers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/partner/fetch-all-sellers");

      const sellerList = Array.isArray(res.data?.payload)
        ? res.data.payload
        : [];

      console.log("📦 Sellers API data:", sellerList);

      setSellers(sellerList);
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSellers();
  }, []);

  // 🔹 SKU UPDATE HANDLER (ID BACKEND MA JASE)
  const handleSkuUpdate = async (id) => {
    const newSku = skuInput[id];
    if (!newSku) return;

    setUpdatingSellerId(id);

    // ✅ Optimistic UI update
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, currentSKUsLive: Number(newSku) }
          : s
      )
    );

    try {
      const res = await axiosInstance.put(
        `/partner/update-seller/${id}`, // ✅ ID backend ma jay che
        {
          currentSKUsLive: Number(newSku),
        }
      );

      console.log("✅ Update SKU API response:", res);

      toast.success("SKU updated successfully");

      // clear input
      setSkuInput((prev) => ({
        ...prev,
        [id]: "",
      }));
    } catch (error) {
      console.error("❌ Update SKU failed:", error);

      toast.error("Failed to update SKU");

      // rollback safest
      fetchAllSellers();
    } finally {
      setUpdatingSellerId(null);
    }
  };

  // 🔹 FILTER (sellerId search UI mate j rehse)
  const filteredData = sellers.filter(
    (item) =>
      item?.sellerId
        ?.toLowerCase()
        .includes(searchId.toLowerCase()) &&
      (item?.name || item?.sellerName || "")
        .toLowerCase()
        .includes(searchName.toLowerCase())
  );

  const visibleData = showAll
    ? filteredData
    : filteredData.slice(0, 5);

  const getDurationFromDate = (launchingDate) => {
    if (!launchingDate) return "-";
    const start = new Date(launchingDate);
    const end = new Date();
    const diffMs = end - start;
    if (diffMs < 0) return "-";
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (totalDays < 30) return `${totalDays} days`;
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    return days === 0
      ? `${months} months`
      : `${months} months ${days} days`;
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        p: 3,
        bgcolor: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            My Sellers
          </Typography>
          <Typography fontSize={14} color="text.secondary">
            Total: <b>{sellers.length}</b>
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <TextField
            size="small"
            placeholder="Search by Seller ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <TextField
            size="small"
            placeholder="Search by Seller Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Stack>
      </Stack>

      {/* TABLE */}
      <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#A8A5FF" }}>
              {[
                "#",
                "Launch Date",
                "Seller ID",
                "Name",
                "Orders",
                "Returns",
                "Duration",
                "Live SKU",
                "NMV",
                "Action",
              ].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : visibleData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No sellers found
                </TableCell>
              </TableRow>
            ) : (
              visibleData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.launchingDate || "-"}</TableCell>
                  <TableCell>{row.sellerId || "-"}</TableCell>
                  <TableCell>{row.name || row.sellerName || "-"}</TableCell>
                  <TableCell>{row.totalOrders ?? "-"}</TableCell>
                  <TableCell>{row.totalReturnedTypeOrders ?? "-"}</TableCell>
                  <TableCell>
                    {getDurationFromDate(row.launchingDate)}
                  </TableCell>

                  {/* 🔥 LIVE SKU EDITABLE */}
                  <TableCell>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Chip
                        label={row.currentSKUsLive ?? 0}
                        size="small"
                        sx={{
                          bgcolor: "#FFE5E5",
                          color: "#D32F2F",
                          fontWeight: 700,
                          minWidth: 40,
                        }}
                      />

                      <TextField
                        size="small"
                        type="number"
                        value={skuInput[row.id] || ""}
                        onChange={(e) =>
                          setSkuInput((prev) => ({
                            ...prev,
                            [row.id]: e.target.value,
                          }))
                        }
                        sx={{
                          width: 70,
                          "& input": {
                            textAlign: "center",
                            fontWeight: 600,
                          },
                        }}
                      />

                      <Button
                        size="small"
                        variant="contained"
                        disabled={
                          !skuInput[row.id] ||
                          updatingSellerId === row.id
                        }
                        onClick={() => handleSkuUpdate(row.id)}
                      >
                        {updatingSellerId === row.id
                          ? "Updating..."
                          : "Update"}
                      </Button>
                    </Stack>
                  </TableCell>

                  <TableCell>{row.NMVPaymentAmount || "-"}</TableCell>

                  <TableCell
                    sx={{
                      color: "#1E88E5",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                    onClick={() =>
                      navigate(`/seller_desk/${row.sellerId}`)
                    }
                  >
                    View
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* FOOTER */}
      {filteredData.length > 5 && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Box
            onClick={() => setShowAll((p) => !p)}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 2,
              py: 1,
              borderRadius: "999px",
              fontWeight: 600,
              color: "#1E88E5",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "rgba(30,136,229,0.08)",
              },
            }}
          >
            {showAll ? "Show less sellers" : "View all sellers"}
            <KeyboardArrowDownIcon
              sx={{
                transform: showAll
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MysellerTable;
