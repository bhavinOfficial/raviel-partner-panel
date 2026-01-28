import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axiosInstance from "../Form/axiosInstance";

/* ---------------- STATUS MAP ---------------- */
const STATUS_MAP = {
  // Delivered
  DELIVERED: "DELIVERED",

  // Cancel
  AUTO_CANCELED: "AUTO_CANCELED",
  CUSTOMER_CANCELED: "CUSTOMER_CANCELED",
  SELLER_CANCELED: "SELLER_CANCELED",

  // Return
  RETURNED: "RETURNED",
  REFUNDED: "REFUNDED",
  RTO_INITIATED: "RTO_INITIATED",
  RTO_IN_TRANSIT: "RTO_IN_TRANSIT",
  RTO_COMPLETED: "RTO_COMPLETED",

  // Movement
  PLACED: "PLACED",
  SELLER_PROCESSING: "SELLER_PROCESSING",
  BAG_PACKED: "BAG_PACKED",
  BAG_PICKED: "BAG_PICKED",
  DP_ASSIGNED: "DP_ASSIGNED",
  OUT_FOR_PICKUP: "OUT_FOR_PICKUP",
  IN_TRANSIT: "IN_TRANSIT",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERY_ATTEMPTED: "DELIVERY_ATTEMPTED",
  EDD_UPDATED: "EDD_UPDATED",
  BAG_PICK_FAILED: "BAG_PICK_FAILED",
};

const SellerAllOrderDetails = ({ seller }) => {
  const sellerId = seller?.id;

  const [cancelAnchor, setCancelAnchor] = useState(null);
  const [returnAnchor, setReturnAnchor] = useState(null);
  const [movementAnchor, setMovementAnchor] = useState(null);

  const [selectedView, setSelectedView] = useState("DELIVERED");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- API CALL ---------------- */
  useEffect(() => {
    if (!sellerId || !STATUS_MAP[selectedView]) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          "/partner/fetch-all-orders",
          {
            params: {
              sellerId,
              orderStatus: STATUS_MAP[selectedView],
            },
          }
        );

        setOrders(res.data?.payload ?? []);
      } catch (err) {
        console.error("API Error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedView, sellerId]);

  /* ---------------- TABLE ---------------- */
  const OrderTable = () => (
    <Paper sx={{ mt: 3, p: 2, borderRadius: "14px" }} elevation={3}>
      <Typography fontWeight={700} mb={1}>
        ● Orders - {selectedView.replaceAll("_", " ")}
      </Typography>

      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr 2fr 1fr",
          bgcolor: "#FF5C8A",
          p: 1,
          borderRadius: "8px",
          fontWeight: 700,
        }}
      >
        <Typography>Date</Typography>
        <Typography>Order ID</Typography>
        <Typography>Shipment ID</Typography>
        <Typography>Shipment Partner</Typography>
        <Typography>Value</Typography>
      </Box>

      {/* Body */}
      {loading ? (
        <Box py={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography align="center" py={3}>
          No orders found
        </Typography>
      ) : (
        orders.map((row) => (
          <Box
            key={row._id}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 2fr 2fr 1fr",
              py: 1,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography>
              {new Date(row.createdAt).toLocaleDateString()}
            </Typography>
            <Typography>{row.orderId}</Typography>
            <Typography>{row.shipmentId}</Typography>
            <Typography>{row.deliveryPartner}</Typography>
            <Typography>₹{row.orderValue}</Typography>
          </Box>
        ))
      )}
    </Paper>
  );

  return (
    <Box>
      {/* TITLE */}
      <Box display="flex" alignItems="center" gap={1} mb={2} sx={{ pt: "80px" }}>
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            bgcolor: "#5B5BFF",
          }}
        />
        <Typography variant="h6" fontWeight={700}>
          All Order Details
        </Typography>
      </Box>

      {/* TOP BAR */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* DELIVERED */}
        <Typography
          fontWeight={600}
          sx={{ cursor: "pointer" }}
          onClick={() => setSelectedView("DELIVERED")}
        >
          Delivered (50)
        </Typography>

        {/* CANCELED */}
        <Box
          onMouseEnter={(e) => setCancelAnchor(e.currentTarget)}
          onMouseLeave={() => setCancelAnchor(null)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Typography fontWeight={600}>Canceled (50)</Typography>
          <KeyboardArrowDownIcon />
          <Menu
            anchorEl={cancelAnchor}
            open={Boolean(cancelAnchor)}
            onClose={() => setCancelAnchor(null)}
          >
            <MenuItem onClick={() => setSelectedView("CUSTOMER_CANCELED")}>
              CUSTOMER CANCELED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("AUTO_CANCELED")}>
              AUTO CANCELED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("SELLER_CANCELED")}>
              SELLER CANCELED (10)
            </MenuItem>
          </Menu>
        </Box>

        {/* RETURN */}
        <Box
          onMouseEnter={(e) => setReturnAnchor(e.currentTarget)}
          onMouseLeave={() => setReturnAnchor(null)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Typography fontWeight={600}>Return (50)</Typography>
          <KeyboardArrowDownIcon />
          <Menu
            anchorEl={returnAnchor}
            open={Boolean(returnAnchor)}
            onClose={() => setReturnAnchor(null)}
          >
            <MenuItem onClick={() => setSelectedView("RETURNED")}>
              RETURNED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("REFUNDED")}>
              REFUNDED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("RTO_INITIATED")}>
              RTO INITIATED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("RTO_IN_TRANSIT")}>
              RTO IN TRANSIT (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("RTO_COMPLETED")}>
              RTO COMPLETED (10)
            </MenuItem>
          </Menu>
        </Box>

        {/* MOVEMENT */}
        <Box
          onMouseEnter={(e) => setMovementAnchor(e.currentTarget)}
          onMouseLeave={() => setMovementAnchor(null)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Typography fontWeight={600}>Movement (50)</Typography>
          <KeyboardArrowDownIcon />
          <Menu
            anchorEl={movementAnchor}
            open={Boolean(movementAnchor)}
            onClose={() => setMovementAnchor(null)}
          >
            <MenuItem onClick={() => setSelectedView("PLACED")}>
              PLACED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("SELLER_PROCESSING")}>
              SELLER PROCESSING (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("BAG_PACKED")}>
              BAG_PACKED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("BAG_PICKED")}>
              BAG_PICKED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("DP_ASSIGNED")}>
              DP_ASSIGNED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("OUT_FOR_PICKUP")}>
              OUT_FOR_PICKUP (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("IN_TRANSIT")}>
              IN TRANSIT (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("OUT_FOR_DELIVERY")}>
              OUT FOR DELIVERY (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("DELIVERY_ATTEMPTED")}>
              DELIVERY ATTEMPTED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("EDD_UPDATED")}>
              EDD_UPDATED (10)
            </MenuItem>
            <MenuItem onClick={() => setSelectedView("BAG_PICK_FAILED")}>
              BAG_PICK_FAILED (10)
            </MenuItem>
          </Menu>
        </Box>
      </Paper>

      {/* TABLE */}
      <OrderTable />
    </Box>
  );
};

export default SellerAllOrderDetails;
