import { forwardRef, useEffect } from "react";

const SignupFormSection = forwardRef<HTMLElement>((_, ref) => {
  useEffect(() => {
    const src = "https://link.msgsndr.com/js/form_embed.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Keep the script if other embeds rely on it.
    };
  }, []);

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
              src="https://api.leadconnectorhq.com/widget/form/rzO4aGPK4HLk2zyHkBoM"
              style={{ width: "100%", height: "2342px", border: "none", borderRadius: "60px" }}
              id="inline-rzO4aGPK4HLk2zyHkBoM"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="H.A.U.L. PASS Signup Form"
              data-height="2342"
              data-layout-iframe-id="inline-rzO4aGPK4HLk2zyHkBoM"
              data-form-id="rzO4aGPK4HLk2zyHkBoM"
              title="H.A.U.L. PASS Signup Form"
              loading="lazy"
            />
          </div>

          <p className="text-center text-surface-dark-muted text-sm mt-6">
            Having trouble loading the form?{" "}
            <a
              href="https://api.leadconnectorhq.com/widget/form/rzO4aGPK4HLk2zyHkBoM"
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
