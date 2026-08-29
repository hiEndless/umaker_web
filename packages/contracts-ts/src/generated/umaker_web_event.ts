import { z } from "zod";

/** Generated from contracts/schemas/umaker_web_event.schema.json */
export const umakerWebEventSchema = z.object({
  event_id: z.string().min(1),
  status: z.enum(["accepted", "rejected"]),
  reason_code: z.enum(["none", "invalid_input", "system_error"]),
  payload: z.record(z.unknown()).optional(),
}).strict();

export type UmakerWebEvent = z.infer<typeof umakerWebEventSchema>;
export const UmakerWebEventVersion = "1.0.0";
