import type { Metadata } from "next";

import { StrategyDetailTemplate, type StrategyDetail } from "@/components/strategy/strategy-detail-template";

const datePublished = "2026-09-03";
const dateModified = "2026-09-03";
const strategyUrl = "https://umaker.org/strategies/altcoin-pump-long/";

export const metadata: Metadata = {
  title: "山寨做多策略",
  description:
    "UMAKER 山寨做多策略介绍：山寨选币器发现早期拉升候选，UMAKER 持续监控多周期结构与风险证据，策略只在上涨延续、回踩确认或结构转强后以分阶段仓位参与做多。",
  alternates: { canonical: "/strategies/altcoin-pump-long" },
  openGraph: {
    type: "article",
    title: "山寨做多策略 | UMAKER",
    description:
      "不因短期涨幅而追高。通过候选池、市场结构、风险门控与分阶段仓位，参与快速拉升山寨币的有效延续阶段。",
    publishedTime: datePublished,
    modifiedTime: dateModified,
    authors: ["UMAKER 研究团队"],
  },
  twitter: {
    card: "summary_large_image",
    title: "山寨做多策略 | UMAKER",
    description:
      "山寨币快速拉升中的结构化做多：候选筛选、延续确认、试探、确认与风险退出。",
    images: ["/og-image.png"],
  },
};

