import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import logopngonly from "../../assets/logos/whitebglogoonly.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserProvider";

/* --- Menu data --- */
const menuItems = [
  { name: "Home", icon: HomeIcon, path: "/" },
  { name: "Shipment", icon: WidgetsIcon, path: "/shipment" },
  { name: "My Seller", icon: DesktopMacIcon, path: "/my_seller" },
  { name: "Add New Seller", icon: AddCircleIcon, path: "/add_new_seller" },
  { name: "Payout", icon: AccountBalanceWalletIcon, path: "/payout" },
  { name: "Download", icon: CloudDownloadIcon, path: "/download" },
  { name: "Attendance", icon: PeopleAltIcon, path: "/attendance" },
  { name: "Seller-Partner", icon: HandshakeIcon, path: "/seller_partner" },
];

const Sidebar = () => {
  /* 🔹 USER FROM CONTEXT (NO API CALL HERE) */
  const { user, loading } = useUser();
  const profile = user?.payload;

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:767px)");
  const drawerWidth = open ? 256 : 105;

  /* --- Menu Item Renderer --- */
  const renderMenuItem = (item, isExpanded) => {
    const Icon = item.icon;

    const isActive =
      item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path);

    const button = (
      <ListItemButton
        component={Link}
        to={item.path}
        selected={isActive}
        sx={{
          px: 2,
          py: 1.5,
          mb: 0.5,
          borderRadius: 2,
          minHeight: 48,
          background: isActive
            ? "linear-gradient(90deg, #635BFF 0%, #8B85FF 100%)"
            : "transparent",
          color: isActive ? "#fff" : "#6b7280",
          transition: "all 0.25s ease",
          "&:hover": {
            backgroundColor: isActive ? "#635BFF" : "#F3F4F6",
            color: isActive ? "#fff" : "#071B2F",
          },
        }}
      >
        <Icon sx={{ minWidth: 40, fontSize: 24 }} />
        <ListItemText
          primary={item.name}
          sx={{
            ml: 2,
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: "0.3s",
          }}
        />
      </ListItemButton>
    );

    if (!isExpanded && !isMobile) {
      return (
        <Tooltip title={item.name} placement="right" arrow key={item.name}>
          {button}
        </Tooltip>
      );
    }

    return <Box key={item.name}>{button}</Box>;
  };

  /* --- Sidebar Content --- */
  const sidebarContent = (isExpanded) => (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Box component="img" src={logopngonly} sx={{ width: 60 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            opacity: isExpanded ? 1 : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: "0.3s",
          }}
        >
          RAVIEL
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ flex: 1, px: 2, overflow: "hidden" }}>
        {menuItems.map((item) => renderMenuItem(item, isExpanded))}
      </List>

      {/* Profile */}
      <Box
        onClick={() => navigate("/profile")}
        sx={{
          p: 3,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
        }}
      >
        <Avatar sx={{ bgcolor: "#635BFF" }}>
          {profile?.firstName?.[0]?.toUpperCase() || "U"}
        </Avatar>

        {isExpanded && (
          <Box>
            <Typography fontWeight={600}>
              {loading ? "Loading..." : profile?.firstName || "User"}
            </Typography>
            <Typography variant="caption" color="gray">
              {profile?.email || ""}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              transition: "width 0.3s ease",
              overflow: "hidden",
            },
          }}
        >
          {sidebarContent(open)}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            overflow: "hidden",
          },
        }}
      >
        {sidebarContent(true)}
      </Drawer>
    </>
  );
};

export default Sidebar;
