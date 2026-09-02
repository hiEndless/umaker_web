import { siteDescription, siteName, siteUrl } from "@/app/site";

export function SiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        email: "service@umaker.org",
        contactPoint: {
          "@type": "ContactPoint",
          email: "service@umaker.org",
          contactType: "business inquiries",
          availableLanguage: ["Chinese", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        inLanguage: "zh-CN",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
