import { execSync } from "node:child_process";
import fs from "node:fs";
import { exists, fail, ok, readJson, readText, rootPath } from "../lib/paths.js";

type Manifest = {
  contracts: Array<{
    schema: string;
    mapping: string;
    version: string;
    compatibility_window: string;
    owner_service?: string;
  }>;
};

function changedPaths(): Set<string> {
  if (!exists(".git")) return new Set();
  const out = new Set<string>();
  for (const cmd of ["git diff --name-only HEAD", "git diff --cached --name-only"]) {
    try {
      const text = execSync(cmd, { cwd: rootPath(), encoding: "utf8" });
      for (const line of text.split("\n")) {
        if (line.trim()) out.add(line.trim());
      }
    } catch {
      // ignore
    }
  }
  return out;
}

function parseIndexServices(indexText: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const raw of indexText.split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("|") || line.includes("---") || line.includes("Schema")) continue;
    const cols = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    if (cols.length < 6) continue;
    const [schema, , , , , service] = cols;
    if (schema?.endsWith(".json") && service) map.set(schema, service);
  }
  return map;
}

const errors: string[] = [];
const manifest = readJson<Manifest>("contracts/versions/manifest.json");
const indexText = readText("docs/contracts/契约索引.md");
const serviceBySchema = parseIndexServices(indexText);

for (const entry of manifest.contracts) {
  for (const [token, label] of [
    [entry.schema, "schema"],
    [entry.mapping, "mapping"],
    [entry.version, "version"],
    [entry.compatibility_window, "compatibility_window"],
  ] as const) {
    if (!indexText.includes(token)) {
      errors.push(`contract index missing ${label} ${token}`);
    }
  }

  const service = entry.owner_service ?? serviceBySchema.get(entry.schema);
  if (!service) {
    errors.push(`cannot resolve owner service for ${entry.schema}`);
    continue;
  }

  const contractDoc = `apps/${service}/docs/契约说明.md`;
  const migrationDoc = `apps/${service}/docs/迁移说明.md`;
  if (!exists(contractDoc)) errors.push(`missing ${contractDoc}`);
  else if (!readText(contractDoc).includes(entry.schema)) {
    errors.push(`${contractDoc} does not mention ${entry.schema}`);
  }
  if (!exists(migrationDoc)) errors.push(`missing ${migrationDoc}`);

  const stem = entry.schema.replace(/\.schema\.json$/, "").replace(/\.json$/, "");
  const caseExists = fs
    .readdirSync(rootPath("fixtures/contract_cases"))
    .some((name) => name.includes(stem));
  if (!caseExists) errors.push(`missing contract case for ${entry.schema}`);
}

if (!exists("packages/contracts-ts/src/generated/index.ts")) {
  errors.push("missing generated contracts-ts index");
}

const changed = changedPaths();
const contractsChanged = [...changed].some((p) => p.startsWith("contracts/"));
if (contractsChanged) {
  const requiredPrefixes = [
    "docs/contracts/",
    "apps/",
    "fixtures/",
    "verification/",
    "packages/contracts-ts/",
  ];
  for (const prefix of requiredPrefixes) {
    if (![...changed].some((p) => p.startsWith(prefix))) {
      errors.push(`contracts changed but no ${prefix} changes in working tree`);
    }
  }
}

if (errors.length) fail("contract change bundle guard", errors);
ok("contract change bundle guard passed");
