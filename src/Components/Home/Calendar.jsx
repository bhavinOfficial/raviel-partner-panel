import React, { useState, useRef } from "react";
import axiosInstance from "../Form/axiosInstance";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* 🔹 helper: get Sunday */
const getSunday = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

/* 🔹 date key (YYYY-MM-DD) */
const formatKey = (date) => date.toISOString().split("T")[0];

const Calendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(getSunday(today));
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 📦 upload status
  const [uploaded, setUploaded] = useState({});

  // 🔴 backend error message
  const [uploadError, setUploadError] = useState("");

  // 🔗 refs
  const dailyRef = useRef(null);
  const weeklyRef = useRef(null);
  const monthlyRef = useRef(null);

  /* ⬅️ ➡️ week move */
  const moveLeft = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() - 7);
    setStartDate(getSunday(d));
  };

  const moveRight = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 7);
    setStartDate(getSunday(d));
  };

  /* 📅 generate week */
  const days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const dateKey = formatKey(date);

    let status = "Upcoming";
    let color = "#e0e0e0";

    if (date < today) {
      if (uploaded[dateKey]) {
        status = "Uploaded";
        color = "#2ecc71";
      } else {
        status = "Missed";
        color = "#ff5b8a";
      }
    }

    if (date.getTime() === today.getTime()) {
      status = uploaded[dateKey] ? "Uploaded" : "Today";
      color = uploaded[dateKey] ? "#2ecc71" : "#f9c30a";
    }

    return {
      date,
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      number: date.getDate(),
      status,
      color,
      dateKey,
    };
  });

  /* 🪟 popup */
  const handleOpen = (day) => {
    setSelectedDate(day);
    setUploadError(""); // clear old error
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
    setUploadError("");
  };

  /* 📤 Backend upload */
  const uploadToBackend = async (file, category, dateKey) => {
    const formData = new FormData();

    formData.append("timeline-data-management-file", file);
    formData.append("timeline-data-tenure", category); // daily | weekly | monthly
    formData.append("date", dateKey);

    return axiosInstance.post(
      "/partner/timeline-data-management",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  /* 📤 Excel upload handler */
  const handleExcelUpload = async (e, category) => {
    const file = e.target.files[0];
    if (!file || !selectedDate) return;

    const dateKey = selectedDate.dateKey;
    const ext = file.name.split(".").pop();

    const renamedFile = new File(
      [file],
      `${category}_${dateKey}.${ext}`,
      { type: file.type }
    );

    try {
      await uploadToBackend(renamedFile, category, dateKey);

      setUploaded((p) => ({ ...p, [dateKey]: true }));
      handleClose(); // ✅ success
    } catch (err) {
      // 🔴 ONLY backend payload message
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Upload failed";

      setUploadError(message); // popup bottom ma show
    } finally {
      e.target.value = ""; // reset input
    }
  };

  return (
    <Box>
      {/* CALENDAR */}
      <Box
        sx={{
          p: 3,
          borderRadius: "20px",
          bgcolor: "#fff",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography fontWeight={700} fontSize={20}>
              {startDate.toLocaleString("default", { month: "long" })}
            </Typography>
            <Typography color="#555">{startDate.getFullYear()}</Typography>
          </Box>

          <Box>
            <IconButton onClick={moveLeft}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={moveRight}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* TIMELINE */}
        <Box sx={{ display: "flex", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "52%",
              left: 0,
              right: 0,
              height: 2,
              bgcolor: "#ddd",
            }}
          />

          {days.map((item) => (
            <Box
              key={item.dateKey}
              sx={{ flex: 1, textAlign: "center", zIndex: 1 }}
            >
              <Typography fontSize={12} fontWeight={600}>
                {item.day}
              </Typography>

              <Box
                onClick={() => handleOpen(item)}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: item.color,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
                }}
              >
                {item.number}
              </Box>

              <Typography fontSize={12} mt={1}>
                {item.status}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* POPUP */}
<Dialog
  open={open}
  onClose={handleClose}
  maxWidth="md"
  fullWidth
  PaperProps={{ sx: { borderRadius: "22px" } }}
>
  {selectedDate && (
    <DialogContent
      sx={{
        p: 4,
        position: "relative", // 🔑 important for absolute close btn
      }}
    >
      {/* ❌ CLOSE ICON (RIGHT TOP) */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 40,
          height: 40,
          bgcolor: "#ff3b3b",
          color: "#fff",
          fontSize: 20,
          "&:hover": {
            bgcolor: "#e60000",
          },
        }}
      >
        ✕
      </IconButton>

      {/* 🔒 HIDDEN FILE INPUTS */}
      <input
        type="file"
        hidden
        accept=".xls,.xlsx"
        ref={dailyRef}
        onChange={(e) => handleExcelUpload(e, "daily")}
      />
      <input
        type="file"
        hidden
        accept=".xls,.xlsx"
        ref={weeklyRef}
        onChange={(e) => handleExcelUpload(e, "weekly")}
      />
      <input
        type="file"
        hidden
        accept=".xls,.xlsx"
        ref={monthlyRef}
        onChange={(e) => handleExcelUpload(e, "monthly")}
      />

      <Typography fontSize={20} fontWeight={700} mb={3}>
        {selectedDate.number}{" "}
        {selectedDate.date.toLocaleString("default", { month: "long" })}{" "}
        {selectedDate.date.getFullYear()}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          onClick={() => dailyRef.current?.click()}
          sx={{ bgcolor: "#A7BBFF", color: "black", px: 3, borderRadius: "20px" }}
        >
          Daily Excel
        </Button>

        <Button
          onClick={() => weeklyRef.current?.click()}
          sx={{ bgcolor: "#A7BBFF", color: "black", px: 3, borderRadius: "20px" }}
        >
          Weekly Excel
        </Button>

        <Button
          onClick={() => monthlyRef.current?.click()}
          sx={{ bgcolor: "#A7BBFF", color: "black", px: 3, borderRadius: "20px" }}
        >
          Monthly Excel
        </Button>
      </Box>

      {/* 🔴 BACKEND ERROR MESSAGE (BOTTOM) */}
      {uploadError && (
        <Typography
          sx={{
            mt: 3,
            color: "red",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {uploadError}
        </Typography>
      )}
    </DialogContent>
  )}
</Dialog>

    </Box>
  );
};

export default Calendar;
