import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="menu">

  {/* 👇 اللوجو */}
  <div className="logo">
    <span className="material-symbols-outlined">psychology</span>
    <Link to="/" className="logo-text">SkillForge</Link>
  </div>

  {/* 👇 اللينكات بالنص */}
  <div className="menu-links">
    <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
      <span>Home</span>
    </NavLink>

    <NavLink to="/cv" className={({ isActive }) => isActive ? "active" : ""}>
      <span>Upload CV</span>
    </NavLink>

    <NavLink to="/ai" className={({ isActive }) => isActive ? "active" : ""}>
      <span>Interview</span>
    </NavLink>

    <NavLink to="/anlysis" className={({ isActive }) => isActive ? "active" : ""}>
      <span>Analysis</span>
    </NavLink>

    <NavLink to="/plans" className={({ isActive }) => isActive ? "active" : ""}>
      <span>Plans</span>
    </NavLink>

    <NavLink to="/pinkteam" className={({ isActive }) => isActive ? "active" : ""}>
      <span>Team</span>
    </NavLink>
  </div>

</div>
  );
}