# 2026-11-17 市场观察榜单设计

## 决策
新增 `/market` 工作台；设计阶段的固定样例已由UMaker真实收益/动量榜替代，周期搜索与多周期详情共用受验证的服务端聚合快照。交易对只用文字。具体页面规范归属 `docs/design/market_workspace.md`。

## 原因
先验证榜单浏览和跨榜归属的可解释性，再接真实API和K线，降低同时修改展示与生产规则的复杂度。

## 放弃
未新增服务、依赖、币种图标或生产查询；不把固定样例包装成实时行情，不提前添加无数据支撑的筛选结论。

## 验证
web类型检查与项目verify:quick通过。独立headless浏览器桌面1512px/手机390px检查通过：无横向溢出；搜索空态、周期/动量切换、交易对选择、URL重载恢复、重置及手机滚动详情可用，无运行时异常或console error。截图与交互日志位于/tmp/umaker-market-{desktop,mobile}.png和/tmp/umaker-market-browser.log。未连接真实行情或部署。

## 兼容
无公开契约变化或数据库迁移。新路由独立，官网首页保持原状。样例数据在真实接入时替换，不作为生产接口契约。

## 真实接入追加
Next服务端 `/api/market/` 复用UMaker候选/收益/动量，只做适配、不重算生产排序。引入market_workspace.schema.json及生成的嵌套校验器，应用限制并发，基础设施限制响应体/超时/重定向，页面不再导入样例。缺失报价字段显式留空；本次不扩展UMaker采集或引入交易所直连。凭据只写被忽略的0600私有文件。跨周期快照独立，过期隐藏；30秒轮询与手动应用新榜单分开。


## 真实接入最终证据

最终pnpm verify:all、OpenNext build:worker均退出0，含严格嵌套契约及生产代码产出样本反查、15次上游/4并发、比例单位、Unicode/单字母交易对、过期/错误/302重定向负样本。契约生成器补齐本次所需数组、嵌套对象及nullable支持；fixture校验改为递归。契约变更守卫修正Git中文路径转义及未跟踪文件漏检，不靠暂存文件绕过守卫。

Herdr同tab右侧w3:p1Q独立LOCAL PASS / PROCEED：专项、当前hook StrictMode及旧请求迟到/快照恢复反例、HTTP缓存合并/10秒TTL/配置切换/8秒取消、reader 2.5秒取消及无长度超大流、生成物重算一致。额外真实loopback HTTP验证301/302/303/307/308均不跟随、目标请求0次且不含测试token。验收方未读私有文件或SSH生产；主方浏览器/全量日志仅作采集材料复核。

主方分别在Next dev与Wrangler本地Worker浏览器完成11项：真实行、切换/选择、非就绪状态、手机无溢出、同源无Bearer、隔离fixture下新快照不重排/手动应用/自动过期隐藏、无JS/console错误。Workers初验发现fetch不支持redirect:error，已改manual并统一拒绝非2xx；最终Worker构建及实际本地GET /api/market/200证明私有变量在运行时生效，读取40候选；一次采样13个有效榜、2个5d not_ready、1个上游不可用，不抹平上游差异。真实价格/成交额没有来源，仍明确缺失。32个浏览器JS产物未含实际私密token。

证据/tmp/umaker-web-live-verify-all-final.log、/tmp/umaker-web-live-worker-build-final.log、/tmp/umaker-web-live-browser.log、/tmp/umaker-web-worker-browser.log、/tmp/umaker-web-market-live.json、/tmp/umaker-web-market-worker-live.json，截图/tmp/umaker-market-{live,worker}-{desktop,mobile}.png。当前SSH转发和本地Wrangler预览仅用于本地联调，不代表部署；线上api.umaker.org TLS/Worker secret及发布后行为仍须验收。不推送、不自动发布。
