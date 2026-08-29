import type { IKVAdapter } from "@umaker/cloudflare-adapters";
import type { ProcessedUmakerWebEvent } from "../../domain/models.js";
import type { UmakerWebEventRepository } from "../../domain/repositories.js";

export class KvUmakerWebEventRepository implements UmakerWebEventRepository {
  constructor(private readonly kv: IKVAdapter) {}

  async saveProcessed(event: ProcessedUmakerWebEvent): Promise<void> {
    await this.kv.putJson(`event:${event.eventId}`, event);
  }

  async findProcessed(eventId: string): Promise<ProcessedUmakerWebEvent | null> {
    return this.kv.getJson<ProcessedUmakerWebEvent>(`event:${eventId}`);
  }
}
