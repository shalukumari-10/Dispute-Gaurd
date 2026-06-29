import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ArrowLeftRight, GitBranch, Bot, ShieldAlert,
  Activity, FileWarning, BarChart3, Bell, Settings, ShieldCheck, LogOut
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar
} from "@/components/ui/sidebar";

const primary = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
  { title: "Money Flow", url: "/money-flow", icon: GitBranch },
  { title: "AI Dispute Center", url: "/dispute", icon: Bot },
];
const security = [
  { title: "Emergency Freeze", url: "/freeze", icon: ShieldAlert },
  { title: "Fraud Intelligence", url: "/fraud", icon: Activity },
  { title: "Complaint Center", url: "/complaints", icon: FileWarning },
];
const insights = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: r => r.location.pathname });

  const renderItems = (items: typeof primary) => items.map(i => (
    <SidebarMenuItem key={i.url}>
      <SidebarMenuButton asChild isActive={path.startsWith(i.url)} tooltip={i.title}>
        <Link to={i.url} className="flex items-center gap-3">
          <i.icon className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">{i.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold leading-tight">Smart Dispute</div>
              <div className="truncate text-xs text-muted-foreground">Fraud Guard</div>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Banking</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{renderItems(primary)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Security</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{renderItems(security)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Insights</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{renderItems(insights)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign out">
              <Link to="/login" className="flex items-center gap-3">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Sign out</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
