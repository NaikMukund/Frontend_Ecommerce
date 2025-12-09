"use client";

import { useState } from "react";

export default function CreateProductModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  if (!open) return null;

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
  };

  const handleSubmit = () => {
    if (!form.title || !form.price) {
      alert("Please fill required fields");
      return;
    }

    // send formData to parent
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Product</h2>

        <div className="form-group">
          <label>Title *</label>
          <input
            className="input"
            name="title"
            onChange={handleChange}
            value={form.title}
          />
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            className="input"
            name="price"
            onChange={handleChange}
            value={form.price}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            className="input"
            name="category"
            onChange={handleChange}
            value={form.category}
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            className="input"
            name="stock"
            onChange={handleChange}
            value={form.stock}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Preview */}
        {form.images.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {form.images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                width={60}
                height={60}
                style={{ borderRadius: "6px" }}
              />
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Close
          </button>
          <button className="btn save" onClick={handleSubmit}>
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
