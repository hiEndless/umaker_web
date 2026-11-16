/** Fixed design fixtures. Never represented as a live market feed. */
export const WINDOWS = ["5m", "15m", "1h", "4h", "24h", "5d"] as const;
export type MarketWindow = (typeof WINDOWS)[number];
export type BoardMode = "returns" | "momentum";
export type Direction = "gainers" | "losers";
export interface MarketAsset {
  readonly symbol: string;
  readonly price: string;
  readonly turnover: string;
  readonly returns: readonly [number, number, number, number, number, number];
  readonly momentum: readonly [number, number];
}
export const BOARD_LIMIT = 10;
export const SNAPSHOT = "2026-11-17 08:30:00";
export const ASSETS: readonly MarketAsset[] = [
  { symbol: "SHELLUSDT", price: "0.028540", turnover: "39.45M", returns: [1.42, 4.86, 8.24, 18.62, 43.06, 68.41], momentum: [0.82, 1.64] },
  { symbol: "ARXUSDT", price: "0.213300", turnover: "18.72M", returns: [0.76, 3.18, 5.92, 9.46, 13.81, 27.62], momentum: [0.46, 0.92] },
  { symbol: "ACTUSDT", price: "0.042180", turnover: "62.31M", returns: [1.86, 3.72, 6.81, 11.32, 24.76, 41.58], momentum: [1.12, 1.48] },
  { symbol: "PNUTUSDT", price: "0.081260", turnover: "28.64M", returns: [0.54, 2.64, 4.28, 7.64, 16.82, 22.76], momentum: [0.24, 0.68] },
  { symbol: "NEIROUSDT", price: "0.0001642", turnover: "21.08M", returns: [0.92, 2.12, 3.76, 6.12, 12.43, -4.62], momentum: [0.38, 0.42] },
  { symbol: "WIFUSDT", price: "0.246100", turnover: "47.62M", returns: [0.38, 1.86, 2.94, 5.86, 9.72, 18.24], momentum: [-0.12, 0.31] },
  { symbol: "1000PEPEUSDT", price: "0.005184", turnover: "112.84M", returns: [0.26, 1.42, 2.18, 4.32, 7.64, 14.83], momentum: [0.16, -0.24] },
  { symbol: "BOMEUSDT", price: "0.001206", turnover: "14.23M", returns: [0.18, 0.96, 1.62, 3.48, 6.18, 10.42], momentum: [-0.08, 0.18] },
  { symbol: "TIAUSDT", price: "0.842100", turnover: "34.18M", returns: [0.42, 1.68, 3.12, 6.42, 11.38, 19.64], momentum: [0.19, 0.54] },
  { symbol: "SUIUSDT", price: "1.426800", turnover: "184.62M", returns: [0.31, 1.24, 2.46, 4.86, 8.92, 16.34], momentum: [0.14, 0.36] },
  { symbol: "MOVEUSDT", price: "0.034820", turnover: "31.42M", returns: [-1.24, -3.84, -6.28, -10.48, -18.62, -26.83], momentum: [-0.94, -1.82] },
  { symbol: "OMUSDT", price: "0.067410", turnover: "26.18M", returns: [-0.86, -2.92, -4.86, -8.12, -14.76, -22.41], momentum: [-0.62, -1.24] },
  { symbol: "JELLYJELLYUSDT", price: "0.031260", turnover: "12.86M", returns: [-1.68, -2.46, -3.92, -6.84, -12.38, 8.62], momentum: [-1.14, -0.86] },
  { symbol: "PARTIUSDT", price: "0.048620", turnover: "9.72M", returns: [-0.62, -2.18, -3.24, -5.68, -9.42, -16.28], momentum: [-0.28, -0.72] },
  { symbol: "KAITOUSDT", price: "0.384200", turnover: "24.56M", returns: [-0.48, -1.76, -2.86, -4.32, -7.84, -11.62], momentum: [-0.16, -0.48] },
  { symbol: "COOKIEUSDT", price: "0.027180", turnover: "8.14M", returns: [-0.32, -1.42, -2.18, -3.76, -6.28, -9.84], momentum: [0.12, -0.32] },
  { symbol: "AI16ZUSDT", price: "0.061240", turnover: "16.28M", returns: [-0.24, -0.98, -1.76, -2.84, -4.62, -7.18], momentum: [0.06, -0.18] },
  { symbol: "REZUSDT", price: "0.006142", turnover: "6.42M", returns: [-0.16, -0.72, -1.24, -2.18, -3.86, -5.42], momentum: [-0.04, 0.08] },
  { symbol: "ZROUSDT", price: "1.284600", turnover: "22.47M", returns: [-0.38, -1.62, -2.74, -4.68, -8.16, -13.42], momentum: [-0.22, -0.58] },
  { symbol: "STRKUSDT", price: "0.084260", turnover: "17.38M", returns: [-0.28, -1.16, -1.98, -3.24, -5.74, -9.28], momentum: [-0.18, -0.41] },
];
export function metric(asset: MarketAsset, mode: BoardMode, window: MarketWindow): number {
  return mode === "momentum" ? asset.momentum[window === "5m" ? 0 : 1] : asset.returns[WINDOWS.indexOf(window)];
}
export function ranking(mode: BoardMode, window: MarketWindow, direction: Direction): readonly MarketAsset[] {
  return ASSETS.filter((asset) => direction === "gainers" ? metric(asset, mode, window) > 0 : metric(asset, mode, window) < 0)
    .sort((a, b) => direction === "gainers" ? metric(b, mode, window) - metric(a, mode, window) : metric(a, mode, window) - metric(b, mode, window)).slice(0, BOARD_LIMIT);
}
export function signed(value: number): string { return `${value > 0 ? "+" : ""}${value.toFixed(2)}`; }
