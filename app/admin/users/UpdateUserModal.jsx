"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function UpdateUserModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "customer",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update User</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <TextField
          select
          label="Role"
          margin="normal"
          fullWidth
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
        </TextField>
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
