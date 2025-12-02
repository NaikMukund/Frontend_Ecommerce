"use client";

import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
export default function UsersTable({ users, onUpdate, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u, index) => (
            <TableRow key={u._id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>

              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => onUpdate(u._id)}
                >
                  Update
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDelete(u._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
