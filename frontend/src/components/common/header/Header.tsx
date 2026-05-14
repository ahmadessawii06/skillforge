import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

  const fullName = localStorage.getItem("fullName") || "User";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (

    <div className="menu">

      {/* LOGO */}

      <div className="logo">

        <span className="material-symbols-outlined">
          psychology
        </span>

        <Link
          to="/home"
          className="logo-text"
          onClick={scrollToTop}
        >
          SkillForge
        </Link>

      </div>

      {/* LINKS */}

      <div className="menu-links">

        <NavLink
          to="/home"
          onClick={scrollToTop}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/cv"
          onClick={scrollToTop}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Upload CV
        </NavLink>

        <NavLink
          to="/interview"
          onClick={scrollToTop}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Interview
        </NavLink>

        <NavLink
          to="/analysis"
          onClick={scrollToTop}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Analysis
        </NavLink>

        <NavLink
          to="/plans"
          onClick={scrollToTop}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Plans
        </NavLink>

        <NavLink
          to="/team"
          onClick={scrollToTop}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Team
        </NavLink>

      </div>

      {/* RIGHT SIDE */}

      <div className="right-section">

        {/* PROFILE AVATAR */}

     
        {/* LOGOUT */}

       


     <Link
          to="/cv"
          className="logout"
          onClick={scrollToTop}
        >
          Get Started
        </Link>


         <Link
          to="/"
          className="logout"
          onClick={scrollToTop}
        >
          Log out
        </Link>
           <Link
          to="/profile"
          className="profile-avatar"
          onClick={scrollToTop}
        >
          {fullName.charAt(0).toUpperCase()}
        </Link>

      </div>

    </div>

  );
}