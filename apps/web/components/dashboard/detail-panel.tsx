import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";

export function DetailPanel({ title, badge, children, className, ref }: { readonly title: string; readonly badge?: ReactNode; readonly children: ReactNode; readonly className?: string; readonly ref?: Ref<HTMLElement> }): React.JSX.Element {
  return <aside ref={ref} className={cn(styles.detail, className)} aria-label={title}><div className={styles.detailHeader}><span>{title}</span>{badge}</div>{children}</aside>;
}
