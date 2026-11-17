"use client";
import type { ReactNode } from "react";
import { RotateCcw, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";

export function DataToolbar({ children, search, onSearchChange, onReset, className }: { readonly children?: ReactNode; readonly search: string; readonly onSearchChange: (value: string) => void; readonly onReset: () => void; readonly className?: string }): React.JSX.Element {
  return <div className={cn(styles.toolbar, className)} role="toolbar" aria-label="榜单筛选">
    <div className={styles.toolbarControls}>{children}</div>
    <div className={styles.search}><Search size={14} aria-hidden="true" /><input aria-label="搜索交易对" placeholder="搜索交易对" value={search} onChange={(event) => onSearchChange(event.target.value)} />{search && <button type="button" aria-label="清除搜索" onClick={() => onSearchChange("")}><X size={14} /></button>}</div>
    <button type="button" className={styles.reset} aria-label="重置视图" title="重置周期、搜索和交易对" onClick={onReset}><RotateCcw size={15} /></button>
  </div>;
}
