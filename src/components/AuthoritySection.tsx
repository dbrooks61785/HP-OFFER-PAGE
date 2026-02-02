interface AuthoritySectionProps {
  onCtaClick: () => void;
}

const AuthoritySection = ({ onCtaClick }: AuthoritySectionProps) => {
  return (
    <section className="section-light py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="divider-blue mx-auto mb-8" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            H.A.U.L. PASS is intentionally structured.
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8">
            The rules exist so response can be guaranteed when it matters most.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="card-light text-center">
              <p className="text-lg font-semibold text-primary mb-2">Prepared Operators</p>
              <p className="text-muted-foreground">Plan for disruption</p>
            </div>
            <div className="p-8 bg-foreground text-background rounded-2xl text-center">
              <p className="text-lg font-semibold mb-2">Unprepared Operators</p>
              <p className="opacity-70">Scramble</p>
            </div>
          </div>
          
          <p className="text-xl font-semibold mb-12">
            This plan draws that line clearly.
          </p>
          
          <button onClick={onCtaClick} className="btn-cta animate-pulse-blue">
            Secure H.A.U.L. PASS Coverage
          </button>
          
          <p className="text-muted-foreground text-sm mt-4">
            For operators who value readiness over reaction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
