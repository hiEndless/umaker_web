export interface IKVAdapter {
  get(key: string): Promise<string | null>;
  getJson<T = unknown>(key: string): Promise<T | null>;
  put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void>;
  putJson(key: string, value: unknown, options?: KVNamespacePutOptions): Promise<void>;
  delete(key: string): Promise<void>;
}

export class KVAdapter implements IKVAdapter {
  constructor(private readonly kv: KVNamespace) {}

  get(key: string): Promise<string | null> {
    return this.kv.get(key);
  }

  async getJson<T = unknown>(key: string): Promise<T | null> {
    return this.kv.get<T>(key, "json");
  }

  async put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void> {
    await this.kv.put(key, value, options);
  }

  async putJson(key: string, value: unknown, options?: KVNamespacePutOptions): Promise<void> {
    await this.kv.put(key, JSON.stringify(value), options);
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key);
  }
}
