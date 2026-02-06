import { Info, Truck, Shield, ClipboardCheck } from "lucide-react";

const RulesSection = () => {
  const creditRules = [
    "Issued monthly",
    "Do NOT roll over month-to-month",
    "CAN be stacked on one incident",
    "Valid for 1 month",
    "Expire automatically if unused",
  ];

  const intakeRequirements = [
    "Active H.A.U.L. PASS status",
    "Complete request details",
    "Site access confirmation",
    "Payment authorization on file",
  ];

  return (
    <section className="section-light py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Credit Rules */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Credit Rules</h3>
              </div>
              
              <div className="card-light">
                <h4 className="font-semibold text-lg mb-4">Tier 1 Recovery Credits</h4>
                <ul className="space-y-3 mb-6">
                  {creditRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-primary font-semibold">
                  Credits reduce invoices dollar-for-dollar.
                </p>
              </div>
            </div>
            
            {/* Travel Fees */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Travel Fees</h3>
              </div>
              
              <div className="card-light">
                <p className="text-muted-foreground mb-4">
                  H.A.U.L. PASS does not include or pre-negotiate travel fees.
                </p>
                <p className="font-semibold mb-2">However:</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span>Tier 1 Recovery Credits <strong>CAN</strong> be applied to offset travel fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span>Credits reduce the total invoice dollar-for-dollar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span>Travel fees remain incident-specific and location-dependent</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  This preserves nationwide coverage without inflating base pricing.
                </p>
              </div>
            </div>
            
            {/* SLA Credit */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">SLA Credit</h3>
              </div>
              
              <div className="card-light">
                <p className="text-muted-foreground mb-4">
                  If EZ Lumper Services fails to meet the guaranteed response window in a Primary Coverage Zone after proper intake:
                </p>
                <p className="text-xl font-bold text-primary mb-4">One SLA Credit is issued</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Available for <strong>H.A.U.L. PASS</strong> only (not H.A.U.L. PASS Lite).
                </p>
                <p className="font-semibold mb-2">Rules:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                    <span>SLA Credits do not stack</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                    <span>One active at a time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                    <span>Valid for 60 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                    <span>Applied to future service only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                    <span>No cash value</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Intake Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Intake Requirements</h3>
              </div>
              
              <div className="card-light">
                <p className="text-muted-foreground mb-4">
                  To qualify for priority dispatch and (where included) guaranteed response / SLA credit, you must have:
                </p>
                <ul className="space-y-3 mb-6">
                  {intakeRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <span className="font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm font-semibold text-destructive">
                    Incomplete intake pauses the response clock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
