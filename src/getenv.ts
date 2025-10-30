export function getenv<T extends string>(name: string, enums: ReadonlyArray<T>, default_?: T): T;
export function getenv(name: string, default_?: string): string;

export function getenv<T extends string>(name: string, v2?: ReadonlyArray<T> | string, v3?: T): T {
  const value = process.env[name];
  if (typeof value === 'string') {
    if (v2 === undefined || typeof v2 === 'string') {
      return value as T;
    } else if (Array.isArray(v2)) {
      if (v2.includes(value)) {
        return value as T;
      } else {
        throw new Error(`Environment variable ${name}'s value ${value} is not a valid value.`);
      }
    } else {
      throw new Error('Invalid argument.');
    }
  } else {
    if (typeof v2 === 'string') {
      return v2 as T;
    } else if (typeof v3 === 'string') {
      return v3 as T;
    } else {
      throw new Error(`Environment variable ${name} doesn't exist.`);
    }
  }
}
