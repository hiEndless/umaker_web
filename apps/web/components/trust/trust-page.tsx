import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";

type TrustPageSection = {
  title: string;
  paragraphs: string[];
};

export function TrustPage({
  eyebrow,
  title,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  sections: TrustPageSection[];
}) {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f2ede6]">
      <Navigation />
      <article className="mx-auto max-w-[1040px] px-6 pb-20 pt-36 lg:px-12 lg:pb-28 lg:pt-44">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#2196f3]">{eyebrow}</p>
        <h1 className="mt-7 font-display text-6xl leading-[0.88] tracking-tight lg:text-8xl">{title}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-9 text-[#a3a3a3]">{summary}</p>

        <div className="mt-16 divide-y divide-[#1e1e1e] border-y border-[#1e1e1e]">
          {sections.map((section, index) => (
            <section key={section.title} className="grid gap-6 py-10 lg:grid-cols-[180px_1fr] lg:gap-12">
              <h2 className="font-mono text-[11px] tracking-[0.14em] text-[#2196f3]">{String(index + 1).padStart(2, "0")} / {section.title}</h2>
              <div className="space-y-5 text-[15px] leading-8 text-[#a3a3a3] lg:text-base">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
