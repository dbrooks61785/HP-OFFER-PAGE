import { Check } from "lucide-react";

interface PricingSectionProps {
  onCtaClick: () => void;
}

const PricingSection = ({ onCtaClick }: PricingSectionProps) => {
  const plans = [
    {
      name: "H.A.U.L. PASS Lite",
      price: "$1,500",
      period: "/ month",
      description: "Built for operators with lower incident frequency who still require readiness.",
      credits: "2",
      features: [
        "2 Tier 1 Recovery Credits per month",
        "Priority dispatch access",
        "Member recovery pricing",
        "Guaranteed response (Primary Zones)",
        "SLA credit protection",
        "Credit stackability",
      ],
      bestFor: ["Smaller fleets (10–50 trucks)", "Brokers with periodic disruptions", "Operations that want coverage without carrying excess credits"],
      featured: false,
    },
    {
      name: "H.A.U.L. PASS",
      price: "$2,500",
      period: "/ month",
      description: "Built for operators where disruption is routine, not occasional.",
      credits: "4",
      features: [
        "4 Tier 1 Recovery Credits per month",
        "Full priority dispatch access",
        "Member recovery pricing",
        "Guaranteed response (Primary Zones)",
        "SLA protection",
        "Credit stackability",
      ],
      bestFor: ["High-volume carriers", "Brokers managing frequent exceptions", "Nationwide operations where speed matters more than line-item pricing"],
      featured: true,
    },
  ];

  return (
    <section id="plans" className="section-light py-24 scroll-mt-header">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-overline">The Plans</div>
            <h2 className="section-title">Clear, Clean, Defensible</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={plan.featured ? "pricing-card-featured" : "pricing-card"}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-surface-dark-muted text-sm">{plan.description}</p>
                </div>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-surface-dark-muted">{plan.period}</span>
                </div>
                
                <div className="mb-8 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                  <p className="text-primary font-semibold text-center">
                    {plan.credits} Tier 1 Credits / Month
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-8">
                  <p className="text-sm text-surface-dark-muted mb-3">Best for:</p>
                  <ul className="space-y-2">
                    {plan.bestFor.map((item, bIndex) => (
                      <li key={bIndex} className="text-sm text-surface-dark-muted flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={onCtaClick}
                  className={plan.featured ? "btn-cta w-full" : "btn-cta-outline w-full text-white border-white hover:bg-white hover:text-foreground"}
                >
                  Get {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
