"use client";

import { useEffect, useRef, useState } from "react";

const ROW1 = [
  { name: "交易所行情", cat: "市场数据" },
  { name: "清算与流动性", cat: "外部证据" },
  { name: "聪明钱数据", cat: "外部证据" },
  { name: "动态观察列表", cat: "标的范围" },
  { name: "实时数据流", cat: "市场数据" },
  { name: "Redis 状态流", cat: "基础设施" },
  { name: "市场特征", cat: "因子生产" },
  { name: "多周期结构", cat: "结构分析" },
];

const ROW2 = [
  { name: "市场智能", cat: "市场状态" },
  { name: "市场预测", cat: "概率判断" },
  { name: "结构快照", cat: "状态输出" },
  { name: "结构事件", cat: "事件输出" },
  { name: "因子流", cat: "策略输入" },
  { name: "策略分发", cat: "数据交付" },
  { name: "策略工厂", cat: "研究验证" },
  { name: "独立策略", cat: "策略消费" },
];

function IntChip({ name, cat }: { name: string; cat: string }) {
  return (
    <div className="shrink-0 flex items-center gap-4 border border-[#1e1e1e] px-5 py-3.5 hover:border-[#2196f3]/40 hover:bg-[#2196f3]/5 transition-all duration-200 cursor-default group">
      <span className="font-mono text-[9px] text-[#3a3a3a] tracking-widest">{cat}</span>
      <span className="font-display text-lg text-[#5a5a5a] group-hover:text-[#f2ede6] transition-colors">
        {name}
      </span>
    </div>
  );
}

export function IntegrationsSection() {
  const [vis, setVis] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="integrations" className="relative border-t border-[#1e1e1e] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`border-b border-[#1e1e1e] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${vis ? "opacity-100" : "opacity-0"}`}
        >
          <div>
            <span className="sys-tag mb-3 block">系统生态</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#f2ede6]">
              独立模块<br />
              <span style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>协同工作</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[#3a3a3a] max-w-[220px] text-right hidden lg:block leading-relaxed">
            市场证据 &nbsp;/&nbsp; 智能输出 &nbsp;/&nbsp; 策略消费
          </p>
        </div>
      </div>

      {/* Marquee rows — full width */}
      <div className="border-b border-[#1e1e1e] py-4 overflow-hidden">
        <div className="flex gap-3 marquee">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex gap-3 shrink-0">
              {ROW1.map(i => <IntChip key={`${i.name}-${ri}`} {...i} />)}
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[#1e1e1e] py-4 overflow-hidden">
        <div className="flex gap-3" style={{ animation: "marquee 20s linear infinite reverse" }}>
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex gap-3 shrink-0">
              {ROW2.map(i => <IntChip key={`${i.name}-${ri}`} {...i} />)}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#3a3a3a]">模块通过清晰契约交换结构化市场信息</span>
        <a href="#" className="font-mono text-[10px] text-[#2196f3] hover:underline tracking-wider">
          查看系统架构 →
        </a>
      </div>
    </section>
  );
}
