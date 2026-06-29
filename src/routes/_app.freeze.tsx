import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { ShieldAlert, Smartphone, CreditCard, Globe, Wallet, Fingerprint, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/freeze")({
  head: () => ({ meta: [{ title: "Emergency Freeze" }] }),
  component: FreezePage,
});

const channels = [
  { id: "upi", name: "Freeze UPI", desc: "Block all UPI debits and collect requests instantly.", icon: Smartphone },
  { id: "card", name: "Freeze Debit Card", desc: "Stop ATM, POS and online card payments.", icon: CreditCard },
  { id: "nb", name: "Freeze Net Banking", desc: "Disable internet banking logins and transfers.", icon: Globe },
  { id: "wallet", name: "Freeze Wallet", desc: "Pause all wallet load and spend operations.", icon: Wallet },
];

function FreezePage() {
  const [state, setState] = useState<Record<string, boolean>>({});
  const frozen = Object.values(state).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Emergency Freeze</h1>
          <p className="text-sm text-muted-foreground">Instantly lock channels if you suspect fraud. Reversible from this page with biometric.</p>
        </div>
        <Button variant="destructive" size="lg" className="gap-2 pulse-ring" onClick={() => setState({ upi: true, card: true, nb: true, wallet: true })}>
          <ShieldAlert className="h-5 w-5" /> Freeze everything now
        </Button>
      </div>

      <Card className="relative overflow-hidden border-destructive/30 bg-gradient-to-br from-destructive/10 via-card to-card">
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2 text-destructive"><ShieldAlert className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-wide">Active protection</span></div>
            <h2 className="mt-2 text-2xl font-bold">{frozen} of {channels.length} channels frozen</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">Toggle any channel below to instantly suspend it. Your account remains secure with biometric-protected unfreeze.</p>
          </div>
          <div className="relative grid place-items-center">
            <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute inset-0 grid place-items-center">
              <div className="h-32 w-32 rounded-full bg-destructive/20 blur-2xl" />
            </motion.div>
            <div className="relative grid h-24 w-24 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-xl">
              <Lock className="h-10 w-10" />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {channels.map(c => {
          const on = !!state[c.id];
          return (
            <Card key={c.id} className={`transition-all ${on ? "border-destructive/50 bg-destructive/5" : ""}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex gap-3">
                  <div className={`grid h-11 w-11 place-items-center rounded-lg ${on ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground"}`}>
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <CardDescription>{c.desc}</CardDescription>
                  </div>
                </div>
                <Switch checked={on} onCheckedChange={(v) => setState(s => ({ ...s, [c.id]: v }))} />
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-0">
                <Badge variant={on ? "destructive" : "secondary"}>{on ? "Frozen" : "Active"}</Badge>
                <span className="text-xs text-muted-foreground">Last changed 2m ago</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><Fingerprint className="h-5 w-5" /></div>
          <div>
            <CardTitle className="text-base">Biometric verification</CardTitle>
            <CardDescription>Required for unfreeze and any sensitive action.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid items-center gap-6 md:grid-cols-2">
          <div className="grid place-items-center">
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="grid h-40 w-40 place-items-center rounded-full bg-primary/10">
              <Fingerprint className="h-24 w-24 text-primary" />
            </motion.div>
          </div>
          <div className="space-y-3">
            {[
              "Touch ID enrolled on iPhone 15 Pro",
              "Face ID enrolled on MacBook Pro",
              "Voice print verified 3 days ago",
            ].map(t => (
              <div key={t} className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3 text-sm">
                <span className="h-2 w-2 rounded-full bg-success" />{t}
              </div>
            ))}
            <Button className="w-full">Verify identity to unfreeze</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
