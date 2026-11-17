"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseWorkspace, type BoardRequest, type Workspace } from "@/src/domain/market/model";
import { MARKET_READ_BUDGET } from "../../src/config/market_read_budget";
import { refreshDelay } from "./refresh-schedule";
import { retainSnapshots } from "./snapshot-retention";
export function useMarketData(): { data: Workspace | null; loading: boolean; error: boolean; failedBoards: readonly BoardRequest[]; now: number; refresh: () => void } {
  const [failedBoards, setFailedBoards] = useState<readonly BoardRequest[]>([]);
  const [data, setData] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true); const [error, setError] = useState(false); const [now, setNow] = useState(0);
  const active = useRef<AbortController | null>(null);
  const refresh = useCallback(async (): Promise<void> => {
    if (active.current) return;
    const controller = new AbortController(); active.current = controller;
    const timer = setTimeout(() => controller.abort(), MARKET_READ_BUDGET.clientMs); setLoading(true);
    try {
      const response = await fetch("/api/market/?include_quotes=1", { cache: "no-store", signal: controller.signal });
      const value: unknown = await response.json(); const next = parseWorkspace(value);
      if (controller.signal.aborted || active.current !== controller) return;
      setError(!response.ok);
      setFailedBoards(next.boards.filter((b) => b.status === "unavailable" || b.status === "stale").map(({ view, window, direction }) => ({ view, window, direction })));
      setData((previous) => retainSnapshots(previous, next, Date.now()));
    } catch (error: unknown) { if (active.current === controller) { setError(true); console.warn("market.client_failed", error instanceof Error ? error.name : "UnknownError"); } }
    finally { clearTimeout(timer); if (active.current === controller) { active.current = null; setLoading(false); } }
  }, []);
  useEffect(() => {
    void refresh(); setNow(Date.now());
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const visible = (): void => { if (document.visibilityState === "visible") void refresh(); };
    document.addEventListener("visibilitychange", visible);
    window.addEventListener("focus", visible);
    return () => { clearInterval(tick); document.removeEventListener("visibilitychange", visible); window.removeEventListener("focus", visible); active.current?.abort(); active.current = null; };
  }, [refresh]);
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => { if (document.visibilityState === "visible") void refresh(); }, refreshDelay(data, Date.now(), error || failedBoards.length > 0));
    return () => clearTimeout(timer);
  }, [data, error, failedBoards, loading, refresh]);
  return { data, loading, error, failedBoards, now, refresh: () => { void refresh(); } };
}
