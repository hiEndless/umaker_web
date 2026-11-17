import assert from "node:assert/strict";
import { retainSnapshots, oldSnapshot } from "../../apps/web/components/market/snapshot-retention.js";
import { GET } from "../../apps/web/app/api/market/route.js";
import { refreshDelay } from "../../apps/web/components/market/refresh-schedule.js";
import fs from "node:fs";
import { HttpMarketReader, marketConfig } from "../../apps/web/src/infrastructure/market_reader.js";
import { readMarket } from "../../apps/web/src/application/read_market.js";
import { parseWorkspace, signedFraction, usable, type BoardRequest } from "../../apps/web/src/domain/market/model.js";
import { validateSchema, type JsonSchema } from "../lib/schema.js";
const NOW = 1794800040000; const ASOF = Math.floor((NOW - 1000) / 60000) * 60000;
const config = { baseUrl: "https://api.example.invalid", token: "test-only-read-token-not-a-real-secret" };
const base = { schema_version: "1.0.0", as_of_ms: ASOF, available_at_ms: NOW - 1000, expires_at_ms: ASOF + 120000, limit: 20 };
function source(path: string): Record<string, unknown> {
  if (path === "quotes") return JSON.parse(fs.readFileSync("fixtures/upstream/market_quotes.json","utf8")) as Record<string, unknown>;
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
assert.equal(calls,16); assert(peak<=4); assert.equal(value.boards.length,16);
assert(value.boards.every((b)=>b.status==="ready")); assert.equal(value.pool_size,2);
assert.equal(value.boards.find((b)=>b.view==="returns" && b.window==="24h" && b.direction==="gainers")?.entries.length,2,"negative return in gainers is preserved");
// Browser-only retention preserves original facts, including expired timestamps.
const later=NOW+200000;
const failure={...value,generated_at_ms:later,boards:value.boards.map(b=>({...b,status:"unavailable" as const,reason:"upstream_unavailable" as const,as_of_ms:null,available_at_ms:null,expires_at_ms:null,entries:[]}))};
const held=retainSnapshots(value,failure,later);
assert.deepEqual(held.boards,value.boards);
assert(oldSnapshot(held.boards[0],later));assert(!usable(held.boards[0],later));
assert.deepEqual(retainSnapshots(null,failure,later),failure);
const mixed={...failure,boards:failure.boards.map((b,i)=>i?b:{...value.boards[0],as_of_ms:later-1000,available_at_ms:later,expires_at_ms:later+60000,entries:[]})};
const partial=retainSnapshots(value,mixed,later);
assert.equal(partial.boards[0].entries.length,0,"new successful empty result clears previous ranking");
assert.deepEqual(partial.boards[1],value.boards[1],"other failed boards keep their own snapshot");
assert.deepEqual(retainSnapshots(partial,value,later).boards[0],partial.boards[0],"older success cannot replace newer board");
assert.deepEqual(retainSnapshots(value,{...failure,boards:failure.boards.map(b=>({...b,status:"not_ready" as const}))},later).boards,value.boards);
assert.deepEqual(retainSnapshots(held,{...value,boards:mixed.boards.map((b,i)=>({...value.boards[i],as_of_ms:later-1000,available_at_ms:later,expires_at_ms:later+60000}))},later).boards[0].available_at_ms,later);
// A production snapshot can arrive with only nine seconds left; do not wait thirty seconds.
const expiring = (remaining: number): typeof value => ({...value,boards:value.boards.map(b=>({...b,expires_at_ms:NOW+remaining}))});
assert.equal(refreshDelay(expiring(9000),NOW,false),5000);
assert.equal(refreshDelay(expiring(35000),NOW,false),25000);
assert.equal(refreshDelay(expiring(90000),NOW,false),30000);
assert.equal(refreshDelay(expiring(-1000),NOW,false),5000);
assert.equal(refreshDelay(expiring(90000),NOW,true),5000);
assert.equal(refreshDelay(null,NOW,true),5000);
assert.equal(refreshDelay({...expiring(90000),boards:value.boards.map((b,i)=>i?{...b,expires_at_ms:NOW+90000}:{...b,expires_at_ms:NOW+9000})},NOW,false),5000);
assert.equal(refreshDelay({...expiring(90000),boards:value.boards.map(b=>({...b,status:"stale",reason:"expired",entries:[]}))},NOW,false),5000);
assert.equal(value.quotes?.[0].last_price,"0.0000123");
assert.equal(value.quotes?.[0].quote_volume_24h,"12345678.9");
assert.equal(value.quotes?.[1].quote_volume_24h,"0");
const missingQuotes=await readMarket(new HttpMarketReader(config,async(input)=>String(input).endsWith("/quotes")?new Response(null,{status:404}):fetcher(input,{headers:{Authorization:`Bearer ${config.token}`},redirect:"manual",cache:"no-store"}),()=>NOW),()=>NOW);
assert.equal(missingQuotes.quotes,undefined);assert(missingQuotes.boards.every(b=>b.status==="ready"));
for (const edit of [
 (p:Record<string,unknown>)=>{p.market_type="spot";},
 (p:Record<string,unknown>)=>{p.expires_at_ms=NOW-1;},
 (p:Record<string,unknown>)=>{p.entries=[{...(p.entries as Record<string,unknown>[])[0],last_price:"0"}];},
 (p:Record<string,unknown>)=>{p.entries=[{...(p.entries as Record<string,unknown>[])[0],quote_volume_24h:"-1"}];},
 (p:Record<string,unknown>)=>{p.entries=[{...(p.entries as Record<string,unknown>[])[0],price_at_ms:NOW+10000}];},
]) {
 const p=source("quotes");edit(p);
 const reader=new HttpMarketReader(config,async()=>Response.json({schema_version:"0.1.0",generated_at_ms:NOW,data:p}),()=>NOW);
 assert.equal(await reader.quotes(),undefined);
}
assert.throws(()=>parseWorkspace({...value,quotes:[{...value.quotes![0],last_price:"0"}]}));
assert.throws(()=>parseWorkspace({...value,quotes:[value.quotes![0],value.quotes![0]]}));
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
// The 24h candidate source may contain 20 ranks per direction; the workspace exposes top 10.
const twenty = Array.from({length:20}, (_,i)=>({symbol:`T${i}USDT`,return_24h:String((20-i)/100),rank_gainers:i+1,rank_losers:20-i}));
const expanded = new HttpMarketReader(config, async()=>Response.json({schema_version:"0.1.0",generated_at_ms:NOW,data:{...base,scope:"full",eligible_count:20,expected_count:20,entries:twenty}}),()=>NOW);
for (const direction of ["gainers","losers"] as const) {
 const board = await expanded.board({view:"returns",window:"24h",direction});
 assert.equal(board.status,"ready"); assert.equal(board.entries.length,10);
 assert.deepEqual(board.entries.map(e=>e.rank),Array.from({length:10},(_,i)=>i+1));
 assert.equal(board.entries[0].symbol,direction==="gainers"?"T0USDT":"T19USDT");
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
// Exercise the actual BFF cache: a nine-second snapshot must not be replayed from cache.
const savedFetch=globalThis.fetch, savedNow=Date.now;
const savedBase=process.env.UMAKER_API_BASE_URL, savedToken=process.env.UMAKER_API_TOKEN;
try {
 process.env.UMAKER_API_BASE_URL=config.baseUrl; process.env.UMAKER_API_TOKEN=config.token;
 Date.now=()=>NOW;
 let requests=0;
 globalThis.fetch=async(input)=>{
  requests++;const d=source(String(input).split("/api/v1/market/")[1]);
  if (Array.isArray(d.entries)) d.entries=d.entries.map((entry:Record<string,unknown>)=>({...entry,price_at_ms:NOW-51000}));
  return Response.json({schema_version:"0.1.0",generated_at_ms:NOW,data:d});
 };
 assert.equal((await GET(new Request("https://web.example.invalid/api/market/"))).status,200);
 assert.equal((await GET(new Request("https://web.example.invalid/api/market/"))).status,200);
 assert.equal(requests,32,"near-expiry responses must not suppress source refresh");
 // With ample validity the same endpoint still coalesces reads in its bounded cache.
 process.env.UMAKER_API_TOKEN=config.token+"-fresh";
 requests=0;
 globalThis.fetch=async(input)=>{requests++;return Response.json({schema_version:"0.1.0",generated_at_ms:NOW,data:source(String(input).split("/api/v1/market/")[1])});};
 const legacyResponse=await GET(new Request("https://web.example.invalid/api/market/"));assert.equal((await legacyResponse.json() as Record<string,unknown>).quotes,undefined);
 const quoteResponse=await GET(new Request("https://web.example.invalid/api/market/?include_quotes=1"));
 assert.equal((await quoteResponse.json() as {quotes:unknown[]}).quotes.length,2);
 assert.equal(requests,16);
} finally {
 globalThis.fetch=savedFetch;Date.now=savedNow;
 if(savedBase===undefined)delete process.env.UMAKER_API_BASE_URL;else process.env.UMAKER_API_BASE_URL=savedBase;
 if(savedToken===undefined)delete process.env.UMAKER_API_TOKEN;else process.env.UMAKER_API_TOKEN=savedToken;
}
console.log("market workspace production output/schema, 16-call/4-concurrency, units, Unicode, source failure, TTL and configuration tests PASS");

}
void main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
