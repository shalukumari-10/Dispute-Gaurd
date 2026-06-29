import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Activity, ShieldAlert, MapPin, Smartphone, AlertTriangle, Sparkle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/fraud")({
  head: () => ({ meta: [{ title: "Fraud Intelligence" }] }),
  component: FraudPage,
});

const score = 18;

const suspicious = [
  { merchant: "Unknown POS • Dubai", amount: 18450, time: "2m ago", reason: "Cross-border merchant new to profile", level: "High" },
  { merchant: "TopUp Cash24", amount: 9999, time: "1h ago", reason: "Velocity threshold exceeded", level: "Medium" },
  { merchant: "QuickPay Wallet", amount: 4999, time: "3h ago", reason: "Device mismatch (Android)", level: "Medium" },
];

const devices = [
  { name: "iPhone 15 Pro", os: "iOS 19", trust: "Trusted", last: "Active now", primary: true },
  { name: "MacBook Pro", os: "macOS 16", trust: "Trusted", last: "20m ago" },
  { name: "Unknown Android", os: "Android 15", trust: "New", last: "Yesterday" },
];

const timeline = [
  { t: "Velocity rule triggered", s: "2m ago", c: "text-destructive" },
  { t: "Geo anomaly flagged (Dubai)", s: "2m ago", c: "text-destructive" },
  { t: "OTP delivered successfully", s: "12m ago", c: "text-success" },
  { t: "Device fingerprint match", s: "1h ago", c: "text-success" },
];

function Gauge({ v }: { v: number }) {
  const angle = -90 + (v / 100) * 180;
  return (
    <div className="relative mx-auto h-44 w-72">
      <svg viewBox="0 0 200 110" className="w-full">
        <defs>
          <linearGradient id="gg" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.16 155)" />
            <stop offset="50%" stopColor="oklch(0.75 0.16 70)" />
            <stop offset="100%" stopColor="oklch(0.58 0.23 27)" />
          </linearGradient>
        </defs>
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="var(--muted)" strokeWidth={14} strokeLinecap="round" />
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="url(#gg)" strokeWidth={14} strokeLinecap="round"
          strokeDasharray={`${(v / 100) * 283} 283`} />
        <motion.g initial={{ rotate: -90 }} animate={{ rotate: angle }} transition={{ type: "spring", stiffness: 60 }} style={{ transformOrigin: "100px 100px" }}>
          <line x1="100" y1="100" x2="100" y2="30" stroke="var(--foreground)" strokeWidth={3} strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill="var(--foreground)" />
        </motion.g>
      </svg>
      <div className="absolute inset-x-0 bottom-2 text-center">
        <div className="text-3xl font-bold tabular-nums">{v}<span className="text-base text-muted-foreground">/100</span></div>
        <div className="text-xs font-medium text-success">LOW RISK</div>
      </div>
    </div>
  );
}

function FraudPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fraud Intelligence</h1>
        <p className="text-sm text-muted-foreground">AI-powered risk scoring and live threat monitoring.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Risk Score</CardTitle><CardDescription>Computed 8m ago • ML v3.1</CardDescription></CardHeader>
          <CardContent><Gauge v={score} /></CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle className="text-base flex items-center gap-2"><Sparkle className="h-4 w-4 text-primary" /> AI Recommendations</CardTitle><CardDescription>Personalised actions</CardDescription></div>
            <Badge variant="secondary">Updated live</Badge>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Enable card-not-present block", b: "Reduces cross-border fraud by 64% for your profile." },
              { t: "Review unknown Android device", b: "Sign out and revoke session if not yours." },
              { t: "Set ₹10,000 UPI velocity cap", b: "Matches your average daily spend pattern." },
              { t: "Add 2 trusted contacts", b: "Improves social verification on flagged payments." },
            ].map(r => (
              <div key={r.t} className="rounded-lg border bg-muted/30 p-3">
                <div className="text-sm font-semibold">{r.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{r.b}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-destructive" /> Suspicious transactions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {suspicious.map(s => (
              <div key={s.merchant} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{s.merchant}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.reason} • {s.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">₹{s.amount.toLocaleString("en-IN")}</span>
                  <Badge variant={s.level === "High" ? "destructive" : "outline"}>{s.level}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Geo summary</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              { c: "Bengaluru, IN", v: "82%", ok: true },
              { c: "Mumbai, IN", v: "11%", ok: true },
              { c: "Dubai, AE", v: "5%", ok: false },
              { c: "Unknown VPN", v: "2%", ok: false },
            ].map(g => (
              <div key={g.c} className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
                <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${g.ok ? "bg-success" : "bg-destructive"}`} />{g.c}</span>
                <span className="tabular-nums text-muted-foreground">{g.v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Smartphone className="h-4 w-4" /> Device activity</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {devices.map(d => (
              <div key={d.name} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div>
                  <div className="text-sm font-medium">{d.name} {d.primary && <Badge variant="secondary" className="ml-1">Primary</Badge>}</div>
                  <div className="text-xs text-muted-foreground">{d.os} • {d.last}</div>
                </div>
                <Badge variant={d.trust === "Trusted" ? "secondary" : "destructive"}>{d.trust}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4" /> Threat timeline</CardTitle></CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {timeline.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${t.c === "text-destructive" ? "bg-destructive" : "bg-success"}`} />
                  <div className="flex-1">
                    <div className="text-sm">{t.t}</div>
                    <div className="text-xs text-muted-foreground">{t.s}</div>
                  </div>
                  {t.c === "text-destructive" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
