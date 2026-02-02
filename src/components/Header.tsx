import logo from "@/assets/ez-lumper-logo.png";

interface HeaderProps {
  onCtaClick: () => void;
}

const Header = ({ onCtaClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="https://www.ezlumperservices.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={logo} 
            alt="EZ Lumper Services" 
            className="h-[50px] w-auto object-contain"
          />
        </a>
        <button onClick={onCtaClick} className="btn-cta text-base py-3 px-6">
          Get H.A.U.L. PASS
        </button>
      </div>
    </header>
  );
};

export default Header;
