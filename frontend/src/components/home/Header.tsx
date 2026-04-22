import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header className="sticky-top bg-white border-bottom d-flex align-items-center justify-content-between px-4" style={{ height: '64px', zIndex: 10 }}>
      
      {/* Search Box */}
      <div className="d-flex align-items-center flex-grow-1 me-3" style={{ maxWidth: '400px' }}>
        <div className="position-relative w-100">
          <span className="material-icons position-absolute top-50 start-0 translate-middle-y text-secondary" style={{ left: '12px' }}></span>
          <input
            type="text"
            placeholder="Search sessions, roles, or feedback..."
            className="form-control pe-3 py-2 border rounded my-2"
            
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-3 ms-3">
        {/* Notifications */}
        <button className="btn position-relative p-2 text-secondary rounded-circle">
          <span className="material-icons">Notifications</span>
          <span className="position-absolute top-0 end-0 translate-middle p-1 bg-danger border border-white rounded-circle"></span>
        </button>

        {/* Divider */}
        <div className="vr"></div>

        {/* User Info */}
        <div className="d-flex align-items-center gap-2 cursor-pointer">
          <div className="text-end d-none d-md-block">
            <p className="mb-0 fw-bold text-dark">Alex Johnson</p>
            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Senior Developer</p>
          </div>
          <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/053/645/348/small/a-black-and-white-silhouette-of-a-man-in-a-suit-vector.jpg " 
            alt="Alex Johnson"
            className="rounded-circle border border-transparent"
            style={{ width: '40px', height: '40px', objectFit: 'cover', transition: 'all 0.3s' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;