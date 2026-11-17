import { usable, type Board, type Workspace } from "../../src/domain/market/model";

export function hasSnapshot(board: Board | undefined): board is Board {
  return board !== undefined && (board.status === "ready" || board.status === "partial");
}

/** Keep at most one last successful snapshot per board, with its original timestamps. */
export function retainSnapshots(previous: Workspace | null, incoming: Workspace, now: number): Workspace {
  if (!previous) return incoming;
  return { ...incoming, boards: incoming.boards.map((next) => {
    const old = previous.boards.find((b) => b.view === next.view && b.window === next.window && b.direction === next.direction);
    if (!hasSnapshot(old)) return next;
    const failed = next.status === "unavailable" || next.status === "stale" || next.status === "not_ready" || next.expires_at_ms !== null && next.expires_at_ms <= now;
    if (failed || next.available_at_ms !== null && old.available_at_ms !== null && next.available_at_ms < old.available_at_ms) return old;
    return next;
  }) };
}
export function oldSnapshot(board: Board | undefined, now: number): boolean {
  return hasSnapshot(board) && !usable(board, now);
}
