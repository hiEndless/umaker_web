"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ArrowRight, SlidersHorizontal, Clock3, Layers3, Info } from "lucide-react";
import { WINDOWS, BOARD_LIMIT, usable, signedFraction, type BoardMode, type MarketWindow, type Direction, type Board, type Entry, type Quote } from "@/src/domain/market/model";
import { useMarketData } from "./use-market-data";
import { hasSnapshot, oldSnapshot } from "./snapshot-retention";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardPage } from "@/components/dashboard/page-container";
import { DataTable, type DashboardColumn } from "@/components/dashboard/data-table";
import { DataToolbar } from "@/components/dashboard/data-toolbar";
import { DataStatus, EmptyState } from "@/components/dashboard/data-status";
import { DetailPanel } from "@/components/dashboard/detail-panel";
import styles from "./market.module.css";

function Pair({ symbol, showQuote = true }: { readonly symbol: string; readonly showQuote?: boolean }): React.JSX.Element {
  return <span className={styles.pair}>{symbol.replace(/USDT$/, "")}{showQuote && <span> / USDT</span>}</span>;
}
function tone(value: number): string { return value >= 0 ? styles.positive : styles.negative; }

interface MarketCellValues {
  readonly selectedSymbol: string;
  readonly selectPair: (symbol: string) => void;
  readonly quoteFor: (symbol: string) => Quote | undefined;
  readonly stamp: (time: number) => string;
  readonly turnoverText: (value: string) => string;
  readonly mode: BoardMode;
  readonly now: number;
}
const MarketCells = createContext<MarketCellValues | null>(null);
function useMarketCells(): MarketCellValues { const value = useContext(MarketCells); if (!value) throw new Error("market_cells_provider_required"); return value; }
interface EntryCellProps { readonly row: { readonly original: Entry } }
function MarketPairCell({ row }: EntryCellProps): React.JSX.Element {
  const { selectedSymbol, selectPair } = useMarketCells(); const asset = row.original;
  return <button type="button" className={styles.pairButton} onClick={() => selectPair(asset.symbol)} aria-pressed={asset.symbol === selectedSymbol} aria-label={`查看 ${asset.symbol}`}><span className={styles.rank}>{String(asset.rank).padStart(2, "0")}</span><Pair symbol={asset.symbol} showQuote={false} /></button>;
}
function MarketReturnCell({ row }: EntryCellProps): React.JSX.Element {
  const { mode } = useMarketCells(); return <span className={`${styles.number} ${tone(Number(row.original.value))}`}>{signedFraction(row.original.value)}<span className={styles.unit}>{mode === "momentum" ? " pp" : "%"}</span></span>;
}
function MarketTurnoverCell({ row }: EntryCellProps): React.JSX.Element {
  const { quoteFor, stamp, turnoverText, now } = useMarketCells(); const quote = quoteFor(row.original.symbol);
  return <span className={`${styles.number} ${styles.turnover}`} title={quote ? `24h USDT成交额 ${quote.quote_volume_24h} · 行情时间 ${stamp(quote.price_at_ms)}` : "报价暂不可用"}>{quote ? turnoverText(quote.quote_volume_24h) : "—"}{quote && quote.expires_at_ms <= now && <small> · 旧快照</small>}</span>;
}

