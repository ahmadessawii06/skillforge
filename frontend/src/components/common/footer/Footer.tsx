import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-section">
          <h2>SkillForge</h2>
          <p>Practice realistic AI interviews, improve your communication, and prepare with confidence.</p>
         
          <Link to="/interview">
            <button className="footer-btn">
             Start practicing
            </button>
          </Link>
        </div>


        <div className="footer-section">
          <h3>Product</h3>
          <Link to="/home">Home</Link>
          <Link to="/cv">Upload CV</Link>
          <Link to="/interview">Interview</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/plans">Plans</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>



          <Link to="/team">
            Our Team
          </Link>
          <a href="">support@skillforge.ai</a>
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

            <a href="">


              <i className="fab fa-instagram"></i>


            </a>

          
          <a
            href="https://github.com/ahmadessawii06/skillforge"
            target="_blank"
            rel="noreferrer"
          >

            
            <i className="fab fa-github "></i>
          </a>




          </div>

        </div>


      </div>

      <div className="footer-bottom">
        © 2026 SkillForge. All rights reserved.
      </div>

    </footer>
  );
}