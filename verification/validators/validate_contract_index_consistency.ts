import { fail, ok, readJson, readText } from "../lib/paths.js";

type Manifest = {
  contracts: Array<{
    schema: string;
    mapping: string;
    version: string;
    compatibility_window: string;
    tier?: string;
  }>;
};

const errors: string[] = [];
const manifest = readJson<Manifest>("contracts/versions/manifest.json");
const index = readText("docs/contracts/契约索引.md");

for (const entry of manifest.contracts) {
  for (const token of [
    entry.schema,
    entry.mapping,
    entry.version,
    entry.compatibility_window,
    entry.tier ?? "",
  ]) {
    if (token && !index.includes(token)) {
      errors.push(`契约索引.md missing ${token}`);
    }
  }
}

if (errors.length) fail("contract index consistency", errors);
ok("contract index consistency passed");
