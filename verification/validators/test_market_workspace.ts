import assert from "node:assert/strict";
import fs from "node:fs";
import { HttpMarketReader, marketConfig } from "../../apps/web/src/infrastructure/market_reader.js";
import { readMarket } from "../../apps/web/src/application/read_market.js";
import { parseWorkspace, signedFraction, usable, type BoardRequest } from "../../apps/web/src/domain/market/model.js";
import { validateSchema, type JsonSchema } from "../lib/schema.js";
const NOW = 1794800040000; const ASOF = Math.floor((NOW - 1000) / 60000) * 60000;
const config = { baseUrl: "https://api.example.invalid", token: "test-only-read-token-not-a-real-secret" };
const base = { schema_version: "1.0.0", as_of_ms: ASOF, available_at_ms: NOW - 1000, expires_at_ms: ASOF + 120000, limit: 20 };
function source(path: string): Record<string, unknown> {
  if (path === "candidates") return { ...base, scope: "full", eligible_count: 2, expected_count: 2, entries: [{ symbol: "OUSDT", return_24h: "0.02", rank_gainers: 1, rank_losers: 2 }, { symbol: "牛来USDT", return_24h: "-0.01", rank_gainers: 2, rank_losers: 1 }] };
  const url = new URL(`https://x/${path}`); const view = path.startsWith("momentum") ? "momentum" : "returns";
  const direction = url.searchParams.get("direction"); const up = direction === "gainers" || direction === "increasing";
  const entries = view === "returns" ? (up ? [["OUSDT", "0.02"], ["牛来USDT", "-0.01"]] : [["牛来USDT", "-0.01"], ["OUSDT", "0.02"]]).map(([symbol,value],i) => ({ symbol, rank: i+1, return: value, price_at_ms: NOW-1000 })) : [{ symbol: up ? "OUSDT" : "牛来USDT", rank: 1, momentum_change: up ? "0.005" : "-0.006", recent_return: up ? "0.02" : "-0.01", previous_return: up ? "0.015" : "-0.004", price_at_ms: NOW-1000 }];
  return { ...base, scope: "candidate_pool", window: url.searchParams.get("window"), direction, candidate_symbols: ["OUSDT", "牛来USDT"], eligible_count: 2, insufficient_count: 0, status: "ready", entries };
}
async function main(): Promise<void> {
let calls = 0; let active = 0; let peak = 0;
const fetcher: typeof fetch = async (input, options) => {
  assert.equal(new Headers(options?.headers).get("Authorization"), `Bearer ${config.token}`);
  assert.equal(options?.redirect,"manual"); assert.equal(options?.cache,"no-store");
  calls++; active++; peak=Math.max(peak,active);
  await new Promise((r)=>setTimeout(r,1)); active--;
  const path=String(input).split("/api/v1/market/")[1];
  return Response.json({ schema_version: "0.1.0", generated_at_ms: NOW, data: source(path) });
};
const value = await readMarket(new HttpMarketReader(config, fetcher, () => NOW), () => NOW);
assert.equal(calls,15); assert(peak<=4); assert.equal(value.boards.length,16);
assert(value.boards.every((b)=>b.status==="ready")); assert.equal(value.pool_size,2);
assert.equal(value.boards.find((b)=>b.view==="returns" && b.window==="24h" && b.direction==="gainers")?.entries.length,2,"negative return in gainers is preserved");
assert.equal(signedFraction("0.005"),"+0.50"); assert.equal(signedFraction("-0.01"),"-1.00");
const schema = JSON.parse(fs.readFileSync("contracts/schemas/market_workspace.schema.json","utf8")) as JsonSchema;
assert.deepEqual(validateSchema(value,schema),[]); assert.deepEqual(parseWorkspace(value),value);
if(process.argv.includes("--write-fixture")) fs.writeFileSync("fixtures/contract_cases/market_workspace_valid.json",JSON.stringify(value,null,2)+"\n");
else assert.deepEqual(value,JSON.parse(fs.readFileSync("fixtures/contract_cases/market_workspace_valid.json","utf8")));
const req: BoardRequest={view:"returns",window:"15m",direction:"gainers"};
async function altered(edit: (v: Record<string, unknown>)=>void): Promise<Awaited<ReturnType<HttpMarketReader["board"]>>> {
  const f: typeof fetch=async(input)=>{const d=source(String(input).split("/api/v1/market/")[1]);edit(d);return Response.json({schema_version:"0.1.0",generated_at_ms:NOW,data:d});};
  return new HttpMarketReader(config,f,()=>NOW).board(req);
}
assert.equal((await altered(d=>{d.eligible_count=0;d.insufficient_count=2;d.entries=[];d.status="not_ready";})).status,"not_ready");
assert.equal((await altered(d=>{d.available_at_ms=NOW-200000;d.expires_at_ms=NOW-100000;d.as_of_ms=NOW-210000;d.entries=[];})).status,"stale");
for (const edit of [
  (d: Record<string,unknown>)=>{d.window="4h";},
  (d: Record<string,unknown>)=>{d.entries=[{symbol:"../BADUSDT",rank:1,return:"0.1",price_at_ms:NOW-1000}];},
  (d: Record<string,unknown>)=>{d.entries=[{symbol:"OUSDT",rank:1,return:"NaN",price_at_ms:NOW-1000}];},
  (d: Record<string,unknown>)=>{d.available_at_ms=NOW+2000;},
]) {const b=await altered(edit);assert.equal(b.status,"unavailable");assert.equal(b.entries.length,0);}
const unavailable=await new HttpMarketReader(config,async()=>new Response("private upstream detail",{status:401}),()=>NOW).board(req);
assert.equal(unavailable.reason,"upstream_unavailable");assert(!JSON.stringify(unavailable).includes("private"));
const redirected=await new HttpMarketReader(config,async()=>new Response(null,{status:302,headers:{location:"https://other.example"}}),()=>NOW).board(req);
assert.equal(redirected.reason,"upstream_unavailable");
const huge=await new HttpMarketReader(config,async()=>new Response("oversized",{headers:{"content-length":"700000"}}),()=>NOW).board(req);
assert.equal(huge.reason,"invalid_payload");
assert.equal(marketConfig({}),null);
for(const url of ["http://outside.example","https://user:password@example.com","https://x/?token=secret"]){assert.throws(()=>marketConfig({UMAKER_API_BASE_URL:url,UMAKER_API_TOKEN:config.token}));}
assert.throws(()=>marketConfig({UMAKER_API_BASE_URL:"https://x",UMAKER_API_TOKEN:config.token+"\n"}));
assert(marketConfig({UMAKER_API_BASE_URL:"http://127.0.0.1:8092",UMAKER_API_TOKEN:config.token}));
assert(!usable(value.boards[0],NOW+200000));
for (const broken of [ {...value,boards:value.boards.slice(1)}, {...value,scope:"full"}, {...value,boards:value.boards.map((b,i)=>i?b:{...b,entries:[{symbol:"OUSDT",rank:11,value:"1"}]})}, {...value,boards:value.boards.map((b,i)=>i?b:{...b,status:"stale"})} ]) {
 assert.throws(()=>parseWorkspace(broken));
}
console.log("market workspace production output/schema, 15-call/4-concurrency, units, Unicode, source failure, TTL and configuration tests PASS");

}
void main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
