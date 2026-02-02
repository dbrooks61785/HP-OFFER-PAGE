import logo from "@/assets/ez-lumper-logo.png";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="section-dark min-h-screen flex items-center pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src={logo} 
              alt="EZ Lumper Services" 
              className="w-[150px] h-[100px] object-contain"
            />
          </div>
          
          <div className="badge-hero mb-8 animate-fade-in">
            Emergency Freight Recovery Plan
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            H.A.U.L. <span className="text-primary">PASS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-surface-dark-muted mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            High Alert Urgent Labor Pass
          </p>
          
          <p className="text-lg text-surface-dark-muted mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            By EZ Lumper Services
          </p>
          
          <p className="text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            A standing emergency freight recovery plan for carriers, brokers, and shippers who{" "}
            <span className="text-primary font-semibold">cannot afford uncertainty</span> when freight goes sideways.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <button onClick={onCtaClick} className="btn-cta animate-pulse-blue">
              Secure H.A.U.L. PASS Coverage
            </button>
            <a href="#plans" className="btn-cta-outline border-white text-white hover:bg-white hover:text-foreground">
              View Plans
            </a>
          </div>
          
          <p className="text-surface-dark-muted text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            For operators who value readiness over reaction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
