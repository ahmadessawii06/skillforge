import "./Plans.css";

export default function Plans() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light-custom">
      <header className="site-header">
        <div className="container py-3 py-md-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-2 gap-md-3">
              <div className="brand-icon">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h2 className="mb-0 fs-5 fw-bold">Interview Pro AI</h2>
            </div>

            <div className="d-flex align-items-center gap-4 ms-auto">
              <nav className="d-none d-md-flex align-items-center gap-4">
                <a href="#" className="nav-link-custom">Home</a>
                <a href="#" className="nav-link-custom">Dashboard</a>
                <a href="#" className="nav-link-custom">Features</a>
              </nav>

              <button className="btn btn-primary-custom px-4 py-2 rounded-3">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow-1">
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

        <section className="pb-5">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="pricing-card d-flex flex-column gap-4 h-100">
                  <div>
                    <h3 className="text-secondary">Basic</h3>
                    <div className="pricing-price">
                      <span className="amount">$0</span>
                      <span className="suffix">/mo</span>
                    </div>
                    <p className="pricing-desc">
                      Perfect for getting a feel for the platform.
                    </p>
                  </div>

                  <button className="btn btn-soft w-100 py-3 rounded-3">
                    Get Started
                  </button>

                  <div>
                    <p className="feature-label">What's included:</p>
                    <ul className="feature-list">
                      <li>
                        <span className="material-symbols-outlined">check_circle</span>
                        <span>3 mock interviews</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">check_circle</span>
                        <span>Basic analytics</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">check_circle</span>
                        <span>Community access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="pricing-card featured-card d-flex flex-column gap-4 h-100">
                  <div className="featured-badge">Most Popular</div>

                  <div>
                    <h3 className="text-primary-custom">Pro</h3>
                    <div className="pricing-price">
                      <span className="amount">$29</span>
                      <span className="suffix">/mo</span>
                    </div>
                    <p className="pricing-desc">
                      The complete suite for serious candidates.
                    </p>
                  </div>

                  <button className="btn btn-primary-custom w-100 py-3 rounded-3">
                    Go Pro Now
                  </button>

                  <div>
                    <p className="feature-label">Everything in Basic, plus:</p>
                    <ul className="feature-list">
                      <li>
                        <span className="material-symbols-outlined">verified</span>
                        <span>Unlimited AI interviews</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">verified</span>
                        <span>Real-time feedback</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">verified</span>
                        <span>Detailed performance charts</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">verified</span>
                        <span>PDF reports</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">verified</span>
                        <span>AI coaching tips</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="pricing-card d-flex flex-column gap-4 h-100">
                  <div>
                    <h3 className="text-secondary">Team</h3>
                    <div className="pricing-price">
                      <span className="amount fs-1">Custom</span>
                    </div>
                    <p className="pricing-desc">
                      For large-scale career development programs.
                    </p>
                  </div>

                  <button className="btn btn-soft w-100 py-3 rounded-3">
                    Contact Sales
                  </button>

                  <div>
                    <p className="feature-label">Enterprise features:</p>
                    <ul className="feature-list">
                      <li>
                        <span className="material-symbols-outlined">business</span>
                        <span>For universities &amp; bootcamps</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">business</span>
                        <span>Bulk licensing</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">business</span>
                        <span>Admin dashboard</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">business</span>
                        <span>Custom question banks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9 col-xl-8">
                <div className="text-center mb-5">
                  <h2 className="faq-title display-6">Frequently Asked Questions</h2>
                  <p className="text-muted mt-3 mb-0">
                    Everything you need to know about Interview Pro AI
                  </p>
                </div>

                <div className="accordion" id="faqAccordion">
                  <div className="accordion-item custom-accordion">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqOne"
                        aria-expanded="true"
                        aria-controls="faqOne"
                      >
                        How does the AI feedback work?
                      </button>
                    </h2>
                    <div
                      id="faqOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Our AI analyzes your responses, tone, and body language in
                        real-time to provide actionable insights. Using advanced NLP
                        and visual analysis models, we give you coaching tips
                        immediately after your session ends.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item custom-accordion">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqTwo"
                        aria-expanded="false"
                        aria-controls="faqTwo"
                      >
                        Can I cancel my subscription anytime?
                      </button>
                    </h2>
                    <div
                      id="faqTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Yes, you can cancel your subscription at any time from your
                        dashboard settings. You will continue to have access to your
                        plan features until the end of your current billing cycle.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item custom-accordion">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqThree"
                        aria-expanded="false"
                        aria-controls="faqThree"
                      >
                        Do you offer discounts for students?
                      </button>
                    </h2>
                    <div
                      id="faqThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Absolutely! We offer a special 50% discount for currently
                        enrolled students. Please contact our support team with a valid
                        .edu email address or student ID to receive your unique
                        discount code.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item custom-accordion">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqFour"
                        aria-expanded="false"
                        aria-controls="faqFour"
                      >
                        Is my data secure?
                      </button>
                    </h2>
                    <div
                      id="faqFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Security is our top priority. All video and audio recordings are
                        encrypted in transit and at rest. We never sell your data, and
                        you can delete your account and all associated recordings at any
                        time.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
            <div className="d-flex flex-column align-items-center align-items-md-start gap-3">
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary-custom">
                  psychology
                </span>
                <span className="fw-bold">Interview Pro AI</span>
              </div>
              <p className="text-muted small mb-0">
                Empowering candidates with AI-driven confidence.
              </p>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-4">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-bottom mt-4 pt-4 text-center">
            © 2024 Interview Pro AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}