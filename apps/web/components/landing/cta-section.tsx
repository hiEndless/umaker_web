"use client";

import { useEffect, useRef, useState } from "react";

function DotWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const SPACING = 28;
    const DOT_R   = 1.5;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width  / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = col * SPACING;
          const by = row * SPACING;

          // wave displacement: diagonal propagation
          const wave = Math.sin((col * 0.35) + (row * 0.35) - t * 2.2);
          const dy   = wave * 5;
          const alpha = 0.06 + Math.abs(wave) * 0.22;

          ctx.beginPath();
          ctx.arc(bx, by + dy, DOT_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(33,150,243,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function CtaSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="relative border-t border-[#1e1e1e] scroll-mt-[88px]">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Giant CTA block */}
        <div className="border border-[#1e1e1e] relative overflow-hidden my-12 lg:my-16">
          {/* Dot wave background */}
          <DotWaveCanvas />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-[#2196f3]/30" />
          <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-[#2196f3]/30" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-r border-t border-[#2196f3]/30" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-[#2196f3]/30" />

          {/* Subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(33,150,243,0.04) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 px-8 lg:px-20 py-16 lg:py-24 text-center">
            {/* Service mode */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full bg-[#2196f3] inline-block" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#2196f3]">策略合作与托管接入</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] tracking-tight text-[#f2ede6] mb-6">
              定制策略<br />
              <span className="text-[#2196f3]">托管运行</span>
            </h2>

            <p className="text-sm text-[#737373] mb-4 max-w-2xl mx-auto leading-relaxed">
              UMAKER 为有明确交易需求的客户提供定制策略与 API 托管服务。
            </p>
            <p className="font-mono text-[11px] text-[#4d4d4d] mb-12 max-w-2xl mx-auto leading-relaxed">
              根据标的、交易周期、风险约束与执行要求设计策略；或在客户提供交易所 API 后，通过托管基础设施持续运行已验证策略，并在私有看板查看持仓、风险和绩效。
            </p>

            {/* Contact details are intentionally direct while private access is handled manually. */}
            <div className="max-w-xl mx-auto border border-[#2e2e2e] bg-[#080808]/80 grid sm:grid-cols-2 text-left">
              <div className="px-6 py-5 border-b sm:border-b-0 sm:border-r border-[#2e2e2e]">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#3a3a3a] block mb-2">微信咨询</span>
                <span className="font-mono text-sm tracking-wider text-[#f2ede6] select-all">copyapes_admin</span>
              </div>
              <div className="px-6 py-5">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#3a3a3a] block mb-2">邮箱咨询</span>
                <span className="font-mono text-sm tracking-wider text-[#f2ede6] select-all">service@umaker.org</span>
              </div>
            </div>

            {/* Service scope */}
            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
              {[
                "定制策略",
                "交易所 API 托管",
                "私有交易看板",
                "运行与风险监控",
              ].map(s => (
                <span key={s} className="font-mono text-[10px] tracking-widest text-[#4d4d4d]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
