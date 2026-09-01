"use client";

import { useEffect, useRef, useState } from "react";

const RESEARCH_CASES = [
  {
    statement: "多周期判断出现分歧时，保留不确定性，而不是强行给出交易结论。",
    source: "ETHUSDT · Forecast 回放样本",
    context: "方向倾向 neutral_to_bearish · 分歧状态 conflicted · 研究状态 risk_only",
    metric: "CONFLICTED",
    metricLabel: "FORECAST ALIGNMENT",
  },
  {
    statement: "结构快照记录市场状态与置信度，作为可回放、可比较的时点基线。",
    source: "ETHUSDT · Snapshot 回放样本",
    context: "主要状态 bullish_continuation · 方向偏向 neutral · 质量状态 available",
    metric: "0.357",
    metricLabel: "STRUCTURE CONFIDENCE",
  },
  {
    statement: "结构事件独立记录突破、反转和失效，支持后续归因，而不把一次变化直接等同于交易信号。",
    source: "ETHUSDT · Event 回放样本",
    context: "1h · reversal · upthrust_reversal · status active",
    metric: "0.98",
    metricLabel: "EVENT CONFIDENCE",
  },
  {
    statement: "策略消费结构化市场证据，但执行判断仍属于独立策略自己的风险与持仓边界。",
    source: "策略交付层 · 系统设计原则",
    context: "结构化输出 → 策略分发 → 风险门控 → 独立策略执行",
    metric: "STRATEGY",
    metricLabel: "EXECUTION BOUNDARY",
  },
];

const SYSTEM_OBJECTS = ["FORECAST", "SNAPSHOT", "EVENT", "FACTOR", "RISK_GATE", "REPLAY", "STRATEGY", "CONTRACT"];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const changeCase = (next: number) => {
    if (next === active) return;
    setFading(true);
    window.setTimeout(() => {
      setActive(next);
      setFading(false);
    }, 250);
  };

  useEffect(() => {
    const id = window.setInterval(() => changeCase((active + 1) % RESEARCH_CASES.length), 5500);
    return () => window.clearInterval(id);
  }, [active]);

  const report = RESEARCH_CASES[active];

  return (
    <section id="research-cases" ref={ref} className="relative border-t border-[#1e1e1e] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`border-b border-[#1e1e1e] py-8 flex items-end justify-between transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <span className="sys-tag">研究案例</span>
          <span className="font-mono text-[10px] text-[#3a3a3a]">{String(active + 1).padStart(2, "0")} / {String(RESEARCH_CASES.length).padStart(2, "0")}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] border-b border-[#1e1e1e]">
          <div className="border-r border-[#1e1e1e] p-8 lg:p-12">
            <div className={`transition-all duration-250 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              <p className="font-display text-3xl lg:text-5xl leading-[0.95] tracking-tight text-[#f2ede6] mb-10">{report.statement}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center bg-[#0e0e0e]"><span className="font-display text-lg text-[#2196f3]">R</span></div>
                <div>
                  <p className="font-mono text-[11px] text-[#f2ede6] tracking-wider">{report.source}</p>
                  <p className="font-mono text-[10px] text-[#3a3a3a] tracking-wider mt-1">{report.context}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className={`flex-1 p-8 border-b border-[#1e1e1e] row-hover transition-all duration-250 ${fading ? "opacity-0" : "opacity-100"}`}>
              <span className="sys-tag text-[9px] mb-4 block">RESEARCH SIGNAL</span>
              <div className={`font-display text-[#2196f3] ${report.metric.length > 8 ? "text-3xl lg:text-4xl" : "text-6xl"}`}>{report.metric}</div>
              <div className="font-mono text-[10px] text-[#3a3a3a] tracking-widest mt-2">{report.metricLabel}</div>
            </div>
            <div className="p-6 flex items-center gap-2">
              {RESEARCH_CASES.map((_, index) => <button key={index} onClick={() => changeCase(index)} className={`h-1 transition-all duration-300 ${index === active ? "w-8 bg-[#2196f3]" : "w-2 bg-[#2e2e2e] hover:bg-[#5a5a5a]"}`} aria-label={`查看研究案例 ${index + 1}`} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1e1e1e] py-5 overflow-hidden">
        <div className="marquee-fast flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, repeat) => <span key={repeat} className="inline-flex gap-16 shrink-0">{SYSTEM_OBJECTS.map((item) => <span key={`${item}-${repeat}`} className="font-mono text-[11px] tracking-[0.2em] text-[#2e2e2e] hover:text-[#5a5a5a] transition-colors cursor-default">{item}</span>)}</span>)}
        </div>
      </div>
    </section>
  );
}
