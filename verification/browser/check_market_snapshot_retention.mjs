// Requires local Next dev server and a dedicated Chrome with --remote-debugging-port=9334.
// Run: node verification/browser/check_market_snapshot_retention.mjs
import fs from 'node:fs/promises';
import process from 'node:process';
const baseUrl = process.env.MARKET_TEST_BASE_URL ?? 'http://127.0.0.1:3000';
import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { URL } from 'node:url';
import console from 'node:console';
import { setTimeout as pause } from 'node:timers/promises';
const { fetch, WebSocket } = globalThis;
const pages = await (await fetch('http://127.0.0.1:9334/json')).json();
const ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let id = 0, requests = 0, inFlight = 0, peak = 0, mode = "initial";
const pending = new Map();
const fixture = JSON.parse(await fs.readFile(new URL('../../fixtures/contract_cases/market_workspace_valid.json', import.meta.url), 'utf8'));
function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params }));
  });
}
function snapshot() {
  const n = Date.now();
  const failed = b => ({ ...b, status: 'unavailable', reason: 'upstream_unavailable', as_of_ms: null, available_at_ms: null, expires_at_ms: null, entries: [] });
  return { ...fixture, generated_at_ms: n, quotes: mode === "failure" ? undefined : (fixture.quotes ?? []).map(q => ({ ...q, price_at_ms: n - 1000, available_at_ms: n - 500, expires_at_ms: n + (mode === "initial" ? 3000 : 59000) })), boards: fixture.boards.map(b => {
    if (mode === 'failure' || mode === 'partial' && b.direction === 'losers' || mode === 'other-window-failure' && b.window === '5m') return failed(b);
    return { ...b, as_of_ms: n - 1000, available_at_ms: n - 500, expires_at_ms: n + (mode === 'initial' ? 3000 : 90000), entries: mode === 'empty' ? [] : b.entries.map(e => ({ ...e, value: mode === 'initial' ? '0.01' : '0.4' })) };
  }) };
}
ws.addEventListener('message', async event => {
  const m = JSON.parse(event.data);
  if (m.id) { const p = pending.get(m.id); pending.delete(m.id); if (m.error) p.reject(m.error); else p.resolve(m.result); }
  if (m.method === 'Fetch.requestPaused') {
    requests++; inFlight++; peak = Math.max(peak, inFlight);
    await pause(150);
    await call('Fetch.fulfillRequest', { requestId: m.params.requestId, responseCode: mode === 'failure' ? 503 : 200, responseHeaders: [{ name: 'content-type', value: 'application/json' }], body: Buffer.from(JSON.stringify(snapshot())).toString('base64') }).catch(error => { if (error.code !== -32602) throw error; });
    inFlight--;
  }
});
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function until(check, message, timeout = 18000) {
  const start = Date.now();
  while (Date.now() - start < timeout) { if (await check()) return; await pause(100); }
  throw new Error(message);
}
let preload;
try {
  await call('Page.enable'); await call('Runtime.enable');
  preload = await call('Page.addScriptToEvaluateOnNewDocument', { source: `window.__marketTestHidden=false;Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>window.__marketTestHidden?'hidden':'visible'});` });
  await call('Fetch.enable', { patterns: [{ urlPattern: '*/api/market/*', requestStage: 'Request' }] });
  const previousOrigin = await evaluate('performance.timeOrigin');
  await call('Page.navigate', { url: `${baseUrl}/market/?window=15m&symbol=OUSDT` });
  await until(() => evaluate(`performance.timeOrigin !== ${previousOrigin}`), 'navigation did not finish');
  await until(async () => requests > 0 && inFlight === 0 && await evaluate(`document.querySelector('table')?.innerText.includes('1.00')`), 'initial snapshot missing');
  assert.equal(await evaluate(`document.querySelector('table').innerText.includes('12.35M') && document.querySelector('aside').innerText.includes('0.0000123')`), true);
  console.log('PASS native last price and USDT turnover rendered without percent scaling');
  await pause(300); peak = 0;
  const first = requests;
  await evaluate(`window.__marketTestHidden=true;document.dispatchEvent(new Event('visibilitychange'));`);
  await pause(6500);
  assert.equal(requests, first, 'background page must not poll');
  assert.equal(await evaluate(`document.querySelector('table')?.querySelector('tbody tr') !== null && [...document.querySelectorAll('section[aria-label$="方向榜单"]')].some(s=>s.innerText.includes('旧快照'))`), true);
  assert.equal(await evaluate(`document.querySelector('aside').innerText.includes('1.00') && document.querySelector('aside').innerText.includes('旧快照')`), true);
  console.log('PASS hidden page does not poll; expiry retains table, detail and matrix as old snapshots');
  mode = 'failure';
  await evaluate(`window.__marketTestHidden=false;document.dispatchEvent(new Event('visibilitychange'));`);
  await until(() => requests > first, 'visible page did not refresh', 2000);
  await until(() => evaluate(`document.body.innerText.includes('更新暂未成功')`), '503 status missing');
  assert.equal(await evaluate(`document.querySelector('table').innerText.includes('1.00')`), true);
  console.log('PASS failed update retains the old ranking');
  mode = 'partial';
  const beforeFocus = requests;
  await evaluate(`window.dispatchEvent(new Event('focus'));window.dispatchEvent(new Event('focus'));document.dispatchEvent(new Event('visibilitychange'));`);
  await until(() => evaluate(`document.querySelector('table').innerText.includes('40.00')`), 'new successful board did not replace old snapshot');
  assert.equal(requests, beforeFocus + 1); assert.equal(peak, 1);
  assert.equal(await evaluate(`document.querySelectorAll('table')[1].innerText.includes('1.00') && document.querySelectorAll('section[aria-label$="方向榜单"]')[1].innerText.includes('旧快照')`), true);
  console.log('PASS partial failure preserves only failed boards; focus/visibility coalesce');
  mode = 'fresh';
  await evaluate(`window.dispatchEvent(new Event('focus'));`);
  await until(() => evaluate(`document.querySelectorAll('table')[1].innerText.includes('40.00') && ![...document.querySelectorAll('section[aria-label$="方向榜单"]')].some(s=>s.innerText.includes('旧快照'))`), 'recovery did not replace all old snapshots');
  assert.equal(await evaluate(`location.search.includes('window=15m')&&location.search.includes('symbol=OUSDT')`), true);
  mode = 'other-window-failure';
  const beforeOther = requests;
  await evaluate(`window.dispatchEvent(new Event('focus'));`);
  await until(() => requests > beforeOther && inFlight === 0, 'other-window response missing');await pause(200);
  assert.equal(await evaluate(`document.body.innerText.includes('更新暂未成功')`), false);
  await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='5m').click()`);
  await until(() => evaluate(`document.body.innerText.includes('更新暂未成功')`), 'failed window must explain its own status');
  await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='15m').click()`);
  await until(() => evaluate(`!document.body.innerText.includes('更新暂未成功')`), 'healthy window must not inherit unrelated failure');
  console.log('PASS only the selected failed window shows update failure');
  mode = 'empty';
  await evaluate(`window.dispatchEvent(new Event('focus'));`);
  await until(() => evaluate(`document.querySelector('table')?.querySelector('tbody tr') === null`), 'successful empty response must clear old ranking');
  console.log('PASS recovery replaces old snapshots, preserves selection and honors successful empty rankings');
} finally {
  if (preload) await call('Page.removeScriptToEvaluateOnNewDocument', { identifier: preload.identifier });
  await call('Fetch.disable'); ws.close();
}
