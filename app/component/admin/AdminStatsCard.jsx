export default function AdminStatsCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
