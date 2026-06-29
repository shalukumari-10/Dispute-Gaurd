import { Bell, Search, ShieldAlert } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="relative ml-2 hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search transactions, UPI ID, RRN, merchant…" className="pl-9 h-9 bg-muted/40" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button asChild variant="destructive" size="sm" className="gap-2 shadow-sm">
          <Link to="/freeze"><ShieldAlert className="h-4 w-4" />Emergency Freeze</Link>
        </Button>
        <ThemeToggle />
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link to="/notifications">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full px-1 text-[10px]" variant="destructive">5</Badge>
          </Link>
        </Button>
        <div className="ml-1 flex items-center gap-2 rounded-full border bg-card px-1 py-1 pr-3">
          <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary text-primary-foreground text-xs">RK</AvatarFallback></Avatar>
          <div className="hidden text-left leading-tight md:block">
            <div className="text-xs font-medium">Rahul Kapoor</div>
            <div className="text-[10px] text-muted-foreground">XXXX-3421 • Premier</div>
          </div>
        </div>
      </div>
    </header>
  );
}
