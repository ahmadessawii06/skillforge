export default function FaqSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="hero-desc mb-0">
            Find answers to the most common questions about our plans.
          </p>
        </div>

        <div className="accordion" id="faqAccordion">
          <div className="accordion-item custom-accordion">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqOne"
                aria-expanded="false"
                aria-controls="faqOne"
              >
                How does the AI feedback work?
              </button>
            </h2>
            <div
              id="faqOne"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Our AI analyzes your responses, tone, and body language in
                real-time to provide actionable insights.
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
                dashboard settings.
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
                Yes, we offer discounts for students with valid proof of
                enrollment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}