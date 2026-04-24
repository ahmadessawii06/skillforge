
import HeroSection from '../../components/home/HeroSection';
import StatsGrid from '../../components/home/StatsGrid';
import RecentInterviewsTable from '../../components/home/RecentInterviewsTable';
import SkillProgress from '../../components/home/SkillProgress';
import '../home/Home.css';

const Home = () => {
  return (
    <div className="d-flex vh-100 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      

      {/* Main content */}
      <main className="flex-grow-1 d-flex flex-column overflow-auto">
       


        {/* Page content */}
        <div className="p-4 p-lg-5">
          {/* Hero Section */}
          <HeroSection />

          {/* Stats Grid */}
          <div className="my-4">
            <StatsGrid />
          </div>

          {/* Lower section */}
          <div className="row g-4">
            {/* Recent Interviews Table */}
            <div className="col-12 col-lg-8">
              <RecentInterviewsTable />
            </div>

            {/* Skill Progress & Ready To Practice */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              <SkillProgress />
         
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;