import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './css.css';

const HeroSection = () => {
  const fullName = localStorage.getItem("fullName") || "User";
  return (
    <section 
      className="position-relative rounded-4 p-4 p-md-5 border text-dark overflow-hidden d-flex align-items-center" 
      style={{ 
        borderColor: '#e5e7eb',
        marginTop: '70px',
        backgroundColor: '#ffffff',
        minHeight: '600px'
      }}
    >
      
      {/* Content */}
      <div className="position-relative z-index-1" style={{ maxWidth: '45rem' }}>
    <h1 
  className="fw-bold mb-3"
  style={{ 
    fontFamily: 'Pacifico, cursive',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    lineHeight: '1.2',
    color: '#1a1a2e'
  }}
>
  <span
    style={{
      fontFamily: 'Pacifico, cursive',
      color: '#0a0a0b',
      fontWeight: 'normal',
       fontSize: 'clamp(3rem, 6vw, 5rem)'
    }}
  >
    Welcome {fullName.split(" ")[0]},
  </span>

  <br />

  Ready to practice?
</h1>
        <p 
          className="mb-4"
          style={{ 
           fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            color: '#6b7280',
            fontWeight: '200',
            lineHeight: '1.6',
            marginTop: '65px',
fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Sharpen your skills with our AI-powered mock interviews and get real-time feedback on your technical and behavioral performance.
        </p>

        <div className="d-flex flex-wrap gap-2 gap-md-3">
          <Link to="/cv" style={{ textDecoration: 'none' }}>
            <button
  className="btn"
  style={{
    backgroundColor: "#2563eb",
    color: "white",

    borderRadius: "30px",
    padding: "15px 40px",
marginLeft: '50px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: "16px",

    letterSpacing: "1.5px",

    border: "2px solid #2563eb",

    textTransform: "none",

    transition: "all 0.3s ease",

    boxShadow: "0 6px 20px rgba(37, 99, 235, 0.25)"
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#2563eb";
    e.currentTarget.style.border = "2px solid #2563eb";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#2563eb";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.border = "2px solid #2563eb";
  }}
>
  START NEW INTERVIEW
</button>
          </Link>
        </div>
      </div>

      
      <div 
        className="circle-wrapper position-absolute end-0 d-none d-md-block"
        style={{ 
          width: '45%', 
          height: '80%', 
          pointerEvents: 'none',
          right: '-5%',
          top: '90px'
        }}
      >
        <svg className="w-100 h-100" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(100 100)">
            <path 
              className="pulse-circle"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.5,81.4,29,73.1,42.1C64.8,55.1,53.8,66.8,40.5,74.1C27.2,81.3,13.6,84.1,-0.5,85C-14.6,85.9,-29.2,84.8,-42.8,78.2C-56.4,71.6,-69,59.4,-77.4,45.3C-85.9,31.2,-90.1,15.6,-89.4,0.4C-88.7,-14.8,-83.1,-29.6,-74.3,-43.1C-65.4,-56.6,-53.4,-68.8,-39.7,-76.3C-26,-83.8,-13,-86.6,0.3,-87.1C13.6,-87.6,27.2,-85.8,44.7,-76.4Z" 
              fill="#dbeafe"
            />
          </g>
        </svg>

        <div className="circle-text">
          SkillForge
        </div>
      </div>
    </section>
  );
};

export default HeroSection;