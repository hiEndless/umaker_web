import type { ProcessedUmakerWebEvent } from "../../domain/models.js";
import type { UmakerWebEventRepository } from "../../domain/repositories.js";

export class InMemoryUmakerWebEventRepository implements UmakerWebEventRepository {
  readonly saved: ProcessedUmakerWebEvent[] = [];

  async saveProcessed(event: ProcessedUmakerWebEvent): Promise<void> {
    this.saved.push(event);
  }

  async findProcessed(eventId: string): Promise<ProcessedUmakerWebEvent | null> {
    return this.saved.find((item) => item.eventId === eventId) ?? null;
  }
}
