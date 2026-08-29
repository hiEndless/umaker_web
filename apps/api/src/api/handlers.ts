import { umakerWebEventSchema } from "@umaker/contracts-ts";
import { ProcessUmakerWebEventUseCase } from "../application/use_cases/process_event.js";
import {
  umakerWebEventFromInput,
  processedEventToMapping,
  type ProcessedUmakerWebEventMapping,
} from "../domain/models.js";
import { UmakerWebEventPolicy } from "../domain/policies.js";
import type { UmakerWebEventRepository } from "../domain/repositories.js";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

export async function handleEvent(
  input: unknown,
  repository?: UmakerWebEventRepository,
): Promise<ProcessedUmakerWebEventMapping> {
  const parsed = umakerWebEventSchema.parse(input);
  const domainEvent = umakerWebEventFromInput(parsed);
  const useCase = new ProcessUmakerWebEventUseCase(
    new UmakerWebEventPolicy(),
    repository,
  );
  return processedEventToMapping(await useCase.execute(domainEvent));
}

export async function lookupEvent(
  eventId: string,
  repository: UmakerWebEventRepository,
): Promise<ProcessedUmakerWebEventMapping | null> {
  const found = await repository.findProcessed(eventId);
  if (!found) return null;
  return processedEventToMapping(found);
}
