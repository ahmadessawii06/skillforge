import { Home, Mic, BarChart2, User, Settings, Brain } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <aside className="d-flex flex-column bg-white border-end" style={{ width: '16rem', minHeight: '100vh', borderColor: '#e5e7eb' }}>
      
      {/* Logo Section */}
      <div className="d-flex align-items-center p-3 gap-3">
        <div className="bg-primary text-white rounded p-2 d-flex align-items-center justify-content-center">
          <Brain size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="h6 fw-bold mb-0 text-dark">InterviewAI</h1>
          <p className="small text-muted mb-0">Mock Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 px-2 py-3 d-flex flex-column gap-1">
        <a 
          href="#" 
          className="d-flex align-items-center gap-2 px-3 py-2 rounded text-primary fw-medium bg-primary bg-opacity-10"
        >
          <Home size={20} strokeWidth={2.5} />
          <span>Home</span>
        </a>

        <a 
          href="#" 
          className="d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary text-decoration-none hover-bg"
        >
          <Mic size={20} strokeWidth={2.5} />
          <span>Interviews</span>
        </a>

        <a 
          href="#" 
          className="d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary text-decoration-none hover-bg"
        >
          <BarChart2 size={20} strokeWidth={2.5} />
          <span>Analytics</span>
        </a>

        <a 
          href="#" 
          className="d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary text-decoration-none hover-bg"
        >
          <User size={20} strokeWidth={2.5} />
          <span>Profile</span>
        </a>

        <a 
          href="#" 
          className="d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary text-decoration-none hover-bg"
        >
          <Settings size={20} strokeWidth={2.5} />
          <span>Settings</span>
        </a>
      </nav>

      {/* Pro Plan Section */}
      <div className="mt-auto p-3 border-top" style={{ borderColor: '#e5e7eb' }}>
        <div className="bg-light p-3 rounded-3">
          <p className="text-uppercase small fw-semibold text-secondary mb-1">
            Pro Plan
          </p>
          <p className="mb-3 fw-medium text-dark small">
            Unlimited AI Feedback
          </p>
          <button className="btn btn-primary w-100 fw-bold small">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Hover effect CSS for links */}
      <a className="d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary text-decoration-none bg-light bg-opacity-10">
</a>
    </aside>
  );
};

export default Sidebar;