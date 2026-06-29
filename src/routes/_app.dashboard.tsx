import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Wallet, ArrowLeftRight, FileWarning, ShieldAlert, RefreshCw, TrendingUp, TrendingDown, ArrowUpRight, Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/animated-counter";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard | Smart Dispute Fraud Guard" }] }),
  component: Dashboard,
});

const trend = [
  { d: "Mon", v: 240 }, { d: "Tue", v: 320 }, { d: "Wed", v: 280 },
  { d: "Thu", v: 410 }, { d: "Fri", v: 380 }, { d: "Sat", v: 520 }, { d: "Sun", v: 470 },
];

const stats = [
  { label: "Account Balance", icon: Wallet, value: 248932, prefix: "₹", delta: "+2.4%", trend: "up", sub: "Savings • XXXX-3421", color: "text-primary" },
  { label: "Transactions Today", icon: ArrowLeftRight, value: 47, delta: "+12", trend: "up", sub: "₹84,210 volume", color: "text-chart-1" },
  { label: "Pending Disputes", icon: FileWarning, value: 3, delta: "-1", trend: "down", sub: "2 awaiting NPCI", color: "text-warning" },
  { label: "Fraud Risk Score", icon: ShieldAlert, value: 18, suffix: "/100", delta: "Low", trend: "down", sub: "AI evaluated 8m ago", color: "text-success" },
  { label: "Refunds in Progress", icon: RefreshCw, value: 4, delta: "₹12,400", trend: "up", sub: "ETA: 2-5 business days", color: "text-chart-5" },
];

const recent = [
  { merchant: "Amazon India", upi: "amazon@apl", amount: -2499, time: "10:42 AM", status: "Success" },
  { merchant: "Zomato", upi: "zomato@hdfcbank", amount: -487, time: "09:18 AM", status: "Success" },
  { merchant: "IRCTC", upi: "irctc@sbi", amount: -1240, time: "Yesterday", status: "Disputed" },
  { merchant: "Salary Credit", upi: "acme.payroll@icici", amount: 142500, time: "Yesterday", status: "Success" },
  { merchant: "BigBasket", upi: "bigbasket@axisbank", amount: -3210, time: "2 days ago", status: "Refund" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Rahul</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening across your accounts today.</p>
        </div>
        <Button asChild variant="outline" className="gap-2"><Link to="/money-flow"><Activity className="h-4 w-4" /> Open Money Flow</Link></Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">{s.label}</CardDescription>
                  <div className={`grid h-8 w-8 place-items-center rounded-lg bg-muted ${s.color}`}><s.icon className="h-4 w-4" /></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  <AnimatedCounter value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className={`inline-flex items-center gap-0.5 font-medium ${s.trend === "up" ? "text-success" : "text-muted-foreground"}`}>
                    {s.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{s.delta}
                  </span>
                  <span className="text-muted-foreground">{s.sub}</span>
                </div>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Transaction Volume</CardTitle>
              <CardDescription>Last 7 days • ₹ in thousands</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1"><ArrowUpRight className="h-3 w-3" /> 18.2% vs last week</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="oklch(0.55 0.18 255)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.55 0.18 255)" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fraud Shield Status</CardTitle>
            <CardDescription>Real-time protection layers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Device Trust", v: 96 },
              { name: "Behaviour Score", v: 88 },
              { name: "Geo-fence Match", v: 100 },
              { name: "Merchant Reputation", v: 74 },
            ].map(p => (
              <div key={p.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{p.name}</span>
                  <span className="font-medium tabular-nums">{p.v}%</span>
                </div>
                <Progress value={p.v} className="h-2" />
              </div>
            ))}
            <div className="mt-4 rounded-lg border border-success/30 bg-success/10 p-3 text-xs text-success-foreground/90">
              <div className="font-medium text-success">All systems secure</div>
              Last threat scan: 8 minutes ago
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle className="text-base">Recent Transactions</CardTitle><CardDescription>Today's activity</CardDescription></div>
          <Button asChild variant="ghost" size="sm"><Link to="/transactions">View all</Link></Button>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {recent.map((t, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold uppercase">
                    {t.merchant.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{t.merchant}</div>
                    <div className="truncate text-xs text-muted-foreground">{t.upi} • {t.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold tabular-nums ${t.amount > 0 ? "text-success" : ""}`}>
                    {t.amount > 0 ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                  </span>
                  <Badge variant={t.status === "Success" ? "secondary" : t.status === "Disputed" ? "destructive" : "outline"}>{t.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
