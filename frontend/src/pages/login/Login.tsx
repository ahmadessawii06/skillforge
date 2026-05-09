import LeftPanel from '../../components/login/LeftPanel';
import RightPanel from '../../components/login/RightPanel';

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