const strategy: StrategyDetail = {
  id: "STRATEGY NOTE 003",
  category: "策略产品",
  title: "山寨做多",
  highlightedTitle: "策略",
  summary:
    "这是一套面向短期快速拉升山寨币的阶段性做多策略。山寨选币器先识别可能进入拉升周期的交易对，UMAKER 持续生成多周期结构、衍生品与风险证据；策略只在上涨延续、突破收复、回踩不破或假跌破修复被确认后，以小仓试探并逐步确认，而不是因为价格上涨就机械追高。",
  status: "币安优先 · OKX 支持 · 私有实盘",
  statusDescription:
    "当前接受最低 1,500 USDT 本金的私有实盘接入。具体账户、杠杆、标的范围、执行阈值与实盘表现按账户风险约束单独评估，页面不构成收益或交易结果承诺。",
  principle:
    "做多的对象不是短期涨幅，而是被结构化证据确认的上涨延续阶段。先等待、再试探、后确认；当突破失效或风险转向时，优先退出而不是继续追高。",
  highlights: {
    eyebrow: "策略定位与运行边界",
    title: "PRIVATE LIVE STRATEGY PROFILE",
    items: [
      { label: "风险定位", value: "高风险", detail: "快速拉升山寨币" },
      { label: "策略阶段", value: "上涨延续", detail: "非涨幅即追多" },
      { label: "建仓方式", value: "试探 → 确认", detail: "分阶段风险预算" },
      { label: "优先交易所", value: "BINANCE", detail: "同时支持 OKX" },
      { label: "最低本金", value: "1,500 USDT", detail: "私有实盘评估" },
    ],
    note:
      "策略面向高波动山寨币的阶段性趋势机会。候选有效、结构事件出现或 AI 预测偏多均不等于允许下单；每次开仓仍需通过止损、风险收益、流动性、组合暴露、衍生品与生命周期等门控。",
  },
  sections: [
    {
      id: "background",
      number: "01",
      eyebrow: "创建背景",
      title: "快速拉升，不等于应该追高",
      introduction:
        "山寨币的早期拉升可能演变为趋势延续，也可能迅速回吐。仅凭涨幅榜、单根阳线或短线动能追多，容易在价格远离合理止损位、流动性变差或高位衰竭时承接风险。UMAKER 的做多策略因此不把“涨得快”当成开仓理由，而是将候选、市场结构、风险背景和执行约束组成可审计的决策链。",
      blocks: [
        {
          heading: "选币器发现机会，策略等待可验证的延续",
          paragraphs: [
            "山寨选币器从早期拉升、动能扩张和可能进入趋势周期的交易对中建立候选。UMAKER 随后把候选动态纳入监控，持续更新多周期市场结构、技术窗口、衍生品、清算与资金行为。候选进入监控只代表存在研究价值，不代表系统已经认可一笔做多交易。",
            "做多策略关注的是上行动能能否被结构确认，例如突破关键价位后重新站稳、回踩不破形成更高低点、假跌破修复、重新收回关键均价带，或多周期趋势继续延续。它试图捕捉的是风险收益仍可定义的延续段，而不是在每次价格创新高后扩大仓位。",
          ],
        },
        {
          heading: "与做空策略的关系",
          paragraphs: [
            "同一候选在上涨延续阶段由做多策略评估；当顶部转弱进入观察后，后续的做空机会由山寨做空策略独立评估。两者通过共享生命周期状态与同账户同币仓位锁避免重叠执行：存在空头仓位或空头锁时，新的做多开仓会被阻断。相关页面只说明各自的策略边界，并不代表策略可以同时持有相反方向仓位。",
          ],
        },
      ],
      aside: {
        title: "这一页不做的事情",
        items: [
          "不把短期涨幅、单根阳线或单个突破形态包装成确定性趋势信号。",
          "不在价格远离结构止损位、风险收益不足或存在明显逼空后衰竭风险时机械追多。",
          "不公开具体阈值、账户参数、标的清单或可被复制的执行细节。",
        ],
      },
    },
    {
      id: "mechanism",
      number: "02",
      eyebrow: "运行机制",
      title: "候选进入后，等待结构转强",
      introduction:
        "策略路径是：山寨选币器发现候选，UMAKER 建立动态监控并输出结构化证据，做多策略在自身状态机和风险门控内生成执行计划，独立执行服务完成交易所下单、订单回报与仓位状态回流。AI 与市场预测参与研究和风险背景判断，但不会直接下单。",
      blocks: [
        {
          heading: "第一步：观察拉升是否仍具备延续条件",
          paragraphs: [
            "候选有效后，策略先保持观察。短期拉升可能继续扩张，也可能只是一次脉冲；普通观察态不能开仓。只有候选进入可交易状态、同账户同币不存在相反方向仓位锁、且策略场景判断允许时，后续的结构转强证据才会进入入场评估。",
            "如果价格已经快速远离阶段低点、风险收益不足，或上涨动能与高位衰竭风险并存，策略会等待回踩、二次确认或直接放弃，而不是因害怕错过行情追加风险。追高保护是独立门控：它阻断新的试探和确认加仓，但不会仅凭价格创新高就强平已有仓位。",
          ],
        },
        {
          heading: "第二步：确认上涨是否由结构支持",
          paragraphs: [
            "策略会综合突破后收复、回踩不破、更高低点、假跌破修复、关键均价带重新站回、放量延续以及多周期趋势证据。UMAKER 的市场结构事件提供更快的确定性触发，市场结构快照提供多周期背景；二者都不能单独成为下单理由。",
            "预测、衍生品、清算、聪明钱、流动性与组合暴露承担不同的风险职责：明确看空、去杠杆、卖出资金行为、下方挤压风险或流动性不达标可以阻断做多；数据噪声或覆盖不足不会被伪装成强结论，通常只会降权或维持观察。",
          ],
        },
        {
          heading: "第三步：建立、验证与持仓管理",
          paragraphs: [
            "当结构转强、止损清晰且完整风险门控通过时，策略只允许较小的试探仓位。试探仓在快速验证窗口内需要获得后续结构、预测或持仓行为的继续支持；若结构失效、风险转向或验证超时，则优先平仓。早期试探不能直接升级为标准仓位。",
            "只有试探已被验证，并且出现突破回踩支撑、趋势延续或其他二次确认时，策略才可评估增加至标准风险预算。持仓期间，突破重新失效、多头拥挤、去杠杆、下方流动性风险或利润保护条件都会触发减仓、退出或进入冷却。",
          ],
        },
      ],
      aside: {
        title: "简化决策链",
        items: [
          "候选筛选：发现处于早期拉升或可能进入趋势周期的交易对。",
          "UMAKER 监控：生成预测、结构事件、周期快照与外部风险因子。",
          "做多评估：等待突破收复、回踩确认或趋势延续，拒绝按涨幅追高。",
          "分阶段执行：小仓验证，确认后才评估标准仓位。",
          "退出与冷却：突破失效、风险转向或验证失败时优先退出。",
        ],
      },
    },
    {
      id: "evidence",
      number: "03",
      eyebrow: "证据与门控",
      title: "快证据服务于趋势确认",
      introduction:
        "山寨币变化快，慢周期预测可能滞后；更快的结构信号也可能噪声化。策略因此把预测视为方向背景，把结构事件视为择时证据，把衍生品、清算、资金行为和流动性作为风险保护，并要求它们在标准化门控中共同工作。",
      blocks: [
        {
          heading: "UMAKER 的角色是提供结构化上下文",
          paragraphs: [
            "UMAKER 的市场预测用于识别拉升延续、反转风险和多周期方向背景。预测明确偏多时，策略进入标准试探路径；预测中性、滞后或尚未刷新时，只有新鲜的偏多结构背景、有效的结构事件以及其他风险门控共同通过，才可能进入极小仓试探评估。预测强反对时，做多被否决。",
            "市场结构事件可以提供突破、假跌破修复或回踩支撑的价格触发与结构止损参考；周期快照只用于判断该事件是否处于一致背景。系统会保留触发来源、门控结果与原因码，避免把“事件出现”误写成“已经证明可盈利”。",
          ],
        },
        {
          heading: "外部风险因子优先保护账户",
          paragraphs: [
            "衍生品数据用于识别方向拥挤、去杠杆与多头挤压风险；清算分布用于警惕下方流动性池；聪明钱和资金行为用于识别是否存在明显反向卖出；成交额、深度和价差用于过滤无法可靠执行的标的。明确反向风险会阻断新仓，轻度噪声或覆盖不足仅按规则降权，不能被当作确认进场的理由。",
          ],
        },
      ],
      aside: {
        title: "不可绕过的条件",
        items: [
          "候选必须仍有效，且当前阶段允许做多评估。",
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
      title: "高风险标的，先限制追高与回撤",
      introduction:
        "快速拉升山寨币的做多具有天然高风险：趋势可能突然反转、流动性可能瞬间变薄、价格可能跌破关键结构，且杠杆会放大回撤。策略的核心不是放大对上涨的判断，而是限制单次延续判断错误时的账户影响。",
      blocks: [
        {
          heading: "仓位与止损",
          paragraphs: [
            "系统将早期埋伏、试探和确认仓位分开管理。早期仓位只在正式门控满足时使用更小预算；试探仓用于验证延续结构；确认仓位必须建立在试探已验证、后续结构确认和账户风险仍可承受的前提上。每个执行计划需要明确结构止损、单笔最大预估损失、单币保证金上限和组合保证金上限。预算为零或条件不完整时，策略不会生成开仓计划。",
            "止损不是观点失败后的可选动作。当价格重新跌回突破区、关键结构连续失效、去杠杆或下方挤压风险上升时，策略进入退出流程并持续处理至仓位确认归零。数据、流动性或交易所状态异常时，优先降低风险、暂停或退出，而不是继续依赖模型判断。",
          ],
        },
        {
          heading: "利润保护与执行风险",
          paragraphs: [
            "持仓出现一定收益后，策略可依据结构、衍生品和流动性变化执行分批减仓或利润保护；只有更高高点和趋势延续仍有效时才保留尾仓。实盘执行由独立服务管理交易所适配、订单生命周期、合约规格换算、账户快照与熔断，策略服务只产生可审计的决策和执行计划。",
            "交易所 API 限频、网络延迟、订单拒绝、滑点、资金费率和最低下单要求均可能使实际结果偏离策略计划。执行器还会检查账户级最大日损失、连续失败、活跃仓位上限和仓位一致性；这些保护不能被研究信号绕过。",
          ],
        },
      ],
      aside: {
        title: "风险提示",
        items: [
          "高风险不等于高收益，快速拉升后追多可能面临连续止损或快速亏损。",
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
            "不适合希望自动追逐每一个山寨币涨幅、要求无回撤、固定收益或长期满仓运行的账户。策略也不应被用于规避交易所规则、绕过风控或替代独立的风险判断。市场波动、交易所规则和执行条件发生变化时，暂停或退出是策略的正常结果。",
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
      question: "价格快速拉升后，策略会立刻做多吗？",
      answer: "不会。快速拉升只会让交易对进入候选与观察链路。策略仍需确认候选状态、结构转强、止损与风险收益、流动性、组合暴露和外部风险门控；价格已远离合理止损位或高位衰竭风险明显时，系统应等待、降权或放弃追多。",
    },
    {
      question: "一根阳线、突破或市场结构事件能直接触发开仓吗？",
      answer: "不能。它们只提供价格结构证据或择时依据。实际开仓仍需要完整风险门控通过，并由策略状态机生成可审计的分阶段执行计划。",
    },
    {
      question: "为什么要先小仓试探，再确认做多？",
      answer: "上涨延续可能迅速失败。早期试探仓用于验证结构是否持续有效；只有试探获得后续结构、预测或持仓行为支持，并且账户风险仍可承受时，策略才会评估确认仓位。验证失败、结构失效或超时会优先退出。",
    },
    {
      question: "山寨做多与做空策略会同时管理同一交易对吗？",
      answer: "同一账户、同一交易对使用共享生命周期状态和仓位锁管理互斥。存在空头仓位或空头锁时，新的做多开仓会被阻断；相关策略页面解释的是不同阶段的独立评估边界，并不代表相反方向仓位可以同时执行。",
    },
    {
      question: "当前支持哪些交易所，最低本金是多少？",
      answer: "当前优先支持币安，同时支持 OKX 的私有实盘接入；最低接入本金为 1,500 USDT。实际是否接入仍需按账户 API 权限、合约规格、风险预算、杠杆与交易所规则单独评估。",
    },
  ],
  relatedStrategies: [
    {
      title: "山寨做空策略",
      description: "查看高位衰竭、结构转弱与阶段性做空处理。",
      href: "/strategies/altcoin-pump-short",
    },
  ],
};

export default function AltcoinPumpLongPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${strategyUrl}#article`,
        mainEntityOfPage: strategyUrl,
        headline: "山寨做多策略：快速拉升山寨币的结构化趋势参与方法",
        description: strategy.summary,
        inLanguage: "zh-CN",
        datePublished,
        dateModified,
        author: { "@type": "Organization", name: "UMAKER 研究团队", url: "https://umaker.org/about" },
        publisher: { "@type": "Organization", name: "UMAKER", url: "https://umaker.org" },
        about: ["山寨币做多", "市场结构", "趋势跟踪", "风险管理", "币安合约", "OKX 合约"],
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
