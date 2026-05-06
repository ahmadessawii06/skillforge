import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="menu">

  <div className="logo">
    <span className="material-symbols-outlined">psychology</span>
    <Link to="" className="logo-text">SkillForge</Link>     
  </div>

  <div className="menu-links">
    <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
      Home
    </NavLink>

    <NavLink to="/cv" className={({ isActive }) => isActive ? "active" : ""}>
      Upload CV
    </NavLink>

    <NavLink to="/interview" className={({ isActive }) => isActive ? "active" : ""}>
      Interview
    </NavLink>

    <NavLink to="/analysis" className={({ isActive }) => isActive ? "active" : ""}>
      Analysis
    </NavLink>

    <NavLink to="/plans" className={({ isActive }) => isActive ? "active" : ""}>
      Plans
    </NavLink>

    <NavLink to="/team" className={({ isActive }) => isActive ? "active" : ""}>
      Team
    </NavLink>
  </div>

  <Link to="/" className="logout">Log out</Link>



</div>
  );
}