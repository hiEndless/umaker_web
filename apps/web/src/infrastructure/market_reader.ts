import { z } from "zod";
import { MARKET_READ_BUDGET } from "../config/market_read_budget";
import { BOARD_LIMIT, emptyBoard, marketWorkspaceSchema, type Quote, type Board, type BoardRequest, type MarketReader } from "../domain/market/model";
const integer = z.number().int().safe().nonnegative();
const decimal = z.string().max(128).regex(/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$(?![\s\S])/).refine((s) => Number.isFinite(Number(s)) && Math.abs(Number(s)) <= 1e60);
const symbol = z.string().regex(/^[A-Z0-9\u3400-\u4DBF\u4E00-\u9FFF]{1,28}USDT$(?![\s\S])/);
const envelope = z.object({ schema_version: z.literal("0.1.0"), generated_at_ms: integer, data: z.record(z.unknown()) });
const base = z.object({ schema_version: z.literal("1.0.0"), as_of_ms: integer, available_at_ms: integer, expires_at_ms: integer, limit: integer.min(1).max(100) });
const poolSchema = base.extend({ scope: z.enum(["full", "valid_samples"]), entries: z.array(z.object({ symbol, return_24h: decimal, rank_gainers: integer.min(1).max(100).nullable(), rank_losers: integer.min(1).max(100).nullable() })).max(200), eligible_count: integer.max(4096), expected_count: integer.max(4096) });
const sampledSchema = base.extend({ scope: z.literal("candidate_pool"), window: z.string(), direction: z.string(), candidate_symbols: z.array(symbol).max(200), eligible_count: integer.max(200), insufficient_count: integer.max(200), entries: z.array(z.object({ symbol, rank: integer.min(1).max(100), return: decimal.optional(), momentum_change: decimal.optional(), recent_return: decimal.optional(), previous_return: decimal.optional(), price_at_ms: integer, anchor_at_ms: integer.optional(), anchor_lag_ms: integer.optional() })).max(100), status: z.enum(["not_ready", "valid_samples", "ready"]).optional() });
const quoteEntry = marketWorkspaceSchema.shape.quotes.unwrap().element.omit({ available_at_ms: true });
const quoteSchema = z.object({ schema_version: z.literal("1.0.0"), exchange: z.literal("binance"), market_type: z.literal("usdm_perpetual"), quote_asset: z.literal("USDT"), scope: z.literal("candidate_pool"), as_of_ms: integer, available_at_ms: integer, expires_at_ms: integer, candidate_symbols: z.array(symbol).max(200), entries: z.array(quoteEntry).max(200) }).strict();
export interface MarketConfig { readonly baseUrl: string; readonly token: string }
export function marketConfig(env: Readonly<Record<string, string | undefined>>): MarketConfig | null {
  const baseUrl = env.UMAKER_API_BASE_URL; const token = env.UMAKER_API_TOKEN;
  if (!baseUrl || !token) return null;
  const url = new URL(baseUrl);
  if (url.username || url.password || url.search || url.hash || (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))) || !/^[\x21-\x7e]{32,256}$(?![\s\S])/.test(token)) throw new Error("market_configuration_invalid");
  return { baseUrl: url.toString().replace(/\/$/, ""), token };
}
export class HttpMarketReader implements MarketReader {
  private pool: Promise<z.infer<typeof poolSchema>> | undefined;
  constructor(private readonly config: MarketConfig, private readonly fetcher: typeof fetch = fetch, private readonly clock: () => number = Date.now, private readonly signal?: AbortSignal) {}
  private async get(path: string): Promise<unknown> {
    const controller = new AbortController();
    const abort = (): void => controller.abort(); this.signal?.addEventListener("abort", abort, { once: true });
    if (this.signal?.aborted) controller.abort();
    const timer = setTimeout(abort, MARKET_READ_BUDGET.upstreamMs);
    try {
      const response = await this.fetcher(`${this.config.baseUrl}/api/v1/market/${path}`, { headers: { Authorization: `Bearer ${this.config.token}`, Accept: "application/json" }, signal: controller.signal, cache: "no-store", redirect: "manual" });
      if (!response.ok) throw new Error("market_upstream_unavailable");
      if (Number(response.headers.get("content-length") ?? 0) > 600000 || !response.body) throw new Error("market_payload_invalid");
      const reader = response.body.getReader(); const chunks: Uint8Array[] = []; let length = 0;
      try { for (;;) { const { value, done } = await reader.read(); if (done) break; length += value.byteLength; if (length > 600000) throw new Error("market_payload_invalid"); chunks.push(value); } }
      finally { await reader.cancel().catch(() => undefined); reader.releaseLock(); }
      const joined = new Uint8Array(length); let offset = 0; for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.length; }
      return envelope.parse(JSON.parse(new TextDecoder().decode(joined))).data;
    } finally { clearTimeout(timer); this.signal?.removeEventListener("abort", abort); }
  }
  private loadPool(): Promise<z.infer<typeof poolSchema>> {
    return this.pool ??= this.get("candidates").then((v) => poolSchema.parse(v));
  }
  async poolSize(): Promise<number | null> {
    try { const pool = await this.loadPool(); return pool.expires_at_ms > this.clock() && pool.available_at_ms <= this.clock() ? pool.entries.length : null; } catch { return null; }
  }
  async quotes(): Promise<Quote[] | undefined> {
    try {
      const p = quoteSchema.parse(await this.get("quotes")); const now = this.clock();
      if (p.as_of_ms % 60000 !== 0 || p.as_of_ms > p.available_at_ms || p.available_at_ms > now || p.expires_at_ms <= now || p.expires_at_ms > Math.min(p.as_of_ms + 120000, p.available_at_ms + 60000) || new Set(p.candidate_symbols).size !== p.candidate_symbols.length || new Set(p.entries.map((q) => q.symbol)).size !== p.entries.length) return undefined;
      if (p.entries.some((q) => !p.candidate_symbols.includes(q.symbol) || Number(q.last_price) <= 0 || Number(q.last_price) > 1e60 || !Number.isFinite(Number(q.last_price)) || !Number.isFinite(Number(q.quote_volume_24h)) || Number(q.quote_volume_24h) > 1e60 || q.price_at_ms > p.available_at_ms || q.price_at_ms < p.available_at_ms - 60000 || q.expires_at_ms !== Math.min(p.expires_at_ms, q.price_at_ms + 60000))) return undefined;
      return p.entries.filter((q) => q.expires_at_ms > now).map((q) => ({ ...q, available_at_ms: p.available_at_ms }));
    } catch { return undefined; }
  }
  async board(request: BoardRequest): Promise<Board> {
    try {
      let asOf: number, available: number, expires: number, eligible: number, insufficient: number;
      let status: Board["status"]; let entries: Board["entries"];
      if (request.view === "returns" && request.window === "24h") {
        const p = await this.loadPool();
        asOf = p.as_of_ms; available = p.available_at_ms; expires = p.expires_at_ms;
        eligible = p.eligible_count; insufficient = p.expected_count - p.eligible_count;
        status = p.scope === "full" ? "ready" : "partial";
        const key = request.direction === "gainers" ? "rank_gainers" : "rank_losers";
        entries = p.entries.filter((e) => e[key] !== null).sort((a,b) => a[key]! - b[key]!).slice(0, BOARD_LIMIT).map((e) => ({ symbol: e.symbol, rank: e[key]!, value: e.return_24h }));
      } else {
        const direction = request.view === "momentum" ? (request.direction === "gainers" ? "increasing" : "decreasing") : request.direction;
        const query = `${request.view === "momentum" ? "momentum" : "rankings"}?window=${request.window}&direction=${direction}&limit=${BOARD_LIMIT}`;
        const p = sampledSchema.parse(await this.get(query));
        if (p.window !== request.window || p.direction !== direction || p.eligible_count + p.insufficient_count !== p.candidate_symbols.length) throw new Error("market_payload_invalid");
        asOf = p.as_of_ms; available = p.available_at_ms; expires = Math.min(p.expires_at_ms, available + 60000, ...p.entries.map((e) => e.price_at_ms + 60000));
        eligible = p.eligible_count; insufficient = p.insufficient_count;
        status = eligible === 0 ? "not_ready" : insufficient > 0 ? "partial" : "ready";
        if (request.view === "returns" && p.status !== (eligible === 0 ? "not_ready" : insufficient > 0 ? "valid_samples" : "ready")) throw new Error("market_payload_invalid");
        entries = p.entries.map((e) => {
          const value = request.view === "momentum" ? e.momentum_change : e.return;
          if (value === undefined || !p.candidate_symbols.includes(e.symbol) || e.price_at_ms > available || e.price_at_ms < available - 60000 || (request.view === "momentum" && (request.direction === "gainers" ? Number(value) <= 0 : Number(value) >= 0))) throw new Error("market_payload_invalid");
          return { symbol: e.symbol, rank: e.rank, value };
        });
      }
      if (available > this.clock() || asOf > available || expires <= available || insufficient < 0) throw new Error("market_payload_invalid");
      if (expires <= this.clock()) return emptyBoard(request, "expired");
      if (entries.some((e,i) => e.rank !== i + 1 || i > 0 && (request.direction === "gainers" ? Number(entries[i-1].value) < Number(e.value) : Number(entries[i-1].value) > Number(e.value))) || new Set(entries.map((e) => e.symbol)).size !== entries.length || entries.length > BOARD_LIMIT || status === "not_ready" && entries.length > 0) throw new Error("market_payload_invalid");
      return { ...request, status, reason: "none", as_of_ms: asOf, available_at_ms: available, expires_at_ms: expires, eligible_count: eligible, insufficient_count: insufficient, entries };
    } catch (error: unknown) {
      return emptyBoard(request, error instanceof z.ZodError || error instanceof SyntaxError || error instanceof Error && error.message === "market_payload_invalid" ? "invalid_payload" : "upstream_unavailable");
    }
  }
}
