"use client";

import { useEffect, useRef, useState } from "react";

type ArchitectureLayer = {
  id: string;
  tab: string;
  name: string;
  description: string;
  inputs: string[];
  core: string;
  outputs: string[];
};

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  { id: "01", tab: "接入", name: "市场接入层", description: "交易所行情、衍生品、清算、资金流和动态标的，以各自节奏进入统一输入层。", inputs: ["交易所 WebSocket", "衍生品与清算", "聪明钱数据"], core: "标准化市场输入", outputs: ["市场特征", "统一数据契约"] },
  { id: "02", tab: "智能", name: "市场智能层", description: "独立的市场智能模块从多周期结构与市场特征中生产可解释、可回放的研究输出。", inputs: ["标准化市场输入", "市场特征", "多周期窗口"], core: "市场智能引擎", outputs: ["Forecast", "结构快照", "结构事件"] },
  { id: "03", tab: "交付", name: "策略交付层", description: "结构化输出由策略分发、风险门控与回放研究消费；策略保持独立，并拥有自己的执行边界。", inputs: ["Forecast", "结构快照", "结构事件", "因子流"], core: "策略分发", outputs: ["风险门控", "独立量化策略", "回放与研究"] },
];

function FlowLine({ active }: { active: boolean }) {
  return <span className={`relative hidden h-px flex-1 overflow-hidden bg-[#202020] md:block ${active ? "bg-[#215a8d]" : ""}`}><span className={`absolute top-0 h-px w-10 bg-[#58b4ff] ${active ? "animate-[topology-flow_2.3s_linear_infinite]" : "opacity-0"}`} /></span>;
}

export function DevelopersSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const layer = ARCHITECTURE_LAYERS[active];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const id = setInterval(() => setActive((current) => (current + 1) % ARCHITECTURE_LAYERS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="architecture" ref={ref} className="relative border-t border-[#1e1e1e] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`border-b border-[#1e1e1e] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div><span className="sys-tag mb-3 block">系统架构</span><h2 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.88] tracking-tight text-[#f2ede6]">UMAKER 系统<br /><span style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>三层架构</span></h2></div>
          <span className="font-mono text-[10px] text-[#3a3a3a] tracking-widest">独立模块 &nbsp;·&nbsp; 清晰契约 &nbsp;·&nbsp; 策略自治</span>
        </div>
        <div className="grid lg:grid-cols-[330px_1fr] border-b border-[#1e1e1e]">
          <div className="border-r border-[#1e1e1e]">
            <div className="border-b border-[#1e1e1e] p-6"><p className="text-sm text-[#5a5a5a] leading-relaxed">市场数据、智能研究与策略消费保持模块独立，通过清晰契约交换结构化市场信息。</p></div>
            {ARCHITECTURE_LAYERS.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={`w-full text-left border-b border-[#1e1e1e] px-6 py-5 transition-colors ${active === index ? "bg-[#0e0e0e]" : "hover:bg-[#0a0a0a]"}`}><div className="flex items-center justify-between"><span className={`font-mono text-[11px] tracking-wider ${active === index ? "text-[#2196f3]" : "text-[#595959]"}`}>{item.name}</span><span className="font-mono text-[10px] text-[#3a3a3a]">{item.id}</span></div><p className="mt-2 text-xs leading-relaxed text-[#4d4d4d]">{item.description}</p>{active === index && <div className="mt-4 h-px overflow-hidden bg-[#1e1e1e]"><div key={active} className="h-full bg-[#2196f3]" style={{ width: 0, animation: "draw-line 5s linear forwards" }} /></div>}</button>)}
            <div className="p-6"><a href="#" className="font-mono text-[11px] text-[#2196f3] tracking-wider hover:underline">查看系统架构 →</a></div>
          </div>
          <div className={`min-w-0 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex border-b border-[#1e1e1e]">{ARCHITECTURE_LAYERS.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={`relative flex-1 py-3 font-mono text-[10px] tracking-[0.15em] transition-colors ${active === index ? "bg-[#0e0e0e] text-[#2196f3]" : "text-[#3a3a3a] hover:bg-[#0a0a0a] hover:text-[#5a5a5a]"}`}>{item.id} / {item.tab}{active === index && <span className="absolute inset-x-0 bottom-0 h-px bg-[#2196f3]" />}</button>)}</div>
            <div className="overflow-x-auto bg-[#050505]"><div className="min-w-[620px] px-6 py-7 lg:px-8 lg:py-9">
              <div className="mb-7 flex items-center justify-between"><span className="font-mono text-[10px] tracking-widest text-[#3a3a3a]">{layer.name.toUpperCase()}</span><span className="flex items-center gap-2 font-mono text-[10px] text-[#2196f3]"><span className="h-1.5 w-1.5 rounded-full bg-[#2196f3]" />架构视图</span></div>
              <div className="space-y-4">{layer.inputs.map((input, index) => <div key={input} className="flex items-center gap-3"><span className="w-[160px] border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-[10px] text-[#737373]">{input}</span><FlowLine active={index === 0} /></div>)}</div>
              <div className="my-5 flex items-center gap-3"><span className="h-7 w-px bg-[#215a8d] ml-[80px]" /><span className="font-mono text-[9px] tracking-widest text-[#3a3a3a]">NORMALIZE / EVALUATE / DISTRIBUTE</span></div>
              <div className="border border-[#2c5d8d] bg-[#0b1117] px-5 py-4"><div className="flex items-center justify-between"><span className="font-mono text-[11px] tracking-wider text-[#62b8ff]">{layer.core}</span><span className="font-mono text-[9px] text-[#3e7daf]">{layer.id}</span></div><div className="mt-3 h-px overflow-hidden bg-[#173147]"><span className="block h-px w-12 bg-[#58b4ff] animate-[topology-flow_2.3s_linear_infinite]" /></div></div>
              <div className="my-5 flex items-center gap-3"><span className="h-7 w-px bg-[#215a8d] ml-[80px]" /><span className="font-mono text-[9px] tracking-widest text-[#3a3a3a]">STRUCTURED OUTPUT</span></div>
              <div className="grid grid-cols-3 gap-3">{layer.outputs.map((output, index) => <div key={output} className={`border px-3 py-3 font-mono text-[10px] transition-colors ${index === 0 ? "border-[#2c5d8d] bg-[#0b1117] text-[#62b8ff]" : "border-[#242424] bg-[#090909] text-[#626262]"}`}>{output}</div>)}</div>
            </div></div>
            <div className="border-t border-[#1e1e1e] px-6 py-3 flex items-center justify-between bg-[#080808]"><span className="font-mono text-[10px] text-[#3a3a3a]">模块通过清晰契约保持独立，并在研究与策略链路中协同工作。</span><span className="font-mono text-[10px] text-[#2196f3]">架构视图</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
