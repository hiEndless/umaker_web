import type { Metadata } from "next";
import { Suspense } from "react";
import { MarketWorkspace } from "@/components/market/market-workspace";

export const metadata: Metadata = {
  title: "市场观察",
  description: "UMAKER 市场榜单与多周期观察工作台。展示 UMaker 共享候选池收益与动量榜单。",
  alternates: { canonical: "/market" },
  robots: { index: false, follow: false },
};
export default function MarketPage(): React.JSX.Element {
  return <Suspense fallback={<main className="p-10 text-sm text-neutral-400">加载市场观察工作台…</main>}><MarketWorkspace /></Suspense>;
}
