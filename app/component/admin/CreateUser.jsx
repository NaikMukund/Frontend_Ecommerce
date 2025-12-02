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
import { useState } from "react";

export default function CreateUserModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New User</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <TextField
          select
          label="Role"
          fullWidth
          margin="normal"
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
}
