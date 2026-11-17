import { readMarket } from "../../../src/application/read_market";
import { REQUESTS, emptyBoard, type Workspace } from "../../../src/domain/market/model";
import { HttpMarketReader, marketConfig } from "../../../src/infrastructure/market_reader";
export const dynamic = "force-dynamic";
let cached: { value: Workspace; until: number; key: string } | undefined;
let flight: { key: string; promise: Promise<Workspace> } | undefined;
async function load(): Promise<Workspace> {
  let config;
  try { config = marketConfig(process.env); } catch { config = null; }
  if (!config) return { schema_version: "1.0.0", generated_at_ms: Date.now(), scope: "candidate_pool", pool_size: null, boards: REQUESTS.map((r) => emptyBoard(r, "unconfigured")) };
  // Configuration identity remains private, and invalidates the single bounded cache slot.
  const key = `${config.baseUrl}\n${config.token}`;
  if (cached && cached.key === key && Date.now() < cached.until) return cached.value;
  if (flight?.key === key) return flight.promise;
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 8000);
  const promise = readMarket(new HttpMarketReader(config, fetch, Date.now, controller.signal)).then((value) => {
    // Leave the client time to refresh instead of caching snapshots that are about to expire.
    const retrying = value.boards.some((b) => b.status === "unavailable" || b.status === "stale");
    const expiry = Math.min(Date.now() + (retrying ? 5000 : 10000), ...value.boards.filter((b) => b.expires_at_ms !== null).map((b) => b.expires_at_ms! - 10000), ...(value.quotes ?? []).map((q) => q.expires_at_ms - 10000));
    cached = { value, key, until: expiry }; return value;
  }).finally(() => { clearTimeout(timer); if (flight?.promise === promise) flight = undefined; });
  flight = { key, promise }; return promise;
}
export async function GET(request: Request): Promise<Response> {
  const start = Date.now();
  try {
    const value = await load(); const failed = value.boards.filter((b) => b.status === "unavailable" || b.status === "stale").length;
    console.info(JSON.stringify({ event: "market.read", duration_ms: Date.now()-start, unavailable_boards: failed, total_boards: value.boards.length, quotes_available: value.quotes !== undefined, quote_count: value.quotes?.length ?? 0 }));
    // Old tabs use a strict v1 parser; quotes are opt-in during the compatibility window.
    const output = { ...value };
    if (new URL(request.url).searchParams.get("include_quotes") !== "1") delete output.quotes;
    return Response.json(output, { status: failed === value.boards.length ? 503 : 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    console.info(JSON.stringify({ event: "market.read", duration_ms: Date.now()-start, status: "failed" }));
    return Response.json({ schema_version: "1.0.0", generated_at_ms: Date.now(), scope: "candidate_pool", pool_size: null, boards: REQUESTS.map((r) => emptyBoard(r, "upstream_unavailable")) }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
