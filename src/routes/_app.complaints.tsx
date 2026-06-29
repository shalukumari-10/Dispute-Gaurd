import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Send, Search, Gavel, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/complaints")({
  head: () => ({ meta: [{ title: "Complaint Center" }] }),
  component: ComplaintsPage,
});

const steps = [
  { t: "Draft Generated", s: "10:43, 29 Jun", icon: FileText, done: true },
  { t: "Submitted", s: "10:44, 29 Jun", icon: Send, done: true },
  { t: "NPCI Review", s: "In progress", icon: Search, done: false, active: true },
  { t: "RBI Escalation", s: "Pending", icon: Gavel, done: false },
  { t: "Resolved", s: "Pending", icon: CheckCircle2, done: false },
];

const cases = [
  { id: "DSP-9412", merchant: "Amazon India", amount: 2499, stage: "NPCI Review", age: "2h", priority: "High" },
  { id: "DSP-9398", merchant: "IRCTC", amount: 1240, stage: "Bank Investigation", age: "1d", priority: "Medium" },
  { id: "DSP-9367", merchant: "Swiggy", amount: 642, stage: "Resolved", age: "5d", priority: "Low" },
  { id: "DSP-9301", merchant: "BigBasket", amount: 3210, stage: "Refunded", age: "12d", priority: "Low" },
];

function ComplaintsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Complaint Center</h1>
        <p className="text-sm text-muted-foreground">Track dispute lifecycle from draft to RBI resolution.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">DSP-9412 • Amazon India dispute</CardTitle>
          <CardDescription>RRN 412318892341 • ₹2,499</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="relative grid grid-cols-1 gap-3 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={i} className={`relative rounded-xl border p-4 ${s.active ? "border-primary bg-primary/5" : s.done ? "bg-muted/30" : ""}`}>
                <div className={`grid h-9 w-9 place-items-center rounded-lg ${s.done ? "bg-success/15 text-success" : s.active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {s.active ? <Clock className="h-4 w-4 animate-pulse" /> : <s.icon className="h-4 w-4" />}
                </div>
                <div className="mt-3 text-sm font-semibold">{s.t}</div>
                <div className="text-xs text-muted-foreground">{s.s}</div>
                {i < steps.length - 1 && <div className="absolute right-[-6px] top-1/2 hidden h-px w-3 bg-border md:block" />}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle className="text-base">All complaints</CardTitle><CardDescription>4 active • 12 historical</CardDescription></div>
          <Button size="sm">New complaint</Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {cases.map(c => (
            <div key={c.id} className="grid grid-cols-1 items-center gap-2 rounded-lg border p-3 md:grid-cols-[140px_1fr_120px_140px_100px_auto]">
              <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
              <span className="text-sm font-medium">{c.merchant}</span>
              <span className="text-sm font-semibold tabular-nums">₹{c.amount.toLocaleString("en-IN")}</span>
              <Badge variant="outline">{c.stage}</Badge>
              <Badge variant={c.priority === "High" ? "destructive" : c.priority === "Medium" ? "outline" : "secondary"}>{c.priority}</Badge>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
