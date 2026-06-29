import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { ShieldCheck, ShieldAlert, Fingerprint, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { BankingBackground } from "@/components/banking-background";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/40 px-4 py-8">
      <BankingBackground />
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
        <Select defaultValue="en">
          <SelectTrigger className="h-9 w-[130px] glass"><Globe className="mr-2 h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
            <SelectItem value="ta">தமிழ்</SelectItem>
            <SelectItem value="te">తెలుగు</SelectItem>
            <SelectItem value="bn">বাংলা</SelectItem>
          </SelectContent>
        </Select>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <div className="hidden flex-col justify-between rounded-2xl bg-gradient-to-br from-navy via-primary to-navy p-10 text-primary-foreground lg:flex">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 backdrop-blur">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">Smart Dispute</div>
                <div className="text-xs text-white/70">Fraud Guard Suite</div>
              </div>
            </div>
            <h1 className="mt-12 text-3xl font-bold leading-tight">Context-aware protection for every transaction.</h1>
            <p className="mt-4 text-sm text-white/80">Trace every rupee across NPCI, banks, and merchants. Resolve disputes with AI-assisted drafts and one-click freeze controls.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              { k: "256-bit", v: "TLS Encryption" },
              { k: "RBI", v: "Compliant" },
              { k: "24/7", v: "Fraud Monitor" },
            ].map(s => (
              <div key={s.k} className="rounded-lg bg-white/10 p-3 backdrop-blur">
                <div className="text-base font-semibold">{s.k}</div>
                <div className="text-white/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <Card className="glass relative overflow-hidden border-border/60 p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Welcome back</h2>
              <p className="text-sm text-muted-foreground">Sign in to your secure banking portal</p>
            </div>
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-4 w-4" />
            </motion.div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault(); setLoading(true);
              setTimeout(() => { setLoading(false); nav({ to: "/dashboard" }); }, 800);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="user">Customer ID / Username</Label>
              <Input id="user" defaultValue="rahul.kapoor" autoComplete="username" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pw">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <Input id="pw" type="password" defaultValue="••••••••" autoComplete="current-password" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><Checkbox defaultChecked /> Remember this device</label>
              <button type="button" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <Fingerprint className="h-3.5 w-3.5" /> Use biometric
              </button>
            </div>
            <Button type="submit" disabled={loading} className="h-11 w-full text-base font-medium">
              {loading ? "Verifying…" : "Sign in securely"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>

          <motion.div whileHover={{ scale: 1.01 }} className="rounded-xl border border-destructive/40 bg-destructive/5 p-1">
            <Button asChild variant="destructive" className="h-14 w-full gap-3 text-base font-semibold shadow-md pulse-ring">
              <Link to="/freeze"><ShieldAlert className="h-5 w-5" /> Emergency Freeze Account</Link>
            </Button>
            <p className="px-3 py-2 text-center text-[11px] text-muted-foreground">Lost card or suspect fraud? Instantly freeze access without signing in.</p>
          </motion.div>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            Protected by Smart Dispute Fraud Guard. Never share OTP, CVV or PIN with anyone.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
