import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const API_BASE_URL = "https://api.haulpass.ezlumperservices.com";

type MeState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "error"; message: string }
  | {
      status: "ready";
      user: { email: string; role: string };
      company: { memberNumber: string; planType: string; credits: number; cardOnFile: boolean };
    };

const Dashboard = () => {
  const [me, setMe] = useState<MeState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/me`, { credentials: "include" });
        if (!res.ok) {
          if (res.status === 401) {
            if (!cancelled) setMe({ status: "unauthenticated" });
            return;
          }
          if (!cancelled) setMe({ status: "error", message: `Failed to load session (${res.status})` });
          return;
        }

        const data = (await res.json()) as any;
        if (!data?.ok) {
          if (!cancelled) setMe({ status: "error", message: "Unexpected response from server" });
          return;
        }
        if (!cancelled) {
          setMe({
            status: "ready",
            user: data.user,
            company: data.company,
          });
        }
      } catch (err) {
        if (!cancelled) setMe({ status: "error", message: err instanceof Error ? err.message : "Failed to load session" });
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen section-dark">
      <Header onCtaClick={() => (window.location.href = "/#signup")} />

      <main className="container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-overline">Member Portal</div>
            <h1 className="section-title">Dashboard</h1>
          </div>

          <div className="card-dark">
            {me.status === "loading" ? (
              <p className="text-surface-dark-muted">Loading…</p>
            ) : me.status === "unauthenticated" ? (
              <div>
                <p className="text-white font-semibold mb-2">You’re not logged in.</p>
                <p className="text-surface-dark-muted mb-6">Use the magic link login to access your account.</p>
                <Link to="/login" className="btn-cta inline-flex items-center justify-center text-base py-3 px-6">
                  Go to login
                </Link>
              </div>
            ) : me.status === "error" ? (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-white">
                {me.message}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-surface-dark-muted text-sm mb-1">Member Number</p>
                    <p className="text-white font-semibold">{me.company.memberNumber}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-surface-dark-muted text-sm mb-1">Plan</p>
                    <p className="text-white font-semibold">{me.company.planType}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-surface-dark-muted text-sm mb-1">Credits</p>
                    <p className="text-white font-semibold">{me.company.credits}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-surface-dark-muted text-sm mb-1">Card on file</p>
                    <p className="text-white font-semibold">{me.company.cardOnFile ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={logout} className="btn-cta-outline text-base py-3 px-6 text-white border-white hover:bg-white hover:text-foreground">
                    Log out
                  </button>
                  <a href="/#signup" className="btn-cta text-base py-3 px-6">
                    View plans
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

