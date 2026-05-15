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

        <span >

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="34"
  height="34"
  viewBox="0 0 24 24"
  fill="none"
  stroke="blue"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-sparkles-icon lucide-sparkles"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
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
          className="get-started-btn"
          onClick={scrollToTop}
        >
        Start Free
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