import { spawnSync } from "node:child_process";
import { ok, rootPath } from "../lib/paths.js";

const result = spawnSync(
  "pnpm",
  ["--filter", "@umaker/api", "exec", "tsx", "test/replay-once.ts"],
  { cwd: rootPath(), stdio: "inherit", shell: process.platform === "win32" },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
ok("replay runner passed");
