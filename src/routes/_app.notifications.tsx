import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, RefreshCw, Bot, CheckCircle2, Bell } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications" }] }),
  component: NotificationsPage,
});

const groups = [
  {
    label: "Security alerts", items: [
      { icon: ShieldAlert, color: "text-destructive bg-destructive/10", t: "Unknown sign-in attempt from Dubai blocked", s: "2 minutes ago", tag: "Critical" },
      { icon: ShieldAlert, color: "text-warning bg-warning/10", t: "New device requesting access: Android (Pune)", s: "1 hour ago", tag: "Warning" },
    ]
  },
  {
    label: "Refunds & settlements", items: [
      { icon: RefreshCw, color: "text-success bg-success/10", t: "BigBasket refund of ₹3,210 credited", s: "Today 09:11", tag: "Refund" },
      { icon: CheckCircle2, color: "text-success bg-success/10", t: "Uber refund settled to source account", s: "Yesterday", tag: "Settled" },
    ]
  },
  {
    label: "NPCI responses", items: [
      { icon: Bell, color: "text-primary bg-primary/10", t: "NPCI acknowledged dispute DSP-9412", s: "10:46 AM", tag: "NPCI" },
      { icon: Bell, color: "text-primary bg-primary/10", t: "IRCTC dispute moved to bank investigation", s: "Mon 16:02", tag: "NPCI" },
    ]
  },
  {
    label: "AI recommendations", items: [
      { icon: Bot, color: "text-primary bg-primary/10", t: "Enable card-not-present block to reduce 64% fraud", s: "AI • Today", tag: "Suggested" },
      { icon: Bot, color: "text-primary bg-primary/10", t: "Set ₹10,000 UPI velocity cap based on usage", s: "AI • Today", tag: "Suggested" },
    ]
  },
];

function NotificationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">Real-time security and account updates.</p>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map(g => (
          <Card key={g.label}>
            <CardHeader className="pb-2"><CardTitle className="text-base">{g.label}</CardTitle><CardDescription>{g.items.length} updates</CardDescription></CardHeader>
            <CardContent className="space-y-2">
              {g.items.map((n, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/40">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${n.color}`}><n.icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{n.t}</div>
                    <div className="text-xs text-muted-foreground">{n.s}</div>
                  </div>
                  <Badge variant="outline">{n.tag}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
