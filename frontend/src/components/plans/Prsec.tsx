export default function Prsec() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4 justify-content-center align-items-stretch">
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="card h-100 rounded-4 shadow-sm pricing-card w-100">
              <div className="card-body p-4 d-flex flex-column">
                <h6 className="text-uppercase fw-bold text-secondary mb-3">Basic</h6>

                <div className="d-flex align-items-end mb-2">
                  <h2 className="display-4 fw-bold mb-0">$0</h2>
                  <span className="text-secondary ms-2 mb-2">/mo</span>
                </div>

                <p className="text-secondary mb-4">Perfect for getting started.</p>

                <button className="btn btn-light fw-bold py-2 mb-4">
                  Get Started
                </button>

                <h6 className="fw-bold small text-uppercase mb-3">What's included:</h6>

                <ul className="list-unstyled mb-0">
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>3 mock interviews</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Basic analytics</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Community access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="card h-100 rounded-4 shadow-sm pricing-card featured-card position-relative w-100">
              <span className="featured-badge badge bg-primary position-absolute start-50 translate-middle-x px-3 py-2 rounded-pill">
                Most Popular
              </span>

              <div className="card-body p-4 d-flex flex-column">
               <h6 className="text-uppercase fw-bold text-secondary mb-3">Pro</h6>

                <div className="d-flex align-items-end mb-2">
                  <h2 className="display-4 fw-bold mb-0">$29</h2>
                  <span className="text-secondary ms-2 mb-2">/mo</span>
                </div>

                <p className="text-secondary mb-4">
                  The complete suite for serious candidates.
                </p>

                <button className="btn btn-light fw-bold py-2 mb-4">
                  Go Pro Now
                </button>

                <h6 className="fw-bold small text-uppercase mb-3">
                  Everything in Basic, plus:
                </h6>

                <ul className="list-unstyled mb-0">
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Unlimited interviews</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Real-time feedback</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Detailed performance charts</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>PDF reports</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>AI coaching tips</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="card h-100 rounded-4 shadow-sm pricing-card w-100">
              <div className="card-body p-4 d-flex flex-column">
                <h6 className="text-uppercase fw-bold text-secondary mb-3">Team</h6>

                <div className="mb-2">
                  <h2 className="display-4 fw-bold mb-0">Custom</h2>
                </div>

                <p className="text-secondary mb-4">
                  For large-scale career development programs.
                </p>

                <button className="btn btn-light fw-bold py-2 mb-4">
                  Contact Sales
                </button>

                <h6 className="fw-bold small text-uppercase mb-3">
                  Enterprise features:
                </h6>

                <ul className="list-unstyled mb-0">
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>For universities &amp; bootcamps</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Bulk licensing</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Admin dashboard</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <span className="text-primary me-2">✦</span>
                    <span>Custom question banks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}