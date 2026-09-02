import type { Metadata } from "next";

import { TrustPage } from "@/components/trust/trust-page";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "UMAKER 隐私政策：说明私有合作咨询和策略服务中信息的处理边界。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <TrustPage eyebrow="PRIVACY POLICY / 2026-09-03" title="隐私政策" summary="本政策说明 UMAKER 在公开网站访问与私有合作咨询中如何处理联系信息、账户条件和策略沟通资料。" sections={[
    { title: "收集范围", paragraphs: ["公开网站不要求创建账户。私有合作咨询中，我们可能处理您主动提供的联系方式、交易所、账户条件、策略目标、资金预算和风险约束。"] },
    { title: "使用目的", paragraphs: ["信息仅用于回复咨询、评估合作可行性、配置经确认的服务范围、处理运行沟通与必要的审计记录。我们不会将该等资料出售给第三方。"] },
    { title: "账户与 API", paragraphs: ["如进入 API 托管或执行合作，具体权限、数据访问范围、存储期限和撤销方式以双方确认的私有合作安排为准。请勿通过公开渠道发送密钥、令牌或其他敏感凭据。"] },
    { title: "联系", paragraphs: ["隐私相关问题请联系 service@umaker.org。"] },
  ]} />;
}
