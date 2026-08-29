export interface IR2Adapter {
  get(key: string): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value: ReadableStream | ArrayBuffer | string,
    options?: R2PutOptions,
  ): Promise<R2Object>;
  delete(key: string): Promise<void>;
  list(options?: R2ListOptions): Promise<R2Objects>;
}

export class R2Adapter implements IR2Adapter {
  constructor(private readonly bucket: R2Bucket) {}

  get(key: string): Promise<R2ObjectBody | null> {
    return this.bucket.get(key);
  }

  put(
    key: string,
    value: ReadableStream | ArrayBuffer | string,
    options?: R2PutOptions,
  ): Promise<R2Object> {
    return this.bucket.put(key, value, options);
  }

  async delete(key: string): Promise<void> {
    await this.bucket.delete(key);
  }

  list(options?: R2ListOptions): Promise<R2Objects> {
    return this.bucket.list(options);
  }
}
