export default function CartItem({ item }) {
  return (
    <div
      style={{
        borderBottom: "1px solid #ddd",
        padding: "15px 0",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3>{item.title}</h3>
        <p>Qty: {item.quantity}</p>
      </div>

      <strong>₹{item.price * item.quantity}</strong>
    </div>
  );
}
