import "./index.css";

export default function Header({title}) {
  return (
    <div className="header-container">
      <h1 className="header-title">{title}</h1>

      <div className="header-profile-box">
        <span className="header-profile-name">Mukund</span>
        <div className="header-profile-circle">M</div>
      </div>
    </div>
  );
}
