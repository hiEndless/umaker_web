import { fail, ok, readJson } from "../lib/paths.js";

const output = readJson<Record<string, unknown>>(
  "verification/reports/latest_output.json",
);
const snapshot = readJson<Record<string, unknown>>(
  "fixtures/snapshots/umaker_web_event_snapshot.json",
);

const errors: string[] = [];
for (const key of Object.keys(snapshot)) {
  if (output[key] !== snapshot[key]) {
    errors.push(
      `${key}: snapshot ${JSON.stringify(snapshot[key])} != output ${JSON.stringify(output[key])}`,
    );
  }
}

if (errors.length) fail("output diff", errors);
ok("output diff passed");
