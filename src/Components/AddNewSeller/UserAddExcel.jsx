import { Box, Button, Typography, Paper } from "@mui/material"
import React from "react"

const UserAddExcel = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        // background: "#DEFFEB"
      }}
    >
      <Typography
        variant="h6"
        mb={1}
        fontWeight={600}
        color="#071B2F"
      >
        Upload Seller Excel
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Upload .xlsx or .xls file to add multiple sellers
      </Typography>

      <Button
        component="label"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          background: "#F8C20A",
          fontWeight: 600,
          "&:hover": {
            background: "#e0ae09"
          }
        }}
      >
        Choose Excel
        <input hidden type="file" accept=".xlsx,.xls" />
      </Button>

      <Box mt={3}>
        <Button
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            background: "#635BFF",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              background: "#5148e5"
            }
          }}
        >
          Submit Excel
        </Button>
      </Box>
    </Paper>
  )
}

export default UserAddExcel
