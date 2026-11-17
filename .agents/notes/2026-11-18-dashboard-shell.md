# 2026-11-18 最小Dashboard壳迁移

## 决策
在现有umaker_web中采用UTaker的Next/shadcn壳结构，复用已有基础UI并保留MIT声明。将布局、泛型表格、筛选、状态、详情统一到components/dashboard，通过现有榜单验证。前端无登录门控；API读取权限继续留在服务器。

## 原因
减少后续页面反复实现布局、表格、筛选、数据状态和详情容器的工作。

## 放弃
不整体迁入UTaker工程，不带入旧API/JWT、Clerk、Sentry、语言/租户/收费及未实现页面。TanStack使用原生v9接口，不保留临时v8兼容层。业务排名继续由API提供。

## 验证
verify:all、Workers构建通过；隔离开发服务器及本地Workers预览通过桌面/手机导航、搜索、原排名、URL恢复、报价、旧快照、失败恢复与官网首屏回归。依赖升级后的构建工具要求Node>=22.12，项目记录Volta、.nvmrc与pnpm use-node-version。依赖升级与适配边界见docs/design/dashboard_shell.md。浏览器使用隔离行情样本，线上需发布后另做验收。

## 兼容
保留/market及查询参数，新增/dashboard重定向，不改公开API契约。前端与lockfile一并回滚，无后端或数据库迁移。线上需发布后单独验收。
