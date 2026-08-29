import fs from "node:fs";
import { exists, fail, ok, rootPath } from "../lib/paths.js";

const REQUIRED_DIRS = [
  "apps",
  "contracts/schemas",
  "contracts/mappings",
  "contracts/semantic_policies",
  "contracts/versions",
  "packages/contracts-ts",
  "packages/cloudflare-adapters",
  "verification/validators",
  "verification/guards",
  "verification/replay",
  "verification/diff",
  "verification/auditors",
  "verification/reports",
  "fixtures/contract_cases",
  "fixtures/replay_cases",
  "fixtures/workflow_cases",
  "fixtures/snapshots",
  "tools/ci",
  "tools/local",
  "docs/architecture",
  "docs/contracts",
  "docs/operations",
  "docs/cookbook",
  ".agents/notes",
];

const REQUIRED_FILES = [
  "contracts/versions/manifest.json",
  "tsconfig.workers.json",
  "docker/docker-compose.yml",
  "docker/api.Dockerfile",
  ".github/workflows/verify.yml",
  "eslint.config.mjs",
  "tools/local/verify_quick.sh",
  "tools/ci/verify_all.sh",
  "packages/contracts-ts/src/generated/index.ts",
  "packages/cloudflare-adapters/src/index.ts",
  ".env.example",
  "apps/api/.dev.vars.example",
  "apps/web/.dev.vars.example",
  "AGENTS.md",
  "CLAUDE.md",
  "docs/cookbook/新增服务.md",
  ".agents/notes/README.md",
  ".agents/notes/TEMPLATE.md",
];

const missing: string[] = [];
for (const rel of REQUIRED_DIRS) {
  const p = rootPath(rel);
  if (!fs.existsSync(p) || !fs.statSync(p).isDirectory()) missing.push(rel);
}
for (const rel of REQUIRED_FILES) {
  if (!exists(rel)) missing.push(rel);
}

if (missing.length) fail("structure guard", missing);
ok("structure guard passed");
