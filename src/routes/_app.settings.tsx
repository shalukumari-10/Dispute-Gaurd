import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Fingerprint, Smartphone, Laptop, Globe } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Profile & Settings" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your identity, security and preferences.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-[auto_1fr]">
            <Avatar className="h-20 w-20"><AvatarFallback className="bg-primary text-primary-foreground text-xl">RK</AvatarFallback></Avatar>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Full name</Label><Input defaultValue="Rahul Kapoor" /></div>
              <div><Label>Customer ID</Label><Input defaultValue="HDFC-39201842" disabled /></div>
              <div><Label>Email</Label><Input defaultValue="rahul.kapoor@mail.com" /></div>
              <div><Label>Mobile</Label><Input defaultValue="+91 98xxxxxx21" /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">KYC Status</CardTitle><CardDescription>Re-verification not required</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {[
              { t: "PAN verified", s: "AAACR••••6E" },
              { t: "Aadhaar e-KYC", s: "Linked" },
              { t: "Video KYC", s: "Completed Mar 2025" },
              { t: "Address proof", s: "On file" },
            ].map(k => (
              <div key={k.t} className="flex items-center justify-between rounded-lg border p-2.5">
                <div>
                  <div className="text-sm font-medium">{k.t}</div>
                  <div className="text-xs text-muted-foreground">{k.s}</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Linked & trusted devices</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { i: Smartphone, n: "iPhone 15 Pro", s: "Active now • Primary", trusted: true },
              { i: Laptop, n: "MacBook Pro 16”", s: "20m ago", trusted: true },
              { i: Smartphone, n: "Unknown Android", s: "Yesterday", trusted: false },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted"><d.i className="h-4 w-4" /></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{d.n}</div>
                  <div className="text-xs text-muted-foreground">{d.s}</div>
                </div>
                <Badge variant={d.trusted ? "secondary" : "destructive"}>{d.trusted ? "Trusted" : "Untrusted"}</Badge>
                <Button variant="ghost" size="sm">Revoke</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { t: "Biometric login (Face / Touch ID)", icon: Fingerprint, on: true },
              { t: "Two-factor authentication", on: true },
              { t: "Transaction OTP for amounts > ₹10,000", on: true },
              { t: "Block international transactions", on: false },
              { t: "AI fraud auto-block", on: true },
            ].map(s => (
              <div key={s.t} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{s.t}</span>
                <Switch defaultChecked={s.on} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Notification preferences</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Security alerts","Refund updates","Dispute progress","NPCI responses","AI recommendations","Marketing"].map(n => (
              <div key={n} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{n}</span>
                <div className="flex items-center gap-3 text-xs"><span className="text-muted-foreground">Email</span><Switch defaultChecked /><span className="text-muted-foreground">Push</span><Switch defaultChecked /></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Appearance & language</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger><Globe className="mr-2 h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Currency display</Label>
              <Select defaultValue="inr">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="inr">INR — ₹</SelectItem><SelectItem value="usd">USD — $</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              Theme follows your preference at the top right. Smooth animations, motion and high-contrast tokens applied across light and dark.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
