import fs from "node:fs";
import path from "node:path";
import { fail, ok, rootPath } from "../lib/paths.js";

const APPS_DIR = rootPath("apps");

const SERVICE_REQUIRED = [
  "src",
  "src/api",
  "src/application",
  "src/domain",
  "src/infrastructure",
  "src/main.ts",
  "src/worker.ts",
  "wrangler.toml",
  "docs",
  "docs/契约说明.md",
  "docs/迁移说明.md",
  "package.json",
  "README.md",
];

const WEB_REQUIRED = [
  "public/index.html",
  "wrangler.toml",
  "package.json",
  "README.md",
];

function isWebApp(appDir: string): boolean {
  return fs.existsSync(path.join(appDir, "public", "index.html"));
}

const missing: string[] = [];
for (const name of fs.readdirSync(APPS_DIR)) {
  const appDir = rootPath("apps", name);
  if (!fs.statSync(appDir).isDirectory()) continue;
  const required = isWebApp(appDir) ? WEB_REQUIRED : SERVICE_REQUIRED;
  for (const rel of required) {
    const target = rootPath("apps", name, rel);
    if (!fs.existsSync(target)) missing.push(`${name}/${rel}`);
  }
}

if (missing.length) fail("app layout guard", missing);
ok("app layout guard passed");
