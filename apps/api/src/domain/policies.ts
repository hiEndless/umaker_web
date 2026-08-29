import { UmakerWebEventValidationError } from "./errors.js";
import type { UmakerWebEvent } from "./models.js";

export const ALLOWED_STATUS = new Set(["accepted", "rejected"]);
export const ALLOWED_REASON_CODE = new Set([
  "none",
  "invalid_input",
  "system_error",
]);

export class UmakerWebEventPolicy {
  validate(event: UmakerWebEvent): void {
    if (!event.eventId) {
      throw new UmakerWebEventValidationError("event_id is required");
    }
    if (!ALLOWED_STATUS.has(event.status)) {
      throw new UmakerWebEventValidationError(`invalid status: ${event.status}`);
    }
    if (!ALLOWED_REASON_CODE.has(event.reasonCode)) {
      throw new UmakerWebEventValidationError(
        `invalid reason_code: ${event.reasonCode}`,
      );
    }
  }
}
