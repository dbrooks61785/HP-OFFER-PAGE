import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import WhoForSection from "@/components/WhoForSection";
import ValueSection from "@/components/ValueSection";
import PricingSection from "@/components/PricingSection";
import PricingTableSection from "@/components/PricingTableSection";
import RulesSection from "@/components/RulesSection";
import DisclaimersSection from "@/components/DisclaimersSection";
import AuthoritySection from "@/components/AuthoritySection";
import SignupFormSection from "@/components/SignupFormSection";
import Footer from "@/components/Footer";

const Index = () => {
  const signupRef = useRef<HTMLElement>(null);

  const scrollToSignup = () => {
    signupRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header onCtaClick={scrollToSignup} />
      <HeroSection onCtaClick={scrollToSignup} />
      <ProblemSection />
      <WhatItIsSection />
      <WhoForSection onCtaClick={scrollToSignup} />
      <ValueSection />
      <PricingSection onCtaClick={scrollToSignup} />
      <PricingTableSection />
      <RulesSection />
      <DisclaimersSection />
      <AuthoritySection onCtaClick={scrollToSignup} />
      <SignupFormSection ref={signupRef} />
      <Footer />
    </div>
  );
};

export default Index;
