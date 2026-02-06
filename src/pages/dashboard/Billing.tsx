import { useEffect, useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { apiFetch, API_BASE_URL } from "@/lib/api";
import { useDashboard } from "./dashboardContext";

type BillingItem = {
  id: string;
  createdAt: string;
  status: string;
  requestTier: string;
  creditsUsed: number;
  billAmountCents: number;
  paymentMode: string;
  destinationAddress: string;
};

function dollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Billing() {
  const { me } = useDashboard();
  const [state, setState] = useState<{ status: "loading" } | { status: "ready"; items: BillingItem[] } | { status: "error" }>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await apiFetch("/billing/history");
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as any;
        if (!cancelled) setState({ status: "ready", items: (data?.items ?? []) as BillingItem[] });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totals = useMemo(() => {
    if (state.status !== "ready") return { billedCents: 0, creditsUsed: 0, count: 0 };
    return state.items.reduce(
      (acc, r) => {
        acc.billedCents += r.billAmountCents;
        acc.creditsUsed += r.creditsUsed;
        acc.count += 1;
        return acc;
      },
      { billedCents: 0, creditsUsed: 0, count: 0 },
    );
  }, [state]);

  return (
    <div className="space-y-6">
      <div className="card-dark p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-white text-xl font-bold">Billing & invoices</div>
            <div className="text-surface-dark-muted text-sm mt-1">
              Review billing history and download invoices per request. (We’ll upgrade invoice PDFs + Stripe status next.)
            </div>
          </div>
          <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-white font-semibold">{me.company.billingEmail || me.user.email}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-surface-dark-muted text-sm">Requests billed</div>
            <div className="text-white text-3xl font-bold mt-1">{totals.count}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-surface-dark-muted text-sm">Credits used</div>
            <div className="text-white text-3xl font-bold mt-1">{totals.creditsUsed}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-surface-dark-muted text-sm">Billable total</div>
            <div className="text-white text-3xl font-bold mt-1">{dollars(totals.billedCents)}</div>
          </div>
        </div>
      </div>

      <div className="card-dark p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-white font-bold text-lg">History</div>
            <div className="text-surface-dark-muted text-sm">Latest 100 entries.</div>
          </div>
        </div>

        {state.status === "loading" ? (
          <p className="text-surface-dark-muted text-sm">Loading…</p>
        ) : state.status === "error" ? (
          <p className="text-surface-dark-muted text-sm">Couldn’t load billing history.</p>
        ) : state.items.length === 0 ? (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-1">No billing entries yet.</p>
            <p className="text-surface-dark-muted text-sm">Once a request is submitted, it will appear here.</p>
          </div>
        ) : (
          <div className="overflow-auto rounded-xl border border-white/10">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left text-surface-dark-muted">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Request</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Credits</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((r) => (
                  <tr key={r.id} className="border-t border-white/10">
                    <td className="px-4 py-3 text-surface-dark-muted">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="text-white font-mono text-xs">{r.id}</div>
                      <div className="text-surface-dark-muted text-xs mt-1">{r.status}</div>
                    </td>
                    <td className="px-4 py-3 text-white">{r.requestTier}</td>
                    <td className="px-4 py-3 text-surface-dark-muted">{r.paymentMode}</td>
                    <td className="px-4 py-3 text-white">{r.creditsUsed}</td>
                    <td className="px-4 py-3 text-white">{dollars(r.billAmountCents)}</td>
                    <td className="px-4 py-3">
                      <a
                        className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                        href={`${API_BASE_URL}/requests/${encodeURIComponent(r.id)}/invoice`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

