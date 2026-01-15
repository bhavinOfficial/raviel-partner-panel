import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../Form/axiosInstance";

const CATEGORY_OPTIONS = [
  "electronics",
  "clothing",
  "furniture",
  "grocery",
  "beauty",
];

const UseAddForm = () => {
  const [form, setForm] = useState({
    sellerId: "",
    sellerName: "",
    brandName: "",
    launchingDate: "",
    listingDate: "",
    sellerEmailId: "",
    phoneNumber: "",
    password: "",
    gstNumber: "",
    productCategories: [],
    brandApproval: "pending",
    trademarkClass: "pending",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.sellerId) newErrors.sellerId = "Required";
    if (!form.sellerName) newErrors.sellerName = "Required";
    if (!form.brandName) newErrors.brandName = "Required";

    if (!/^[0-9]{10}$/.test(form.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10 digit number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.sellerEmailId))
      newErrors.sellerEmailId = "Enter valid email";

    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    if (!form.gstNumber)
      newErrors.gstNumber = "GST is required";

    if (form.productCategories.length === 0)
      newErrors.productCategories = "Select at least one category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axiosInstance.post("/partner/add-seller", form);
      setSuccess(true);

      setForm({
        sellerId: "",
        sellerName: "",
        brandName: "",
        launchingDate: "",
        listingDate: "",
        sellerEmailId: "",
        phoneNumber: "",
        password: "",
        gstNumber: "",
        productCategories: [],
        brandApproval: "pending",
        trademarkClass: "pending",
      });
    } catch (err) {
      alert("❌ Failed to add seller");
      console.log(err);

    }
  };

  const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#DADAFF",
    },
    "&:hover fieldset": {
      borderColor: "#635BFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#635BFF",
      borderWidth: "1.5px",
    },
  },
};


  return (
    <>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
        gap={2}
      >
        <TextField
          label="Seller ID"
          name="sellerId"
          value={form.sellerId}
          onChange={handleChange}
          error={!!errors.sellerId}
          helperText={errors.sellerId}
          sx={inputStyle}
        />

        <TextField
          label="Seller Name"
          name="sellerName"
          value={form.sellerName}
          onChange={handleChange}
          error={!!errors.sellerName}
          helperText={errors.sellerName}
          sx={inputStyle}
        />

        <TextField
          label="Brand Name"
          name="brandName"
          value={form.brandName}
          onChange={handleChange}
          error={!!errors.brandName}
          helperText={errors.brandName}
          sx={inputStyle}
        />

        <TextField
          label="Seller Email"
          name="sellerEmailId"
          value={form.sellerEmailId}
          onChange={handleChange}
          error={!!errors.sellerEmailId}
          helperText={errors.sellerEmailId}
          sx={inputStyle}
        />

        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          sx={inputStyle}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={inputStyle}
        />

        <TextField
          label="GST Number"
          name="gstNumber"
          value={form.gstNumber}
          onChange={handleChange}
          error={!!errors.gstNumber}
          helperText={errors.gstNumber}
          sx={inputStyle}
        />

        <TextField
          label="Launching Date"
          type="date"
          name="launchingDate"
          InputLabelProps={{ shrink: true }}
          value={form.launchingDate}
          onChange={handleChange}
          sx={inputStyle}
        />

        <TextField
          label="Listing Date"
          type="date"
          name="listingDate"
          InputLabelProps={{ shrink: true }}
          value={form.listingDate}
          onChange={handleChange}
          sx={inputStyle}
        />
      </Box>

      {/* 🔥 MULTI SELECT */}
<FormControl
  fullWidth
  sx={{
    mt: 3,
  }}
>
  <InputLabel
    sx={{
      color: "#071B2F",
      fontWeight: 500,
    }}
  >
    Product Categories
  </InputLabel>

  <Select
    multiple
    name="productCategories"
    value={form.productCategories}
    onChange={handleChange}
    input={<OutlinedInput label="Product Categories" />}
    MenuProps={{
      PaperProps: {
        sx: {
          borderRadius: "14px",
          mt: 1,
          boxShadow: "0 12px 30px rgba(7,27,47,0.15)",
        },
      },
    }}
    sx={{
      borderRadius: "14px",
      // background: "#FDF5D9",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DADAFF",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#635BFF",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#635BFF",
        borderWidth: "1.5px",
      },
    }}
    renderValue={(selected) => (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {selected.map((value) => (
          <Chip
            key={value}
            label={value}
            sx={{
              background: "linear-gradient(135deg, #635BFF, #FF6692)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          />
        ))}
      </Box>
    )}
  >
    {CATEGORY_OPTIONS.map((cat) => (
      <MenuItem
        key={cat}
        value={cat}
        sx={{
          borderRadius: "8px",
          mx: 1,
          my: 0.5,
          "&:hover": {
            background: "#DADAFF",
          },
          "&.Mui-selected": {
            background: "#DEFFEB !important",
            fontWeight: 600,
          },
        }}
      >
        {cat}
      </MenuItem>
    ))}
  </Select>

  {errors.productCategories && (
    <Typography fontSize={12} color="error" mt={0.5}>
      {errors.productCategories}
    </Typography>
  )}
</FormControl>


      {/* 🚀 SUBMIT BUTTON */}
      <Button
        fullWidth
        sx={{
          mt: 4,
          py: 1.4,
          fontWeight: 600,
          borderRadius: "12px",
          background: "#36C76C",
          color: "#fff",
          "&:hover": {
            background: "#289951",
          },
        }}
        onClick={handleSubmit}
      >
        Add Seller
      </Button>

      <Snackbar open={success} autoHideDuration={2000}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ background: "#36C76C" }}
        >
          🎉 Seller added successfully!
        </Alert>
      </Snackbar>
    </>

  );
};

export default UseAddForm;
