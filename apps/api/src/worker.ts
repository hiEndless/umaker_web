import { KVAdapter } from "@umaker/cloudflare-adapters";
import { handleEvent, jsonResponse, lookupEvent } from "./api/handlers.js";
import { KvUmakerWebEventRepository } from "./infrastructure/cloudflare/kv_event_repository.js";

export interface Env {
  KV: KVNamespace;
}

function repositoryFrom(env: Env) {
  return new KvUmakerWebEventRepository(new KVAdapter(env.KV));
}

const worker: ExportedHandler<Env> = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return jsonResponse({ ok: true });
    }

    const url = new URL(request.url);
    const repository = repositoryFrom(env);

    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({ status: "ok", runtime: "workers" });
    }

    const eventMatch = url.pathname.match(/^\/events\/([^/]+)$/);
    if (request.method === "GET" && eventMatch?.[1]) {
      const found = await lookupEvent(eventMatch[1], repository);
      if (!found) return jsonResponse({ error: "not found" }, 404);
      return jsonResponse(found);
    }

    if (request.method === "POST" && url.pathname === "/events") {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ error: "invalid json" }, 400);
      }

      try {
        const result = await handleEvent(body, repository);
        return jsonResponse(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "unknown error";
        return jsonResponse({ error: message }, 422);
      }
    }

    return jsonResponse({ error: "not found" }, 404);
  },
};

export default worker;
