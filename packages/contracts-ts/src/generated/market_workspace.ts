import { z } from "zod";

/** Generated from contracts/schemas/market_workspace.schema.json */
export const marketWorkspaceSchema = z.object({
  schema_version: z.enum(["1.0.0"]),
  generated_at_ms: z.number().finite().int().safe().min(0),
  scope: z.enum(["candidate_pool"]),
  pool_size: z.number().finite().int().safe().min(0).nullable(),
  boards: z.array(z.object({"view": z.enum(["returns", "momentum"]), "window": z.enum(["5m", "15m", "1h", "4h", "24h", "5d"]), "direction": z.enum(["gainers", "losers"]), "status": z.enum(["ready", "partial", "not_ready", "unavailable", "stale"]), "reason": z.enum(["none", "unconfigured", "upstream_unavailable", "invalid_payload", "expired"]), "as_of_ms": z.number().finite().int().safe().min(0).nullable(), "available_at_ms": z.number().finite().int().safe().min(0).nullable(), "expires_at_ms": z.number().finite().int().safe().min(0).nullable(), "eligible_count": z.number().finite().int().safe().min(0).nullable(), "insufficient_count": z.number().finite().int().safe().min(0).nullable(), "entries": z.array(z.object({"symbol": z.string().regex(new RegExp("^[A-Z0-9\\u3400-\\u4DBF\\u4E00-\\u9FFF]{1,28}USDT$(?![\\s\\S])")), "rank": z.number().finite().int().safe().min(1).max(10), "value": z.string().max(128).regex(new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$(?![\\s\\S])"))}).strict()).max(10)}).strict()).min(16).max(16),
  quotes: z.array(z.object({"symbol": z.string().regex(new RegExp("^[A-Z0-9\\u3400-\\u4DBF\\u4E00-\\u9FFF]{1,28}USDT$(?![\\s\\S])")), "last_price": z.string().max(64).regex(new RegExp("^(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$(?![\\s\\S])")), "quote_volume_24h": z.string().max(64).regex(new RegExp("^(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$(?![\\s\\S])")), "price_at_ms": z.number().finite().int().safe().min(0), "available_at_ms": z.number().finite().int().safe().min(0), "expires_at_ms": z.number().finite().int().safe().min(0)}).strict()).max(200).optional(),
}).strict();

export type MarketWorkspace = z.infer<typeof marketWorkspaceSchema>;
export const MarketWorkspaceVersion = "1.0.0";
