import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

const datePublished = "2026-08-29";
const dateModified = "2026-09-03";
const homeUrl = "https://umaker.org/";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: "UMAKER | AI 驱动的量化因子引擎",
    description: "UMAKER 将实时市场数据转化为市场结构、量化因子与可回放的研究输出，服务独立量化策略、定制策略与 API 托管。",
    inLanguage: "zh-CN",
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: "UMAKER 研究团队", url: "https://umaker.org/about/" },
    publisher: { "@id": "https://umaker.org/#organization" },
    about: ["量化市场智能", "市场结构", "量化因子", "系统化策略", "策略研究"],
    isPartOf: { "@id": "https://umaker.org/#website" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="relative min-h-screen overflow-x-hidden bg-[#050505]">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <DevelopersSection />
        <SecuritySection />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <CtaSection />
        <FooterSection />
      </main>
    </>
  );
}
