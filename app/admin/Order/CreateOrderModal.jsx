"use client";

import { useState } from "react";

export default function CreateOrderModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    user: "",
    items: [
      { product: "", qty: 1, price: 0 }
    ],
    address: {
      name: "",
      phone: "",
      city: "",
      pincode: ""
    },
    payment: {
      method: "cod",
      status: "pending",
      paymentId: ""
    },
    status: "placed"
  });

  if (!open) return null;

  // handle simple changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle address
  const handleAddressChange = (e) => {
    setForm({
      ...form,
      address: { ...form.address, [e.target.name]: e.target.value }
    });
  };

  // handle payment
  const handlePaymentChange = (e) => {
    setForm({
      ...form,
      payment: { ...form.payment, [e.target.name]: e.target.value }
    });
  };

  // handle item change
  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { product: "", qty: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const updated = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updated });
  };

  const handleSubmit = () => {
    if (!form.user || form.items.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Order</h2>

        {/* USER */}
        <div className="form-group">
          <label>User ID *</label>
          <input
            name="user"
            value={form.user}
            onChange={handleChange}
            className="input"
            placeholder="Enter User ID"
          />
        </div>

        {/* ORDER ITEMS */}
        <h3>Items</h3>
        {form.items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              placeholder="Product ID"
              value={item.product}
              onChange={(e) =>
                handleItemChange(index, "product", e.target.value)
              }
              className="input"
            />
            <input
              placeholder="Qty"
              type="number"
              value={item.qty}
              onChange={(e) =>
                handleItemChange(index, "qty", e.target.value)
              }
              className="input"
            />
            <input
              placeholder="Price"
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", e.target.value)
              }
              className="input"
            />

            {form.items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="btn cancel"
              >
                X
              </button>
            )}
          </div>
        ))}

        <button className="btn save" onClick={addItem}>
          + Add Item
        </button>

        {/* ADDRESS */}
        <h3>Address</h3>
        <div className="form-group">
          <input
            name="name"
            placeholder="Name"
            value={form.address.name}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            name="phone"
            placeholder="Phone"
            value={form.address.phone}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            name="city"
            placeholder="City"
            value={form.address.city}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.address.pincode}
            onChange={handleAddressChange}
            className="input"
          />
        </div>

        {/* PAYMENT */}
        <h3>Payment</h3>
        <div className="form-group">
          <label>Payment Method</label>
          <select
            name="method"
            value={form.payment.method}
            onChange={handlePaymentChange}
            className="input"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>

        <div className="form-group">
          <label>Payment Status</label>
          <select
            name="status"
            value={form.payment.status}
            onChange={handlePaymentChange}
            className="input"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="form-group">
          <input
            name="paymentId"
            placeholder="Payment ID (optional)"
            value={form.payment.paymentId}
            onChange={handlePaymentChange}
            className="input"
          />
        </div>

        {/* STATUS */}
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Close
          </button>
          <button className="btn save" onClick={handleSubmit}>
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
