import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Banknote, Network, Building2, Store, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/money-flow")({
  head: () => ({ meta: [{ title: "Money Flow Tracker" }] }),
  component: MoneyFlow,
});

type NodeStatus = "ok" | "pending" | "error";
type FlowNode = {
  id: string; label: string; sub: string; status: NodeStatus; icon: typeof Banknote;
  x: number; y: number; tip: { rrn: string; settlement: string; ts: string; eta: string; api: string };
};

const nodes: FlowNode[] = [
  { id: "cust", label: "Customer Bank", sub: "HDFC • XXXX-3421", status: "ok", icon: Banknote, x: 60, y: 180,
    tip: { rrn: "412318892341", settlement: "Debited", ts: "10:42:01", eta: "—", api: "200 OK" } },
  { id: "npci", label: "NPCI Switch", sub: "UPI Rail • PSP routing", status: "ok", icon: Network, x: 340, y: 80,
    tip: { rrn: "412318892341", settlement: "Routed", ts: "10:42:02", eta: "—", api: "200 OK" } },
  { id: "payee", label: "Payee Bank", sub: "Axis Bank • Beneficiary", status: "pending", icon: Building2, x: 620, y: 180,
    tip: { rrn: "412318892341", settlement: "In settlement", ts: "10:42:04", eta: "2 hr", api: "202 Accepted" } },
  { id: "merch", label: "Merchant", sub: "Amazon India", status: "error", icon: Store, x: 900, y: 80,
    tip: { rrn: "412318892341", settlement: "Reconciliation failed", ts: "10:42:09", eta: "T+1", api: "504 Timeout" } },
];

const edges: Array<{ from: string; to: string; status: NodeStatus }> = [
  { from: "cust", to: "npci", status: "ok" },
  { from: "npci", to: "payee", status: "ok" },
  { from: "payee", to: "merch", status: "error" },
];

const statusMeta: Record<NodeStatus, { color: string; bg: string; ring: string; label: string; icon: typeof CheckCircle2 }> = {
  ok:      { color: "text-success", bg: "bg-success/10", ring: "ring-success/40", label: "Success", icon: CheckCircle2 },
  pending: { color: "text-warning", bg: "bg-warning/10", ring: "ring-warning/40", label: "Pending", icon: Clock },
  error:   { color: "text-destructive", bg: "bg-destructive/10", ring: "ring-destructive/40", label: "Failed", icon: AlertTriangle },
};

function MoneyFlow() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Money Flow Tracker</h1>
          <p className="text-sm text-muted-foreground">Trace every leg of your transaction across the payment rail in real time.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> 2 successful</Badge>
          <Badge variant="outline" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> 1 pending</Badge>
          <Badge variant="outline" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> 1 failed</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">RRN 412318892341 • ₹2,499 to Amazon India</CardTitle>
          <CardDescription>Initiated 10:42 AM • Stuck in payee-merchant reconciliation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-x-auto rounded-xl border bg-gradient-to-br from-muted/30 to-background p-4">
            <svg viewBox="0 0 1020 360" className="min-w-[1020px]">
              <defs>
                <marker id="arr-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.62 0.16 155)" />
                </marker>
                <marker id="arr-err" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.58 0.23 27)" />
                </marker>
              </defs>
              {edges.map((e, i) => {
                const a = nodes.find(n => n.id === e.from)!;
                const b = nodes.find(n => n.id === e.to)!;
                const stroke = e.status === "error" ? "oklch(0.58 0.23 27)" : e.status === "pending" ? "oklch(0.75 0.16 70)" : "oklch(0.62 0.16 155)";
                const d = `M ${a.x + 90} ${a.y + 40} C ${(a.x + b.x) / 2} ${a.y + 40}, ${(a.x + b.x) / 2} ${b.y + 40}, ${b.x + 10} ${b.y + 40}`;
                return (
                  <g key={i}>
                    <path d={d} stroke={stroke} strokeOpacity={0.25} strokeWidth={3} fill="none" />
                    <path d={d} stroke={stroke} strokeWidth={2.5} fill="none" className="flow-line"
                      markerEnd={e.status === "error" ? "url(#arr-err)" : "url(#arr-ok)"} />
                  </g>
                );
              })}
            </svg>

            {nodes.map((n, i) => {
              const meta = statusMeta[n.status];
              const Icon = n.icon;
              const StatusIcon = meta.icon;
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                  className="absolute"
                  style={{ left: n.x, top: n.y }}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <div className={`relative w-[180px] rounded-xl border bg-card p-3 shadow-md ring-2 ${meta.ring} transition-transform hover:-translate-y-0.5`}>
                    <div className="flex items-center gap-2">
                      <div className={`grid h-9 w-9 place-items-center rounded-lg ${meta.bg} ${meta.color}`}><Icon className="h-4 w-4" /></div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{n.label}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{n.sub}</div>
                      </div>
                    </div>
                    <div className={`mt-2 flex items-center gap-1 text-[11px] ${meta.color}`}>
                      <StatusIcon className="h-3 w-3" />{meta.label}
                      {n.status !== "ok" && <span className="ml-auto inline-block h-2 w-2 animate-ping rounded-full bg-current" />}
                    </div>

                    {hover === n.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border bg-popover p-3 text-xs shadow-xl"
                      >
                        <div className="mb-2 font-semibold">{n.label}</div>
                        <dl className="grid grid-cols-2 gap-y-1">
                          <dt className="text-muted-foreground">RRN</dt><dd className="font-mono">{n.tip.rrn}</dd>
                          <dt className="text-muted-foreground">Settlement</dt><dd>{n.tip.settlement}</dd>
                          <dt className="text-muted-foreground">Timestamp</dt><dd>{n.tip.ts}</dd>
                          <dt className="text-muted-foreground">Refund ETA</dt><dd>{n.tip.eta}</dd>
                          <dt className="text-muted-foreground">API status</dt><dd className={meta.color}>{n.tip.api}</dd>
                        </dl>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <div className="h-[360px]" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { t: "Recommended Action", b: "Auto-draft dispute to NPCI with full chain evidence and request chargeback to merchant.", c: "text-primary" },
          { t: "Settlement Window", b: "Reconciliation expected by T+1 17:00 IST. Auto-refund triggers if unresolved.", c: "text-warning" },
          { t: "Risk Indicator", b: "Merchant gateway has 4 similar timeouts in last hour. Flagged for monitoring.", c: "text-destructive" },
        ].map(c => (
          <Card key={c.t}>
            <CardHeader className="pb-2"><CardTitle className={`text-sm ${c.c}`}>{c.t}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{c.b}</CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2"><Button>File AI-assisted dispute</Button><Button variant="outline">Download trace report</Button></div>
    </div>
  );
}
