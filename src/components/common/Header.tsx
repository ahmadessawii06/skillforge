import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">SkillForge</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                        
                            <Link to="/ai" className="nav-link">Ai</Link>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cv">CV</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/plans">Plans</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/anlysis">Anlysis</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pinkteam">Pink's Team</NavLink>
                        </li>

                  

                    </ul>
                </div>
            </div>
        </nav>
    );
}