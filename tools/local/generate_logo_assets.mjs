#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const repoRoot = resolve(new URL("../..", import.meta.url).pathname);
const publicDir = join(repoRoot, "apps/web/public");
const brandDir = join(publicDir, "assets/brand");
const docsBrandDir = join(repoRoot, "docs/design/brand");
const tmpDir = join(repoRoot, ".tmp/logo-render");
const symbolSvgPath = join(docsBrandDir, "source/logo-symbol.svg");
const symbolSvg = readFileSync(symbolSvgPath, "utf8");

const blue = {
  ink: "#F2EDE6",
  bg: "#050505",
  line: "#111827",
  cyan: "#22D3EE",
  blue: "#2563EB",
  soft: "#60A5FA",
};

const fonts = {
  condensedItalic800: join(publicDir, "../.next/static/media/72207ecf667d99d7-s.p.woff2"),
};

const ensureDirs = (...dirs) => dirs.forEach((dir) => mkdirSync(dir, { recursive: true }));

const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      execFileSync("test", ["-x", candidate]);
      return candidate;
    } catch {
      continue;
    }
  }
  throw new Error("Chrome/Edge executable not found for logo rendering.");
}

function fileUrl(path) {
  return `file://${path.replaceAll(" ", "%20")}`;
}

function symbolMarkup(size) {
  return symbolSvg
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<svg /, `<svg class="symbol" width="${size}" height="${size}" `);
}

function renderHtml({ mode, width, height, output }) {
  const isStacked = mode === "stacked";
  const symbolSize = isStacked ? 420 : 300;
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @font-face {
      font-family: "UMAKER Display";
      src: url("${fileUrl(fonts.condensedItalic800)}") format("woff2");
      font-style: italic;
      font-weight: 800;
      font-display: block;
    }
    html, body {
      margin: 0;
      width: ${width}px;
      height: ${height}px;
      background: transparent;
      overflow: hidden;
    }
    body {
      display: grid;
      place-items: center;
    }
    .lockup {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: ${blue.ink};
    }
    .horizontal {
      flex-direction: row;
      gap: 92px;
      padding: 0;
    }
    .stacked {
      flex-direction: column;
      gap: 58px;
      padding: 0;
    }
    .symbol {
      display: block;
      overflow: visible;
      flex: 0 0 auto;
    }
    .wordmark {
      font-family: "UMAKER Display", "Arial Narrow", sans-serif;
      font-size: ${isStacked ? 178 : 238}px;
      font-style: italic;
      font-weight: 800;
      letter-spacing: 0.155em;
      line-height: 0.78;
      white-space: nowrap;
      color: ${blue.ink};
      transform: translateY(${isStacked ? "-6px" : "4px"});
    }
  </style>
</head>
<body>
  <div class="lockup ${mode}">
    ${symbolMarkup(symbolSize)}
    <div class="wordmark">UMAKER</div>
  </div>
</body>
</html>`;

  const htmlPath = join(tmpDir, `${mode}.html`);
  writeFileSync(htmlPath, html);
  execFileSync(findChrome(), [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-sandbox",
    "--default-background-color=00000000",
    `--window-size=${width},${height}`,
    `--screenshot=${output}`,
    fileUrl(htmlPath),
  ], { stdio: "ignore" });
}

async function cropAlpha(input, output, trim = 8) {
  const image = sharp(input).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const alpha = data[(y * info.width + x) * info.channels + 3];
      if (alpha > trim) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    throw new Error(`No non-transparent pixels found in ${input}`);
  }

  await sharp(input)
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(output);
}

async function resizePng(input, output, width, height = null) {
  await sharp(input)
    .resize({
      width,
      height,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(output);
}

async function normalizeTextColor(input, output, region) {
  const target = { r: 242, g: 237, b: 230 };
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const startX = region === "right" ? Math.floor(info.width * 0.28) : 0;
  const startY = region === "bottom" ? Math.floor(info.height * 0.58) : 0;

  for (let y = startY; y < info.height; y += 1) {
    for (let x = startX; x < info.width; x += 1) {
      const index = (y * info.width + x) * info.channels;
      const alpha = data[index + 3];
      if (alpha === 0) {
        continue;
      }

      data[index] = target.r;
      data[index + 1] = target.g;
      data[index + 2] = target.b;
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toFile(output);
}

async function renderSymbol(inputSvg, output, size, paddingRatio = 0.05) {
  const padding = Math.round(size * paddingRatio);
  const inner = size - padding * 2;
  const symbolBuffer = await sharp(Buffer.from(inputSvg))
    .resize(inner, inner, { fit: "contain" })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: symbolBuffer, left: padding, top: padding }])
    .png()
    .toFile(output);
}

async function makeOg(lockupPath) {
  const lockup = await sharp(lockupPath)
    .resize({ width: 920, fit: "contain" })
    .png()
    .toBuffer();

  const gridSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${blue.bg}"/>
    <path d="M0 96H1200M0 246H1200M0 396H1200M0 546H1200M135 0V630M330 0V630M585 0V630M900 0V630" stroke="${blue.line}" stroke-width="1"/>
    <circle cx="196" cy="196" r="2" fill="${blue.cyan}" opacity=".7"/>
    <circle cx="1004" cy="412" r="2" fill="${blue.soft}" opacity=".55"/>
    <text x="96" y="540" fill="#6B7280" font-family="monospace" font-size="22" letter-spacing="5">MARKET INTELLIGENCE CORE</text>
  </svg>`);

  await sharp(gridSvg)
    .composite([{ input: lockup, left: 122, top: 200 }])
    .png()
    .toFile(join(publicDir, "og-image.png"));

  await sharp(join(publicDir, "og-image.png"))
    .toFile(join(docsBrandDir, "marketing/og-image.png"));
}

