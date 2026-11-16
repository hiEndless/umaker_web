"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseWorkspace, usable, type Workspace } from "@/src/domain/market/model";
function signature(data: Workspace): string { return JSON.stringify({ boards: data.boards, pool_size: data.pool_size }); }
export function useMarketData(): { data: Workspace | null; pending: Workspace | null; loading: boolean; error: boolean; now: number; refresh: () => void; apply: () => void } {
  const [data, setData] = useState<Workspace | null>(null);
  const [pending, setPending] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true); const [error, setError] = useState(false); const [now, setNow] = useState(0);
  const current = useRef<Workspace | null>(null); const active = useRef<AbortController | null>(null);
  const refresh = useCallback(async (): Promise<void> => {
    if (active.current) return;
    const controller = new AbortController(); active.current = controller;
    const timer = setTimeout(() => controller.abort(), 12000); setLoading(true);
    try {
      const response = await fetch("/api/market/", { cache: "no-store", signal: controller.signal });
      const value: unknown = await response.json(); const next = parseWorkspace(value);
      if (controller.signal.aborted || active.current !== controller) return;
      setError(!response.ok);
      if (!current.current || !current.current.boards.some((b) => usable(b, Date.now()))) { current.current = next; setData(next); setPending(null); }
      else if (signature(next) !== signature(current.current)) setPending(next);
      else setPending(null);
    } catch (error: unknown) { if (active.current === controller) { setError(true); console.warn("market.client_failed", error instanceof Error ? error.name : "UnknownError"); } }
    finally { clearTimeout(timer); if (active.current === controller) { active.current = null; setLoading(false); } }
  }, []);
  useEffect(() => {
    void refresh(); setNow(Date.now());
    const poll = setInterval(() => { if (document.visibilityState === "visible") void refresh(); }, 30000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const visible = (): void => { if (document.visibilityState === "visible") void refresh(); };
    document.addEventListener("visibilitychange", visible);
    return () => { clearInterval(poll); clearInterval(tick); document.removeEventListener("visibilitychange", visible); active.current?.abort(); active.current = null; };
  }, [refresh]);
  const apply = (): void => { if (pending) { current.current = pending; setData(pending); setPending(null); } };
  return { data, pending, loading, error, now, refresh: () => { void refresh(); }, apply };
}
