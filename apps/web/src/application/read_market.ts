import { REQUESTS, emptyBoard, parseWorkspace, type MarketReader, type Workspace } from "../domain/market/model";
/** Bounded request fan-out; one failed board never erases other windows. */
export async function readMarket(reader: MarketReader, clock: () => number = Date.now): Promise<Workspace> {
  const boards: Workspace["boards"] = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < REQUESTS.length) {
      const i = cursor++; const request = REQUESTS[i];
      try { boards[i] = await reader.board(request); }
      catch { boards[i] = emptyBoard(request, "upstream_unavailable"); }
    }
  }));
  const poolSize = await reader.poolSize().catch(() => null);
  const now = clock();
  return parseWorkspace({ schema_version: "1.0.0", generated_at_ms: now, scope: "candidate_pool", pool_size: poolSize, boards: boards.map((b) => b.expires_at_ms !== null && b.expires_at_ms <= now ? emptyBoard(b, "expired") : b) });
}
