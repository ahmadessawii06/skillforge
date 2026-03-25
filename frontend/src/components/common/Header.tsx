import { Link, NavLink } from "react-router-dom";
import './Header.css';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#496e97e3" }}>
            <div className="container-fluid">
                <span className="material-symbols-outlined " style={{fontSize:"1.75rem"}}>psychology</span>
                <Link className="navbar-brand fw-bold ms-2" to="/">SkillForge</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav nav-custom">
                         <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>
                              <li className="nav-item">
                            <NavLink className="nav-link" to="/cv">CV</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ai">Ai</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/anlysis">Anlysis</NavLink>
                        </li>
                  
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/plans">Plans</NavLink>
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