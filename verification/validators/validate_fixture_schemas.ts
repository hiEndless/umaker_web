import { fail, listFiles, ok, readJson } from "../lib/paths.js";

import { validateSchema, type JsonSchema as Schema } from "../lib/schema.js";

const errors: string[] = [];
const schemas = Object.fromEntries(
  listFiles("contracts/schemas", ".json").map((name) => [
    name,
    readJson<Schema>(`contracts/schemas/${name}`),
  ]),
);

for (const caseName of listFiles("fixtures/contract_cases", ".json")) {
  const stem = caseName.replace(/_valid\.json$/, "").replace(/\.json$/, "");
  const schemaName = `${stem}.schema.json`;
  const schema = schemas[schemaName];
  if (!schema) {
    errors.push(`no schema for fixture ${caseName}`);
    continue;
  }
  const data = readJson<unknown>(`fixtures/contract_cases/${caseName}`);
  errors.push(...validateSchema(data, schema, caseName));
}

if (errors.length) fail("fixture schema validation", errors);
ok("fixture schema validation passed");
