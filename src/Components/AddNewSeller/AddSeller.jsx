import {
  Box,
  Button,
  Typography,
  Paper
} from "@mui/material"
import React, { useState } from "react"
import UserAddExcel from "./UserAddExcel"
import UseAddForm from "./UseAddForm"

const AddSeller = () => {
  const [mode, setMode] = useState(null)

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        width:"100%"
      }}
    >
      {/* ================= Card ================= */}
      <Paper
        elevation={0}                                                   
        sx={{
          maxWidth: "100%",
          mx: "auto",
          p: 4,
          borderRadius: 4,
          background: "#ffffff",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          fontWeight={600}
          color="#071B2F"
        >
          Add Seller
        </Typography>

        {/* ================= Toggle Buttons ================= */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4
          }}
        >
          <Button
            fullWidth
            onClick={() => setMode("excel")}
            sx={{
              py: 1.5,
              borderRadius: 2,
              background: mode === "excel" ? "#635BFF" : "#DADAFF",
              color: mode === "excel" ? "#fff" : "#071B2F",
              fontWeight: 600,
              "&:hover": {
                background: "#635BFF",
                color: "#fff"
              }
            }}
          >
            Upload Excel
          </Button>

          <Button
            fullWidth
            onClick={() => setMode("form")}
            sx={{
              py: 1.5,
              borderRadius: 2,
              background: mode === "form" ? "#FF6692" : "#FFCCDB",
              color: mode === "form" ? "#fff" : "#071B2F",
              fontWeight: 600,
              "&:hover": {
                background: "#FF6692",
                color: "#fff"
              }
            }}
          >
            Fill Form
          </Button>
        </Box>

        {/* ================= Dynamic Content ================= */}
        <Box>
          {mode === "excel" && <UserAddExcel />}
          {mode === "form" && <UseAddForm />}

          {!mode && (
            <Typography
              textAlign="center"
              color="text.secondary"
              mt={8}
            >
              Select how you want to add sellers
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default AddSeller
