import { useState } from "react";

const faqs = [
  {
    question: "How does the AI feedback work?",
    answer:
      "Our AI analyzes your responses, tone, and body language in real-time to provide actionable insights.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your dashboard settings.",
  },
  {
    question: "Do you offer discounts for students?",
    answer:
      "Yes, we offer discounts for students with valid proof of enrollment.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base">
            Find answers to the most common questions about our plans.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-white/[0.06] rounded-xl sm:rounded-xl overflow-hidden transition-all duration-200 ${
                openIndex === index ? "bg-[#1E293B]" : "bg-transparent"
              }`}
            >
              <button
                className="w-full px-4 sm:px-5 py-4 flex items-center justify-between text-left gap-3"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="font-semibold text-white text-sm sm:text-base leading-snug text-left">
                  {faq.question}
                </span>
                <span
                  className={`material-symbols-outlined text-[#7C3AED] transition-transform duration-200 flex-shrink-0 text-xl sm:text-2xl ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-5 pb-4 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
