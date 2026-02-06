import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { MapPin, Radar, Sparkles } from "lucide-react";

type RequestItem = {
  id: string;
  status: string;
  requestTier: string;
  destinationAddress: string;
  createdAt: string;
};

const DEFAULT_MARKER = { lat: 41.8781, lng: -87.6298, label: "Demo marker (Chicago)" };

type TrackingPing = { recordedAt: string; lat: number; lng: number; accuracyM?: number | null };
type TrackingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; destination: { lat: number | null; lng: number | null }; pings: TrackingPing[] }
  | { status: "error" };

function buildOsmEmbedUrl(lat: number, lng: number) {
  const delta = 0.25;
  const left = lng - delta;
  const right = lng + delta;
  const top = lat + delta;
  const bottom = lat - delta;
  const url = new URL("https://www.openstreetmap.org/export/embed.html");
  url.searchParams.set("bbox", `${left},${bottom},${right},${top}`);
  url.searchParams.set("layer", "mapnik");
  url.searchParams.set("marker", `${lat},${lng}`);
  return url.toString();
}

export default function Tracking() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [tracking, setTracking] = useState<TrackingState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await apiFetch("/requests");
      if (!res.ok) return;
      const data = (await res.json()) as any;
      const items = (data?.items ?? []) as RequestItem[];
      if (cancelled) return;
      setRequests(items);
      const active = items.find((r) => ["SUBMITTED", "ASSIGNED", "IN_PROGRESS"].includes(r.status));
      setSelectedId(active?.id ?? items[0]?.id ?? "");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(() => requests.find((r) => r.id === selectedId) ?? null, [requests, selectedId]);

  useEffect(() => {
    let cancelled = false;
    if (!selectedId) return;
    setTracking({ status: "loading" });
    void (async () => {
      try {
        const res = await apiFetch(`/requests/${encodeURIComponent(selectedId)}/tracking`);
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as any;
        const req = data?.request as any;
        if (!cancelled) {
          setTracking({
            status: "ready",
            destination: { lat: req?.destinationLat ?? null, lng: req?.destinationLng ?? null },
            pings: (req?.trackingPings ?? []) as TrackingPing[],
          });
        }
      } catch {
        if (!cancelled) setTracking({ status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const marker = useMemo(() => {
    if (tracking.status === "ready" && tracking.pings.length > 0) {
      const last = tracking.pings[0];
      return { lat: last.lat, lng: last.lng, label: `Last crew ping • ${new Date(last.recordedAt).toLocaleTimeString()}` };
    }
    return DEFAULT_MARKER;
  }, [tracking]);
  const mapUrl = buildOsmEmbedUrl(marker.lat, marker.lng);

  return (
    <div className="space-y-6">
      <div className="card-dark p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-white text-xl font-bold">Live tracking</div>
            <div className="text-surface-dark-muted text-sm mt-1">
              Map + status updates for dispatched crews. (Next step: show real-time crew pings tied to each request.)
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-primary/10 border border-primary/30">
            <Radar className="w-4 h-4 text-primary" />
            <span className="text-white font-semibold">Status + ETA</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-6">
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-white font-semibold mb-2">Select a request</div>
              <select
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {requests.length === 0 ? <option value="">No requests</option> : null}
                {requests.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.requestTier} • {r.status} • {new Date(r.createdAt).toLocaleDateString()}
                  </option>
                ))}
              </select>
              {selected ? (
                <div className="mt-3 text-sm">
                  <div className="text-surface-dark-muted">Destination</div>
                  <div className="text-white font-semibold mt-1">{selected.destinationAddress}</div>
                </div>
              ) : (
                <div className="mt-3 text-sm text-surface-dark-muted">Create a request to see tracking.</div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-white font-semibold mb-2">Dispatch timeline</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Submitted", hint: "Request received" },
                  { label: "Assigned", hint: "Crew dispatched" },
                  { label: "In Progress", hint: "Work underway" },
                  { label: "Completed", hint: "Recovered / closed out" },
                ].map((step) => (
                  <div key={step.label} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <div className="text-white font-semibold">{step.label}</div>
                      <div className="text-surface-dark-muted text-xs">{step.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-white font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                What’s coming next
              </div>
              <ul className="text-sm text-surface-dark-muted space-y-2">
                <li>Capture destination coordinates at intake (lat/lng)</li>
                <li>Crew mobile “clock-in / clock-out” + live pings</li>
                <li>True ETA + dispatch chat / notifications</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="text-white font-semibold">Map</div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-surface-dark-muted">
                <MapPin className="w-4 h-4 text-primary" />
                {marker.label}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe title="Live tracking map" src={mapUrl} className="w-full h-[520px]" />
            </div>
            <div className="text-xs text-surface-dark-muted mt-3">
              {tracking.status === "ready" && tracking.pings.length > 0
                ? `Showing latest crew ping (total pings: ${tracking.pings.length}).`
                : "No crew pings yet. This map will become live once dispatch starts sending tracking pings."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

