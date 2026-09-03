import type { Metadata } from "next";

import { StrategyDetailTemplate, type StrategyDetail } from "@/components/strategy/strategy-detail-template";

const datePublished = "2026-09-03";
const dateModified = "2026-09-03";
const strategyUrl = "https://umaker.org/strategies/altcoin-pump-short/";

export const metadata: Metadata = {
  title: "山寨做空策略",
  description:
    "UMAKER 山寨做空策略介绍：山寨选币器识别早期拉升候选，UMAKER 持续监控市场结构与风险证据，策略仅在拉升衰竭和结构转弱确认后以分阶段仓位参与做空。",
  alternates: { canonical: "/strategies/altcoin-pump-short" },
  openGraph: {
    type: "article",
    title: "山寨做空策略 | UMAKER",
    description:
      "不因涨幅大而直接开空。通过候选池、市场结构、风险门控与分阶段仓位，参与快速拉升山寨币的高位转弱阶段。",
    publishedTime: datePublished,
    modifiedTime: dateModified,
    authors: ["UMAKER 研究团队"],
  },
  twitter: {
    card: "summary_large_image",
    title: "山寨做空策略 | UMAKER",
    description:
      "山寨币快速拉升后的结构化做空：候选筛选、转弱确认、试探、确认与风险退出。",
    images: ["/og-image.png"],
  },
};

