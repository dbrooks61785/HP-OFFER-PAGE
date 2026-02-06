import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

const SignupFormSection = forwardRef<HTMLElement>((_, ref) => {
  const IFRAME_ID = "inline-rzO4aGPK4HLk2zyHkBoM";
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const getHeight = (w: number) => {
    // GHL forms often grow significantly on mobile due to stacked fields.
    if (w < 640) return 3600; // mobile
    if (w < 1024) return 2900; // tablet/small laptop
    return 2100; // desktop (reduce blank space; allow auto-resize to adjust)
  };

  const [height, setHeight] = useState(() => (typeof window === "undefined" ? 2342 : getHeight(window.innerWidth)));

  useEffect(() => {
    // Load after the iframe exists so the widget initializes.
    const id = "ghl-form-embed";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const onResize = () => setHeight(getHeight(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // LeadConnector/GHL embeds often postMessage iframe height updates.
    // Listen and adjust so we don't leave blank space below the form.
    const handler = (event: MessageEvent) => {
      const origin = String(event.origin || "");
      if (!origin.includes("leadconnectorhq.com") && !origin.includes("msgsndr.com")) return;

      // Only accept messages coming from our embed iframe (prevents false positives).
      const cw = iframeRef.current?.contentWindow;
      if (cw && event.source !== cw) return;

      let data: any = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          // Some embeds send simple string payloads; attempt to extract a height number.
          const m = data.match(/height[^0-9]*([0-9]{3,5})/i) ?? data.match(/([0-9]{3,5})/);
          if (!m) return;
          data = { height: Number(m[1]) };
        }
      }
      if (data == null) return;

      // Be liberal in what we accept; LC/GHL payloads vary.
      const rawHeight =
        (typeof data === "number" ? data : null) ??
        (typeof data === "object"
          ? data.height ??
            data.frameHeight ??
            data.iframeHeight ??
            data.h ??
            data?.data?.height ??
            data?.payload?.height
          : null);
      const next = Number(rawHeight);
      if (!Number.isFinite(next)) return;

      // Clamp to prevent silly values.
      const clamped = Math.max(900, Math.min(6000, Math.round(next)));
      setHeight((prev) => (Math.abs(prev - clamped) < 10 ? prev : clamped));
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const heightPx = useMemo(() => `${height}px`, [height]);

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
          
          <div className="card-dark overflow-hidden p-0 rounded-[60px]">
            {/* Keep this close to the GHL-provided height to avoid blank space below */}
            <div style={{ width: "100%", height: heightPx }}>
              <iframe
                ref={iframeRef}
                src="https://api.leadconnectorhq.com/widget/form/rzO4aGPK4HLk2zyHkBoM"
                style={{ width: "100%", height: "100%", border: "none" }}
                id={IFRAME_ID}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="H.A.U.L. PASS Signup Form"
                data-height={height}
                data-layout-iframe-id="inline-rzO4aGPK4HLk2zyHkBoM"
                data-form-id="rzO4aGPK4HLk2zyHkBoM"
                title="H.A.U.L. PASS Signup Form"
              />
            </div>
          </div>

          <p className="text-center text-surface-dark-muted text-sm mt-3 sm:mt-4">
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
