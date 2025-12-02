"use client";

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

export default function ProductsTable({ products, onUpdate, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p, index) => (
              <TableRow key={p._id || p.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{p.title || p.name}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.category}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => onUpdate(p._id || p.id)}
                  >
                    Update
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(p._id || p.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ padding: 2 }}>
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
