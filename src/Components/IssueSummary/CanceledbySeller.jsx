import React, { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Container,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const rows = [
  {
    seller: "XZc058",
    date: "12-12-2025",
    order: "17655219643821301052J",
    ship: "17655219643821301052J",
    value: 850,
    mail: "error",
  },
  {
    seller: "XKHY08",
    date: "12-12-2025",
    order: "17655219643821301052J",
    ship: "17655219643821301052J",
    value: 850,
    mail: "success",
  },
  {
    seller: "KHU005",
    date: "12-12-2025",
    order: "17655219643821301052J",
    ship: "17655219643821301052J",
    value: 850,
    mail: "error",
  },
]

const CanceledbySeller = () => {
  const [sellerSearch, setSellerSearch] = useState("")
  const [shipmentSearch, setShipmentSearch] = useState("")

  const filteredRows = rows.filter((row) => {
    const sellerMatch = row.seller
      .toLowerCase()
      .includes(sellerSearch.toLowerCase())

    const shipmentMatch = row.ship
      .toLowerCase()
      .includes(shipmentSearch.toLowerCase())

    return sellerMatch && shipmentMatch
  })

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px", py: 4 }}>
      <Box sx={{ p: 3, minHeight: "100vh" }}>
                  <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600}>
              Canceled by Seller Order Details
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search by Seller Id"
                value={sellerSearch}
                onChange={(e) => setSellerSearch(e.target.value)}
              />
              <TextField
                size="small"
                placeholder="Search by Shipment ID"
                value={shipmentSearch}
                onChange={(e) => setShipmentSearch(e.target.value)}
              />
            </Box>
          </Box>
        <Paper
          elevation={0}
          sx={{
            // p: 3,
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          {/* 🔹 Header */}


          {/* 🔹 Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#dcdcff",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "none",
                      borderBottomRightRadius: "none",
                    }}
                  />
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Seller ID</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Date</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Order ID</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Shipment ID</b>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#dcdcff" }}>
                    <b>Value</b>
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#dcdcff",
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                    }}
                  >
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell width={40}>
                        <IconButton size="small">
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell>{row.seller}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.order}</TableCell>
                      <TableCell
                        sx={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {row.ship}
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>
                        <Chip
                          label="Mail"
                          sx={{
                            bgcolor:
                              row.mail === "success"
                                ? "#3cff9a"
                                : "#ff6b8a",
                            color: "#000",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  )
}

export default CanceledbySeller
