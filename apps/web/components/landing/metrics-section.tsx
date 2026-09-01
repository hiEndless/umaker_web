"use client";

import { useEffect, useRef, useState } from "react";

function AnimCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(ease * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div
      ref={ref}
      className="font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight text-[#f2ede6] tabular-nums"
    >
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </div>
  );
}

const METRICS = [
  {
    end: 2174,
    label: "市场预测",
    sub: "每日持续生成的 Forecast 记录",
    density: 52,
  },
  {
    end: 4204,
    label: "结构快照",
    sub: "多周期市场状态审计记录",
    density: 100,
  },
  {
    end: 800,
    label: "1H 结构事件",
    sub: "突破、反转与失效事件样本",
    density: 19,
  },
  {
    end: 9,
    label: "研究周期",
    sub: "从 5m 到 1d 的市场视角",
    density: 32,
  },
];

export function MetricsSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="metrics" ref={ref} className="relative border-t border-[#1e1e1e] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`border-b border-[#1e1e1e] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <span className="sys-tag mb-3 block">研究验证</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#f2ede6]">
              让市场判断
              <br />
              <span
                style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}
              >
                可以被验证
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#3a3a3a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3] inline-block" />
            <span>ETHUSDT · 每日研究产出 · 统计窗口 2026-09-01</span>
          </div>
        </div>

        {/* Metrics grid — each cell has a fixed min-height and overflow-hidden to prevent bleed */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#1e1e1e]">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`border-r border-[#1e1e1e] last:border-r-0 border-b lg:border-b-0 p-6 lg:p-8 overflow-hidden transition-all duration-500 ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <AnimCounter end={m.end} />
              <div className="mt-3 font-mono text-[10px] text-[#2196f3] tracking-[0.12em]">
                {m.label}
              </div>
              <div className="mt-1 font-mono text-[10px] text-[#3a3a3a]">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Research evidence density */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-[#3a3a3a] tracking-widest uppercase">
              研究证据记录
            </span>
            <span className="font-mono text-[10px] text-[#2196f3] tracking-widest">
              ETHUSDT
            </span>
          </div>
          <div className="space-y-3">
            {METRICS.slice(0, 3).map((metric, index) => (
              <div
                key={metric.label}
                className={`grid grid-cols-[120px_1fr_64px] items-center gap-4 transition-all duration-500 ${
                  vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="font-mono text-[10px] text-[#5a5a5a]">{metric.label}</span>
                <div className="h-1 bg-[#1e1e1e] overflow-hidden">
                  <div
                    className="h-full bg-[#2196f3] transition-[width] duration-1000"
                    style={{ width: vis ? `${metric.density}%` : "0%" }}
                  />
                </div>
                <span className="font-mono text-[10px] text-right text-[#3a3a3a]">
                  {metric.end.toLocaleString()} 条
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-mono text-[9px] text-[#3a3a3a]">市场预测 · 结构快照 · 结构事件</span>
            <span className="font-mono text-[9px] text-[#3a3a3a]">用于回放、归因与研究</span>
          </div>
        </div>

      </div>
    </section>
  );
}
