import { usable, type Board, type Workspace } from "../../src/domain/market/model";

export function hasSnapshot(board: Board | undefined): board is Board {
  return board !== undefined && (board.status === "ready" || board.status === "partial");
}

/** Keep at most one last successful snapshot per board, with its original timestamps. */
export function retainSnapshots(previous: Workspace | null, incoming: Workspace, now: number): Workspace {
  if (!previous) return incoming;
  const boards = incoming.boards.map((next) => {
    const old = previous.boards.find((b) => b.view === next.view && b.window === next.window && b.direction === next.direction);
    if (!hasSnapshot(old)) return next;
    const failed = next.status === "unavailable" || next.status === "stale" || next.status === "not_ready" || next.expires_at_ms !== null && next.expires_at_ms <= now;
    if (failed || next.available_at_ms !== null && old.available_at_ms !== null && next.available_at_ms < old.available_at_ms) return old;
    return next;
  });
  const names = new Set([...boards.flatMap((b) => b.entries.map((e) => e.symbol)), ...(incoming.quotes ?? []).map((q) => q.symbol)]);
  const quotes = new Map((previous.quotes ?? []).filter((q) => names.has(q.symbol)).map((q) => [q.symbol, q]));
  for (const q of incoming.quotes ?? []) { if (!quotes.has(q.symbol) || quotes.get(q.symbol)!.price_at_ms <= q.price_at_ms) quotes.set(q.symbol, q); }
  return { ...incoming, boards, ...(previous.quotes === undefined && incoming.quotes === undefined ? {} : { quotes: [...quotes.values()].sort((a, b) => b.price_at_ms - a.price_at_ms).slice(0, 200) }) };
}
export function oldSnapshot(board: Board | undefined, now: number): boolean {
  return hasSnapshot(board) && !usable(board, now);
}
