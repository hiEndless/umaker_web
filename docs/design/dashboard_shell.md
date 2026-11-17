# UMaker Dashboard 壳

## 范围与归属

工作台继续使用 `/market`，`/dashboard`重定向至该页。源参考为UTaker-dashboard（Kiranism Next/shadcn dashboard starter，MIT），许可保留于apps/web/components/dashboard/LICENSE。只迁移必要的布局和组件模式；已有shadcn/Radix基础组件复用，不复制第二套。官网页面继续原布局。

共享展示层归属apps/web/components/dashboard：DashboardShell负责响应式导航、页头与面包屑；DashboardPage负责页面容器；DataTable负责泛型列渲染、稳定行身份、可选客户端排序/分页；DataToolbar负责搜索、筛选插槽与重置；DataStatus/EmptyState负责加载、异常、旧快照与空态；DetailPanel负责带标题和标记的详情容器。

当前只有真实存在的收益榜、动量榜及数据口径入口。前端工作台不接登录页、AuthGuard或浏览器JWT；原同源行情API及其服务端读取令牌继续生效，API鉴权语义不变。

## 表格与数据边界

TanStack Table使用9.3.1原生useTable/tableFeatures/FlexRender，不引入deprecated useLegacyTable。默认禁止客户端重排，榜单保留API rank、顺序、每侧最多10条及搜索后的原排名；不启用分页。后续列表显式传clientSorting/pageSize复用通用排序分页。共享表格不访问API、不重算收益或动量，不维护全局page/sort URL字段，双榜互不干扰。

原读取预算、同源BFF、报价、前台刷新与旧快照保留仍归原市场模块。显示层统一错误/旧快照提示，数据积累中与有效空榜仍有区别。交易对不新增logo，价格/成交额沿用当前数字口径。

## 主题与依赖

主题采用UMaker：背景#050505，前景#f2ede6，主色#2196f3，侧栏#090b0e；涨跌方向沿用原状态色。仅作用于工作台壳，官网品牌样式保持原样。桌面侧栏可折叠，移动端用已有Radix Sheet导航，详情继续点击后滚动定位。

升级记录：Next16.4.6、React/ReactDOM19.3.1、TanStack Table9.3.1、OpenNext Cloudflare1.20.17、Tailwind/PostCSS插件4.3.5、Wrangler4.164.0。Radix Dialog1.3.1、DropdownMenu2.2.1、Slot1.5.0、Tooltip1.4.1、Checkbox1.4.1、Collapsible1.2.1、Separator1.2.0、Select2.4.1；Lucide1.74.0；React类型19.3.0。因React升级，同步将首页已有React Three Fiber从9.5升级至9.8.2以满足React19.3 peer范围。Node要求>=22.12.0，项目Volta配置、.nvmrc和pnpm的.npmrc use-node-version固定22.12.0，避免新Tailwind/Wrangler在本机旧Node22.11下构建失败。锁文件固定实际依赖；不整体复制UTaker package.json，不升级无关Zod契约主版本，不引入Clerk、next-intl、Sentry或UTaker业务API。

## 验证与回滚

执行verify:all与Cloudflare Workers构建（无需临时PATH，pnpm使用项目固定Node），浏览器检查桌面/手机导航、收益/动量切换、搜索、原rank、详情、报价、旧快照与失败恢复；检查官网首屏仍可渲染。测试必须确认双榜不重排、无前端登录跳转、旧URL参数可恢复、页面不产生横向溢出。迁移不改公开契约或后端，无数据库迁移。

回滚整次前端提交及对应lockfile后重建/发布。新组件只在market入口引用，其他页面不需要并行维护旧工作台；新依赖及适配器必须一起回滚。线上Worker行为需发布后另做验收。

2026-11-18本地验证：verify:all及build:web-worker通过；隔离开发服务器和本地Workers预览均通过Dashboard浏览器回归与旧快照保留回归，包括双榜原排名、搜索、桌面折叠、手机导航/详情、报价、前台恢复、失败保留、有效空榜及官网首屏。浏览器使用隔离行情样本，这些结果不代表生产数据或线上部署验收。
