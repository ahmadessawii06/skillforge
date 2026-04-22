import '../../pages/anlysis/Anlysis.css';
// import AnalysisHeader from '../../components/anlysis/AnalysisHeader';
import AnalysisFooter from '../../components/anlysis/AnalysisFooter';
import PerformanceTrend from '../../components/anlysis/PerformanceTrend';
import SkillCards from '../../components/anlysis/SkillCards';
import KeywordAlignment from '../../components/anlysis/KeywordAlignment';

export default function Anlysis() {
  return (
    <div className="container py-4">
      {/* <AnalysisHeader /> */}
      <SkillCards />
      <div className="row g-4 mb-5">
        <PerformanceTrend />
        <KeywordAlignment />
      </div>
      <AnalysisFooter />
    </div>
  );
}