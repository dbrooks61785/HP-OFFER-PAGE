import headerLogo from "@/assets/ez-lumper-logo-header.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  onCtaClick: () => void;
}

const Header = ({ onCtaClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        <a
          href="https://www.ezlumperservices.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <img 
            src={headerLogo} 
            alt="EZ Lumper Services" 
            className="h-[50px] w-auto object-contain"
          />
        </a>
        <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            to="/login"
            className="btn-cta-outline text-base py-3 px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Member Login
          </Link>
          <button onClick={onCtaClick} className="btn-cta text-base py-3 px-6">
            Get H.A.U.L. PASS
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
