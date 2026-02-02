import { Zap, Clock, Shield, CreditCard, Truck } from "lucide-react";

const WhatItIsSection = () => {
  const features = [
    { icon: Zap, text: "Priority dispatch" },
    { icon: Clock, text: "Guaranteed response windows (where available)" },
    { icon: Shield, text: "Locked-in recovery pricing" },
    { icon: CreditCard, text: "Monthly recovery credits to offset incidents" },
  ];

  const useCases = [
    "Docks",
    "Drivers",
    "Rejected freight",
    "Surprise unloads",
    "Time-critical loads",
  ];

  return (
    <section className="section-dark py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="section-overline">What H.A.U.L. PASS Is</div>
          <h2 className="section-title">
            Think <span className="text-primary">AAA for freight recovery</span>
          </h2>
          
          <p className="text-xl text-surface-dark-muted mb-12">
            H.A.U.L. PASS is a subscription-based emergency freight labor access plan that gives you:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="card-dark flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-medium pt-2">{feature.text}</p>
              </div>
            ))}
          </div>
          
          <div className="card-dark mb-12">
            <p className="text-surface-dark-muted mb-4">Built specifically for:</p>
            <div className="flex flex-wrap gap-3">
              {useCases.map((useCase, index) => (
                <span key={index} className="badge-hero">
                  {useCase}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Truck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-xl font-semibold mb-2">
                  You are not prepaying for labor hours.
                </p>
                <p className="text-surface-dark-muted text-lg">
                  You are securing <span className="text-primary font-semibold">availability, priority, and certainty</span> before the problem happens.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-surface-dark-muted text-center mt-8 text-lg">
            If freight disruptions are occasional for you, standard dispatch may be enough.<br />
            <span className="font-semibold text-white">H.A.U.L. PASS is for operators who experience disruption as an operational reality.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
