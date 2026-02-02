import { AlertCircle, Calendar, ExternalLink } from "lucide-react";

const DisclaimersSection = () => {
  const notGuaranteed = [
    "Dock availability",
    "Warehouse cooperation",
    "Driver compliance",
    "Undisclosed equipment availability",
    "Unsafe or infeasible recoveries",
  ];

  return (
    <section className="section-dark py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What This Does NOT Guarantee */}
            <div className="card-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">What This Does NOT Guarantee</h3>
              </div>
              
              <p className="text-surface-dark-muted mb-6">
                H.A.U.L. PASS does not guarantee:
              </p>
              
              <ul className="space-y-3 mb-6">
                {notGuaranteed.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-surface-dark-muted">
                It guarantees <span className="text-primary font-semibold">priority effort and response</span>, not outcomes beyond operational control.
              </p>
            </div>
            
            {/* Launch Status */}
            <div className="card-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Launch Status</h3>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                  <span className="text-white">Discounted pricing may be offered pre-launch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                  <span className="text-white">Benefits activate <strong>March 1, 2026</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                  <span className="text-white">No early usage prior to launch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                  <span className="text-white">Early sign-ups receive pricing protection only</span>
                </li>
              </ul>
              
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-primary font-semibold text-center">
                  Benefits Activate: March 1, 2026
                </p>
              </div>
            </div>
          </div>
          
          {/* Legal & Policies */}
          <div className="mt-12 card-dark">
            <h3 className="text-xl font-bold mb-6">Legal & Policies</h3>
            <p className="text-surface-dark-muted mb-6">All usage subject to:</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <a 
                href="https://www.ezlumperservices.com/eula" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                End User License Agreement <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://www.ezlumperservices.com/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Privacy Policy <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-surface-dark-muted text-sm">
              Credits are non-transferable. No refunds for unused credits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimersSection;
