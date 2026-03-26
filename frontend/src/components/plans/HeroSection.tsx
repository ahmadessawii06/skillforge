export default function HeroSection() {
  return (
    <section className="py-5 text-center">
      <div className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="d-flex flex-column align-items-center gap-4">
              <span className="hero-badge">Pricing Plans</span>

              <h1 className="hero-title display-4">
                Choose the right plan for your career goals
              </h1>

              <p className="hero-desc mb-0">
                Unlock your potential with our AI-powered mock interview platform.
                Choose a plan that fits your journey from preparation to landing
                your dream job.
              </p>

              <div className="billing-toggle mt-2">
                <button className="btn active-pill px-4 py-2 rounded-3">
                  Monthly
                </button>
                <button className="inactive-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                  Annual
                  <span className="save-pill">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}