import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-section">
          <h2>SkillForge</h2>
          <p>AI-powered platform to analyze skills, CVs, and improve your career path.</p>
          <p>Try AI Interview !</p>
        </div>

        <div className="footer-section">
          <h3>Pages</h3>
          <Link to="/home">Home</Link>
          <Link to="/cv">Upload CV</Link>
          <Link to="/ai">Interview</Link>
           <Link to="/anlysis">Anlysis</Link>
          <Link to="/plans">Plans</Link>
        </div>

       <div className="footer-section">
  <h3>Contact</h3>

  

 <a 
  href="https://github.com/ahmadessawii06/skillforge" 
  target="_blank" 
  rel="noreferrer"
>
  <i className="fab fa-github fs-5 align-middle me-2"></i>
  GitHub
</a>
   <Link to="/pinkteam">
    Our Team
  </Link>
</div>


 
      </div>

      {/* 👇 حقوق */}
      <div className="footer-bottom">
        © 2026 SkillForge. All rights reserved.
      </div>

    </footer>
  );
}