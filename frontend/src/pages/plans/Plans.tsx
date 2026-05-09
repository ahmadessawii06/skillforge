import HeroSection from "../../components/plans/HeroSection";
import Prsec from "../../components/plans/Prsec";
import FaqSection from "../../components/plans/FaqSection";

export default function Plans() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-16 sm:pt-20 lg:pt-24">
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <HeroSection />
        <Prsec />
        <FaqSection />
      </main>
    </div>
  );
}
