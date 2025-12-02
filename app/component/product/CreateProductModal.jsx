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

  const change = (k, v) => setForm({ ...form, [k]: v });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Product</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          onChange={(e) => change("title", e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => change("price", e.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          onChange={(e) => change("category", e.target.value)}
        />
        <TextField
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => change("stock", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={() => onSave(form)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
