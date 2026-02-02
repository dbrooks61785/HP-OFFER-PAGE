import { forwardRef } from "react";

const SignupFormSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="signup" className="section-dark py-24 scroll-mt-header">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-overline">Get Started</div>
            <h2 className="section-title">Secure Your H.A.U.L. PASS</h2>
            <p className="section-subtitle">
              Complete the form below to lock in your coverage.
            </p>
          </div>
          
          <div className="card-dark overflow-hidden">
            <iframe
              src="https://www.ezlumperservices.com/qb-form-page"
              style={{ width: "100%", height: "2360px", border: "none", borderRadius: "60px" }}
              title="H.A.U.L. PASS Sign Up Form"
              loading="lazy"
            />
          </div>

          <p className="text-center text-surface-dark-muted text-sm mt-6">
            Having trouble loading the form?{" "}
            <a
              href="https://www.ezlumperservices.com/qb-form-page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open it in a new tab
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
});

SignupFormSection.displayName = "SignupFormSection";

export default SignupFormSection;
