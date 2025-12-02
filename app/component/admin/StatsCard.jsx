import "./adminComponents.css";

export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <h4 className="stats-card-title">{title}</h4>
      <p className="stats-card-value">{value}</p>
    </div>
  );
}
