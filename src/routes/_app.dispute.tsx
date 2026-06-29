import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Bot, Send, Sparkle, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/dispute")({
  head: () => ({ meta: [{ title: "AI Dispute Center" }] }),
  component: DisputePage,
});

const prompts = [
  "Why did my Amazon payment fail?",
  "Draft a dispute for RRN 412318892341",
  "Refund status of BigBasket order",
  "Escalate IRCTC failed UPI to NPCI",
];

const failed = [
  { merchant: "Amazon India", amount: 2499, rrn: "412318892341", reason: "Merchant timeout", time: "10:42 AM" },
  { merchant: "Swiggy", amount: 642, rrn: "412316881233", reason: "PSP unreachable", time: "Mon 12:09" },
  { merchant: "IRCTC", amount: 1240, rrn: "412317283491", reason: "Beneficiary credit pending", time: "Yesterday" },
];

type Msg = { role: "user" | "ai"; text: string };

function DisputePage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi Rahul, I noticed a failed ₹2,499 Amazon payment (RRN 412318892341). Would you like me to draft a dispute?" },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "ai", text: "I have generated a dispute draft on the right. Review and submit when ready. Estimated NPCI response: 24-48 hours." }]);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Dispute Center</h1>
        <p className="text-sm text-muted-foreground">Copilot-assisted dispute filing with auto-generated drafts and NPCI escalation.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex h-[640px] flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><Bot className="h-5 w-5" /></div>
              <div>
                <CardTitle className="text-base">Dispute Copilot</CardTitle>
                <CardDescription className="text-xs">Online • Context-aware</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1"><Sparkle className="h-3 w-3" /> AI v2.4</Badge>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "ai" && <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-3.5 w-3.5" /></AvatarFallback></Avatar>}
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}</div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-3.5 w-3.5" /></AvatarFallback></Avatar>
                  <div className="flex items-center gap-1 rounded-2xl bg-muted px-3 py-2">
                    {[0,1,2].map(i => (
                      <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {prompts.map(p => <Button key={p} variant="outline" size="sm" className="h-7 text-xs" onClick={() => send(p)}>{p}</Button>)}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="flex gap-2">
              <Input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ask the dispute copilot…" />
              <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Recent failed</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {failed.map(f => (
                <div key={f.rrn} className="rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">{f.merchant}</div>
                    <div className="font-semibold text-destructive">−₹{f.amount.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{f.reason}</span><span>{f.time}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">RRN {f.rrn}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">File dispute</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Draft preview</CardTitle>
              <Badge variant="outline">Auto-generated</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="rounded-lg border bg-muted/40 p-3 leading-relaxed">
                <div className="font-semibold">Subject:</div>
                <div>Dispute for failed UPI transaction — RRN 412318892341</div>
                <div className="mt-2">Dear NPCI Grievance Team,<br/>I initiated a payment of ₹2,499 to Amazon India on 29 Jun 2026 at 10:42 IST. The amount was debited from HDFC XXXX-3421 but credit to the beneficiary failed at the merchant gateway (504 timeout). Please investigate and refund.<br/><br/>Customer: Rahul Kapoor<br/>VPA: rahul@hdfcbank</div>
              </div>
              <div className="flex gap-2"><Button size="sm" className="flex-1">Submit to NPCI</Button><Button size="sm" variant="outline">Edit</Button></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Submission timeline</CardTitle><CardDescription>Live status updates from NPCI and bank.</CardDescription></CardHeader>
        <CardContent>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {[
              { t: "Draft generated", s: "10:43 AM", icon: CheckCircle2, c: "text-success" },
              { t: "Submitted to bank", s: "10:44 AM", icon: CheckCircle2, c: "text-success" },
              { t: "NPCI review", s: "In progress", icon: Clock, c: "text-warning" },
              { t: "RBI escalation", s: "Standby", icon: AlertCircle, c: "text-muted-foreground" },
              { t: "Resolved", s: "Pending", icon: AlertCircle, c: "text-muted-foreground" },
            ].map((step, i) => (
              <li key={i} className="relative rounded-lg border p-3">
                <step.icon className={`h-5 w-5 ${step.c}`} />
                <div className="mt-2 text-sm font-medium">{step.t}</div>
                <div className="text-xs text-muted-foreground">{step.s}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
