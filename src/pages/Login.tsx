import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { API_BASE_URL } from "@/lib/api";

type SubmitState = "idle" | "submitting" | "sent" | "error";

const Login = () => {
  const [memberNumber, setMemberNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return memberNumber.trim().length > 0 && email.trim().length > 3 && state !== "submitting";
  }, [email, memberNumber, state]);

  const requestMagicLink = async () => {
    setState("submitting");
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/magic-link`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          haul_pass_member_number: memberNumber.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = (data && (data.error || data.message)) || `Login request failed (${res.status})`;
        setState("error");
        setError(String(message));
        return;
      }

      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Login request failed");
    }
  };

  return (
    <div className="min-h-screen section-dark">
      <Header onCtaClick={() => (window.location.href = "/#signup")} />

      <main className="container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-overline">Member Access</div>
            <h1 className="section-title">Log In</h1>
            <p className="section-subtitle">
              Enter your member number + email and we’ll send a secure magic link.
            </p>
          </div>

          <div className="card-dark">
            {state === "sent" ? (
              <div>
                <p className="text-white font-semibold mb-2">Check your inbox.</p>
                <p className="text-surface-dark-muted">
                  If your details match an active membership, you’ll receive a login link shortly.
                </p>
                <div className="mt-6">
                  <Link to="/" className="text-primary hover:underline">
                    Back to the offer page
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!canSubmit) return;
                  void requestMagicLink();
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-white mb-2">HAUL PASS Member Number</label>
                  <input
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    value={memberNumber}
                    onChange={(e) => setMemberNumber(e.target.value)}
                    placeholder="e.g. 12345"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                {state === "error" && error ? (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-white">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="btn-cta w-full text-base py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={!canSubmit}
                >
                  {state === "submitting" ? "Sending…" : "Send magic link"}
                </button>

                <p className="text-center text-surface-dark-muted text-sm">
                  Don’t have a membership yet?{" "}
                  <a href="/#signup" className="text-primary hover:underline">
                    Sign up here
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