async function main() {
  ensureDirs(
    tmpDir,
    brandDir,
    join(docsBrandDir, "core"),
    join(docsBrandDir, "icons"),
    join(docsBrandDir, "lockups"),
    join(docsBrandDir, "marketing"),
    join(docsBrandDir, "social"),
    join(docsBrandDir, "transparent/core"),
    join(docsBrandDir, "transparent/icons"),
    join(docsBrandDir, "transparent/lockups"),
  );

  const horizontalShot = join(tmpDir, "horizontal-shot.png");
  const stackedShot = join(tmpDir, "stacked-shot.png");
  const horizontalMaster = join(tmpDir, "logo-horizontal-master.png");
  const stackedMaster = join(tmpDir, "logo-stacked-master.png");

  renderHtml({ mode: "horizontal", width: 2100, height: 470, output: horizontalShot });
  renderHtml({ mode: "stacked", width: 1180, height: 900, output: stackedShot });
  await cropAlpha(horizontalShot, horizontalMaster);
  await cropAlpha(stackedShot, stackedMaster);
  await normalizeTextColor(horizontalMaster, horizontalMaster, "right");
  await normalizeTextColor(stackedMaster, stackedMaster, "bottom");

  await resizePng(horizontalMaster, join(publicDir, "logo-horizontal.png"), 760);
  await resizePng(horizontalMaster, join(publicDir, "logo-horizontal@2x.png"), 1520);
  await resizePng(horizontalMaster, join(brandDir, "logo-horizontal.png"), 760);
  await resizePng(horizontalMaster, join(brandDir, "logo-horizontal@2x.png"), 1520);
  await resizePng(horizontalMaster, join(docsBrandDir, "lockups/logo-horizontal-1200.png"), 1200);
  await resizePng(horizontalMaster, join(docsBrandDir, "lockups/logo-horizontal-2400.png"), 2400);
  await resizePng(horizontalMaster, join(docsBrandDir, "transparent/lockups/logo-horizontal-1200.png"), 1200);
  await resizePng(horizontalMaster, join(docsBrandDir, "transparent/lockups/logo-horizontal-2400.png"), 2400);

  await resizePng(stackedMaster, join(publicDir, "logo-stacked.png"), 760);
  await resizePng(stackedMaster, join(brandDir, "logo-stacked.png"), 760);
  await resizePng(stackedMaster, join(docsBrandDir, "lockups/logo-stacked-1024.png"), 1024);
  await resizePng(stackedMaster, join(docsBrandDir, "lockups/logo-stacked-2048.png"), 2048);
  await resizePng(stackedMaster, join(docsBrandDir, "transparent/lockups/logo-stacked-1024.png"), 1024);
  await resizePng(stackedMaster, join(docsBrandDir, "transparent/lockups/logo-stacked-2048.png"), 2048);

  for (const size of [256, 512, 1024, 1254]) {
    await renderSymbol(symbolSvg, join(docsBrandDir, `core/logo-symbol-${size}.png`), size, 0.05);
    await renderSymbol(symbolSvg, join(docsBrandDir, `transparent/core/logo-symbol-${size}.png`), size, 0.05);
  }

  const iconSpecs = [
    ["favicon-16.png", 16, 0.02],
    ["favicon-32.png", 32, 0.02],
    ["favicon-64.png", 64, 0.02],
    ["apple-touch-icon.png", 180, 0.04],
    ["apple-icon.png", 180, 0.04],
    ["icon-192.png", 192, 0.04],
    ["icon-512.png", 512, 0.04],
    ["icon-dark-32x32.png", 32, 0.02],
    ["icon-light-32x32.png", 32, 0.02],
  ];
  for (const [name, size, padding] of iconSpecs) {
    await renderSymbol(symbolSvg, join(publicDir, name), size, padding);
  }
  for (const [name, size, padding] of iconSpecs.filter(([name]) => name.startsWith("favicon") || name === "apple-touch-icon.png" || name.startsWith("icon-"))) {
    const docsName = name.replace("icon-192", "app-icon-192").replace("icon-512", "app-icon-512");
    await renderSymbol(symbolSvg, join(docsBrandDir, `icons/${docsName}`), size, padding);
    await renderSymbol(symbolSvg, join(docsBrandDir, `transparent/icons/${docsName}`), size, padding);
  }

  await renderSymbol(symbolSvg, join(publicDir, "logo.png"), 512, 0.05);
  await renderSymbol(symbolSvg, join(publicDir, "logo@2x.png"), 1024, 0.05);
  await renderSymbol(symbolSvg, join(brandDir, "logo.png"), 512, 0.05);
  await renderSymbol(symbolSvg, join(brandDir, "logo@2x.png"), 1024, 0.05);

  await makeOg(join(publicDir, "logo-horizontal@2x.png"));

  await sharp(join(docsBrandDir, "core/logo-symbol-1024.png"))
    .extend({ top: 80, bottom: 80, left: 80, right: 80, background: blue.bg })
    .resize(512, 512)
    .png()
    .toFile(join(docsBrandDir, "social/social-avatar-512.png"));
  await sharp(join(docsBrandDir, "core/logo-symbol-1024.png"))
    .extend({ top: 160, bottom: 160, left: 160, right: 160, background: blue.bg })
    .resize(1024, 1024)
    .png()
    .toFile(join(docsBrandDir, "social/social-avatar-1024.png"));
  await sharp(join(publicDir, "og-image.png"))
    .resize(1080, 1080, { fit: "cover" })
    .png()
    .toFile(join(docsBrandDir, "social/social-post-square-1080.png"));
  await sharp(join(publicDir, "og-image.png"))
    .resize(1600, 900, { fit: "cover" })
    .png()
    .toFile(join(docsBrandDir, "marketing/presentation-cover-1600x900.png"));
  await sharp(join(publicDir, "og-image.png"))
    .resize(1080, 1920, { fit: "cover" })
    .png()
    .toFile(join(docsBrandDir, "marketing/social-story-1080x1920.png"));

  rmSync(tmpDir, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
