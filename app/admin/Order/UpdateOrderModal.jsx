"use client";

import { useState, useEffect } from "react";

export default function UpdateOrderModal({ open, onClose, order, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (order) {
      setForm({
        status: order.status,
        payment: {
          method: order.payment?.method || "cod",
          status: order.payment?.status || "pending",
          paymentId: order.payment?.paymentId || ""
        },
        address: {
          name: order.address?.name || "",
          phone: order.address?.phone || "",
          city: order.address?.city || "",
          pincode: order.address?.pincode || ""
        },
        items: order.items || []
      });
    }
  }, [order]);

  if (!open || !form) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setForm({
      ...form,
      payment: { ...form.payment, [e.target.name]: e.target.value }
    });
  };

  const handleAddressChange = (e) => {
    setForm({
      ...form,
      address: { ...form.address, [e.target.name]: e.target.value }
    });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;
    setForm({ ...form, items: updated });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Update Order</h2>

        {/* STATUS */}
        <div className="form-group">
          <label>Order Status</label>
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

        {/* PAYMENT */}
        <h3>Payment Details</h3>

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
            placeholder="Payment ID"
            value={form.payment.paymentId}
            onChange={handlePaymentChange}
            className="input"
          />
        </div>

        {/* ADDRESS */}
        <h3>Address</h3>

        <input
          className="input"
          name="name"
          placeholder="Name"
          value={form.address.name}
          onChange={handleAddressChange}
        />

        <input
          className="input"
          name="phone"
          placeholder="Phone"
          value={form.address.phone}
          onChange={handleAddressChange}
        />

        <input
          className="input"
          name="city"
          placeholder="City"
          value={form.address.city}
          onChange={handleAddressChange}
        />

        <input
          className="input"
          name="pincode"
          placeholder="Pincode"
          value={form.address.pincode}
          onChange={handleAddressChange}
        />

        {/* ITEMS */}
        <h3>Items</h3>

        {form.items.map((item, index) => (
          <div key={index} className="item-row">
            <div>Product: {item.product}</div>

            <input
              type="number"
              className="input"
              value={item.qty}
              onChange={(e) => handleItemChange(index, "qty", e.target.value)}
              placeholder="Qty"
            />

            <input
              type="number"
              className="input"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              placeholder="Price"
            />
          </div>
        ))}

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Close
          </button>
          <button className="btn save" onClick={handleSubmit}>
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
}
