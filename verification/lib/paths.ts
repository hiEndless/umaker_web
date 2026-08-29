import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function rootPath(...parts: string[]): string {
  return path.join(ROOT, ...parts);
}

export function readText(rel: string): string {
  return fs.readFileSync(rootPath(rel), "utf8");
}

export function readJson<T>(rel: string): T {
  return JSON.parse(readText(rel)) as T;
}

export function exists(rel: string): boolean {
  return fs.existsSync(rootPath(rel));
}

export function listFiles(rel: string, suffix = ""): string[] {
  const dir = rootPath(rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => (suffix ? name.endsWith(suffix) : true))
    .sort();
}

export function fail(title: string, errors: string[]): never {
  console.error(`${title} failed`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

export function ok(message: string): void {
  console.log(message);
}
