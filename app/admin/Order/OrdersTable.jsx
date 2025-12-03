"use client";

import "./table.css";

export default function OrdersTable({ orders, onUpdate, onDelete }) {
  return (
    <div className="orders-table-wrapper">
      <table className="orders-table">
        <thead>
          <tr className="orders-header-row">
            <th className="orders-header">#</th>
            <th className="orders-header">Order ID</th>
            <th className="orders-header">User</th>
            <th className="orders-header">Email</th>
            <th className="orders-header">Amount</th>
            <th className="orders-header">Items</th>
            <th className="orders-header">Payment Method</th>
            <th className="orders-header">Payment Status</th>
            <th className="orders-header">Payment ID</th>
            <th className="orders-header">Order Status</th>
            <th className="orders-header">City</th>
            <th className="orders-header">Pincode</th>
            <th className="orders-header">Date</th>
            <th className="orders-header">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td className="orders-empty" colSpan="14">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr className="orders-row" key={order._id}>
                <td className="orders-cell">{index + 1}</td>
                <td className="orders-cell">{order._id}</td>

                <td className="orders-cell">{order.user?.name || "Unknown"}</td>
                <td className="orders-cell">{order.user?.email || "-"}</td>

                <td className="orders-cell">₹{order.totalAmount}</td>
                <td className="orders-cell">{order.items?.length || 0}</td>

                <td className="orders-cell">
                  {order.payment?.method || "-"}
                </td>

                <td className="orders-cell">
                  <span
                    className={`orders-badge orders-badge--${order.payment?.status}`}
                  >
                    {order.payment?.status}
                  </span>
                </td>

                <td className="orders-cell">
                  {order.payment?.paymentId || "-"}
                </td>

                <td className="orders-cell">
                  <span
                    className={`orders-badge orders-badge--${order.status}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="orders-cell">{order.address?.city || "-"}</td>
                <td className="orders-cell">{order.address?.pincode || "-"}</td>

                <td className="orders-cell">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </td>

                <td className="orders-cell">
                  <button
                    className="orders-action-btn"
                    onClick={() => onUpdate(order._id)}
                  >
                    Update
                  </button>

                  {onDelete && (
                    <button
                      className="orders-action-btn orders-action-btn--danger"
                      onClick={() => onDelete(order._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
