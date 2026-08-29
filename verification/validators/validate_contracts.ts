import fs from "node:fs";
import { fail, listFiles, ok, readJson, rootPath } from "../lib/paths.js";

type Schema = {
  properties?: Record<string, unknown>;
  "x-version"?: string;
};

type Mapping = {
  schema: string;
  version: string;
  field_mappings: Array<{ from: string; to: string }>;
};

type Manifest = {
  contracts: Array<{
    schema: string;
    mapping: string;
    version: string;
    tier?: string;
  }>;
};

const errors: string[] = [];
const schemas: Record<string, Schema> = {};
for (const name of listFiles("contracts/schemas", ".json")) {
  schemas[name] = readJson<Schema>(`contracts/schemas/${name}`);
}
if (!Object.keys(schemas).length) errors.push("no schema found");

const mappings: Record<string, Mapping> = {};
for (const name of listFiles("contracts/mappings", ".json")) {
  const mapping = readJson<Mapping>(`contracts/mappings/${name}`);
  mappings[name] = mapping;
  if (!(mapping.schema in schemas)) {
    errors.push(`mapping ${name} points missing schema ${mapping.schema}`);
    continue;
  }
  const properties = new Set(Object.keys(schemas[mapping.schema]?.properties ?? {}));
  for (const item of mapping.field_mappings) {
    if (!properties.has(item.to)) {
      errors.push(`mapping ${name} has unknown target field ${item.to}`);
    }
  }
  if (mapping.version !== schemas[mapping.schema]?.["x-version"]) {
    errors.push(`version mismatch in ${name} and ${mapping.schema}`);
  }
}
if (!Object.keys(mappings).length) errors.push("no mapping found");

const manifest = readJson<Manifest>("contracts/versions/manifest.json");
if (!manifest.contracts?.length) errors.push("manifest has no contracts");
for (const entry of manifest.contracts ?? []) {
  if (!(entry.schema in schemas)) errors.push(`manifest missing schema ${entry.schema}`);
  if (!(entry.mapping in mappings)) errors.push(`manifest missing mapping ${entry.mapping}`);
  if (entry.version !== schemas[entry.schema]?.["x-version"]) {
    errors.push(`manifest version mismatch for ${entry.schema}`);
  }
  if (entry.tier && !["production", "example"].includes(entry.tier)) {
    errors.push(`manifest tier invalid for ${entry.schema}`);
  }
}

// ensure generated contracts-ts files exist for each schema
for (const schemaName of Object.keys(schemas)) {
  const stem = schemaName.replace(/\.schema\.json$/, "");
  const generated = rootPath(`packages/contracts-ts/src/generated/${stem}.ts`);
  if (!fs.existsSync(generated)) {
    errors.push(`missing generated contracts-ts module for ${schemaName}`);
  }
}

if (errors.length) fail("contract validation", errors);
ok("contract validation passed");
