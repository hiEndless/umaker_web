/** Upstream API allows 3s execution; four waves of reads must fit the aggregate and browser budgets. */
export const MARKET_READ_BUDGET = { upstreamMs: 3500, aggregateMs: 15000, clientMs: 18000 } as const;
