export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
     background: "#362424",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <p>© {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
    </footer>
  );
}
