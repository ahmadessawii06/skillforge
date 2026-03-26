type Feature = {
  icon: string;
  text: string;
};

type PricingCardProps = {
  title: string;
  price: string;
  suffix?: string;
  desc: string;
  buttonText: string;
  buttonClass: string;
  features: Feature[];
  featured?: boolean;
  featureLabel: string;
};

function PricingCard({
  title,
  price,
  suffix,
  desc,
  buttonText,
  buttonClass,
  features,
  featured = false,
  featureLabel,
}: PricingCardProps) {
  return (
    <div
      className={`pricing-card d-flex flex-column gap-4 h-100 ${
        featured ? "featured-card" : ""
      }`}
    >
      {featured && <div className="featured-badge">Most Popular</div>}

      <div>
        <h3 className={featured ? "text-primary-custom" : "text-secondary"}>
          {title}
        </h3>

        <div className="pricing-price">
          <span className="amount">{price}</span>
          {suffix && <span className="suffix">{suffix}</span>}
        </div>

        <p className="pricing-desc">{desc}</p>
      </div>

      <button className={`btn w-100 py-3 rounded-3 ${buttonClass}`}>
        {buttonText}
      </button>

      <div>
        <p className="feature-label">{featureLabel}</p>
        <ul className="feature-list">
          {features.map((feature, index) => (
            <li key={index}>
              <span className="material-symbols-outlined">{feature.icon}</span>
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PricingSection() {
 const plans: PricingCardProps[] = [
  {
    title: "Basic",
    price: "$0",
    suffix: "/mo",
    desc: "Perfect for getting started.",
    buttonText: "Get Started",
    buttonClass: "btn-soft",
    featureLabel: "WHAT'S INCLUDED:",
    features: [
      { icon: "check_circle", text: "3 mock interviews" },
      { icon: "check_circle", text: "Basic analytics" },
      { icon: "check_circle", text: "Community access" },
    ],
  },
  {
    title: "Pro",
    price: "$29",
    suffix: "/mo",
    desc: "The complete suite for serious candidates.",
    buttonText: "Go Pro Now",
    buttonClass: "btn-primary-custom",
    featureLabel: "EVERYTHING IN BASIC, PLUS:",
    featured: true,
    features: [
      { icon: "verified", text: "Unlimited interviews" },
      { icon: "verified", text: "Real-time feedback" },
      { icon: "verified", text: "Detailed performance charts" },
      { icon: "verified", text: "PDF reports" },
      { icon: "verified", text: "AI coaching tips" },
    ],
  },
  {
    title: "Team",
    price: "Custom",
    desc: "For large-scale career development programs.",
    buttonText: "Contact Sales",
    buttonClass: "btn-soft",
    featureLabel: "ENTERPRISE FEATURES:",
    features: [
      { icon: "business", text: "For universities & bootcamps" },
      { icon: "business", text: "Bulk licensing" },
      { icon: "business", text: "Admin dashboard" },
      { icon: "business", text: "Custom question banks" },
    ],
  },
];

  return (
  <section className="pb-5">
    <div className="container">
      <div className="row g-4 align-items-stretch">
        {plans.map((plan, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <PricingCard {...plan} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
}