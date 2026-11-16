export interface JsonSchema {
  readonly type?: string | readonly string[];
  readonly properties?: Readonly<Record<string, JsonSchema>>;
  readonly required?: readonly string[];
  readonly additionalProperties?: boolean;
  readonly enum?: readonly unknown[];
  readonly items?: JsonSchema;
  readonly minItems?: number;
  readonly maxItems?: number;
  readonly minimum?: number;
  readonly maximum?: number;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
}
/** Small recursive validator for this repository's supported JSON Schema subset. */
export function validateSchema(value: unknown, schema: JsonSchema, path = "$"): string[] {
  if (Array.isArray(schema.type)) {
    if (schema.type.includes("null") && value === null) return [];
    return validateSchema(value, { ...schema, type: schema.type.find((t) => t !== "null") }, path);
  }
  const errors: string[] = [];
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${path}: enum`);
  if (schema.type === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return [`${path}: object required`];
    const obj = value as Record<string, unknown>;
    for (const key of schema.required ?? []) if (!(key in obj)) errors.push(`${path}.${key}: required`);
    for (const [key, child] of Object.entries(obj)) {
      const prop = schema.properties?.[key];
      if (prop) errors.push(...validateSchema(child, prop, `${path}.${key}`));
      else if (schema.additionalProperties === false) errors.push(`${path}.${key}: unknown field`);
    }
  } else if (schema.type === "array") {
    if (!Array.isArray(value)) return [`${path}: array required`];
    if (schema.minItems !== undefined && value.length < schema.minItems || schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${path}: array length`);
    if (schema.items) value.forEach((v, i) => errors.push(...validateSchema(v, schema.items!, `${path}[${i}]`)));
  } else if (schema.type === "string") {
    if (typeof value !== "string") return [`${path}: string required`];
    if (schema.minLength !== undefined && value.length < schema.minLength || schema.maxLength !== undefined && value.length > schema.maxLength || schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${path}: string constraint`);
  } else if (schema.type === "number" || schema.type === "integer") {
    if (typeof value !== "number" || !Number.isFinite(value) || schema.type === "integer" && !Number.isSafeInteger(value)) return [`${path}: numeric type`];
    if (schema.minimum !== undefined && value < schema.minimum || schema.maximum !== undefined && value > schema.maximum) errors.push(`${path}: numeric bound`);
  } else if (schema.type === "boolean" && typeof value !== "boolean") errors.push(`${path}: boolean required`);
  return errors;
}
