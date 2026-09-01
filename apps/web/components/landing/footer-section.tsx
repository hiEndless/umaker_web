import { BrandLogo } from "./brand-logo";

const LINKS = {
  系统: [
    { name: "市场理解", href: "#features" },
    { name: "系统架构", href: "#architecture" },
    { name: "核心输出", href: "#outputs" },
    { name: "数据节奏", href: "#infrastructure" },
  ],
  研究: [
    { name: "决策边界", href: "#security" },
    { name: "研究验证", href: "#metrics" },
    { name: "研究案例", href: "#research-cases" },
    { name: "系统生态", href: "#integrations" },
  ],
  合作: [
    { name: "定制策略", href: "#contact" },
    { name: "API 托管", href: "#contact" },
    { name: "私有交易看板", href: "#contact" },
    { name: "咨询合作", href: "#contact" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-[#1e1e1e]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="border-b border-[#1e1e1e] py-12 grid lg:grid-cols-[1fr_2fr] gap-10">
          <div>
            <a href="#" className="inline-flex items-center gap-3 mb-5 group" aria-label="返回页面顶部"><BrandLogo size="footer" /></a>
            <p className="text-sm text-[#4d4d4d] leading-relaxed max-w-sm">
              实时市场数据、结构化研究输出与独立策略交付基础设施。
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 font-mono text-[10px] tracking-widest text-[#3a3a3a]">
              <span>PRIVATE ACCESS</span>
              <span>RESEARCH INFRASTRUCTURE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-mono text-[9px] tracking-[0.2em] text-[#2196f3] mb-5">{section}</h3>
                <ul className="space-y-3">
                  {links.map((link) => <li key={link.name}><a href={link.href} className="font-mono text-[11px] text-[#4d4d4d] hover:text-[#f2ede6] transition-colors">{link.name}</a></li>)}
                </ul>
                {section === "合作" && (
                  <div className="mt-5 pt-4 border-t border-[#1e1e1e] space-y-2 font-mono text-[10px] tracking-wide text-[#3a3a3a]">
                    <p>微信 · copyapes_admin</p>
                    <p className="select-all">service@umaker.org</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#3a3a3a]">© 2026 UMAKER. ALL RIGHTS RESERVED.</p>
          <p className="font-mono text-[10px] tracking-widest text-[#3a3a3a]">私有合作制服务 · 非开放式自助交易平台</p>
        </div>
      </div>
    </footer>
  );
}
