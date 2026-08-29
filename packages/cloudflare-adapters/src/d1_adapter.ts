export interface ID1Adapter {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  execute(sql: string, params?: unknown[]): Promise<D1Result>;
}

export class D1Adapter implements ID1Adapter {
  constructor(private readonly db: D1Database) {}

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const stmt = this.db.prepare(sql).bind(...params);
    const result = await stmt.all<T>();
    return result.results;
  }

  async execute(sql: string, params: unknown[] = []): Promise<D1Result> {
    return this.db.prepare(sql).bind(...params).run();
  }
}
