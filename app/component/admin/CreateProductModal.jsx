"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function CreateProductModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Product</DialogTitle>

      <DialogContent>
        <TextField
          label="Product Title"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <TextField
          label="Category"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("category", e.target.value)}
        />

        <TextField
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("stock", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}
