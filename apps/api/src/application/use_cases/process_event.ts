import type {
  UmakerWebEvent,
  ProcessedUmakerWebEvent,
} from "../../domain/models.js";
import type { UmakerWebEventPolicy } from "../../domain/policies.js";
import type { UmakerWebEventRepository } from "../../domain/repositories.js";

export class ProcessUmakerWebEventUseCase {
  constructor(
    private readonly policy: UmakerWebEventPolicy,
    private readonly repository?: UmakerWebEventRepository,
  ) {}

  async execute(event: UmakerWebEvent): Promise<ProcessedUmakerWebEvent> {
    this.policy.validate(event);
    const processed: ProcessedUmakerWebEvent = {
      eventId: event.eventId,
      status: event.status,
      reasonCode: event.reasonCode,
      processed: true,
    };
    await this.repository?.saveProcessed(processed);
    return processed;
  }
}
