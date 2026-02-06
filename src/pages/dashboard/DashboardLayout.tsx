import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Building2, CreditCard, FileText, LayoutDashboard, LifeBuoy, LogOut, MapPinned, Settings, Truck } from "lucide-react";
import headerLogo from "@/assets/ez-lumper-logo-header.png";
import { apiFetch } from "@/lib/api";
import { DashboardContext, type DashboardMe } from "./dashboardContext";

type MeState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "error"; message: string }
  | { status: "ready"; me: DashboardMe };

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function DashboardLayout() {
  const [state, setState] = useState<MeState>({ status: "loading" });
  const location = useLocation();

  const refreshMe = useCallback(async () => {
    const res = await apiFetch("/me");
    if (!res.ok) {
      if (res.status === 401) {
        setState({ status: "unauthenticated" });
        return;
      }
      setState({ status: "error", message: `Failed to load session (${res.status})` });
      return;
    }
    const data = (await res.json()) as any;
    if (!data?.ok) {
      setState({ status: "error", message: "Unexpected response from server" });
      return;
    }
    setState({ status: "ready", me: { user: data.user, company: data.company } });
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await refreshMe();
      } catch (err) {
        if (!cancelled) setState({ status: "error", message: err instanceof Error ? err.message : "Failed to load session" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshMe]);

  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/login";
  };

  const nav = useMemo(() => {
    return [
      { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/dashboard/requests", label: "Requests", icon: Truck },
      { to: "/dashboard/billing", label: "Billing & Invoices", icon: FileText },
      { to: "/dashboard/tracking", label: "Live Tracking", icon: MapPinned },
      { to: "/dashboard/account", label: "Account Settings", icon: Settings },
    ] as const;
  }, []);

  const title = state.status === "ready" ? state.me.company.name || state.me.company.memberNumber : "Dashboard";
  const subtitle =
    state.status === "ready" ? `Member ${state.me.company.memberNumber} • ${state.me.company.planType.replaceAll("_", " ")}` : "";

  return (
    <div className="min-h-screen section-dark">
      <div className="container mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={headerLogo} alt="EZ Lumper Services" className="h-10 w-auto object-contain" />
            </Link>
            <div>
              <div className="text-white text-xl font-bold">{title} Dashboard</div>
              <div className="text-surface-dark-muted text-sm">{subtitle}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/#signup" className="btn-cta-outline text-base py-3 px-6">
              View Plans
            </Link>
            <button onClick={logout} className="btn-cta text-base py-3 px-6">
              <span className="inline-flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 pt-8 pb-20">
        {state.status === "loading" ? (
          <div className="card-dark">
            <p className="text-surface-dark-muted">Loading…</p>
          </div>
        ) : state.status === "unauthenticated" ? (
          <div className="card-dark max-w-2xl">
            <p className="text-white font-semibold mb-2">You’re not logged in.</p>
            <p className="text-surface-dark-muted mb-6">Use the magic link login to access your dashboard.</p>
            <Link to="/login" className="btn-cta inline-flex items-center justify-center text-base py-3 px-6">
              Go to login
            </Link>
          </div>
        ) : state.status === "error" ? (
          <div className="card-dark max-w-2xl">
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-white">{state.message}</div>
          </div>
        ) : (
          <DashboardContext.Provider value={{ me: state.me, refreshMe }}>
            <div className="grid lg:grid-cols-[280px_1fr] gap-6">
              <aside className="card-dark p-4 h-fit lg:sticky lg:top-6">
                <div className="space-y-2">
                  {nav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          cx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors",
                            isActive
                              ? "bg-primary/15 border-primary/30 text-white"
                              : "bg-white/0 border-white/10 text-surface-dark-muted hover:text-white hover:border-white/20 hover:bg-white/5",
                          )
                        }
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-semibold">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white font-semibold mb-2">
                    <LifeBuoy className="w-4 h-4" />
                    Need help?
                  </div>
                  <p className="text-sm text-surface-dark-muted mb-3">
                    For urgent recoveries, submit a request in the dashboard and our dispatch team will respond.
                  </p>
                  <a className="text-primary hover:underline text-sm" href="/#signup">
                    Coverage rules & details
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-surface-dark-muted">
                      <CreditCard className="w-4 h-4" />
                      Credits
                    </div>
                    <div className="text-white font-bold mt-1">{state.me.company.credits}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-surface-dark-muted">
                      <Building2 className="w-4 h-4" />
                      Card
                    </div>
                    <div className="text-white font-bold mt-1">{state.me.company.cardOnFile ? "On file" : "Missing"}</div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-surface-dark-muted">
                  <div>Current path: {location.pathname}</div>
                </div>
              </aside>

              <section className="min-w-0">
                <Outlet />
              </section>
            </div>
          </DashboardContext.Provider>
        )}
      </main>
    </div>
  );
}

