"use client";

import { useEffect, useRef, useState } from "react";

const PRINCIPLES = ["结构化契约", "质量门控", "概率输出", "原因码", "历史回放"];

const FEATURES = [
  {
    id: "01",
    tag: "结构化输入",
    title: "只消费可验证字段",
    desc: "策略只消费标准化的 Forecast、Snapshot、Event 与因子字段，而不是直接解析自然语言结论。",
  },
  {
    id: "02",
    tag: "质量门控",
    title: "缺失数据不会被放行",
    desc: "数据过期、缺失或质量降级时必须显式标记，不能静默转为可执行信号。",
  },
  {
    id: "03",
    tag: "概率判断",
    title: "Forecast 不是交易指令",
    desc: "AI 输出方向假设、不确定性与证据摘要，仍需市场结构和风险条件共同确认。",
  },
  {
    id: "04",
    tag: "回放归因",
    title: "每次变化都有证据",
    desc: "Forecast、快照、事件和原因码保留在历史记录中，支持回放、归因与研究复盘。",
  },
];

export function SecuritySection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="security" ref={ref} className="relative border-t border-[#1e1e1e] bg-[#080808] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div
          className={`border-b border-[#1e1e1e] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${vis ? "opacity-100" : "opacity-0"}`}
        >
          <div>
            <span className="sys-tag mb-3 block">决策边界</span>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.88] tracking-tight text-[#f2ede6]">
              让 AI 参与研究<br />
              <span style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>而非替代判断</span>
            </h2>
          </div>
          {/* Research boundary principles */}
          <div className="flex flex-wrap gap-2">
            {PRINCIPLES.map((principle, i) => (
              <span
                key={principle}
                className={`font-mono text-[9px] tracking-widest border border-[#2e2e2e] px-3 py-2 text-[#5a5a5a] hover:border-[#2196f3]/40 hover:text-[#2196f3] transition-all duration-200 cursor-default ${
                  vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${i * 50 + 200}ms` }}
              >
                {principle}
              </span>
            ))}
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-b border-[#1e1e1e]">
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className={`border-r border-[#1e1e1e] last:border-r-0 p-6 row-hover transition-all duration-500 group ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Distinct dot animation per card */}
              <div className="h-10 mb-5 relative overflow-hidden">

                {/* Card 01 — scattered grid blink (opacity driven purely by keyframe) */}
                {i === 0 && (
                  <div className="grid grid-cols-8 gap-[4px] w-full h-full content-start pt-1">
                    {Array.from({ length: 24 }).map((_, d) => (
                      <span
                        key={d}
                        className="block w-[3px] h-[3px] rounded-full bg-[#2196f3]"
                        style={{
                          animationName: "dot-blink",
                          animationDuration: `${1.2 + (d % 4) * 0.4}s`,
                          animationTimingFunction: "step-start",
                          animationIterationCount: "infinite",
                          animationDelay: `${d * 80}ms`,
                          animationFillMode: "both",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Card 02 — orbit ring (opacity driven purely by keyframe) */}
                {i === 1 && (
                  <div className="relative w-10 h-10">
                    {Array.from({ length: 8 }).map((_, d) => {
                      const angle = (d / 8) * 2 * Math.PI;
                      const r = 16;
                      const x = 20 + r * Math.cos(angle);
                      const y = 20 + r * Math.sin(angle);
                      return (
                        <span
                          key={d}
                          className="absolute block w-[3px] h-[3px] rounded-full bg-[#2196f3]"
                          style={{
                            left: x,
                            top: y,
                            animationName: "dot-blink",
                            animationDuration: "1.6s",
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: `${d * 200}ms`,
                            animationFillMode: "both",
                          }}
                        />
                      );
                    })}
                    <span className="absolute block w-[3px] h-[3px] rounded-full bg-[#2196f3]" style={{ left: 19, top: 19 }} />
                  </div>
                )}

                {/* Card 03 — horizontal scan sweep using scaleX (no inline opacity) */}
                {i === 2 && (
                  <div className="flex items-center gap-[5px] h-full">
                    {Array.from({ length: 14 }).map((_, d) => (
                      <span
                        key={d}
                        className="block w-[3px] h-[3px] rounded-full bg-[#2196f3]"
                        style={{
                          animationName: "dot-scan",
                          animationDuration: "2s",
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                          animationDelay: `${d * 140}ms`,
                          animationFillMode: "both",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Card 04 — stepped equalizer bars */}
                {i === 3 && (() => {
                  const heights = [6, 14, 22, 28, 18, 32, 10, 26, 20, 8, 30, 16];
                  return (
                    <div className="flex items-end gap-[3px] h-full pb-0">
                      {heights.map((h, d) => (
                        <span
                          key={d}
                          className="block w-[4px] rounded-sm bg-[#2196f3]"
                          style={{
                            height: h,
                            opacity: 0.3 + (h / 32) * 0.7,
                            animation: `dot-pulse 1.4s ease-in-out infinite`,
                            animationDelay: `${d * 90}ms`,
                          }}
                        />
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="sys-tag text-[9px]">{f.tag}</span>
                <span className="font-mono text-[9px] text-[#2e2e2e]">{f.id}</span>
              </div>
              <h3 className="font-display text-2xl leading-[0.9] text-[#f2ede6] mb-3 group-hover:text-[#2196f3] transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-[#5a5a5a] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="py-5 flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#3a3a3a]">
            AI 是研究基础设施，不是未经验证的交易裁决者
          </span>
          <a href="#" className="font-mono text-[10px] text-[#2196f3] hover:underline tracking-wider">
            了解决策边界 →
          </a>
        </div>
      </div>
    </section>
  );
}