const strategy: StrategyDetail = {
  id: "STRATEGY NOTE 002",
  category: "策略产品",
  title: "山寨做空",
  highlightedTitle: "策略",
  summary:
    "这是一套面向短期快速拉升山寨币的阶段性做空策略。山寨选币器先发现可能进入拉升周期的交易对，UMAKER 持续生成多周期结构、衍生品与风险证据；策略只在拉升衰竭、结构转弱和完整风控同时成立后，才以小仓试探并逐步确认，而不是因为价格涨得多就直接做空。",
  status: "币安优先 · OKX 支持 · 私有实盘",
  statusDescription:
    "当前接受最低 1,500 USDT 本金的私有实盘接入。具体账户、杠杆、标的范围、执行阈值与实盘表现按账户风险约束单独评估，页面不构成收益或交易结果承诺。",
  principle:
    "做空的对象不是涨幅，而是被结构化证据确认的高位转弱阶段。先等待、再试探、后确认；当上行结构重新成立时，优先退出而不是坚持观点。",
  highlights: {
    eyebrow: "策略定位与运行边界",
    title: "PRIVATE LIVE STRATEGY PROFILE",
    items: [
      { label: "风险定位", value: "高风险", detail: "快速拉升山寨币" },
      { label: "策略阶段", value: "高位转弱", detail: "非追涨即空" },
      { label: "建仓方式", value: "试探 → 确认", detail: "分阶段风险预算" },
      { label: "优先交易所", value: "BINANCE", detail: "同时支持 OKX" },
      { label: "最低本金", value: "1,500 USDT", detail: "私有实盘评估" },
    ],
    note:
      "策略面向高波动山寨币的阶段性风险机会。候选有效、结构事件出现或 AI 预测偏空均不等于允许下单；每次开仓仍需通过止损、风险收益、流动性、组合暴露、衍生品与生命周期等门控。",
  },
  sections: [
    {
      id: "background",
      number: "01",
      eyebrow: "创建背景",
      title: "快速拉升，不等于立刻可以做空",
      introduction:
        "快速上涨的山寨币常会在买盘衰减、流动性变化或结构失效后出现大幅回撤，但市场不会因为价格已经上涨就自动见顶。把“首阴”或一根长上影当成唯一信号，容易在趋势仍在加速、逼空仍在延续时过早逆势。UMAKER 的做空策略因此将这类直觉扩展成可审计的候选、证据、风控和执行链路。",
      blocks: [
        {
          heading: "从涨幅榜观察，转向候选生命周期",
          paragraphs: [
            "山寨选币器并不只在行情已经冲高后追逐涨幅榜，而是将处于早期拉升、动能扩张或可能出现后续交易机会的交易对送入候选池。UMAKER 随后把候选动态纳入监控，持续更新市场结构、技术窗口、衍生品、清算与资金行为等证据。候选进入监控，只说明值得观察，不代表策略应当开仓。",
            "做空策略关注的是拉升后由强转弱的阶段：例如上涨失败、假突破、关键结构跌破、反弹回破位区被拒或多周期二次转弱。它试图识别的是上行动能是否已经出现可验证的失效，而不是预测一个无法精确预知的绝对顶部。",
          ],
        },
        {
          heading: "与做多策略的关系",
          paragraphs: [
            "同一候选可以在不同阶段由不同策略评估：上涨延续的证据由山寨做多策略处理，顶部转弱后的证据才进入山寨做空策略。两者通过共享的生命周期状态和同账户同币仓位锁避免重叠执行；做多仓位未退出时，做空准备与开仓会被阻断。山寨做多策略页面上线后将与本页建立双向内链，完整说明前段上涨阶段的处理方式。",
          ],
        },
      ],
      aside: {
        title: "这一页不做的事情",
        items: [
          "不把单一涨幅、单根阴线或单个形态包装成确定性顶部信号。",
          "不在价格持续创新高、逼空风险显著或候选仅处于观察态时逆势硬空。",
          "不公开具体阈值、账户参数、标的清单或可被复制的执行细节。",
        ],
      },
    },
    {
      id: "mechanism",
      number: "02",
      eyebrow: "运行机制",
      title: "候选进入后，先监控再决策",
      introduction:
        "策略的端到端路径是：山寨选币器发现候选，UMAKER 建立动态监控并输出结构化证据，做空策略在自身状态机和风险门控内生成执行计划，独立执行服务完成交易所下单、订单回报与仓位状态回流。AI 与市场预测参与研究和风险背景判断，但不会直接下单。",
      blocks: [
        {
          heading: "第一步：识别持续拉升，而非追空",
          paragraphs: [
            "候选有效后，策略先进入观察。若价格仍处于强势延续、动能扩张，或 UMAKE​​R 预测和结构背景明确支持上行，系统只更新阶段高点、失效位和风险背景，不生成逆势空单。候选通常经历观察、拉升延续、转弱观察、试探、确认、持仓、退出和冷却等状态，而不是一次性从“上涨”跳到“做空”。",
            "普通观察态不能下单。只有候选的可交易状态、账户仓位锁和策略自身的场景判断均允许时，后续的结构转弱证据才会进入入场评估。",
          ],
        },
        {
          heading: "第二步：确认转弱是否真实发生",
          paragraphs: [
            "策略会综合顶部反转、假突破、上破后失败、区间下破、反弹回踩失败、放量滞涨、更低高点与再次下破等价格结构证据。UMAKER 的市场结构事件负责提供更快的确定性触发，市场结构快照负责提供多周期背景与风险收益参考；它们都不能单独成为下单理由。",
            "预测、衍生品、清算、聪明钱、流动性和组合暴露分别承担不同责任：强看多或高反转风险可以否决做空；聪明钱明确买入或上方逼空风险可以阻断；短线已经大幅下跌、但缺少回踩失败等二次确认时，择时门控会阻止机械追空。",
          ],
        },
        {
          heading: "第三步：建立、验证与退出",
          paragraphs: [
            "当结构开始转弱、止损清晰且全部风险门控通过时，策略只允许较小的试探仓位。试探仓在快速验证窗口内必须获得后续结构、预测或持仓行为的继续支持；若结构失效、上行风险重新增强或验证超时，则优先平仓。试探仓不能直接升级为标准仓位。",
            "只有试探已被验证，并且出现二次卖点、反弹受阻或下破无法收回等确认条件时，策略才可评估增加至标准风险预算。持仓期间，反向结构、逼空风险、流动性恶化、衍生品转多或利润保护条件都会触发减仓、退出或进入冷却。",
          ],
        },
      ],
      aside: {
        title: "简化决策链",
        items: [
          "候选筛选：发现处于早期拉升或可能进入拉升周期的交易对。",
          "UMAKER 监控：生成预测、结构事件、周期快照与外部风险因子。",
          "做空评估：等待高位衰竭和结构转弱，拒绝仅按涨幅开空。",
          "分阶段执行：小仓验证，确认后才评估标准仓位。",
          "退出与冷却：结构失效、风险反转或验证失败时优先退出。",
        ],
      },
    },
    {
      id: "evidence",
      number: "03",
      eyebrow: "证据与门控",
      title: "快证据服务于慢决策",
      introduction:
        "山寨币变化快，单一慢周期预测可能滞后；但更快的结构信号也更容易噪声化。策略因此把预测视为方向背景，把结构事件视为择时证据，把衍生品、清算、资金行为和流动性作为风险保护，并要求它们在标准化门控中共同工作。",
      blocks: [
        {
          heading: "UMAKER 的角色是提供结构化上下文",
          paragraphs: [
            "UMAKER 输出的市场预测用于识别趋势延续、衰竭风险和多周期方向背景；当预测明确偏多、拉升仍在扩张或反转风险很高时，做空策略被否决。当预测中性、滞后或尚未刷新时，策略可以借助新鲜且质量正常的偏空结构背景进入极小仓试探评估，但仍不能绕过其他风险门控。",
            "市场结构事件可识别顶部反转、假突破、区间破位或回踩失败等快速变化；周期快照用于判断这些变化是否处于一致的偏空背景。二者的职责边界被保留在决策记录中，避免把“事件出现”误写成“已证明可盈利”。",
          ],
        },
        {
          heading: "外部风险因子优先保护账户",
          paragraphs: [
            "衍生品数据用于识别方向拥挤、去杠杆和可能的逼空风险；清算分布用于警惕上方流动性池；聪明钱和资金行为用于识别是否存在明显反向买入；成交额、深度和价差用于过滤无法可靠执行的标的。缺失、噪声或覆盖不足的数据不会被伪装成强信号，通常只会降权或维持观察；明确的反向风险才会阻断新仓。",
          ],
        },
      ],
      aside: {
        title: "不可绕过的条件",
        items: [
          "候选必须仍有效，且当前阶段允许做空评估。",
          "必须存在明确的结构止损与足够的风险收益空间。",
          "流动性、价差、账户总暴露和同账户同币仓位锁必须通过。",
          "市场预测、结构、衍生品和外部风险不能出现明确强反对。",
        ],
      },
    },
    {
      id: "risk",
      number: "04",
      eyebrow: "风险管理",
      title: "高风险标的，必须先定义退出",
      introduction:
        "快速拉升山寨币的做空具有天然高风险：价格可能继续加速、流动性可能瞬间变薄、止损可能产生滑点，且上方清算与逼空会显著放大逆势仓位的损失。策略的核心不是放大对顶部的判断，而是限制单次判断错误时的账户影响。",
      blocks: [
        {
          heading: "仓位与止损",
          paragraphs: [
            "系统将早期试探和确认仓位分开管理。试探仓位只用于验证结构，不因单次事件就扩大风险；确认仓位必须建立在已验证的试探、后续结构确认和账户风险仍可承受的前提上。每个执行计划都需要明确结构止损、单笔最大预估损失、单币保证金上限和组合保证金上限。预算为零或条件不完整时，策略不会生成开仓计划。",
            "止损不是观点失败后的可选动作。当价格重新夺回关键结构、上行趋势重新获得支持、逼空风险快速上升或执行条件恶化时，策略进入退出流程并持续处理至仓位确认归零。若数据、流动性或交易所状态异常，优先降低风险、暂停或退出，而不是继续依赖模型判断。",
          ],
        },
        {
          heading: "执行与账户风险",
          paragraphs: [
            "实盘执行由独立服务管理交易所适配、订单生命周期、合约规格换算、账户快照与熔断。策略服务只产生可审计的决策和执行计划；执行器仍会检查账户级最大日损失、连续失败、活跃仓位上限和仓位一致性。交易所 API 限频、网络延迟、订单拒绝、滑点、资金费率和最低下单要求均可能使实际结果偏离策略计划。",
          ],
        },
      ],
      aside: {
        title: "风险提示",
        items: [
          "高风险不等于高收益，做空快速拉升山寨币可能出现连续止损或快速亏损。",
          "历史回放、模拟或小规模实盘观察均不能替代未来市场中的实际风险。",
          "策略不承诺胜率、收益率、回撤上限或对任何特定交易对的交易频率。",
          "账户必须预先确认杠杆、风险预算、暂停条件和人工介入边界。",
        ],
      },
    },
    {
      id: "access",
      number: "05",
      eyebrow: "实盘接入",
      title: "币安优先，按账户边界运行",
      introduction:
        "该策略当前处于私有实盘运行与接入阶段，优先支持币安，同时支持 OKX。UMAKER 不提供面向公众的一键开户或自动部署入口；每个账户需要在接入前核对交易所、API 权限、资金、杠杆、标的范围和可接受风险。",
      blocks: [
        {
          heading: "接入前评估",
          paragraphs: [
            "当前最低接入本金为 1,500 USDT。该门槛不意味着适合所有账户，也不应被理解为推荐资金规模；实际账户还需要评估合约规格、最小下单量、可用杠杆、计划持仓数量、最大可承受损失和交易所规则。币安为当前优先接入交易所，OKX 可在适配条件满足后支持。",
            "合作以私有 API 托管和账户级限制为基础。账户所有方确认权限和风险边界后，系统按策略状态、市场条件与执行风控决定是否观察、试探、确认、减仓或退出。具体参数、候选标的和实盘业绩不在公开页面披露。",
          ],
        },
        {
          heading: "不适合的预期",
          paragraphs: [
            "不适合希望自动捕捉每一个山寨币顶部、要求无回撤、固定收益或长期满仓运行的账户。策略也不应被用于规避交易所规则、绕过风控或替代独立的风险判断。市场波动、交易所规则和执行条件发生变化时，暂停或退出是策略的正常结果。",
          ],
        },
      ],
    },
  ],
  callToAction: {
    eyebrow: "私有实盘咨询",
    title: "先确认风险边界，再讨论接入方式",
    description:
      "如需了解币安或 OKX 私有实盘接入，请说明账户交易所、计划本金、杠杆约束、可接受风险和 API 托管条件。UMAKER 将先评估账户是否适合该策略，而非承诺固定交易机会或收益结果。",
  },
  publication: {
    author: "UMAKER 研究团队",
    authorHref: "/about",
    datePublished,
    dateModified,
  },
  sources: [
    {
      title: "Binance Futures API Documentation",
      href: "https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info",
      description: "用于核对币安合约 API、交易规则与实际执行限制；具体账户权限和产品可用性以交易所最新规则为准。",
    },
    {
      title: "Binance Futures Risk Warning",
      href: "https://www.binance.com/en/support/faq/what-are-the-risks-associated-with-futures-trading-360033162192",
      description: "用于说明合约杠杆、价格波动与强平等外部风险；本页面不构成投资建议。",
    },
    {
      title: "OKX API Documentation",
      href: "https://www.okx.com/docs-v5/en/",
      description: "用于核对 OKX API、订单和账户相关的执行约束；具体规则与地区可用性以 OKX 最新说明为准。",
    },
  ],
  faq: [
    {
      question: "价格快速拉升后，策略会立刻做空吗？",
      answer: "不会。快速拉升只会让交易对进入候选与观察链路。策略仍需确认候选状态、结构转弱、止损与风险收益、流动性、组合暴露和外部风险门控；上行结构仍强或逼空风险明显时，系统应继续观察或阻断做空。",
    },
    {
      question: "一根阴线、假突破或市场结构事件能直接触发开仓吗？",
      answer: "不能。它们只提供价格结构证据或择时依据。实际开仓仍需要完整风险门控通过，并由策略状态机生成可审计的分阶段执行计划。",
    },
    {
      question: "为什么要先小仓试探，再确认做空？",
      answer: "高位转弱仍可能迅速恢复上行。早期试探仓用于验证结构是否持续有效；只有试探获得后续结构、预测或持仓行为支持，并且账户风险仍可承受时，策略才会评估确认仓位。验证失败、结构失效或超时会优先退出。",
    },
    {
      question: "山寨做多与做空策略会同时管理同一交易对吗？",
      answer: "同一账户、同一交易对使用共享生命周期状态和仓位锁管理互斥。做多仓位未退出时，做空准备和开仓会被阻断；顶部转弱观察也不等于直接授权做空。做多策略页面上线后将提供完整的双向策略说明。",
    },
    {
      question: "当前支持哪些交易所，最低本金是多少？",
      answer: "当前优先支持币安，同时支持 OKX 的私有实盘接入；最低接入本金为 1,500 USDT。实际是否接入仍需按账户 API 权限、合约规格、风险预算、杠杆与交易所规则单独评估。",
    },
  ],
  relatedStrategies: [
    {
      title: "山寨做多策略",
      description: "查看上涨延续、回踩确认与趋势持仓阶段。",
      href: "/strategies/altcoin-pump-long",
    },
  ],
};

export default function AltcoinPumpShortPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${strategyUrl}#article`,
        mainEntityOfPage: strategyUrl,
        headline: "山寨做空策略：快速拉升山寨币的结构化风险管理方法",
        description: strategy.summary,
        inLanguage: "zh-CN",
        datePublished,
        dateModified,
        author: { "@type": "Organization", name: "UMAKER 研究团队", url: "https://umaker.org/about" },
        publisher: { "@type": "Organization", name: "UMAKER", url: "https://umaker.org" },
        about: ["山寨币做空", "市场结构", "风险管理", "币安合约", "OKX 合约"],
        citation: strategy.sources?.map((source) => source.href),
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        "@id": `${strategyUrl}#faq`,
        mainEntity: strategy.faq?.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StrategyDetailTemplate strategy={strategy} />
    </>
  );
}
