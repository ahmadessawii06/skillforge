


import "./Plans.css";
import HeroSection from "../../components/plans/HeroSection";
import Prsec from "../../components/plans/Prsec";
import FaqSection from "../../components/plans/FaqSection";


export default function Plans() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light-custom">
      <main className="flex-grow-1">
        <HeroSection />
      <Prsec/>
        <FaqSection />
      </main>
    </div>
  );
}