export function MarketWorkspace(): React.JSX.Element {
  const params = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const detailRef = useRef<HTMLElement>(null);
  const mode: BoardMode = params.get("view") === "momentum" ? "momentum" : "returns";
  const requested = params.get("window");
  const window: MarketWindow = WINDOWS.includes(requested as MarketWindow) && (mode === "returns" || requested === "5m" || requested === "15m") ? requested as MarketWindow : "15m";
  const { data, loading, error, failedBoards, now, refresh } = useMarketData();
  const quoteFor = (symbol: string) => data?.quotes?.find((q) => q.symbol === symbol);
  const priceText = (value: string): string => Number(value).toLocaleString("en-US", { maximumSignificantDigits: 10 });
  const turnoverText = (value: string): string => Number(value).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 2 });
  const boardFor = (view: BoardMode, period: MarketWindow, direction: Direction): Board | undefined => data?.boards.find((b) => b.view === view && b.window === period && b.direction === direction);
  const currentBoards = (["gainers", "losers"] as const).map((d) => boardFor(mode, window, d));
  const visibleEntries = currentBoards.flatMap((b) => hasSnapshot(b) ? b.entries : []);
  const refreshFailed = error || failedBoards.some((b) => b.view === mode && b.window === window);
  const showingOld = currentBoards.some((b) => oldSnapshot(b, now));
  const selectedSymbol = params.get("symbol") ?? visibleEntries[0]?.symbol ?? "";
  const selectedQuote = quoteFor(selectedSymbol);
  const selectedEntry = visibleEntries.find((e) => e.symbol === selectedSymbol);
  const updatedAt = Math.max(0, ...currentBoards.map((b) => b?.as_of_ms ?? 0));
  const stamp = (time: number): string => new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(time);
  const stateText = (b: Board | undefined): string => !b ? (loading ? "正在加载" : "数据不可用") : oldSnapshot(b, now) ? "旧快照 · 等待自动更新" : b.status === "unavailable" ? (b.reason === "unconfigured" ? "数据源未配置" : "数据不可用") : b.status === "stale" || b.expires_at_ms !== null && now >= b.expires_at_ms ? "数据已过期" : b.status === "not_ready" ? "历史样本积累中" : b.status === "partial" ? "部分有效样本" : "数据有效";
  const update = (changes: Readonly<Record<string, string>>): void => {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([key, value]) => next.set(key, value));
    router.replace(`/market?${next.toString()}`, { scroll: false });
  };
  const selectPair = (symbol: string): void => {
    update({ symbol });
    if (globalThis.matchMedia("(max-width: 760px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };
  const windows: readonly MarketWindow[] = mode === "returns" ? WINDOWS : ["5m", "15m"];
  const matched = new Set(visibleEntries.filter((a) => a.symbol.toLowerCase().includes(search.trim().toLowerCase())).map((a) => a.symbol)).size;

  function renderBoard(direction: Direction): React.JSX.Element {
    const up = direction === "gainers";
    const board = boardFor(mode, window, direction);
    const all = hasSnapshot(board) ? board.entries : [];
    const assets = all.filter((a) => a.symbol.toLowerCase().includes(search.trim().toLowerCase()));
    const columns: DashboardColumn<Entry>[] = [
      { id: "symbol", accessorKey: "symbol", header: "排名 / 交易对", cell: MarketPairCell },
      { id: "value", accessorKey: "value", header: mode === "momentum" ? "动量变化" : `${window} 涨跌幅`, cell: MarketReturnCell },
      { id: "turnover", header: "24h 成交额", cell: MarketTurnoverCell },
    ];
    return <section className={styles.board} aria-label={up ? "上涨方向榜单" : "下跌方向榜单"}>
      <div className={styles.boardHeading}>
        <span className={`${styles.directionIcon} ${up ? styles.positive : styles.negative}`}>{up ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}</span>
        <div><h2>{mode === "momentum" ? (up ? "动量增强" : "动量减弱") : (up ? "涨幅榜" : "跌幅榜")}</h2><p>{mode === "momentum" ? "相邻两段收益率之差" : `${window} 周期收益率`}</p></div>
        <span className={styles.boardCount}>{String(assets.length).padStart(2, "0")} <span>交易对</span></span>
      </div>
      <DataTable id={`${mode}-${window}-${direction}`} data={assets} columns={columns} getRowId={(asset) => asset.symbol} rowClassName={(asset) => asset.symbol === selectedSymbol ? styles.activeRow : ""} tableClassName={styles.rankTable} empty={<EmptyState title={hasSnapshot(board) ? (search ? "该榜单中没有匹配的交易对" : "本方向暂无上榜交易对") : stateText(board)} description={board?.status === "not_ready" ? <p>有效 {board.eligible_count} · 数据不足 {board.insufficient_count}</p> : undefined} action={search ? <button type="button" onClick={() => setSearch("")}>清除搜索</button> : undefined} />} />
      <div className={styles.boardFoot}><span title={board?.eligible_count !== null && board?.eligible_count !== undefined ? `有效 ${board.eligible_count} · 数据不足 ${board.insufficient_count}` : undefined}>{stateText(board)} · 最多{BOARD_LIMIT}个交易对{board?.as_of_ms != null && <small style={{ display: "block", marginTop: 5 }}>快照 {stamp(board.as_of_ms)}</small>}</span><span className={up ? styles.positive : styles.negative}>{up ? "数值降序 ↓" : "数值升序 ↑"}</span></div>
    </section>;
  }

  return <DashboardShell title="市场观察"><div className={styles.workspace}>
    <DashboardPage className={styles.main}>
      <div className={styles.pageHeading}><div><div className={styles.eyebrow}><span /> MARKET OBSERVATORY / 01</div><h1>发现异动<span>，</span>看清来由<span>。</span></h1><p>从榜单出发，追踪每一个交易对的多周期表现。</p></div><div className={styles.snapshot}><span className={styles.demoBadge}>{loading ? "正在更新" : refreshFailed ? "更新失败" : "自动更新"}</span><span className={styles.timestamp}><Clock3 size={12} />{updatedAt ? stamp(updatedAt) : "等待数据"} <small>UTC+8</small></span></div></div>
      <div className={styles.summary}>
        <div><span className={styles.summaryLabel}>观察范围</span><strong>共享候选池 <span className={styles.smallTag}>USDT</span></strong><small>非全市场排名</small></div>
        <div><span className={styles.summaryLabel}>候选池交易对</span><strong className={styles.mono}>{data?.pool_size ?? "—"} <small>PAIRS</small></strong><small>24h涨跌榜候选去重数量</small></div>
        <div><span className={styles.summaryLabel}>收益观察窗口</span><strong className={styles.mono}>06 <small>WINDOWS</small></strong><small>5分钟至5天，多周期交叉观察</small></div>
        <div className={styles.summaryNote}><Layers3 size={18} /><p>一个交易对，多个观察视角。<br /><span>点击榜单行，查看跨榜归属。</span></p></div>
      </div>
      <DataToolbar search={search} onSearchChange={setSearch} onReset={() => { setSearch(""); router.replace("/market", { scroll: false }); }} className={styles.controls}>
        <div className={styles.modeSwitch} aria-label="榜单类型">{(["returns", "momentum"] as const).map((v) => <button type="button" key={v} aria-pressed={mode === v} onClick={() => update({ view: v, window: v === "momentum" && !["5m", "15m"].includes(window) ? "15m" : window })}> {v === "returns" ? "收益榜" : "动量榜"}</button>)}</div>
        <div className={styles.periods} aria-label="观察周期">{windows.map((w) => <button type="button" key={w} aria-pressed={window === w} onClick={() => update({ window: w })}>{w}</button>)}</div>
      </DataToolbar>
      <div className={styles.sectionCaption}><span><span className={styles.blueDot} /> {mode === "returns" ? "收益排行" : "动量排行"}<span className={styles.captionLine} />{window} · {updatedAt ? `快照 ${stamp(updatedAt)}` : "等待有效快照"}{search && ` · 匹配 ${matched} 个交易对`}</span><span><SlidersHorizontal size={12} /> 按{mode === "returns" ? "周期收益率" : "动量变化"}排序</span></div>
      {(refreshFailed || showingOld) && <DataStatus state={refreshFailed ? "error" : "stale"} className="mb-4" onRetry={refresh} pending={loading}>{refreshFailed ? "更新暂未成功，保留上次榜单，将自动重试。" : "当前显示旧快照，等待自动更新。"}</DataStatus>}
      <div className={styles.content}>
        <MarketCells.Provider value={{ selectedSymbol, selectPair, quoteFor, stamp, turnoverText, mode, now }}><div className={styles.boards}>{renderBoard("gainers")}{renderBoard("losers")}</div></MarketCells.Provider>
        <DetailPanel ref={detailRef} className={styles.detail} title="交易对详情" badge={<span className={styles.outlineTag}>{showingOld ? "含旧快照" : "当前榜单"}</span>}>
          <div className={styles.assetHeading}>{selectedSymbol ? <Pair symbol={selectedSymbol} /> : <span className={styles.muted}>选择一个交易对</span>}<span className={styles.assetMarket}>币安 USDT 永续 · 共享候选池</span><div className={styles.price}>{selectedQuote ? priceText(selectedQuote.last_price) : "—"}<span> USDT</span></div><span className={styles.assetMarket}>{selectedQuote ? `${selectedQuote.expires_at_ms <= now ? "旧快照" : "最新成交价"} · ${stamp(selectedQuote.price_at_ms)}` : "报价暂不可用"}</span><div className={`${styles.priceChange} ${selectedEntry ? tone(Number(selectedEntry.value)) : styles.muted}`}>{selectedEntry ? `${signedFraction(selectedEntry.value)}${mode === "momentum" ? " pp" : "%"}` : "—"}<span>{window} {mode === "momentum" ? "动量变化" : "周期涨跌"}</span></div></div>
          <div className={styles.matrixHeading}><h2>多周期榜单归属</h2><span>收益榜</span></div>
          <table className={styles.matrix}><thead><tr><th>周期</th><th>涨跌幅</th><th>所属榜单 / 排名</th></tr></thead><tbody>{WINDOWS.map((w) => {
            const up = boardFor("returns", w, "gainers"), down = boardFor("returns", w, "losers");
            const matches: { board: Board; entry: Entry }[] = [up, down].flatMap((board) => { const entry = hasSnapshot(board) ? board.entries.find((e) => e.symbol === selectedSymbol) : undefined; return board && entry ? [{ board, entry }] : []; });
            const v = matches[0]?.entry.value;
            const unavailable = !up || !down || !usable(up, now) || !usable(down, now);
            return <tr key={w} className={window === w ? styles.currentPeriod : ""}><td><button type="button" aria-label={`查看 ${w} 收益榜`} onClick={() => update({ view: "returns", window: w })}>{w}{window === w && <span />}</button></td><td className={v === undefined ? styles.muted : tone(Number(v))}>{v === undefined ? "—" : `${signedFraction(v)}%`}</td><td>{matches.length > 0 ? matches.map(({ board, entry }) => <button type="button" key={board.direction} title={`该榜快照 ${stamp(board.as_of_ms!)}`} className={styles.rankLink} onClick={() => update({ view: "returns", window: w })}>{board.direction === "gainers" ? "涨幅榜" : "跌幅榜"}<span>#{entry.rank}{oldSnapshot(board, now) ? "（旧快照）" : ""}</span><ArrowUpRight size={11} /></button>) : <span className={styles.muted}>{!selectedSymbol ? "—" : unavailable ? "数据未就绪" : "未在前10名"}</span>}</td></tr>;
          })}</tbody></table>
          <div className={styles.observation}><div><span className={styles.observationDot} /><h3>观察依据</h3></div><p>这里展示当前榜单归属。观察池状态、入池原因与形态确认信息尚未接入。</p><span>当前快照不解释历史信号</span></div>
          <div className={styles.detailFooter}><Info size={13} /><p>榜单反映市场表现，不能单独作为交易依据。</p></div>
        </DetailPanel>
      </div>
      <div id="market-data-note" className={styles.dataNote}><Info size={14} /><p><strong>关于这份数据</strong> 榜单来自 UMaker API，使用时自动刷新，切回页面立即补刷。过期或更新失败时保留上次快照并标注状态，新快照到达后自动替换；缺失数据不填0。价格为最新成交价，24h成交额以USDT计价；报价缺失时以“—”表示，过期保留并标注旧快照。动量单位为百分点（pp）。</p></div>
      <footer className={styles.footer}><span>UMAKER <span>/ MARKET INTELLIGENCE</span></span><span>数据 → 榜单 → 观察 → 验证 <ArrowRight size={12} /></span></footer>
    </DashboardPage>
  </div></DashboardShell>;
}
