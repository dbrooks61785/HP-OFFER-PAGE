import logo from "@/assets/ez-lumper-logo.png";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div>
              <img 
                src={logo} 
                alt="EZ Lumper Services" 
                className="w-[150px] h-[100px] object-contain mb-4 invert brightness-0 invert"
              />
              <p className="text-background/70 max-w-xs">
                Emergency freight recovery services for carriers, brokers, and shippers nationwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://www.ezlumperservices.com/coverage-areas" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      Coverage Areas <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.ezlumperservices.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      Main Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://www.ezlumperservices.com/eula" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      EULA <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.ezlumperservices.com/privacy-policy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      Privacy Policy <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} EZ Lumper Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
