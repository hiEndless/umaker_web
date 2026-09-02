import type { Metadata } from "next";

import { TrustPage } from "@/components/trust/trust-page";

export const metadata: Metadata = {
  title: "服务条款",
  description: "UMAKER 服务条款：公开研究内容、私有合作和风险边界的基本说明。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TrustPage eyebrow="TERMS OF SERVICE / 2026-09-03" title="服务条款" summary="本页面说明 UMAKER 公开内容和私有合作的基本使用边界；具体策略、API 托管与账户服务以双方确认的私有合作安排为准。" sections={[
    { title: "公开内容", paragraphs: ["网站内容用于介绍系统能力、研究方法、策略原理、适用边界与风险提示，不构成投资、法律、税务或财务建议，也不构成任何收益或交易结果承诺。"] },
    { title: "私有合作", paragraphs: ["策略接入、API 托管、参数配置、账户权限、费用与风险边界需要经过单独评估和确认。UMAKER 可基于账户条件、交易所规则、数据质量或风险状态拒绝、暂停或调整合作范围。"] },
    { title: "风险声明", paragraphs: ["数字资产及衍生品交易可能产生重大损失。市场波动、杠杆、流动性、资金费率、技术故障、交易所规则变化和 API 执行偏差均可能影响实际结果。您应独立评估风险并遵守适用法律及交易所规则。"] },
    { title: "联系", paragraphs: ["服务条款相关问题请联系 service@umaker.org。"] },
  ]} />;
}
