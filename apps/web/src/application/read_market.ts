import { REQUESTS, emptyBoard, parseWorkspace, type MarketReader, type Quote, type Workspace } from "../domain/market/model";
/** One bounded queue: pool/quotes start immediately and share the same four request slots. */
export async function readMarket(reader: MarketReader, clock: () => number = Date.now): Promise<Workspace> {
  const boards: Workspace["boards"] = [];
  let poolSize: number | null = null;
  let quotes: Quote[] | undefined;
  const jobs: (() => Promise<void>)[] = [
    async () => { poolSize = await reader.poolSize().catch(() => null); },
    async () => { quotes = await reader.quotes().catch(() => undefined); },
    ...REQUESTS.map((request, i) => async (): Promise<void> => {
      try { boards[i] = await reader.board(request); }
      catch { boards[i] = emptyBoard(request, "upstream_unavailable"); }
    }),
  ];
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < jobs.length) await jobs[cursor++]();
  }));
  const now = clock();
  return parseWorkspace({ schema_version: "1.0.0", generated_at_ms: now, scope: "candidate_pool", pool_size: poolSize, ...(quotes === undefined ? {} : { quotes }), boards: boards.map((b) => b.expires_at_ms !== null && b.expires_at_ms <= now ? emptyBoard(b, "expired") : b) });
}
