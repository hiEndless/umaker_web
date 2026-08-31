# UMAKER Logo Usage System

## 当前主方向

UMAKER 当前采用：

```text
Flat Framed Signal Structure
```

核心含义：

- `frame` 表达实验边界、研究容器和系统约束。
- `nodes` 表达市场数据、结构节点、因子和信号。
- `edges` 表达数据关系、因子依赖和从结构到信号的路径。

当前默认版本是扁平 PNG：节点样式保持一致，不把右上角节点做成特殊高亮，不使用强 3D、强渐变或强 glow。

## Blue Intelligence 配色体系

UMAKER 官网和宣传物料的主色方向已固定为：

```text
Ice White + Deep Graphite + Intelligence Blue + Cyan Data Flow
```

Logo 不需要推倒重做。当前结构图形继续保留，但配色角色调整为：

- `Primary on Dark`：官网默认，cold blue / cyan symbol + ice white wordmark。
- `Mono on Dark`：正式深色物料、极简场景、报告封面。
- `Signal on Dark`：高级宣传物料，symbol 大部分为 silver/ice/cold blue，不在 logo 内部加入绿色点。
- `Dark on Light`：白底文档、合同、PPT、外部平台资料页。

重要规则：

```text
UMAKER 不是绿色品牌。
Logo 内部不使用绿色点；Emerald 只用于网页交互状态、Live/Active 或产品 UI 信号。
```

页面、海报和报告不应使用大面积 emerald 背景或满屏绿色 glow。新的网站和宣传 lockup 使用冷蓝/青色承载科技感，emerald 只保留为 UMAKER 产品 UI signal，不进入 logo 图形。

## 网站 Favicon

网站使用 flat PNG favicon：

```text
apps/web/public/favicon-16.png
apps/web/public/favicon-32.png
apps/web/public/favicon-64.png
apps/web/public/apple-touch-icon.png
```

当前不再使用 `favicon.svg`。

HTML 推荐引用：

