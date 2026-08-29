import { fail, ok, readJson } from "../lib/paths.js";

const replayCase = readJson<{ expected: Record<string, unknown> }>(
  "fixtures/replay_cases/umaker_web_event_case.json",
);
const actual = readJson<Record<string, unknown>>(
  "verification/reports/latest_output.json",
);

const errors: string[] = [];
for (const [key, value] of Object.entries(replayCase.expected)) {
  if (actual[key] !== value) {
    errors.push(`field ${key}: expected ${JSON.stringify(value)} got ${JSON.stringify(actual[key])}`);
  }
}

if (errors.length) fail("replay compare", errors);
ok("replay compare passed");
