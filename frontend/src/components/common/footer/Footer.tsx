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
          <Link to="/interview">
  <button className="footer-btn">
    START NEW INTERVIEW
  </button>
</Link>
        </div>


        <div className="footer-section">
          <h3>Menu</h3>
          <Link to="/home">Home</Link>
          <Link to="/cv">Upload CV</Link>
          <Link to="/interview">Interview</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/plans">Plans</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>



          <a
            href="https://github.com/ahmadessawii06/skillforge"
            target="_blank"
            rel="noreferrer"
          >
          
            GitHub
             <i className="fab fa-github fs-5 align-middle me-2"></i>
          </a>
          <Link to="/team">
            Our Team
          </Link>
        </div>
<div className="footer-section">

  <h3>Social</h3>

  <div className="footer-socials">

    <a href="#">
      <i className="fab fa-facebook-f"></i>
    </a>

    <a href="#">
      <i className="fab fa-twitter"></i>
    </a>

    <a href="#">
      <i className="fab fa-linkedin-in"></i>
    </a>

   

    

  </div>

</div>


      </div>

      {/* 👇 حقوق */}
      <div className="footer-bottom">
        © 2026 SkillForge. All rights reserved.
      </div>

    </footer>
  );
}