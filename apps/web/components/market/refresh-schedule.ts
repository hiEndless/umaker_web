import type { Workspace } from "../../src/domain/market/model";

/** Refresh before the source expires, while bounding repeated attempts to once per five seconds. */
export function refreshDelay(data: Workspace | null, now: number, error: boolean): number {
  if (error || !data || data.boards.some((b) => b.status === "stale" || b.status === "unavailable")) return 5000;
  const expiry = Math.min(...data.boards.flatMap((b) => b.expires_at_ms === null ? [] : [b.expires_at_ms]));
  return Math.max(5000, Math.min(30000, expiry - now - 10000));
}
