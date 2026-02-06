import { Check } from "lucide-react";

const PricingTableSection = () => {
  const comparisonFeatures = [
    { feature: "Monthly Price", lite: "$1,500", full: "$2,500" },
    { feature: "Tier 1 Credits / Month", lite: "2", full: "4" },
    { feature: "Priority Dispatch", lite: true, full: true },
    { feature: "Guaranteed Response (Primary Zones)", lite: false, full: true },
    { feature: "Member Recovery Pricing", lite: true, full: true },
    { feature: "SLA Credit Protection", lite: false, full: true },
    { feature: "Credit Stackability", lite: true, full: true },
  ];

  const recoveryTiers = [
    { tier: "Tier 1", description: "Standard unload / restack", price: "$625" },
    { tier: "Tier 2", description: "Moderate recovery", price: "$1,225" },
    { tier: "Tier 3", description: "Advanced recovery", price: "$2,825" },
    { tier: "Tier 4", description: "Critical, high-risk recovery", price: "$3,425" },
  ];

  return (
    <section className="section-dark py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Comparison Table */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="section-overline">Side-by-Side</div>
              <h2 className="section-title">Compare Plans</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="table-dark">
                <thead>
                  <tr>
                    <th className="text-left">Feature</th>
                    <th className="text-center">H.A.U.L. PASS Lite</th>
                    <th className="text-center">H.A.U.L. PASS</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index}>
                      <td className="text-white font-medium">{row.feature}</td>
                      <td className="text-center">
                        {typeof row.lite === 'boolean' ? (
                          row.lite ? <Check className="w-5 h-5 text-primary mx-auto" /> : "—"
                        ) : (
                          <span className="text-white">{row.lite}</span>
                        )}
                      </td>
                      <td className="text-center">
                        {typeof row.full === 'boolean' ? (
                          row.full ? <Check className="w-5 h-5 text-primary mx-auto" /> : "—"
                        ) : (
                          <span className="text-primary font-semibold">{row.full}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recovery Tier Pricing */}
          <div>
            <div className="text-center mb-12">
              <div className="section-overline">Recovery Tier Pricing</div>
              <h2 className="section-title">Member Rates</h2>
              <p className="section-subtitle">
                All H.A.U.L. PASS members receive locked-in incident pricing
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="table-dark">
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Description</th>
                    <th className="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recoveryTiers.map((tier, index) => (
                    <tr key={index}>
                      <td>
                        <span className="text-primary font-semibold">{tier.tier}</span>
                      </td>
                      <td className="text-white">{tier.description}</td>
                      <td className="text-right">
                        <span className="text-2xl font-bold text-white">{tier.price}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-center text-surface-dark-muted mt-6 text-sm">
              Pricing applies nationwide, subject to site conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTableSection;
