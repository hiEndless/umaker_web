// Dedicated local Chrome CDP :9334 and a local preview server; never visits production.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import process from 'node:process';
import console from 'node:console';
import { Buffer } from 'node:buffer';
import { setTimeout as pause } from 'node:timers/promises';
const { fetch, WebSocket, URL } = globalThis;
const base = process.env.MARKET_TEST_BASE_URL ?? 'http://127.0.0.1:3011';
const pages = await (await fetch('http://127.0.0.1:9334/json')).json();
const ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
const pending = new Map(), errors = [];
let id = 0;
function call(method, params = {}) { return new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); }); }
const fixture = JSON.parse(await fs.readFile(new URL('../../fixtures/contract_cases/market_workspace_valid.json', import.meta.url), 'utf8'));
function snapshot() {
 const n = Date.now(), symbols = ['OUSDT', '牛来USDT', ...Array.from({length:18}, (_, i) => `T${i}USDT`)];
 return { ...fixture, generated_at_ms:n, pool_size:20, quotes:fixture.quotes.map(q=>({...q,price_at_ms:n-1000,available_at_ms:n-500,expires_at_ms:n+59000})), boards:fixture.boards.map(b=>({...b,as_of_ms:n-1000,available_at_ms:n-500,expires_at_ms:n+120000,entries:(b.direction==='gainers'?symbols.slice(0,10):symbols.slice(10).reverse()).map((symbol,i)=>({symbol,rank:i+1,value:String(b.view==='momentum'?(b.direction==='gainers'?0.1-i*.001:-0.1+i*.001):(b.direction==='gainers'?.05-i*.01:-.08+i*.01))}))})) };
}
ws.addEventListener('message', async event => {
 const m=JSON.parse(event.data);
 if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p.reject(m.error);else p.resolve(m.result);}
 if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);
 if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.value??a.description??'').join(' '));
 if(m.method==='Fetch.requestPaused')await call('Fetch.fulfillRequest',{requestId:m.params.requestId,responseCode:200,responseHeaders:[{name:'content-type',value:'application/json'}],body:Buffer.from(JSON.stringify(snapshot())).toString('base64')}).catch(error=>{if(error.code!==-32602)throw error;});
});
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function until(expression,message,seconds=20){for(let i=0;i<seconds*5;i++){if(await evaluate(expression))return;await pause(200);}throw new Error(message);}
function check(value,message){assert(value,message);console.log('PASS '+message);}
try {
 await call('Page.enable');await call('Runtime.enable');await call('Page.bringToFront');
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
 await call('Fetch.enable',{patterns:[{urlPattern:'*/api/market/*',requestStage:'Request'}]});
 await call('Page.navigate',{url:`${base}/market/?window=15m&symbol=OUSDT`});
 await until(`document.querySelectorAll('[data-dashboard-table] tbody tr').length===20`,'dashboard did not load');
 check(await evaluate(`document.querySelectorAll('[data-dashboard-table]').length===2 && document.querySelectorAll('[data-dashboard-table] thead button').length===0`),'two reusable tables preserve authoritative ordering without client sort controls');
 check(await evaluate(`getComputedStyle(document.querySelector('[data-sidebar="menu-button"][data-active="true"]')).color==='rgb(33, 150, 243)'`),'UMaker blue accent applied');
 await evaluate(`window.__rankButton=document.querySelector('[aria-label="查看 OUSDT"]');window.__rankButton.focus()`);await pause(1300);
 check(await evaluate(`document.activeElement===window.__rankButton && window.__rankButton.isConnected`),'clock updates preserve row DOM and keyboard focus');
 await evaluate(`document.querySelector('input[aria-label="搜索交易对"]').focus();const e=document.querySelector('input[aria-label="搜索交易对"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,'T5');e.dispatchEvent(new Event('input',{bubbles:true}));`);
 await until(`document.querySelectorAll('[data-dashboard-table] tbody tr').length===1`,'search not applied');
 check(await evaluate(`document.querySelector('[data-dashboard-table] tbody tr').innerText.includes('08')`),'search preserves original rank');
 await evaluate(`document.querySelector('[aria-label="重置视图"]').click()`);await until(`document.querySelectorAll('[data-dashboard-table] tbody tr').length===20`,'reset did not restore rows');
 await evaluate(`document.querySelector('[aria-label="展开或收起导航"]').click()`);await pause(300);
 check(await evaluate(`document.querySelector('[data-slot="sidebar"][data-state="collapsed"]')!==null`),'desktop sidebar collapses');
 await evaluate(`document.querySelector('[aria-label="展开或收起导航"]').click()`);await pause(300);
 await evaluate(`document.querySelector('[data-sidebar="menu-button"][href*="momentum"]').click()`);
 await until(`location.search.includes('view=momentum')&&document.body.innerText.includes('动量增强')`,'momentum navigation failed');
 check(await evaluate(`!location.pathname.includes('/auth') && !document.body.innerText.includes('登录')`),'working navigation without login flow');
 await evaluate(`document.querySelector('[data-sidebar="menu-button"][href*="returns"]').click()`);await until(`location.search.includes('view=returns') && document.querySelector('[aria-label="榜单类型"] button[aria-pressed="true"]').textContent.includes('收益榜')`,'returns navigation failed');
 await fs.writeFile('/tmp/umaker-dashboard-desktop.png',Buffer.from((await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true})).data,'base64'));
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await pause(500);
 check(await evaluate(`document.documentElement.scrollWidth<=390`),'mobile has no page overflow');
 await evaluate(`document.querySelector('[aria-label="展开或收起导航"]').click()`);await until(`document.querySelector('[role="dialog"]')!==null`,'mobile menu missing');
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape'});await pause(300);
 check(await evaluate(`document.querySelector('[role="dialog"]')===null`),'mobile navigation supports Escape');
 await evaluate(`document.querySelector('[aria-label="查看 OUSDT"]').click()`);await pause(300);
 check(await evaluate(`location.search.includes('symbol=OUSDT') && document.querySelector('aside').getBoundingClientRect().top<65 && document.querySelector('aside').innerText.includes('0.0000123')`),'mobile row selection opens correct detail and price');
 await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);await pause(200);
 await fs.writeFile('/tmp/umaker-dashboard-mobile.png',Buffer.from((await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true})).data,'base64'));
 await call('Fetch.disable');
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:`${base}/`});
 await until(`document.querySelector('h1')!==null && document.querySelector('canvas')!==null`,'homepage did not render after dependency upgrade');
 check(await evaluate(`!document.querySelector('[data-slot="sidebar-wrapper"]') && document.querySelector('h1').innerText.length>0`),'homepage renders independently after React/Next upgrade');
 check(errors.length===0,'no runtime or React errors: '+errors.join('; '));
} finally { await call('Fetch.disable');ws.close(); }
