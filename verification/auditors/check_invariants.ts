import { fail, ok, readJson, readText } from "../lib/paths.js";

type Schema = {
  properties?: {
    status?: { enum?: string[] };
    reason_code?: { enum?: string[] };
  };
};

const errors: string[] = [];
const schema = readJson<Schema>("contracts/schemas/umaker_web_event.schema.json");
const policy = readText("apps/api/src/domain/policies.ts");
const generated = readText(
  "packages/contracts-ts/src/generated/umaker_web_event.ts",
);

for (const status of schema.properties?.status?.enum ?? []) {
  if (!policy.includes(`"${status}"`)) {
    errors.push(`policy missing status ${status}`);
  }
  if (!generated.includes(`"${status}"`)) {
    errors.push(`contracts-ts missing status ${status}`);
  }
}
for (const code of schema.properties?.reason_code?.enum ?? []) {
  if (!policy.includes(`"${code}"`)) {
    errors.push(`policy missing reason_code ${code}`);
  }
  if (!generated.includes(`"${code}"`)) {
    errors.push(`contracts-ts missing reason_code ${code}`);
  }
}

if (errors.length) fail("invariants audit", errors);
ok("invariants audit passed");
