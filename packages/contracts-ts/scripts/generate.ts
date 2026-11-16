import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../..");
const SCHEMA_DIR = path.join(ROOT, "contracts/schemas");
const OUT_DIR = path.join(__dirname, "../src/generated");

type JsonSchema = {
  $id?: string;
  title?: string;
  type?: string | string[];
  items?: JsonSchema;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  enum?: string[];
  minLength?: number;
  additionalProperties?: boolean;
  "x-version"?: string;
};

function toPascalCase(input: string): string {
  return input
    .replace(/\.schema\.json$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function zodForProperty(schema: JsonSchema): string {
  if (Array.isArray(schema.type)) {
    const types = schema.type.filter((t) => t !== "null");
    if (types.length !== 1) throw new Error("unsupported schema type union");
    return zodForProperty({ ...schema, type: types[0] }) + (schema.type.includes("null") ? ".nullable()" : "");
  }
  if (schema.enum?.length) return `z.enum([${schema.enum.map((v) => JSON.stringify(v)).join(", ")}])`;
  let result: string;
  if (schema.type === "string") {
    result = "z.string()";
    if (schema.minLength !== undefined) result += `.min(${schema.minLength})`;
    if (schema.maxLength !== undefined) result += `.max(${schema.maxLength})`;
    if (schema.pattern) result += `.regex(new RegExp(${JSON.stringify(schema.pattern)}))`;
    return result;
  }
  if (schema.type === "object") {
    if (!schema.properties) return "z.record(z.unknown())";
    const required = new Set(schema.required ?? []);
    const fields = Object.entries(schema.properties).map(([key, prop]) => `${JSON.stringify(key)}: ${zodForProperty(prop)}${required.has(key) ? "" : ".optional()"}`);
    return `z.object({${fields.join(", ")}})${schema.additionalProperties === false ? ".strict()" : ""}`;
  }
  if (schema.type === "array") {
    if (!schema.items) throw new Error("array items required");
    result = `z.array(${zodForProperty(schema.items)})`;
    if (schema.minItems !== undefined) result += `.min(${schema.minItems})`;
    if (schema.maxItems !== undefined) result += `.max(${schema.maxItems})`;
    return result;
  }
  if (schema.type === "number" || schema.type === "integer") {
    result = "z.number().finite()" + (schema.type === "integer" ? ".int().safe()" : "");
    if (schema.minimum !== undefined) result += `.min(${schema.minimum})`;
    if (schema.maximum !== undefined) result += `.max(${schema.maximum})`;
    return result;
  }
  if (schema.type === "boolean") return "z.boolean()";
  return "z.unknown()";
}

function generateFile(fileName: string, schema: JsonSchema): string {
  const baseName = fileName.replace(/\.schema\.json$/i, "");
  const typeName = schema.title || toPascalCase(baseName);
  const schemaConst = `${typeName[0]?.toLowerCase() ?? "x"}${typeName.slice(1)}Schema`;
  const properties = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const lines: string[] = [];

  lines.push('import { z } from "zod";');
  lines.push("");
  lines.push(`/** Generated from contracts/schemas/${fileName} */`);
  lines.push(`export const ${schemaConst} = z.object({`);

  for (const [key, prop] of Object.entries(properties)) {
    const zodExpr = zodForProperty(prop);
    const optional = required.has(key) ? "" : ".optional()";
    lines.push(`  ${key}: ${zodExpr}${optional},`);
  }

  lines.push(
    schema.additionalProperties === false
      ? "}).strict();"
      : "});",
  );
  lines.push("");
  lines.push(`export type ${typeName} = z.infer<typeof ${schemaConst}>;`);
  lines.push(`export const ${typeName}Version = ${JSON.stringify(schema["x-version"] ?? "0.0.0")};`);
  lines.push("");
  return lines.join("\n");
}

function main(): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const schemaFiles = fs
    .readdirSync(SCHEMA_DIR)
    .filter((name) => name.endsWith(".schema.json"))
    .sort();

  if (schemaFiles.length === 0) {
    throw new Error("no schema files found");
  }

  const exports: string[] = [];
  for (const fileName of schemaFiles) {
    const raw = fs.readFileSync(path.join(SCHEMA_DIR, fileName), "utf8");
    const schema = JSON.parse(raw) as JsonSchema;
    const outName = fileName.replace(/\.schema\.json$/i, "") + ".ts";
    fs.writeFileSync(path.join(OUT_DIR, outName), generateFile(fileName, schema), "utf8");
    exports.push(`export * from "./${outName.replace(/\.ts$/, ".js")}";`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "index.ts"),
    [
      "/** Auto-generated contract consumers. Do not edit by hand. */",
      ...exports,
      "",
    ].join("\n"),
    "utf8",
  );

  console.log(`generated ${schemaFiles.length} contract module(s)`);
}

main();
