export default function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      {label && <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
