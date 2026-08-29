import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleEvent } from "../src/api/handlers.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const caseFile = path.join(root, "fixtures/replay_cases/umaker_web_event_case.json");
const outFile = path.join(root, "verification/reports/latest_output.json");

const replayCase = JSON.parse(fs.readFileSync(caseFile, "utf8")) as {
  input: unknown;
};

const result = await handleEvent(replayCase.input);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf8");
console.log("report generated");
