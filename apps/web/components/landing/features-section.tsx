"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    id: "01",
    tag: "市场证据",
    title: "汇聚市场\n数据",
    desc: "持续接入价格、成交量、持仓、资金费率、清算与资金流等多维数据，为研究提供可追溯的市场证据。",
    stat: { v: "多维", l: "市场数据" },
  },
  {
    id: "02",
    tag: "市场结构",
    title: "识别多周期\n结构",
    desc: "将离散行情组织为趋势、波动、流动性、仓位与市场状态，让不同时间尺度上的变化能够被一致地理解。",
    stat: { v: "多周期", l: "结构视角" },
  },
  {
    id: "03",
    tag: "AI 因子研究",
    title: "发现并验证\n量化因子",
    desc: "AI Agent 在受约束的研究流程中持续探索市场关系，评估因子强度、稳定性与衰减特征，而不是生成无法验证的结论。",
    stat: { v: "AI", l: "受约束研究" },
  },
  {
    id: "04",
    tag: "策略输入",
    title: "驱动\n量化策略",
    desc: "把结构化因子与实时信号交给独立策略、风险门控和验证流程，为后续决策提供清晰、可消费的量化输入。",
    stat: { v: "实时", l: "可消费信号" },
  },
];

function FeatureRow({ f, index }: { f: typeof FEATURES[0]; index: number }) {
  const [vis, setVis] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group border-b border-[#1e1e1e] transition-all duration-500 row-hover ${
        vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="grid grid-cols-[56px_1fr] lg:grid-cols-[56px_260px_1fr_160px] gap-0">
        {/* Number col */}
        <div className="border-r border-[#1e1e1e] p-5 flex items-start pt-6">
          <span className="font-mono text-[10px] text-[#3a3a3a] tracking-widest">{f.id}</span>
        </div>

        {/* Tag + Title */}
        <div className="border-r border-[#1e1e1e] p-6 flex flex-col gap-3">
          <span className="sys-tag text-[9px]">{f.tag}</span>
          <h3 className="font-display text-3xl lg:text-4xl leading-[0.9] text-[#f2ede6] group-hover:text-[#2196f3] transition-colors duration-300 whitespace-pre-line">
            {f.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-2 lg:col-span-1 border-r border-[#1e1e1e] p-6 flex items-center">
          <p className="text-sm text-[#5a5a5a] leading-relaxed max-w-lg">{f.desc}</p>
        </div>

        {/* Stat */}
        <div className="hidden lg:flex flex-col items-end justify-center p-6">
          <div className="font-display text-4xl text-[#2196f3]">{f.stat.v}</div>
          <div className="font-mono text-[9px] text-[#3a3a3a] tracking-widest mt-1 text-right">{f.stat.l}</div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [vis, setVis] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" className="relative border-t border-[#1e1e1e] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header row */}
        <div
          ref={ref}
          className={`grid grid-cols-[56px_1fr] lg:grid-cols-[56px_260px_1fr_160px] border-b border-[#1e1e1e] transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="border-r border-[#1e1e1e] p-5" />
          <div className="col-span-2 lg:col-span-3 p-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="sys-tag mb-4 block">核心能力</span>
              <h2 className="font-display text-6xl lg:text-8xl text-[#f2ede6] leading-[0.88] tracking-tight">
                UMAKER 如何<br />
                <span className="text-[#3a3a3a]" style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>
                  理解市场
                </span>
              </h2>
            </div>
            <p className="font-mono text-[10px] text-[#3a3a3a] tracking-widest max-w-[200px] text-right hidden lg:block">
              市场数据 &nbsp;/ &nbsp;结构识别 &nbsp;/ &nbsp;因子研究 &nbsp;/ &nbsp;策略输入
            </p>
          </div>
        </div>

        {/* Feature rows */}
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.id} f={f} index={i} />
        ))}

        {/* CTA row */}
        <div className="grid grid-cols-[56px_1fr] border-b border-[#1e1e1e]">
          <div className="border-r border-[#1e1e1e]" />
          <div className="p-6 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#3a3a3a]">了解 UMAKER 的研究方法 →</span>
            <a href="#" className="font-mono text-xs text-[#2196f3] hover:underline tracking-wider">查看系统架构</a>
          </div>
        </div>
      </div>
    </section>
  );
}
