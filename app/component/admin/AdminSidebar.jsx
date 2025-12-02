export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#111",
        color: "white",
        padding: "20px",
        height: "100vh",
      }}
    >
      <h2>Admin Panel</h2>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        <li><a href="/admin/dashboard" style={{ color: "#ddd" }}>Dashboard</a></li>
        <li><a href="/admin/products" style={{ color: "#ddd" }}>Products</a></li>
        <li><a href="/admin/users" style={{ color: "#ddd" }}>Users</a></li>
        <li><a href="/admin/orders" style={{ color: "#ddd" }}>Orders</a></li>
        <li><a href="/admin/categories" style={{ color: "#ddd" }}>Categories</a></li>
      </ul>
    </div>
  );
}
