"use client";

import { useEffect } from "react";

const LA_ID = "3R4YyID5yPzEKYTO";
const GTM_ID = "GTM-N5H6CNTJ";
const IDLE_TIMEOUT_MS = 4000;

declare global {
  interface Window {
    LA?: {
      init: (config: { id: string; ck: string }) => void;
    };
  }
}

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;

    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function loadAnalytics() {
  if (LA_ID) {
    void loadScript("https://sdk.51.la/js-sdk-pro.min.js", "la-collect")
      .then(() => window.LA?.init({ id: LA_ID, ck: LA_ID }))
      .catch(() => {});
  }

  if (!GTM_ID || document.getElementById("gtm-script")) return;

  const gtmScript = document.createElement("script");
  gtmScript.id = "gtm-script";
  gtmScript.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.head.appendChild(gtmScript);
}

function scheduleIdle(callback: () => void) {
  if (window.requestIdleCallback) {
    const id = window.requestIdleCallback(callback, { timeout: IDLE_TIMEOUT_MS });
    return () => window.cancelIdleCallback?.(id);
  }

  const timer = window.setTimeout(callback, IDLE_TIMEOUT_MS);
  return () => window.clearTimeout(timer);
}

export function AnalyticsScripts() {
  useEffect(() => {
    if (!LA_ID && !GTM_ID) return;

    let loaded = false;
    let cancelIdle: (() => void) | undefined;
    const run = () => {
      if (loaded) return;
      loaded = true;
      cancelIdle?.();
      loadAnalytics();
    };

    cancelIdle = scheduleIdle(run);
    window.addEventListener("pointerdown", run, { once: true, passive: true });
    window.addEventListener("keydown", run, { once: true });
    window.addEventListener("scroll", run, { once: true, passive: true });

    return () => {
      cancelIdle?.();
      window.removeEventListener("pointerdown", run);
      window.removeEventListener("keydown", run);
      window.removeEventListener("scroll", run);
    };
  }, []);

  if (!GTM_ID) return null;

  return <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />;
}
