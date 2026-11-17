"use client";
import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";

export function DataStatus({ state, children, onRetry, pending, className }: { readonly state: "loading" | "error" | "stale"; readonly children: ReactNode; readonly onRetry?: () => void; readonly pending?: boolean; readonly className?: string }): React.JSX.Element {
  return <div className={cn(styles.status, className)} role="status" aria-live="polite" data-state={state}><span>{children}</span>{onRetry && <button type="button" onClick={onRetry} disabled={pending}>重新获取</button>}</div>;
}
export function EmptyState({ title, description, action, className }: { readonly title: string; readonly description?: ReactNode; readonly action?: ReactNode; readonly className?: string }): React.JSX.Element {
  return <div className={cn(styles.empty, className)} role="status"><Search size={20} aria-hidden="true" /><p>{title}</p>{description}{action}</div>;
}
