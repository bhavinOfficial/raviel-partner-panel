import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import Delivered from "./Delivered";
import Canceled from "./Canceled";
import Return from "./Return";
import Movement from "./Movement";
import { STATUS_CONFIG } from "./statusConfig";

const cardStyle = {
  borderRadius: "18px",
  p: "24px 28px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
};

const COMPONENT_MAP = {
  Delivered,
  Canceled,
  Return,
  Movement,
};

const ShipmentStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState("Delivered");
  const [selectedSubStatus, setSelectedSubStatus] = useState(null);

  const ActiveComponent = COMPONENT_MAP[selectedStatus];

  return (
    <Box sx={{ p: 3 }}>
      {/* TOP SECTION */}
      <Box sx={{ display: "flex", gap: "24px" }}>
        {/* LEFT COLUMN */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {Object.keys(STATUS_CONFIG).map((key) => {
            const item = STATUS_CONFIG[key];

            return (
              <Box
                key={key}
                onClick={() => {
                  setSelectedStatus(key);
                  setSelectedSubStatus(null);
                }}
                sx={{
                  ...cardStyle,
                  bgcolor: item.color,
                  border:
                    selectedStatus === key
                      ? "1px solid #000"
                      : "2px solid transparent",
                }}
              >
                <Typography variant="h6">{item.label}</Typography>

                <Box textAlign="right">
                  <Typography fontSize="14px">Today / All time</Typography>
                  <Typography fontSize="28px" fontWeight="bold">
                    {item.today}/{item.total}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* RIGHT COLUMN */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            borderRadius: "20px",
            p: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            height: "460px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {STATUS_CONFIG[selectedStatus]?.subDataList?.map((sub, index) => (
            <Box
              key={index}
              onClick={() => setSelectedSubStatus(sub.label)}
              sx={{
                width: "100%",
                 boxSizing: "border-box", 
                bgcolor: STATUS_CONFIG[selectedStatus].color,
                borderRadius: "20px",
                padding: "15px 25px",
                mb: 2,
                cursor: "pointer",
                border:
                  selectedSubStatus === sub.label
                    ? "2px solid #000"
                    : "2px solid transparent",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
                  {sub.label}
                </Typography>

                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Box
                    sx={{
                      bgcolor: sub.chipColor,
                      padding: "15px",
                      borderRadius: "20px",
                      fontWeight: 600,
                    }}
                  >
                    {sub.today}
                  </Box>

                  <Box
                    sx={{
                      bgcolor: sub.chipColor,
                      padding: "15px",
                      borderRadius: "20px",
                      fontWeight: 600,
                    }}
                  >
                    {sub.total}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* BOTTOM SECTION */}
      <ActiveComponent
        data={STATUS_CONFIG[selectedStatus]}
        activeSub={selectedSubStatus}
      />
    </Box>
  );
};

export default ShipmentStatus;
