import fs from "node:fs";
import path from "node:path";
import { fail, ok, rootPath } from "../lib/paths.js";

const LAYERS = ["api", "application", "domain", "infrastructure"] as const;
type Layer = (typeof LAYERS)[number];

const FORBIDDEN: Record<Layer, Set<Layer>> = {
  domain: new Set(["api", "application", "infrastructure"]),
  application: new Set(["api", "infrastructure"]),
  api: new Set(["infrastructure"]),
  infrastructure: new Set(["api", "application"]),
};

function walkTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".ts")) out.push(full);
  }
  return out;
}

function layerOf(file: string, srcDir: string): Layer | null {
  const rel = path.relative(srcDir, file);
  const first = rel.split(path.sep)[0];
  return (LAYERS as readonly string[]).includes(first ?? "")
    ? (first as Layer)
    : null;
}

function importedLayer(spec: string): Layer | null {
  const cleaned = spec.replace(/^\.\.\//, "").replace(/^\.\//, "");
  for (const layer of LAYERS) {
    if (
      cleaned === layer ||
      cleaned.startsWith(`${layer}/`) ||
      cleaned.includes(`/${layer}/`)
    ) {
      // only treat relative imports that clearly target a layer folder
      const parts = cleaned.split("/");
      const idx = parts.findIndex((p) => (LAYERS as readonly string[]).includes(p));
      if (idx >= 0) return parts[idx] as Layer;
    }
  }
  return null;
}

const errors: string[] = [];
const appsDir = rootPath("apps");

for (const appName of fs.readdirSync(appsDir)) {
  const srcDir = rootPath("apps", appName, "src");
  if (!fs.existsSync(srcDir)) continue;
  for (const file of walkTsFiles(srcDir)) {
    const sourceLayer = layerOf(file, srcDir);
    if (!sourceLayer) continue;
    const text = fs.readFileSync(file, "utf8");
    const importRe = /from\s+["']([^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = importRe.exec(text))) {
      const spec = match[1] ?? "";
      if (!spec.startsWith(".")) continue;
      const target = importedLayer(path.posix.normalize(
        path.posix.join(path.posix.dirname(path.relative(srcDir, file).split(path.sep).join("/")), spec),
      ));
      if (target && FORBIDDEN[sourceLayer].has(target)) {
        errors.push(
          `${path.relative(rootPath(), file)}: ${sourceLayer} must not import ${target} (${spec})`,
        );
      }
    }
  }
}

if (errors.length) fail("ddd import boundary guard", errors);
ok("ddd import boundary guard passed");
