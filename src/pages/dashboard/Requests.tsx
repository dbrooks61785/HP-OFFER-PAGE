import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useDashboard } from "./dashboardContext";
import { BadgeCheck, CircleAlert, Loader2, Send, Truck } from "lucide-react";

type RequestItem = {
  id: string;
  status: string;
  requestTier: "TIER_1" | "TIER_2" | "TIER_3" | "TIER_4" | string;
  destinationAddress: string;
  createdAt: string;
  creditsUsed: number;
  billAmountCents: number;
  paymentMode: string;
};

type CreateState = "idle" | "submitting" | "success" | "error";

function dollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Requests() {
  const { me, refreshMe } = useDashboard();

  const [items, setItems] = useState<{ status: "loading" } | { status: "ready"; items: RequestItem[] } | { status: "error" }>({
    status: "loading",
  });

  const [tier, setTier] = useState<"TIER_1" | "TIER_2" | "TIER_3" | "TIER_4">("TIER_1");
  const [requestorName, setRequestorName] = useState("");
  const [requestorContact, setRequestorContact] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentPreference, setPaymentPreference] = useState<"CREDITS" | "CREDITS_PLUS_DIFF" | "BILL_FULL">("CREDITS");
  const [createState, setCreateState] = useState<CreateState>("idle");
  const [createError, setCreateError] = useState<string | null>(null);
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);

  const reload = async () => {
    const res = await apiFetch("/requests");
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as any;
    setItems({ status: "ready", items: (data?.items ?? []) as RequestItem[] });
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await reload();
      } catch {
        if (!cancelled) setItems({ status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentRequests = useMemo(() => {
    if (items.status !== "ready") return [];
    return items.items.filter((r) => ["SUBMITTED", "ASSIGNED", "IN_PROGRESS"].includes(r.status));
  }, [items]);

  const previousRequests = useMemo(() => {
    if (items.status !== "ready") return [];
    return items.items.filter((r) => !["SUBMITTED", "ASSIGNED", "IN_PROGRESS"].includes(r.status));
  }, [items]);

  const canSubmit =
    createState !== "submitting" &&
    requestorName.trim().length > 1 &&
    requestorContact.trim().length > 3 &&
    destination.trim().length > 8 &&
    me.company.cardOnFile;

  const submit = async () => {
    setCreateState("submitting");
    setCreateError(null);
    setCreatedRequestId(null);
    try {
      const idempotencyKey = `web_${Math.random().toString(16).slice(2)}_${Date.now()}`;
      const res = await apiFetch("/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idempotency_key: idempotencyKey,
          request_tier: tier,
          requestor_name: requestorName.trim(),
          requestor_email_or_phone: requestorContact.trim(),
          destination_address: destination.trim(),
          payment_preference: paymentPreference,
        }),
      });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setCreateState("error");
        setCreateError(String((data && (data.error || data.message)) || `Request failed (${res.status})`));
        return;
      }
      setCreateState("success");
      setCreatedRequestId(String(data.request_id));
      await Promise.all([reload(), refreshMe()]);
      setDestination("");
    } catch (err) {
      setCreateState("error");
      setCreateError(err instanceof Error ? err.message : "Request failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-dark p-6">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="text-white text-xl font-bold">Create a new request</div>
            <div className="text-surface-dark-muted text-sm mt-1">
              Submit a recovery request and track status updates like a rideshare app: created → assigned → in progress → completed.
            </div>
          </div>
          <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-white font-semibold">Dispatch Portal</span>
          </div>
        </div>

        {!me.company.cardOnFile ? (
          <div className="mt-5 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
            <div className="flex items-start gap-2 text-white">
              <CircleAlert className="w-4 h-4 mt-0.5" />
              <div>
                <div className="font-semibold">Card on file required.</div>
                <div className="text-surface-dark-muted mt-1">
                  Your company must have a card on file before requests can be submitted. We can wire up a full “Add Card” flow next.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <form
          className="mt-6 grid lg:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            void submit();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-white mb-2">Request tier</label>
            <select
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={tier}
              onChange={(e) => setTier(e.target.value as any)}
            >
              <option value="TIER_1">Tier 1</option>
              <option value="TIER_2">Tier 2</option>
              <option value="TIER_3">Tier 3</option>
              <option value="TIER_4">Tier 4</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Payment preference</label>
            <select
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={paymentPreference}
              onChange={(e) => setPaymentPreference(e.target.value as any)}
            >
              <option value="CREDITS">Use credits (if possible)</option>
              <option value="CREDITS_PLUS_DIFF">Use credits + bill the difference</option>
              <option value="BILL_FULL">Bill full amount (save credits)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Requestor name</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={requestorName}
              onChange={(e) => setRequestorName(e.target.value)}
              placeholder="e.g. Dispatch Manager"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Requestor email or phone</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={requestorContact}
              onChange={(e) => setRequestorContact(e.target.value)}
              placeholder="you@company.com or (555) 555-5555"
              autoComplete="email"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">Destination address</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Street, city, state, zip"
              autoComplete="street-address"
            />
            <div className="text-surface-dark-muted text-xs mt-2">
              Tip: include gate/receiver notes. (We’ll add a dedicated notes field next.)
            </div>
          </div>

          {createState === "error" && createError ? (
            <div className="lg:col-span-2 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-white">{createError}</div>
          ) : null}

          {createState === "success" && createdRequestId ? (
            <div className="lg:col-span-2 p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm text-white">
              <div className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <div className="font-semibold">Request submitted.</div>
                  <div className="text-surface-dark-muted mt-1">
                    Request ID <span className="text-white font-mono">{createdRequestId}</span> is now in your active list.
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="lg:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-cta text-base py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="inline-flex items-center gap-2">
                {createState === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {createState === "submitting" ? "Submitting…" : "Submit request"}
              </span>
            </button>
            <button
              type="button"
              className="btn-cta-outline text-base py-3 px-6"
              onClick={() => {
                setDestination("");
                setCreateState("idle");
                setCreateError(null);
                setCreatedRequestId(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-dark p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-white font-bold text-lg">Current requests</div>
              <div className="text-surface-dark-muted text-sm">Requests that are still moving through dispatch.</div>
            </div>
          </div>

          {items.status === "loading" ? (
            <p className="text-surface-dark-muted text-sm">Loading…</p>
          ) : items.status === "error" ? (
            <p className="text-surface-dark-muted text-sm">Couldn’t load requests.</p>
          ) : currentRequests.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-semibold mb-1">No active requests.</p>
              <p className="text-surface-dark-muted text-sm">When you submit a request, it will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentRequests.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-white font-semibold">
                      {r.requestTier} • {r.status}
                    </div>
                    <div className="text-surface-dark-muted text-sm">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-surface-dark-muted text-sm mt-1">{r.destinationAddress}</div>
                  <div className="text-surface-dark-muted text-xs mt-2">
                    {r.creditsUsed > 0 ? `${r.creditsUsed} credits` : "0 credits"} • {dollars(r.billAmountCents)} • {r.paymentMode}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-dark p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-white font-bold text-lg">Previous requests</div>
              <div className="text-surface-dark-muted text-sm">Completed, cancelled, and archived activity.</div>
            </div>
          </div>

          {items.status === "loading" ? (
            <p className="text-surface-dark-muted text-sm">Loading…</p>
          ) : items.status === "error" ? (
            <p className="text-surface-dark-muted text-sm">Couldn’t load requests.</p>
          ) : previousRequests.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-semibold mb-1">No previous requests.</p>
              <p className="text-surface-dark-muted text-sm">Completed requests will automatically show up here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {previousRequests.slice(0, 10).map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-white font-semibold">
                      {r.requestTier} • {r.status}
                    </div>
                    <div className="text-surface-dark-muted text-sm">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-surface-dark-muted text-sm mt-1">{r.destinationAddress}</div>
                  <div className="text-surface-dark-muted text-xs mt-2">
                    {r.creditsUsed > 0 ? `${r.creditsUsed} credits` : "0 credits"} • {dollars(r.billAmountCents)} • {r.paymentMode}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

