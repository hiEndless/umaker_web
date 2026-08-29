export interface IQueueProducer<T = unknown> {
  send(message: T): Promise<void>;
  sendBatch(messages: T[]): Promise<void>;
}

export class QueueProducer<T = unknown> implements IQueueProducer<T> {
  constructor(private readonly queue: Queue<T>) {}

  async send(message: T): Promise<void> {
    await this.queue.send(message);
  }

  async sendBatch(messages: T[]): Promise<void> {
    await this.queue.sendBatch(messages.map((body) => ({ body })));
  }
}

export type QueueHandler<T = unknown> = (
  batch: MessageBatch<T>,
  env: unknown,
) => Promise<void>;
