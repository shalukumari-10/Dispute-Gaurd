import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Download, Search, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/_app/transactions")({
  head: () => ({ meta: [{ title: "Transactions" }] }),
  component: TxPage,
});

type Tx = {
  id: string; merchant: string; upi: string; rrn: string; amount: number;
  time: string; status: "Success" | "Pending" | "Failed" | "Refund" | "Disputed"; channel: string;
};

const txs: Tx[] = [
  { id: "T-94821", merchant: "Amazon India", upi: "amazon@apl", rrn: "412318892341", amount: -2499, time: "Today 10:42", status: "Success", channel: "UPI" },
  { id: "T-94820", merchant: "Zomato", upi: "zomato@hdfcbank", rrn: "412318772011", amount: -487, time: "Today 09:18", status: "Success", channel: "UPI" },
  { id: "T-94819", merchant: "IRCTC", upi: "irctc@sbi", rrn: "412317283491", amount: -1240, time: "Yesterday 22:11", status: "Disputed", channel: "UPI" },
  { id: "T-94818", merchant: "Acme Payroll", upi: "acme.payroll@icici", rrn: "412317108332", amount: 142500, time: "Yesterday 18:00", status: "Success", channel: "NEFT" },
  { id: "T-94817", merchant: "BigBasket", upi: "bigbasket@axisbank", rrn: "412316991823", amount: -3210, time: "Mon 14:22", status: "Refund", channel: "UPI" },
  { id: "T-94816", merchant: "Swiggy", upi: "swiggy@ybl", rrn: "412316881233", amount: -642, time: "Mon 12:09", status: "Failed", channel: "UPI" },
  { id: "T-94815", merchant: "Tata CLiQ", upi: "tatacliq@hdfc", rrn: "412316771122", amount: -8499, time: "Mon 09:40", status: "Pending", channel: "Card" },
  { id: "T-94814", merchant: "Airtel Postpaid", upi: "airtel@idfcbank", rrn: "412316661011", amount: -849, time: "Sun 20:18", status: "Success", channel: "Auto-Pay" },
  { id: "T-94813", merchant: "Netflix", upi: "netflix@hdfc", rrn: "412316551900", amount: -649, time: "Sun 11:00", status: "Success", channel: "Card" },
  { id: "T-94812", merchant: "Uber India", upi: "uber@paytm", rrn: "412316441899", amount: -342, time: "Sat 23:01", status: "Refund", channel: "UPI" },
];

const statusColor: Record<Tx["status"], "secondary" | "destructive" | "outline" | "default"> = {
  Success: "secondary", Pending: "outline", Failed: "destructive", Refund: "default", Disputed: "destructive",
};

function TxPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground">Search, filter and audit every payment across channels.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" />Filters</Button>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
                <TabsTrigger value="card">Card</TabsTrigger>
                <TabsTrigger value="neft">NEFT/IMPS</TabsTrigger>
                <TabsTrigger value="auto">Auto-Pay</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search RRN, UPI ID, merchant…" className="pl-9 h-9" />
            </div>
          </div>
          <CardDescription>Showing {txs.length} of 1,284 transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>UPI / VPA</TableHead>
                <TableHead>RRN</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.map(t => (
                <TableRow key={t.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-md bg-muted text-[11px] font-bold uppercase">{t.merchant.slice(0,2)}</div>
                      <div>
                        <div className="text-sm font-medium">{t.merchant}</div>
                        <div className="text-xs text-muted-foreground">{t.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{t.upi}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{t.rrn}</TableCell>
                  <TableCell><Badge variant="outline">{t.channel}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.time}</TableCell>
                  <TableCell className={`text-right font-semibold tabular-nums ${t.amount > 0 ? "text-success" : ""}`}>
                    {t.amount > 0 ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell><Badge variant={statusColor[t.status]}>{t.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
