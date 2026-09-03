"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";

const navLinks = [
  { name: "市场理解", href: "/#features" },
  { name: "系统架构", href: "/#architecture" },
  { name: "决策边界", href: "/#security" },
  { name: "核心输出", href: "/#outputs" },
  { name: "数据节奏", href: "/#infrastructure" },
  { name: "研究验证", href: "/#metrics" },
];

const upcomingLinks = ["实盘直播", "博客", "文档"];
const strategyProducts = [
  { name: "返佣刷量套利策略", href: "/strategies/rebate-volume-arbitrage" },
  { name: "山寨做空趋势策略", href: "/strategies/altcoin-pump-short" },
  { name: "山寨做多趋势策略", href: "/strategies/altcoin-pump-long" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [strategyProductsOpen, setStrategyProductsOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileStrategyProductsOpen, setMobileStrategyProductsOpen] = useState(false);
  const [time, setTime] = useState("");

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileFeaturesOpen(false);
    setMobileStrategyProductsOpen(false);
  };

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#050505]/95 backdrop-blur-sm border-b border-[#1e1e1e]" : "bg-transparent"
        }`}
      >
        {/* Top status bar */}
        <div className="border-b border-[#1e1e1e] px-6 lg:px-12 h-8 flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#3a3a3a] tracking-widest uppercase">
            UMAKER &nbsp;/&nbsp; QUANT RESEARCH INFRASTRUCTURE
          </span>
          <div className="hidden md:flex items-center gap-6">
            <span className="font-mono text-[10px] text-[#3a3a3a]">
              PRIVATE ACCESS
            </span>
            <span className="font-mono text-[10px] text-[#3a3a3a] tabular-nums">{time} UTC</span>
          </div>
        </div>

        {/* Main nav */}
        <div className="px-6 lg:px-12 h-14 flex items-center justify-between">
          {/* Logo */}
            <a href="/" className="flex items-center gap-3 group" aria-label="返回首页">
            <BrandLogo />
            <span className="hidden lg:block font-mono text-[10px] text-[#3a3a3a] border-l border-[#1e1e1e] pl-3 ml-1 tracking-widest">
              FACTOR ENGINE
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <div className="relative" onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
              <button
                type="button"
                onClick={() => setFeaturesOpen((value) => !value)}
                aria-expanded={featuresOpen}
                aria-controls="feature-navigation"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#5a5a5a] hover:text-[#2196f3] transition-colors duration-200"
              >
                功能特点
                <ChevronDown className={`w-3 h-3 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
              </button>
              {featuresOpen && (
                <div id="feature-navigation" className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[208px] z-50">
                  <div className="border border-[#2e2e2e] bg-[#080808] shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                    <div className="py-1">
                      {navLinks.map((link) => (
                        <a key={link.name} href={link.href} onClick={() => setFeaturesOpen(false)} className="block px-4 py-3 text-center font-mono text-[11px] tracking-wider text-[#737373] hover:text-[#f2ede6] hover:bg-[#0e0e0e] transition-colors">
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setStrategyProductsOpen(true)} onMouseLeave={() => setStrategyProductsOpen(false)}>
              <button
                type="button"
                onClick={() => setStrategyProductsOpen((value) => !value)}
                aria-expanded={strategyProductsOpen}
                aria-controls="strategy-product-navigation"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-[#4d4d4d] hover:text-[#737373] transition-colors duration-200"
              >
                策略产品
                <ChevronDown className={`w-3 h-3 transition-transform ${strategyProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {strategyProductsOpen && (
                <div id="strategy-product-navigation" className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[272px] z-50">
                  <div className="border border-[#2e2e2e] bg-[#080808] shadow-[0_16px_40px_rgba(0,0,0,0.35)] py-1">
                    {strategyProducts.map((product) => product.href ? (
                      <a
                        key={product.name}
                        href={product.href}
                        onClick={() => setStrategyProductsOpen(false)}
                        className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-[#0e0e0e] transition-colors group"
                      >
                        <span className="font-mono text-[11px] tracking-wider text-[#d0d0d0] group-hover:text-[#f2ede6]">{product.name}</span>
                        <span className="shrink-0 font-mono text-[9px] tracking-widest text-[#2196f3]">了解详情 →</span>
                      </a>
                    ) : (
                      <div key={product.name} className="px-4 py-3 flex items-center justify-between gap-4">
                        <span className="font-mono text-[11px] tracking-wider text-[#737373]">{product.name}</span>
                        <span className="shrink-0 border border-[#2196f3]/70 px-2 py-1 font-mono text-[9px] tracking-widest text-[#58b4ff]">待上线</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {upcomingLinks.map((name) => (
              <span key={name} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-[#4d4d4d] cursor-default" aria-label={`${name}，待上线`}>
                {name}
                <span className="border border-[#2196f3]/70 px-2 py-1 text-[9px] tracking-widest text-[#58b4ff]">待上线</span>
              </span>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/#contact"
              className="font-mono text-[11px] tracking-widest bg-[#2196f3] text-[#050505] px-5 h-9 flex items-center hover:bg-[#42a5f5] transition-colors font-semibold"
            >
              咨询合作 →
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => {
              setOpen((value) => !value);
              setMobileFeaturesOpen(false);
              setMobileStrategyProductsOpen(false);
            }}
            className="lg:hidden text-[#f2ede6] p-1"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] flex flex-col transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "88px" }}
      >
        <div className="border-t border-[#1e1e1e] flex flex-col overflow-y-auto">
          <button
            type="button"
            onClick={() => setMobileFeaturesOpen((value) => !value)}
            aria-expanded={mobileFeaturesOpen}
            className={`border-b border-[#1e1e1e] px-8 py-6 font-display text-4xl tracking-wider text-[#f2ede6] hover:text-[#2196f3] transition-all duration-300 flex items-center justify-between ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            功能特点
            <span className="flex items-center gap-4"><ChevronDown className={`w-5 h-5 transition-transform ${mobileFeaturesOpen ? "rotate-180" : ""}`} /><span className="font-mono text-xs text-[#3a3a3a]">01</span></span>
          </button>
          {mobileFeaturesOpen && (
            <div className="border-b border-[#1e1e1e] bg-[#080808] px-8 py-3">
              {navLinks.map((link) => <a key={link.name} href={link.href} onClick={closeMobileMenu} className="block py-3 font-mono text-sm tracking-wider text-[#737373] hover:text-[#2196f3]">{link.name}</a>)}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileStrategyProductsOpen((value) => !value)}
            aria-expanded={mobileStrategyProductsOpen}
            className={`border-b border-[#1e1e1e] px-8 py-6 font-display text-4xl tracking-wider text-[#4d4d4d] transition-all duration-300 flex items-center justify-between ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            style={{ transitionDelay: open ? "60ms" : "0ms" }}
          >
            <span>策略产品</span>
            <span className="flex items-center gap-4"><ChevronDown className={`w-5 h-5 transition-transform ${mobileStrategyProductsOpen ? "rotate-180" : ""}`} /><span className="font-mono text-xs text-[#3a3a3a]">02</span></span>
          </button>
          {mobileStrategyProductsOpen && (
            <div className="border-b border-[#1e1e1e] bg-[#080808] px-8 py-2">
              {strategyProducts.map((product) => product.href ? (
                <a
                  key={product.name}
                  href={product.href}
                  onClick={closeMobileMenu}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <span className="font-mono text-sm tracking-wider text-[#d0d0d0]">{product.name}</span>
                  <span className="shrink-0 font-mono text-[10px] tracking-widest text-[#2196f3]">了解详情 →</span>
                </a>
              ) : (
                <div key={product.name} className="py-3 flex items-center justify-between gap-4">
                  <span className="font-mono text-sm tracking-wider text-[#737373]">{product.name}</span>
                  <span className="shrink-0 font-mono text-[9px] tracking-widest border border-[#2196f3]/70 px-2 py-1 text-[#58b4ff]">待上线</span>
                </div>
              ))}
            </div>
          )}
          {upcomingLinks.map((name, index) => (
            <div key={name} className={`border-b border-[#1e1e1e] px-8 py-6 font-display text-4xl tracking-wider text-[#4d4d4d] transition-all duration-300 flex items-center justify-between ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: open ? `${(index + 2) * 60}ms` : "0ms" }}>
              <span>{name}</span>
              <span className="flex items-center gap-4"><span className="font-mono text-[9px] tracking-widest border border-[#2196f3]/70 px-2 py-1 text-[#58b4ff]">待上线</span><span className="font-mono text-xs text-[#3a3a3a]">{String(index + 3).padStart(2, "0")}</span></span>
            </div>
          ))}
        </div>
        <div className="mt-auto p-8 border-t border-[#1e1e1e]">
          <a
            href="/#contact"
            onClick={closeMobileMenu}
            className="w-full block text-center font-mono text-sm tracking-widest bg-[#2196f3] text-[#050505] py-5 font-semibold"
          >
            咨询合作 →
          </a>
        </div>
      </div>
    </>
  );
}
