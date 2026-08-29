export class UmakerWebEventValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UmakerWebEventValidationError";
  }
}
