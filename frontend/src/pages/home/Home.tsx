import HeroSection from "../../components/home/HeroSection";
import Title from "../../components/home/Title";
import StatsSection from "../../components/home/StatsSection";
import StepsCards from "../../components/home/StepsCards";
import AIInterviewSection from "../../components/home/AIInterviewSection";
import VideoSection from "../../components/home/VideoSection";
import "../home/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <main className="home-main">
        <HeroSection />

        <Title />

        <StatsSection />

        <StepsCards />

        <AIInterviewSection />

        <VideoSection />

        <section className="final-cta-section" style={{}}>
          <div className="final-cta-content">
            <p className="final-cta-eyebrow">Ready to improve?</p>

            <h2>Try your first AI interview today</h2>

            <p>
              Practice realistic interviews, get instant feedback, and build
              confidence before the real opportunity.
            </p>

        
          </div>

          <div className="final-cta-image-wrap">

            <img
              src="./islam1.png"
              alt="Start AI Interview Practice"
              className="final-cta-image"
            />
 
       
         
              <Link style={{textDecoration: "none"}} className="laptop-cta-btn" to="/interview">Get Started</Link>

           

            <div className="cta-floating-card cta-card-one">
              <span>AI Feedback</span>
              <strong>92% Score</strong>
            </div>

            <div className="cta-floating-card cta-card-two">
              <span>Interview</span>
              <strong>Ready to Start</strong>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;