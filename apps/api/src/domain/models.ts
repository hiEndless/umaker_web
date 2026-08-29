export type UmakerWebEvent = {
  eventId: string;
  status: string;
  reasonCode: string;
  payload: Record<string, unknown>;
};

export type ProcessedUmakerWebEvent = {
  eventId: string;
  status: string;
  reasonCode: string;
  processed: true;
};

export type ProcessedUmakerWebEventMapping = {
  event_id: string;
  status: string;
  reason_code: string;
  processed: true;
};

export function umakerWebEventFromInput(data: {
  event_id: string;
  status: string;
  reason_code: string;
  payload?: Record<string, unknown>;
}): UmakerWebEvent {
  return {
    eventId: data.event_id,
    status: data.status,
    reasonCode: data.reason_code,
    payload: data.payload ?? {},
  };
}

export function processedEventToMapping(
  event: ProcessedUmakerWebEvent,
): ProcessedUmakerWebEventMapping {
  return {
    event_id: event.eventId,
    status: event.status,
    reason_code: event.reasonCode,
    processed: event.processed,
  };
}
