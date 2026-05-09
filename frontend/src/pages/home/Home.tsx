import HeroSection from '../../components/home/HeroSection';
import StatsGrid from '../../components/home/StatsGrid';
import RecentInterviewsTable from '../../components/home/RecentInterviewsTable';
import SkillProgress from '../../components/home/SkillProgress';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Main content */}
      <main className="flex-grow-1">
        {/* Page content - Responsive padding */}
        <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
          {/* Hero Section */}
          <HeroSection />

          {/* Stats Grid - Responsive spacing */}
          <div className="mt-6 sm:mt-8">
            <StatsGrid />
          </div>

          {/* Lower section - Stacked on mobile, side-by-side on desktop */}
          <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Recent Interviews Table - Takes full width on mobile, 8/12 on desktop */}
              <div className="lg:col-span-8">
                <RecentInterviewsTable />
              </div>

              {/* Skill Progress - Stacked on mobile, 4/12 on desktop */}
              <div className="lg:col-span-4">
                <SkillProgress />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
