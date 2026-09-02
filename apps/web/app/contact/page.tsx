import type { Metadata } from "next";

import { TrustPage } from "@/components/trust/trust-page";

export const metadata: Metadata = {
  title: "联系 UMAKER",
  description: "联系 UMAKER 讨论私有策略合作、OKX API 托管、策略定制和量化研究需求。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <TrustPage eyebrow="PRIVATE COLLABORATION" title="先确认账户与风险边界，再讨论策略运行" summary="UMAKER 当前通过私有合作方式处理策略定制、账户条件评估与 API 托管需求。请先说明目标、交易所、资金预算、风险约束和现有返佣或账户条件。" sections={[
    { title: "联系渠道", paragraphs: ["微信：copyapes_admin", "邮箱：service@umaker.org"] },
    { title: "适合沟通的事项", paragraphs: ["OKX 私有小规模实盘策略接入、返佣代理及客户账户评估、策略定制、API 托管，以及市场智能或量化研究合作。"] },
    { title: "沟通前的必要信息", paragraphs: ["请准备交易所与账户类型、标的范围、资金预算、杠杆上限、风险退出要求、API 托管可行性，以及任何影响费用或返佣经济性的约束。UMAKER 不会以收益承诺替代适配评估。"] },
  ]} />;
}