```html
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## 标准 Raster Assets

### Master

```text
docs/design/samples/logo-master-flat.png
docs/design/samples/logo-master-flat-transparent.png
```

当前正式源文件：

```text
docs/design/brand/source/logo-symbol.svg
docs/design/brand/source/logo-lockup-horizontal.svg
docs/design/brand/source/logo-lockup-stacked.svg
```

网站 public 常用入口：

```text
apps/web/public/logo.png
apps/web/public/logo@2x.png
apps/web/public/logo-horizontal.png
apps/web/public/logo-horizontal@2x.png
apps/web/public/logo-stacked.png
apps/web/public/og-image.png
apps/web/public/icon-192.png
apps/web/public/icon-512.png
```

同一套文件也复制在：

```text
apps/web/public/assets/brand/
```

### Core

```text
docs/design/brand/core/logo-symbol-1254.png
docs/design/brand/core/logo-symbol-1024.png
docs/design/brand/core/logo-symbol-512.png
docs/design/brand/core/logo-symbol-256.png
```

用于官网 Hero、品牌页、报告封面和宣传物料二次排版。

### Icons

```text
docs/design/brand/icons/favicon-16.png
docs/design/brand/icons/favicon-32.png
docs/design/brand/icons/favicon-64.png
docs/design/brand/icons/apple-touch-icon.png
docs/design/brand/icons/app-icon-192.png
docs/design/brand/icons/app-icon-512.png
```

用于浏览器 favicon、PWA、移动端桌面图标和位图 fallback。

### Lockups

```text
docs/design/brand/lockups/logo-horizontal-1200.png
docs/design/brand/lockups/logo-horizontal-2400.png
docs/design/brand/lockups/logo-stacked-1024.png
docs/design/brand/lockups/logo-stacked-2048.png
```

用于官网导航延展、首页、报告封面、介绍页和需要同时展示 symbol + `UMAKER` 字标的场景。

### Transparent Lockups

```text
docs/design/brand/transparent/core/logo-symbol-256.png
docs/design/brand/transparent/core/logo-symbol-512.png
docs/design/brand/transparent/core/logo-symbol-1024.png
docs/design/brand/transparent/core/logo-symbol-1254.png
docs/design/brand/transparent/lockups/logo-horizontal-1200.png
docs/design/brand/transparent/lockups/logo-horizontal-2400.png
docs/design/brand/transparent/lockups/logo-stacked-1024.png
docs/design/brand/transparent/lockups/logo-stacked-2048.png
```

使用优先级：

1. 官网导航：优先使用 CSS/inline symbol + font wordmark，避免 PNG 留白影响视觉尺寸。
2. 网页静态资源、分享预览、宣传物料：使用透明 PNG lockup。
3. 小尺寸 favicon 与 app icon：使用紧裁切的 flat symbol。

### Social

```text
docs/design/brand/social/social-avatar-512.png
docs/design/brand/social/social-avatar-1024.png
docs/design/brand/social/social-post-square-1080.png
```

用于社媒头像、平台资料页和正方形品牌展示。

### Marketing

```text
docs/design/brand/marketing/og-image.png
docs/design/brand/marketing/presentation-cover-1600x900.png
docs/design/brand/marketing/social-story-1080x1920.png
```

选择规则：

- 默认网站分享图使用 `og-image.png`。
- 演示封面或 pitch deck 首页，用 `presentation-cover-1600x900.png`。
- 社媒方形发帖优先用 `social-post-square-1080.png`。

## Transparent PNG

常用透明背景入口：

```text
docs/design/samples/logo-master-flat-transparent.png
apps/web/public/logo.png
apps/web/public/logo-horizontal.png
apps/web/public/logo-stacked.png
```

完整透明背景尺寸包：

```text
docs/design/brand/transparent/core/
docs/design/brand/transparent/icons/
docs/design/brand/transparent/social/
docs/design/brand/transparent/lockups/
docs/design/brand/transparent/marketing/
```

透明版本适合：

- 叠加到官网深色 section。
- 放入宣传海报、PPT、视频封面。
- 交给外部设计工具二次排版。
- 在不同深色背景上保留 logo 质感。

限制：

- 不建议直接放在纯白背景上。
- 当前网站 favicon 和 logo 使用透明 PNG；如果未来需要更稳定的小尺寸识别，可额外生成带深色底的浏览器专用版本。

## 预览

Raster 预览页：

```text
docs/design/logo_raster_preview.html
```

## 生成方式

当前项目采用：

```text
规范源 SVG
  ↓
tools/local/generate_logo_assets.mjs
  ↓
网站与宣传 PNG 资产
```

重建命令：

```bash
pnpm generate:brand-assets
```

保留 `docs/design/brand/source/*.svg` 作为几何结构单一来源。网站实际引用 PNG 资产：

```text
apps/web/public/favicon-16.png
apps/web/public/favicon-32.png
apps/web/public/favicon-64.png
apps/web/public/apple-touch-icon.png
apps/web/public/logo.png
apps/web/public/logo-horizontal.png
apps/web/public/logo-horizontal@2x.png
apps/web/public/logo-stacked.png
apps/web/public/og-image.png
```

SVG 不直接作为网站 favicon 使用，避免不同浏览器对渐变、裁切和小尺寸抗锯齿的呈现差异。

## 使用规则

- 不压缩、不拉伸、不裁切节点。
- 不额外添加随机粒子。
- 不增加强 neon glow。
- 不把右上角节点改成特殊亮色节点。
- 不把 logo 做成 coin、K 线、AI brain、机器人或交易机器人符号。
- 深色背景优先使用 `#030712`、`#05070B`、`#0B1018` 或接近纯黑的局部画布。
- 横版 lockup 在窄屏中不要强行压缩，优先切换为 symbol-only。
- Wordmark 不要小于 symbol 高度的 45%，否则品牌识别会变弱。
- Social / OG 场景必须确保 `UMAKER` 完整显示，不得裁切。
