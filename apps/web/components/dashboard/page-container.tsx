import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";

export function DashboardPage({ children, className }: { readonly children: ReactNode; readonly className?: string }): React.JSX.Element {
  return <div className={cn(styles.page, className)}>{children}</div>;
}
