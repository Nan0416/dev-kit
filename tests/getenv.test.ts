import { getenv } from '../src';

describe('getenv', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV }; // clone env
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV; // restore
  });

  test('returns existing string env var', () => {
    process.env.FOO = 'bar';
    expect(getenv('FOO')).toBe('bar');
  });

  test('returns existing env var when default provided', () => {
    process.env.FOO = 'bar';
    expect(getenv('FOO', 'default')).toBe('bar');
  });

  test('returns default when env var missing', () => {
    expect(getenv('FOO', 'default')).toBe('default');
  });

  test('throws error when missing and no default provided', () => {
    expect(() => getenv('FOO')).toThrow("Environment variable FOO doesn't exist.");
  });

  test('returns value if included in allowed enum list', () => {
    process.env.MODE = 'prod';
    const allowed = ['dev', 'prod'] as const;
    expect(getenv('MODE', allowed)).toBe('prod');
  });

  test('throws error if value not in allowed enum list', () => {
    process.env.MODE = 'staging';
    const allowed = ['dev', 'prod'] as const;
    expect(() => getenv('MODE', allowed)).toThrow("Environment variable MODE's value staging is not a valid value.");
  });

  test('returns default enum if env missing', () => {
    const allowed = ['dev', 'prod'] as const;
    expect(getenv('MODE', allowed, 'prod')).toBe('prod');
  });

  test('throws if invalid overload argument type encountered', () => {
    process.env.FOO = 'bar';
    // @ts-expect-error invalid argument type
    expect(() => getenv('FOO', 123)).toThrow('Invalid argument.');
  });
});
