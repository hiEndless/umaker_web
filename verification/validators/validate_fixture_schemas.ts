import { fail, listFiles, ok, readJson } from "../lib/paths.js";

type Schema = {
  type?: string;
  properties?: Record<string, Schema & { enum?: string[]; minLength?: number }>;
  required?: string[];
  additionalProperties?: boolean;
};

function validate(value: unknown, schema: Schema, path = "$"): string[] {
  const errors: string[] = [];
  if (schema.type === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return [`${path} must be object`];
    }
    const obj = value as Record<string, unknown>;
    for (const key of schema.required ?? []) {
      if (!(key in obj)) errors.push(`${path}.${key} is required`);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(obj)) {
        if (!(key in (schema.properties ?? {}))) {
          errors.push(`${path}.${key} is not allowed`);
        }
      }
    }
    for (const [key, prop] of Object.entries(schema.properties ?? {})) {
      if (!(key in obj)) continue;
      const child = obj[key];
      if (prop.enum && typeof child === "string" && !prop.enum.includes(child)) {
        errors.push(`${path}.${key} must be one of ${prop.enum.join(",")}`);
      }
      if (prop.type === "string") {
        if (typeof child !== "string") errors.push(`${path}.${key} must be string`);
        else if (prop.minLength && child.length < prop.minLength) {
          errors.push(`${path}.${key} minLength ${prop.minLength}`);
        }
      }
      if (prop.type === "object" && (typeof child !== "object" || child === null)) {
        errors.push(`${path}.${key} must be object`);
      }
    }
  }
  return errors;
}

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
  errors.push(...validate(data, schema, caseName));
}

if (errors.length) fail("fixture schema validation", errors);
ok("fixture schema validation passed");
