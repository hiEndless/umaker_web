"use client";

import { useEffect, useRef, useState } from "react";

const CORE_OUTPUTS = [
  { id: "01", tag: "市场预测", title: "概率性\n市场预测", desc: "Forecast 汇总跨周期市场判断，输出方向倾向、一致性与不确定性。它是策略研究的概率性输入，而不是直接交易指令。", file: "ethusdt-forecast.json", code: `{\n  "symbol": "ETHUSDT",\n  "generated_at": "2026-08-29T20:24:53Z",\n  "dominant_bias": "neutral_to_bearish",\n  "alignment": "conflicted",\n  "analytical_status": "risk_only",\n  "quality_status": "available"\n}` },
  { id: "02", tag: "结构快照", title: "多周期\n结构快照", desc: "Snapshot 描述当前市场的主要状态、方向偏向与结构置信度，为策略和风控提供同一时点的可追溯市场上下文。", file: "ethusdt-structure-snapshot.json", code: `{\n  "symbol": "ETHUSDT",\n  "generated_at": "2026-08-29T20:23:02Z",\n  "primary_state": "bullish_continuation",\n  "direction_bias": "neutral",\n  "structure_confidence": 0.35742,\n  "quality_status": "available"\n}` },
  { id: "03", tag: "结构事件", title: "捕捉市场\n结构事件", desc: "Event 记录突破、反转和流动性变化等结构转变，并附带时间周期、触发类型与置信度，便于后续回放与归因。", file: "ethusdt-structure-event.json", code: `{\n  "symbol": "ETHUSDT",\n  "created_at": "2026-08-29T16:38:32Z",\n  "timeframe": "1h",\n  "event_family": "reversal",\n  "trigger_type": "upthrust_reversal",\n  "confidence": 0.98,\n  "status": "active"\n}` },
];

export function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const id = setInterval(() => setActive((current) => (current + 1) % CORE_OUTPUTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const output = CORE_OUTPUTS[active];
  return (
    <section id="outputs" ref={ref} className="relative border-t border-[#1e1e1e] bg-[#080808] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`border-b border-[#1e1e1e] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div><span className="sys-tag mb-3 block">核心输出</span><h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#f2ede6]">三类输出<br /><span style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>持续理解市场</span></h2></div>
          <span className="font-mono text-[10px] text-[#3a3a3a] tracking-widest">市场预测 &nbsp;·&nbsp; 结构快照 &nbsp;·&nbsp; 结构事件</span>
        </div>
        <div className="grid lg:grid-cols-[280px_1fr] border-b border-[#1e1e1e]">
          <div className="border-r border-[#1e1e1e]">
            {CORE_OUTPUTS.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={`w-full text-left border-b border-[#1e1e1e] p-6 transition-all duration-200 group ${active === index ? "bg-[#0e0e0e]" : "hover:bg-[#0a0a0a]"}`}><div className="flex items-center justify-between mb-3"><span className="font-mono text-[9px] text-[#3a3a3a] tracking-widest">{item.tag}</span><span className="font-mono text-[10px] text-[#3a3a3a]">{item.id}</span></div><h3 className={`font-display text-2xl leading-[0.9] whitespace-pre-line transition-colors ${active === index ? "text-[#2196f3]" : "text-[#3a3a3a] group-hover:text-[#5a5a5a]"}`}>{item.title}</h3>{active === index && <div className="mt-4 h-px bg-[#1e1e1e] overflow-hidden"><div key={active} className="h-full bg-[#2196f3]" style={{ width: 0, animation: "draw-line 5s linear forwards" }} /></div>}</button>)}
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="border-r border-[#1e1e1e] p-8 flex flex-col justify-between"><div><p className="text-sm text-[#5a5a5a] leading-relaxed mb-8">{output.desc}</p><a href="#" className="inline-flex items-center gap-2 font-mono text-[11px] text-[#2196f3] tracking-wider hover:underline">查看输出定义 →</a></div><div className="mt-8 font-mono text-[10px] text-[#3a3a3a] border-t border-[#1e1e1e] pt-4">输出 &nbsp;{output.id} &nbsp;/ &nbsp;03</div></div>
            <div className="bg-[#050505]"><div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center justify-between"><span className="font-mono text-[10px] text-[#3a3a3a]">{output.file}</span><div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2196f3] inline-block" /><span className="font-mono text-[10px] text-[#2196f3]">回放样本</span></div></div><div className="p-6 font-mono text-[12px] min-h-[260px] overflow-x-auto"><pre>{output.code.split("\n").map((line, lineIndex) => <div key={`${active}-${lineIndex}`} className="leading-7 min-w-max" style={{ animation: `fade-up 0.3s ease ${lineIndex * 60}ms both` }}><span className="text-[#3a3a3a] select-none w-5 inline-block text-right mr-4">{lineIndex + 1}</span><span className="text-[#5a5a5a]">{line}</span></div>)}</pre></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
