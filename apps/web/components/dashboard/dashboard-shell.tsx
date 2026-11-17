"use client";

// Layout adapted from UTaker-dashboard / Kiranism's MIT dashboard starter; see LICENSE.
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Activity, ArrowUpRight, BarChart3, ChevronRight, Info } from "lucide-react";
import { BrandLogo } from "@/components/landing/brand-logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import styles from "./dashboard.module.css";

function DashboardNavigation(): React.JSX.Element {
  const params = useSearchParams();
  const momentum = params.get("view") === "momentum";
  const { setOpenMobile } = useSidebar();
  return <Sidebar collapsible="icon" className={styles.sidebar}>
    <SidebarHeader className="h-20 justify-center border-b border-sidebar-border px-4 group-data-[collapsible=icon]:px-2">
      <Link href="/market" aria-label="UMAKER 工作台" className={styles.brand}><BrandLogo /></Link>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>市场工作台</SidebarGroupLabel>
        <SidebarMenu>{[{ label: "收益榜", view: "returns", icon: BarChart3 }, { label: "动量榜", view: "momentum", icon: Activity }].map(({ label, view, icon: Icon }) => <SidebarMenuItem key={view}>
          <SidebarMenuButton asChild isActive={momentum === (view === "momentum")} tooltip={label}>
            <Link href={`/market?view=${view}&window=15m`} onClick={() => setOpenMobile(false)} aria-current={momentum === (view === "momentum") ? "page" : undefined}><Icon aria-hidden="true" /><span>{label}</span></Link>
          </SidebarMenuButton>
        </SidebarMenuItem>)}</SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="mt-auto">
        <SidebarGroupLabel>关于数据</SidebarGroupLabel>
        <SidebarMenu><SidebarMenuItem><SidebarMenuButton asChild tooltip="数据口径"><a href="#market-data-note" onClick={() => setOpenMobile(false)}><Info aria-hidden="true" /><span>数据口径</span></a></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter className="border-t border-sidebar-border p-3">
      <SidebarMenu><SidebarMenuItem><SidebarMenuButton asChild tooltip="返回官网"><Link href="/"><ArrowUpRight aria-hidden="true" /><span>返回官网</span></Link></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>;
}

export function DashboardShell({ children, title }: { readonly children: ReactNode; readonly title: string }): React.JSX.Element {
  return <SidebarProvider className={styles.dashboard} style={{ "--sidebar-width": "15rem" } as React.CSSProperties}>
    <DashboardNavigation />
    <SidebarInset className="min-w-0">
      <header className={styles.header}>
        <SidebarTrigger aria-label="展开或收起导航" />
        <span className={styles.divider} />
        <nav aria-label="面包屑" className={styles.breadcrumb}><Link href="/dashboard">工作台</Link><ChevronRight size={12} aria-hidden="true" /><span aria-current="page">{title}</span></nav>
        <span className={styles.marketLabel}><span />币安 USDT 永续</span>
      </header>
      {children}
    </SidebarInset>
  </SidebarProvider>;
}
