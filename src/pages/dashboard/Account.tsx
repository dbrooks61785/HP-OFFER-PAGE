import { useMemo, useState } from "react";
import { BadgeCheck, CircleAlert, Loader2, RefreshCw, Save } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useDashboard } from "./dashboardContext";

type SaveState = "idle" | "saving" | "success" | "error";

export default function Account() {
  const { me, refreshMe } = useDashboard();

  const [companyName, setCompanyName] = useState(me.company.name ?? "");
  const [billingEmail, setBillingEmail] = useState(me.company.billingEmail ?? me.user.email ?? "");
  const [billingPhone, setBillingPhone] = useState(me.company.billingPhone ?? "");
  const [userPhone, setUserPhone] = useState(me.user.phone ?? "");

  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSave = useMemo(() => {
    return state !== "saving" && billingEmail.trim().length > 3;
  }, [billingEmail, state]);

  const save = async () => {
    setState("saving");
    setError(null);
    try {
      const res = await apiFetch("/account", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          company_name: companyName.trim() || undefined,
          billing_email: billingEmail.trim() || undefined,
          billing_phone: billingPhone.trim() || undefined,
          user_phone: userPhone.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setState("error");
        setError(String((data && (data.error || data.message)) || `Save failed (${res.status})`));
        return;
      }
      await refreshMe();
      setState("success");
      setTimeout(() => setState("idle"), 1500);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const syncFromGhl = async () => {
    setState("saving");
    setError(null);
    try {
      const res = await apiFetch("/account/sync", { method: "POST" });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setState("error");
        setError(String((data && (data.error || data.message)) || `Sync failed (${res.status})`));
        return;
      }
      await refreshMe();
      setState("success");
      setTimeout(() => setState("idle"), 1500);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Sync failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-dark p-6">
        <div className="text-white text-xl font-bold">Account settings</div>
        <div className="text-surface-dark-muted text-sm mt-1">Update your company profile + billing contact details.</div>

        <div className="grid lg:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Company name</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. CH Robinson"
              autoComplete="organization"
            />
            <div className="text-surface-dark-muted text-xs mt-2">This is what will show in the dashboard header.</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Billing email</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              placeholder="billing@company.com"
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Billing phone</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={billingPhone}
              onChange={(e) => setBillingPhone(e.target.value)}
              placeholder="(555) 555-5555"
              autoComplete="tel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Your phone</label>
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="(555) 555-5555"
              autoComplete="tel"
            />
          </div>
        </div>

        {state === "error" && error ? (
          <div className="mt-5 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-white">
            <div className="flex items-start gap-2">
              <CircleAlert className="w-4 h-4 mt-0.5" />
              <div>{error}</div>
            </div>
          </div>
        ) : null}

        {state === "success" ? (
          <div className="mt-5 p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm text-white">
            <div className="flex items-start gap-2">
              <BadgeCheck className="w-4 h-4 mt-0.5 text-primary" />
              <div>Saved.</div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button onClick={save} disabled={!canSave} className="btn-cta text-base py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed">
            <span className="inline-flex items-center gap-2">
              {state === "saving" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {state === "saving" ? "Saving…" : "Save changes"}
            </span>
          </button>
          <button onClick={syncFromGhl} disabled={state === "saving"} className="btn-cta-outline text-base py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed">
            <span className="inline-flex items-center gap-2">
              <RefreshCw className={state === "saving" ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
              Sync from GHL
            </span>
          </button>
          <button
            type="button"
            className="btn-cta-outline text-base py-3 px-6"
            onClick={() => {
              setCompanyName(me.company.name ?? "");
              setBillingEmail(me.company.billingEmail ?? me.user.email ?? "");
              setBillingPhone(me.company.billingPhone ?? "");
              setUserPhone(me.user.phone ?? "");
              setState("idle");
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="card-dark p-6">
        <div className="text-white font-bold text-lg">Member details</div>
        <div className="text-surface-dark-muted text-sm mt-1">Internal identifiers for support.</div>
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-surface-dark-muted text-sm">Member number</div>
            <div className="text-white font-semibold mt-1">{me.company.memberNumber}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-surface-dark-muted text-sm">Role</div>
            <div className="text-white font-semibold mt-1">{me.user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

