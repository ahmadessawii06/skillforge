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
      <div className="position-relative z-index-1" style={{ maxWidth: "42rem" }}>
        <h1
          className="fw-bold mb-3"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: "1.08",
            color: "#0a0a0b",
            letterSpacing: "-2px",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#2563eb",
              fontWeight: 600,
              marginBottom: "14px",
              letterSpacing: "0",
            }}
          >
            Welcome {fullName.split(" ")[0]},
          </span>

          Ace Your <span style={{ color: "#2563eb" }}>Interviews</span> with AI
        </h1>

        <p
          className="mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            color: "#6b7280",
            fontWeight: 400,
            lineHeight: "1.7",
            marginTop: "22px",
            maxWidth: "36rem",
          }}
        >
        Upload your CV, simulate realistic interviews, and receive instant AI-powered feedback on confidence, communication, and technical performance.
        </p>

        <div className="d-flex flex-wrap gap-2 gap-md-3 mt-4">
          <Link to="/cv" style={{ textDecoration: "none" }}>
            <button
              className="btn"
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "15px 38px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                letterSpacing: "0.2px",
                border: "2px solid #2563eb",
                textTransform: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2563eb";
                e.currentTarget.style.border = "2px solid #2563eb";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 30px rgba(37, 99, 235, 0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "2px solid #2563eb";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(37, 99, 235, 0.25)";
              }}
            >
              Try Free Interview
            </button>
          </Link>
          <Link to="https://youtu.be/HAwSciaIkLs" target="_blank" style={{ textDecoration: "none" }}>
            <button
              className="btn"
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "15px 38px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                letterSpacing: "0.2px",
                border: "2px solid #2563eb",
                textTransform: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 24px rgba(37, 99, 235, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "2px solid #2563eb";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 30px rgba(37, 99, 235, 0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#2563eb";
                e.currentTarget.style.border = "2px solid #2563eb";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(37, 99, 235, 0.15)";
              }}
            >
              Watch Demo
            </button>
          </Link>
        </div>
      </div>


      <div
        className=" position-absolute end-0 d-none d-md-block "
        style={{
          width: '58%',
          height: '100%',
          backgroundImage: 'url("./hero3.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </div>




    </section>
  );
};

export default HeroSection;