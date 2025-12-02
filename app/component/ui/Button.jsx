export default function Button({ children, onClick, type = "button", style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 15px",
        background: "#333",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
