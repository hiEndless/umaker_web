"use client";

import { useEffect, useRef, useState } from "react";

const DATA_STREAMS = [
  { source: "交易所实时流", evidence: "价格 / 成交 / 深度 / 强平", cadence: "200ms", output: "原始市场输入", role: "实时观察", intensity: 100 },
  { source: "市场特征层", evidence: "价格 / OI / 资金费率 / 多空比", cadence: "15s", output: "衍生品与行为因子", role: "特征生产", intensity: 68 },
  { source: "聪明钱数据", evidence: "巨鲸与交易者行为", cadence: "10s", output: "资金流因子", role: "辅助确认", intensity: 76 },
  { source: "市场结构事件", evidence: "突破 / 反转 / 失效", cadence: "10s", output: "市场结构事件", role: "变化捕捉", intensity: 76 },
  { source: "市场结构快照", evidence: "多周期市场状态", cadence: "5m", output: "市场结构快照", role: "状态基线", intensity: 35 },
  { source: "清算与流动性", evidence: "清算压力 / 流动性路径", cadence: "5m", output: "流动性因子", role: "风险背景", intensity: 35 },
  { source: "AI 预测", evidence: "结构化市场证据", cadence: "5m", output: "市场预测", role: "概率判断", intensity: 24 },
];

export function InfrastructureSection() {
  const [vis, setVis]       = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % DATA_STREAMS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="infrastructure" ref={ref} className="relative border-t border-[#1e1e1e] bg-[#080808] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`border-b border-[#1e1e1e] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${vis ? "opacity-100" : "opacity-0"}`}
        >
          <div>
            <span className="sys-tag mb-3 block">数据源与刷新频率</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#f2ede6]">
              多源数据<br />
              <span style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>异步汇聚</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-8 text-right">
            {[
              { v: "200ms", l: "实时市场流" },
              { v: "10s", l: "快速结构事件" },
              { v: "5m", l: "快照与预测" },
            ].map(s => (
              <div key={s.l}>
                <div className="font-display text-3xl text-[#2196f3]">{s.v}</div>
                <div className="font-mono text-[9px] text-[#3a3a3a] tracking-widest mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data cadence table */}
        <div className="border-b border-[#1e1e1e] overflow-x-auto">
          {/* Table header */}
          <div className="grid min-w-[860px] grid-cols-[1.1fr_1.45fr_1.35fr_1fr_150px] border-b border-[#1e1e1e] px-6 py-3">
            {["数据源", "市场证据", "结构化输出", "系统角色", "刷新频率"].map(h => (
              <span key={h} className="font-mono text-[9px] text-[#3a3a3a] tracking-widest">{h}</span>
            ))}
          </div>

          {/* Rows */}
          {DATA_STREAMS.map((stream, i) => (
            <div
              key={stream.source}
              className={`grid min-w-[860px] grid-cols-[1.1fr_1.45fr_1.35fr_1fr_150px] px-6 py-5 border-b border-[#1e1e1e] last:border-b-0 transition-all duration-300 ${
                active === i ? "bg-[#0e0e0e]" : "hover:bg-[#0a0a0a]"
              } ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${
                    active === i ? "bg-[#2196f3]" : "bg-[#2e2e2e]"
                  }`}
                />
                <span className={`font-mono text-xs ${active === i ? "text-[#f2ede6]" : "text-[#5a5a5a]"}`}>
                  {stream.source}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#3a3a3a] tracking-wider self-center">{stream.evidence}</span>
              <span className={`font-mono text-xs self-center ${active === i ? "text-[#2196f3]" : "text-[#5a5a5a]"}`}>
                {stream.output}
              </span>
              <span className="font-mono text-xs text-[#5a5a5a] self-center">{stream.role}</span>
              <div className="flex items-center gap-2 self-center pr-5">
                <div className="flex-1 h-1 bg-[#1e1e1e] overflow-hidden">
                  <div
                    className="h-full bg-[#2196f3] transition-all duration-500"
                    style={{ width: `${stream.intensity}%`, opacity: active === i ? 1 : 0.35 }}
                  />
                </div>
                <span className="font-mono text-[10px] w-8 text-right text-[#3a3a3a]">
                  {stream.cadence}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="py-4 flex justify-end">
          <span className="font-mono text-[10px] text-[#3a3a3a]">
            默认配置：7 类数据流在统一市场上下文中完成对齐
          </span>
        </div>
      </div>
    </section>
  );
}
