"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function UpdateProductModal({ open, onClose, product, onSave }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        price: product.price,
        category: product.category,
        stock: product.stock,
      });
    }
  }, [product]);

  const change = (k, v) => setForm({ ...form, [k]: v });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Product</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={(e) => change("title", e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={form.price}
          onChange={(e) => change("price", e.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={form.category}
          onChange={(e) => change("category", e.target.value)}
        />
        <TextField
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
          value={form.stock}
          onChange={(e) => change("stock", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={() => onSave(form)}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
