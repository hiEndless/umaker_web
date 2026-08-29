import type { ProcessedUmakerWebEvent } from "./models.js";

export interface UmakerWebEventRepository {
  saveProcessed(event: ProcessedUmakerWebEvent): Promise<void>;
  findProcessed(eventId: string): Promise<ProcessedUmakerWebEvent | null>;
}
