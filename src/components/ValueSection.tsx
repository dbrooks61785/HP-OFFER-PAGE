import { Zap, Clock, Wallet, ExternalLink, MapPin } from "lucide-react";

const ValueSection = () => {
  return (
    <section className="section-dark py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-overline">What You Get</div>
            <h2 className="section-title">The Real Value</h2>
          </div>
          
          <div className="grid gap-8">
            {/* Priority Dispatch */}
            <div className="card-dark">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">1. Priority Dispatch Access</h3>
                  <p className="text-surface-dark-muted mb-6">As a H.A.U.L. PASS member:</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <span>Your requests are tagged and routed ahead of non-members</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <span>You receive dedicated escalation lanes during nights, weekends, and high-volume periods</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <span>Dispatch friction is reduced when time matters most</span>
                    </li>
                  </ul>
                  <p className="text-lg font-semibold text-primary">
                    This is not "faster callbacks." This is priority access to the network.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Guaranteed Response */}
            <div className="card-dark">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">2. Guaranteed Response Time</h3>
                  <p className="text-surface-dark-muted mb-6">In Primary Coverage Zones, EZ Lumper Services guarantees:</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-primary">2–4</p>
                      <p className="text-sm text-surface-dark-muted">Hour Response Window</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <p className="text-xl font-bold text-primary">Complete Intake</p>
                      <p className="text-sm text-surface-dark-muted">Clock Starts After</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <p className="text-xl font-bold text-primary">SLA Backed</p>
                      <p className="text-sm text-surface-dark-muted">Compensation If Missed</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-primary font-bold mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>Live Tracking</span>
                      </div>
                      <p className="text-sm text-surface-dark-muted">
                        When crews are dispatched, you receive live status + ETA updates to your location
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://www.ezlumperservices.com/coverage-areas" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    View Coverage Definitions <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Monthly Credits */}
            <div className="card-dark">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">3. Monthly Recovery Credits</h3>
                  <p className="text-surface-dark-muted mb-6">
                    Instead of rebates, coupons, or negotiations, H.A.U.L. PASS includes monthly recovery credits to absorb recurring friction.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="font-semibold mb-1">Direct Application</p>
                      <p className="text-sm text-surface-dark-muted">Apply directly to service invoices</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="font-semibold mb-1">Cost Reduction</p>
                      <p className="text-sm text-surface-dark-muted">Reduce out-of-pocket recovery costs</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="font-semibold mb-1">Stackable</p>
                      <p className="text-sm text-surface-dark-muted">Can be stacked on a single incident</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-primary">
                    They exist so you're not renegotiating during an emergency.
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

export default ValueSection;
