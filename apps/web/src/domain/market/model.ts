import { marketWorkspaceSchema, type MarketWorkspace } from "../../../../../packages/contracts-ts/src/generated/market_workspace";
export { marketWorkspaceSchema };
export type Workspace = MarketWorkspace;
export type Board = Workspace["boards"][number];
export type Entry = Board["entries"][number];
export type BoardMode = Board["view"];
export type MarketWindow = Board["window"];
export type Direction = Board["direction"];
export const WINDOWS = marketWorkspaceSchema.shape.boards.element.shape.window.options;
export const BOARD_LIMIT = 10;
export interface BoardRequest { readonly view: BoardMode; readonly window: MarketWindow; readonly direction: Direction }
export const REQUESTS: readonly BoardRequest[] = (["returns", "momentum"] as const).flatMap((view) =>
  (view === "returns" ? WINDOWS : ["5m", "15m"] as const).flatMap((window) =>
    (["gainers", "losers"] as const).map((direction) => ({ view, window, direction }))));
export interface MarketReader {
  board(request: BoardRequest): Promise<Board>;
  poolSize(): Promise<number | null>;
}
export function emptyBoard(request: BoardRequest, reason: Board["reason"]): Board {
  return { ...request, status: reason === "expired" ? "stale" : "unavailable", reason, as_of_ms: null, available_at_ms: null, expires_at_ms: null, eligible_count: null, insufficient_count: null, entries: [] };
}
export function usable(board: Board, now: number): boolean {
  return board.expires_at_ms !== null && board.expires_at_ms > now && (board.status === "ready" || board.status === "partial");
}
export function parseWorkspace(value: unknown): Workspace {
  const parsed = marketWorkspaceSchema.parse(value);
  const keys = new Set(parsed.boards.map((b) => `${b.view}/${b.window}/${b.direction}`));
  if (keys.size !== REQUESTS.length || REQUESTS.some((r) => !keys.has(`${r.view}/${r.window}/${r.direction}`))) throw new Error("workspace_boards_invalid");
  for (const board of parsed.boards) {
    if ((board.status === "unavailable" || board.status === "stale" || board.status === "not_ready") && board.entries.length) throw new Error("workspace_unavailable_entries");
    if (board.entries.some((e, i) => e.rank !== i + 1 || !Number.isFinite(Number(e.value)) || Math.abs(Number(e.value)) > 1e60) || new Set(board.entries.map((e) => e.symbol)).size !== board.entries.length) throw new Error("workspace_entries_invalid");
    if (board.status !== "unavailable" && board.status !== "stale" && (board.as_of_ms === null || board.available_at_ms === null || board.expires_at_ms === null || board.as_of_ms > board.available_at_ms || board.available_at_ms >= board.expires_at_ms)) throw new Error("workspace_times_invalid");
  }
  return parsed;
}
export function signedFraction(value: string): string {
  const n = Number(value) * 100;
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}`;
}
