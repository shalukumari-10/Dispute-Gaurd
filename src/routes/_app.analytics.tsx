import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, LineChart, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics" }] }),
  component: AnalyticsPage,
});

const volume = [
  { m: "Jan", v: 120 }, { m: "Feb", v: 180 }, { m: "Mar", v: 240 }, { m: "Apr", v: 200 },
  { m: "May", v: 320 }, { m: "Jun", v: 380 }, { m: "Jul", v: 410 }, { m: "Aug", v: 460 },
  { m: "Sep", v: 520 }, { m: "Oct", v: 480 }, { m: "Nov", v: 590 }, { m: "Dec", v: 640 },
];
const failed = [
  { d: "W1", f: 12 }, { d: "W2", f: 9 }, { d: "W3", f: 14 }, { d: "W4", f: 6 },
];
const refunds = [
  { d: "W1", r: 4 }, { d: "W2", r: 6 }, { d: "W3", r: 5 }, { d: "W4", r: 8 },
];
const settlement = [
  { name: "T+0 (Instant)", value: 62 },
  { name: "T+1", value: 24 },
  { name: "T+2", value: 9 },
  { name: "T+3+", value: 5 },
];
const colors = ["oklch(0.62 0.16 155)", "oklch(0.55 0.18 255)", "oklch(0.75 0.16 70)", "oklch(0.58 0.23 27)"];

function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Quantitative insight across volume, failures and fraud prevention.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Transaction volume</CardTitle><CardDescription>Last 12 months</CardDescription></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volume}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="v" fill="oklch(0.55 0.18 255)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Failed payments</CardTitle><CardDescription>Weekly trend</CardDescription></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={failed}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line dataKey="f" stroke="oklch(0.58 0.23 27)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Refund trends</CardTitle><CardDescription>Successful refunds processed</CardDescription></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={refunds}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="r" fill="oklch(0.62 0.16 155)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Settlement delay</CardTitle><CardDescription>Distribution across windows</CardDescription></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={settlement} dataKey="value" innerRadius={60} outerRadius={95} paddingAngle={2}>
                  {settlement.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Fraud prevention metrics</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-4">
          {[
            { k: "₹4.2L", v: "Saved this month" },
            { k: "138", v: "Threats blocked" },
            { k: "99.7%", v: "Authentic txns" },
            { k: "2.1m", v: "Avg response" },
          ].map(s => (
            <div key={s.v} className="rounded-xl border bg-muted/30 p-4">
              <div className="text-2xl font-bold">{s.k}</div>
              <div className="text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
