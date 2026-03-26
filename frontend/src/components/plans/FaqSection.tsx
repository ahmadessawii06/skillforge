type FaqItemProps = {
  id: string;
  question: string;
  answer: string;
  show?: boolean;
};

function FaqItem({ id, question, answer, show = false }: FaqItemProps) {
  return (
    <div className="accordion-item custom-accordion">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${show ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded={show ? "true" : "false"}
          aria-controls={id}
        >
          {question}
        </button>
      </h2>

      <div
        id={id}
        className={`accordion-collapse collapse ${show ? "show" : ""}`}
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body">{answer}</div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const faqs = [
    {
      id: "faqOne",
      question: "How does the AI feedback work?",
      answer:
        "Our AI analyzes your responses, tone, and body language in real-time to provide actionable insights.",
      show: true,
    },
    {
      id: "faqTwo",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your dashboard settings.",
    },
    {
      id: "faqThree",
      question: "Do you offer discounts for students?",
      answer:
        "Yes, we offer discounts for students with valid proof of enrollment.",
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}