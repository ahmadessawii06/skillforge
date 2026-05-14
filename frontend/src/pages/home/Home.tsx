import HeroSection from '../../components/home/HeroSection';
import Title from '../../components/home/Title';
import StepsCards from '../../components/home/StepsCards';
import AIInterviewSection from '../../components/home/AIInterviewSection';
import StatsSection from '../../components/home/StatsSection';
import VideoSection from '../../components/home/VideoSection';
import '../home/Home.css';

const Home = () => {
  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'white' }}>
<main className="flex-grow-1 d-flex flex-column">

  <div className="p-4 p-lg-5 "  style={{ backgroundColor: "#F3F4F6" }}>

        <HeroSection />

        <Title />
   <StatsSection  />

  
    <StepsCards />
    <AIInterviewSection />
   
    <VideoSection />

  </div>

  <img
    src="./islam1.jpeg"
    alt="AI Interview"
    style={{
      width: "100%",
      display: "block",
      margin: 0,
      padding: 0,
      borderRadius: "0px",
      objectFit: "cover"
    }}
  />

</main>
    </div>
  );
};

export default Home;