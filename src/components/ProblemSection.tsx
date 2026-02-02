import { AlertTriangle, Phone, Clock, DollarSign } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    { icon: Phone, text: "Who answers the phone" },
    { icon: Clock, text: "How fast labor shows up" },
    { icon: DollarSign, text: "How bad the pricing gets when you're desperate" },
  ];

  return (
    <section className="section-light py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="section-overline">The Problem This Solves</div>
          <h2 className="section-title">
            Freight disruptions are not rare.<br />
            <span className="text-primary">They are predictable.</span>
          </h2>
          
          <p className="section-subtitle mb-12">
            What's unpredictable is:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {problems.map((problem, index) => (
              <div key={index} className="card-light flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <problem.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-semibold text-lg">{problem.text}</p>
              </div>
            ))}
          </div>
          
          <div className="card-light border-l-4 border-l-primary">
            <p className="text-xl font-medium mb-4">
              Most operators don't have a plan.<br />
              <span className="text-muted-foreground">They have a scramble.</span>
            </p>
            <div className="divider-blue mb-4" />
            <p className="text-2xl font-bold text-primary">
              H.A.U.L. PASS exists to eliminate the scramble.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
