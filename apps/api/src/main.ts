import { createServer } from "node:http";
import { handleEvent, lookupEvent } from "./api/handlers.js";
import { InMemoryUmakerWebEventRepository } from "./infrastructure/repositories/in_memory_event_repository.js";

const repository = new InMemoryUmakerWebEventRepository();
const port = Number(process.env.PORT ?? 3000);

const cors = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function send(res: import("node:http").ServerResponse, status: number, body: unknown) {
  res.writeHead(status, cors);
  res.end(JSON.stringify(body));
}

async function readJson(req: import("node:http").IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = createServer((req, res) => {
  void (async () => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    if (req.method === "OPTIONS") {
      send(res, 204, { ok: true });
      return;
    }

    if (req.method === "GET" && url.pathname === "/health") {
      send(res, 200, { status: "ok", runtime: "node" });
      return;
    }

    const eventMatch = url.pathname.match(/^\/events\/([^/]+)$/);
    if (req.method === "GET" && eventMatch?.[1]) {
      const found = await lookupEvent(eventMatch[1], repository);
      if (!found) {
        send(res, 404, { error: "not found" });
        return;
      }
      send(res, 200, found);
      return;
    }

    if (req.method === "POST" && url.pathname === "/events") {
      let body: unknown;
      try {
        body = await readJson(req);
      } catch {
        send(res, 400, { error: "invalid json" });
        return;
      }
      try {
        send(res, 200, await handleEvent(body, repository));
      } catch (err) {
        const message = err instanceof Error ? err.message : "unknown error";
        send(res, 422, { error: message });
      }
      return;
    }

    send(res, 404, { error: "not found" });
  })().catch((err: unknown) => {
    const message = err instanceof Error ? err.message : "unknown error";
    send(res, 500, { error: message });
  });
});

server.listen(port, () => {
  console.log(`api listening on ${port}`);
});
