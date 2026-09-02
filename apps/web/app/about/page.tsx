import type { Metadata } from "next";

import { TrustPage } from "@/components/trust/trust-page";

export const metadata: Metadata = {
  title: "关于 UMAKER",
  description: "UMAKER 是面向系统化策略的量化市场智能与研究基础设施，提供市场结构、量化因子、验证与私有策略合作能力。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <TrustPage eyebrow="ABOUT UMAKER" title="量化研究，服务于可验证的策略决策" summary="UMAKER 将实时市场数据、市场结构、量化因子、研究验证与策略执行边界组织为可复核的系统能力。我们当前以私有合作方式服务独立策略、定制策略与 API 托管需求。" sections={[
    { title: "我们做什么", paragraphs: ["UMAKER 的核心是市场智能与因子生产：持续处理价格、成交、持仓、资金费率、清算和多周期结构，向下游策略提供结构化、可验证的研究输入。AI 用于研究和因子发现，不替代策略的风险门控、状态机和执行审计。"] },
    { title: "我们不做什么", paragraphs: ["UMAKER 不是面向公众的一键交易机器人或开放式自助交易平台。公开页面介绍系统能力、策略原理与运行边界，不构成投资建议、收益承诺或对任何交易结果的保证。"] },
    { title: "公开与私有边界", paragraphs: ["公开内容优先说明方法、适用条件、风险与可验证依据。具体账户、参数、执行阈值、API 权限和实盘运行信息仅在私有合作与风险评估范围内处理。"] },
  ]} />;
}
