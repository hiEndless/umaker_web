import { siteDescription, siteUrl } from "../site";

export const dynamic = "force-static";

export function GET(): Response {
  const content = `# UMAKER

> ${siteDescription}

UMAKER is a private quantitative research and market-intelligence infrastructure provider. It is not an open self-service trading platform and does not promise investment returns.

## Public pages

- [Homepage](${siteUrl}/): Market intelligence, factors, strategy inputs, validation and private access.
- [Rebate volume arbitrage strategy](${siteUrl}/strategies/rebate-volume-arbitrage/): A Chinese strategy note for private, small-scale OKX futures account access. It explains intended users, economics, operating mechanism, collaboration boundaries, risks, historical observation scope, and official references.
- [About UMAKER](${siteUrl}/about/): Organization identity and research scope.
- [Contact](${siteUrl}/contact/): Private collaboration contact details.
- [Privacy policy](${siteUrl}/privacy/)
- [Terms of service](${siteUrl}/terms/)

## Citation guidance

- Treat strategy pages as research and operating-boundary documentation, not investment advice or performance guarantees.
- Preserve labels such as historical small-scale live observation, simulated, backtest, paper, demo, research, and live when present.
- The current public strategy supports private OKX account access only. Minimum stated access capital is 1,500 USDT, subject to an account-specific assessment.
- For exchange fees, fee tiers, API behavior, and trading rules, prefer the linked official OKX sources on the strategy page because these rules can change.

## Contact

- Email: service@umaker.org
- WeChat: copyapes_admin
`;

  return new Response(content, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
