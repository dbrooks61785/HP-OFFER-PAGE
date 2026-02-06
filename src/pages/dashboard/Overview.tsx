import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, CreditCard, MapPin, Truck } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useDashboard } from "./dashboardContext";
import hero from "@/assets/dashboard-hero.svg";

type RequestItem = {
  id: string;
  status: string;
  requestTier: string;
  destinationAddress: string;
  createdAt: string;
  creditsUsed: number;
  billAmountCents: number;
  paymentMode: string;
};

export default function Overview() {
  const { me } = useDashboard();
  const [requests, setRequests] = useState<{ status: "loading" } | { status: "ready"; items: RequestItem[] } | { status: "error" }>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await apiFetch("/requests");
        if (!res.ok) {
          if (!cancelled) setRequests({ status: "error" });
          return;
        }
        const data = (await res.json()) as any;
        if (!cancelled) setRequests({ status: "ready", items: (data?.items ?? []) as RequestItem[] });
      } catch {
        if (!cancelled) setRequests({ status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeCount = useMemo(() => {
    if (requests.status !== "ready") return 0;
    return requests.items.filter((r) => ["SUBMITTED", "ASSIGNED", "IN_PROGRESS"].includes(r.status)).length;
  }, [requests]);

  const recent = useMemo(() => {
    if (requests.status !== "ready") return [];
    return requests.items.slice(0, 5);
  }, [requests]);

  return (
    <div className="space-y-6">
      <div className="card-dark p-6 overflow-hidden">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div>
            <div className="text-white text-2xl font-bold">Dispatch, billing, and tracking — in one place</div>
            <div className="text-surface-dark-muted mt-2">
              Build requests like a rideshare workflow, follow live status updates, and download invoices without leaving the portal.
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link to="/dashboard/requests" className="btn-cta text-base py-3 px-6">
                Create a request
              </Link>
              <Link to="/dashboard/tracking" className="btn-cta-outline text-base py-3 px-6">
                Open tracking
              </Link>
            </div>
          </div>
          <div className="lg:flex lg:justify-end">
            <img src={hero} alt="" className="w-full max-w-[560px] rounded-2xl border border-white/10 bg-white/5" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-surface-dark-muted text-sm">Credits available</div>
              <div className="text-white text-3xl font-bold mt-1">{me.company.credits}</div>
            </div>
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div className="text-surface-dark-muted text-sm mt-3">Use credits first, or bill the full amount per request.</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-surface-dark-muted text-sm">Active requests</div>
              <div className="text-white text-3xl font-bold mt-1">{activeCount}</div>
            </div>
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div className="text-surface-dark-muted text-sm mt-3">Track status, updates, and request history.</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-surface-dark-muted text-sm">Plan</div>
              <div className="text-white text-xl font-bold mt-1">{me.company.planType.replaceAll("_", " ")}</div>
            </div>
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div className="text-surface-dark-muted text-sm mt-3">
            {me.company.planType === "HAUL_PASS" ? "Guaranteed response (Primary Zones) + SLA credit protection." : "Priority dispatch (no guaranteed response / SLA credits)."}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-surface-dark-muted text-sm">Live tracking</div>
              <div className="text-white text-xl font-bold mt-1">Map view</div>
            </div>
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div className="text-surface-dark-muted text-sm mt-3">See dispatched crew status + last known location.</div>
          <div className="mt-4">
            <Link to="/dashboard/tracking" className="text-primary hover:underline text-sm font-semibold">
              Open tracking →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-dark p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-white font-bold text-lg">Quick actions</div>
              <div className="text-surface-dark-muted text-sm">Everything you need is one click away.</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link to="/dashboard/requests" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-white font-semibold">Create a request</div>
              <div className="text-surface-dark-muted text-sm mt-1">Submit a Tier 1–4 recovery.</div>
            </Link>
            <Link to="/dashboard/billing" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-white font-semibold">Billing & invoices</div>
              <div className="text-surface-dark-muted text-sm mt-1">Download invoices and view totals.</div>
            </Link>
            <Link to="/dashboard/account" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-white font-semibold">Account settings</div>
              <div className="text-surface-dark-muted text-sm mt-1">Update company + billing info.</div>
            </Link>
            <a href="/#signup" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-white font-semibold">Coverage details</div>
              <div className="text-surface-dark-muted text-sm mt-1">Rules, zones, and SLA info.</div>
            </a>
          </div>
        </div>

        <div className="card-dark p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-white font-bold text-lg">Recent requests</div>
              <div className="text-surface-dark-muted text-sm">Most recent activity for your company.</div>
            </div>
            <Link to="/dashboard/requests" className="text-primary hover:underline text-sm font-semibold">
              View all →
            </Link>
          </div>

          {requests.status === "loading" ? (
            <p className="text-surface-dark-muted text-sm">Loading…</p>
          ) : requests.status === "error" ? (
            <p className="text-surface-dark-muted text-sm">Couldn’t load requests.</p>
          ) : recent.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-semibold mb-1">No requests yet.</p>
              <p className="text-surface-dark-muted text-sm">When you submit a request, it will show up here in real time.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-white font-semibold">
                      {r.requestTier} • {r.status}
                    </div>
                    <div className="text-surface-dark-muted text-sm">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-surface-dark-muted text-sm mt-1">{r.destinationAddress}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

