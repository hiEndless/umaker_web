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
  type?: string;
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
  if (schema.enum && schema.enum.length > 0) {
    const values = schema.enum.map((v) => JSON.stringify(v)).join(", ");
    return `z.enum([${values}])`;
  }
  if (schema.type === "string") {
    return schema.minLength && schema.minLength > 0
      ? `z.string().min(${schema.minLength})`
      : "z.string()";
  }
  if (schema.type === "object") {
    return "z.record(z.unknown())";
  }
  if (schema.type === "number" || schema.type === "integer") {
    return "z.number()";
  }
  if (schema.type === "boolean") {
    return "z.boolean()";
  }
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
