import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";

type ContentBlock = {
  heading?: string;
  paragraphs: string[];
};

type StrategySection = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  introduction?: string;
  blocks: ContentBlock[];
  aside?: {
    title: string;
    items: string[];
  };
};

export type StrategyDetail = {
  id: string;
  category: string;
  title: string;
  highlightedTitle: string;
  summary: string;
  status: string;
  statusDescription: string;
  principle: string;
  highlights?: {
    eyebrow: string;
    title: string;
    items: Array<{
      label: string;
      value: string;
      detail: string;
    }>;
    note: string;
  };
  sections: StrategySection[];
  callToAction: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export function StrategyDetailTemplate({ strategy }: { strategy: StrategyDetail }) {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f2ede6]">
      <Navigation />

      <section className="relative overflow-hidden border-b border-[#1e1e1e] pt-32 lg:pt-40">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(33,150,243,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(33,150,243,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[12%] top-24 h-px w-[38%] bg-gradient-to-r from-transparent via-[#2196f3] to-transparent opacity-70" />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-20 lg:px-12 lg:pb-28">
          <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-[#2196f3]">
            <span>{strategy.category}</span>
            <span className="text-[#3a3a3a]">/</span>
            <span>{strategy.id}</span>
          </div>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.85] tracking-tight">
                {strategy.title}<br />
                <span className="text-[#2196f3]">{strategy.highlightedTitle}</span>
              </h1>
              <p className="mt-8 max-w-3xl text-base leading-8 text-[#a3a3a3] lg:text-lg">{strategy.summary}</p>
            </div>
            <div className="border-l border-[#2e2e2e] pl-6 lg:pl-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#3a3a3a]">公开状态</p>
              <p className="mt-3 font-mono text-sm tracking-wider text-[#f2ede6]">{strategy.status}</p>
              <p className="mt-4 text-sm leading-6 text-[#737373]">{strategy.statusDescription}</p>
            </div>
          </div>
          {strategy.highlights && (
            <div className="mt-12 border border-[#2e2e2e] bg-[#080808]/80">
              <div className="flex flex-col gap-3 border-b border-[#1e1e1e] px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-7">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#2196f3]">{strategy.highlights.eyebrow}</span>
                <span className="font-mono text-[10px] tracking-wider text-[#737373]">{strategy.highlights.title}</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-[#1e1e1e] lg:grid-cols-5 lg:divide-y-0">
                {strategy.highlights.items.map((item) => (
                  <div key={item.label} className="min-h-32 px-6 py-5 lg:px-7">
                    <p className="font-mono text-[9px] tracking-[0.18em] text-[#3a3a3a]">{item.label}</p>
                    <p className="mt-4 font-display-normal text-2xl tracking-wide text-[#f2ede6] lg:text-3xl">{item.value}</p>
                    <p className="mt-2 font-mono text-[10px] leading-5 text-[#737373]">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="border-t border-[#1e1e1e] px-6 py-4 font-mono text-[10px] leading-5 text-[#4d4d4d] lg:px-7">{strategy.highlights.note}</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-[#1e1e1e]">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12 lg:py-16">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#2196f3]">策略原则</p>
          <p className="mt-5 max-w-5xl font-display-normal text-3xl leading-tight tracking-wide text-[#d8d8d8] lg:text-5xl">{strategy.principle}</p>
        </div>
      </section>

      {strategy.sections.map((section, sectionIndex) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-[#1e1e1e]">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.55fr)_minmax(0,1.45fr)] lg:gap-20">
              <header className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#2196f3]">{section.number} / {section.eyebrow}</p>
                <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-tight lg:text-6xl">{section.title}</h2>
              </header>

              <div>
                {section.introduction && <p className="text-lg leading-9 text-[#d0d0d0]">{section.introduction}</p>}
                <div className={section.introduction ? "mt-10 space-y-10" : "space-y-10"}>
                  {section.blocks.map((block, blockIndex) => (
                    <article key={`${section.id}-${blockIndex}`}>
                      {block.heading && <h3 className="mb-4 font-mono text-[11px] tracking-[0.16em] text-[#2196f3]">{block.heading}</h3>}
                      <div className="space-y-5 text-[15px] leading-8 text-[#a3a3a3] lg:text-base">
                        {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </article>
                  ))}
                </div>
                {section.aside && (
                  <aside className="mt-12 border border-[#2e2e2e] bg-[#080808] p-6 lg:p-8">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#2196f3]">{section.aside.title}</p>
                    <ol className="mt-6 divide-y divide-[#1e1e1e]">
                      {section.aside.items.map((item, index) => (
                        <li key={item} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                          <span className="font-mono text-[10px] text-[#3a3a3a]">{String(index + 1).padStart(2, "0")}</span>
                          <span className="text-sm leading-6 text-[#d0d0d0]">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </aside>
                )}
              </div>
            </div>
          </div>
          {sectionIndex === 1 && <div className="mx-auto h-px max-w-[1400px] bg-gradient-to-r from-transparent via-[#2196f3]/55 to-transparent" />}
        </section>
      ))}

      <section className="border-b border-[#1e1e1e]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
          <div className="border border-[#2e2e2e] bg-[#080808] p-8 lg:p-12">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#2196f3]">{strategy.callToAction.eyebrow}</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="font-display text-5xl leading-none tracking-tight lg:text-6xl">{strategy.callToAction.title}</h2>
                <p className="mt-6 max-w-3xl text-sm leading-7 text-[#737373]">{strategy.callToAction.description}</p>
              </div>
              <a href="/#contact" className="inline-flex h-11 items-center justify-center bg-[#2196f3] px-6 font-mono text-[11px] font-semibold tracking-widest text-[#050505] transition-colors hover:bg-[#42a5f5]">
                咨询合作 →
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
