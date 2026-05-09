import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "$0",
    period: "/mo",
    description: "Perfect for getting started.",
    button: "Get Started",
    buttonVariant: "outline",
    features: [
      "3 mock interviews",
      "Basic analytics",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "The complete suite for serious candidates.",
    button: "Go Pro Now",
    buttonVariant: "primary",
    featured: true,
    features: [
      "Unlimited interviews",
      "Real-time feedback",
      "Detailed performance charts",
      "PDF reports",
      "AI coaching tips",
    ],
  },
  {
    name: "Team",
    price: "Custom",
    period: "",
    description: "For large-scale career development programs.",
    button: "Contact Sales",
    buttonVariant: "outline",
    features: [
      "For universities & bootcamps",
      "Bulk licensing",
      "Admin dashboard",
      "Custom question banks",
    ],
  },
];

export default function Prsec() {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 sm:p-6 h-full flex flex-col ${
                plan.featured
                  ? "bg-[#7C3AED]/10 border-2 border-[#7C3AED]"
                  : "bg-[#1E293B] border border-white/[0.06]"
              }`}
            >
              {/* Header */}
              <div className="mb-6">
                <h6 className="text-uppercase font-bold text-[#A1A1AA] mb-3 text-xs sm:text-sm">
                  {plan.name}
                </h6>

                <div className="flex items-end mb-3">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-0">
                    {plan.price}
                  </h2>
                  {plan.period && (
                    <span className="text-[#A1A1AA] ml-2 mb-1 text-sm">
                      {plan.period}
                    </span>
                  )}
                </div>

                <p className="text-[#A1A1AA] text-sm mb-4 leading-relaxed">{plan.description}</p>

                <Link to="/cv">
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 min-h-[44px] touch-target ${
                      plan.buttonVariant === "primary"
                        ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                        : "bg-transparent border border-white/[0.2] text-white hover:bg-white/[0.1]"
                    }`}
                  >
                    {plan.button}
                  </button>
                </Link>
              </div>

              {/* Features */}
              <div className="mt-auto">
                <h6 className="font-bold text-xs uppercase mb-3 text-[#71717A]">
                  {plan.featured ? "Everything in Basic, plus:" : "What's included:"}
                </h6>

                <ul className="list-none mb-0 p-0 space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#7C3AED] flex-shrink-0 mt-0.5">✦</span>
                      <span className="text-[#A1A1AA] text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
