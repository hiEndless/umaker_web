import { fail, ok, readJson, readText } from "../lib/paths.js";

type Manifest = {
  contracts: Array<{
    schema: string;
    compatibility_window: string;
  }>;
};

const errors: string[] = [];
const manifest = readJson<Manifest>("contracts/versions/manifest.json");
const windowsText = readText("docs/operations/compatibility_windows.yaml");

for (const entry of manifest.contracts) {
  if (!windowsText.includes(entry.schema)) {
    errors.push(`compatibility_windows.yaml missing schema ${entry.schema}`);
  }
  if (!windowsText.includes(entry.compatibility_window)) {
    errors.push(
      `compatibility_windows.yaml missing window ${entry.compatibility_window} for ${entry.schema}`,
    );
  }
}

if (errors.length) fail("compatibility window guard", errors);
ok("compatibility window guard passed");
