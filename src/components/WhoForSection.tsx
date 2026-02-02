import { Check, X } from "lucide-react";

interface WhoForSectionProps {
  onCtaClick: () => void;
}

const WhoForSection = ({ onCtaClick }: WhoForSectionProps) => {
  const targetAudience = [
    "Asset-based carriers",
    "Fleets operating a minimum of 10 trucks",
    "Brokers with repeat exposure to rejected freight or surprise unloading requirements",
    "Shippers with tight dock schedules",
    "Operations teams that cannot afford drivers waiting without answers",
  ];

  const qualifications = [
    "Drivers regularly sit while ops scrambles",
    "Rejected freight or surprise unloads are not rare",
    "You've paid inflated rates under pressure",
    "Dispatch speed matters more than saving a few hundred dollars",
    "You operate across multiple markets without guaranteed dock labor",
  ];

  return (
    <section className="section-light py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Who It's For */}
            <div>
              <div className="section-overline">Who This Is For</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                The Hard Line
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                H.A.U.L. PASS is designed for:
              </p>
              
              <ul className="space-y-4">
                {targetAudience.map((item, index) => (
                  <li key={index} className="checklist-item">
                    <Check className="checklist-icon" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-secondary rounded-xl">
                <p className="font-semibold text-lg">
                  If you move freight nationwide, you don't need "a guy" or "a number."
                </p>
                <p className="text-primary font-bold text-xl mt-2">
                  You need a standing recovery plan.
                </p>
              </div>
            </div>
            
            {/* Self-Qualification */}
            <div>
              <div className="section-overline">Self-Qualification</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Read This Carefully
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                H.A.U.L. PASS was built for you if any of the following are true:
              </p>
              
              <ul className="space-y-4 mb-8">
                {qualifications.map((item, index) => (
                  <li key={index} className="checklist-item">
                    <Check className="checklist-icon" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <X className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">
                      If none of the above apply, do not enroll.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      This program is intentionally structured for operators who value certainty over optimism.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button onClick={onCtaClick} className="btn-cta">
              Secure H.A.U.L. PASS Coverage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoForSection;
