import { convertDimensionsToDimensionArray, deduplicateDimensions, mergeDimensions, type Dimensions, type Dimension } from '../../src'; // adjust path as needed

describe('convertDimensionsToDimensionArray', () => {
  test('returns empty array when undefined', () => {
    expect(convertDimensionsToDimensionArray(undefined)).toEqual([]);
  });

  test('returns array as-is when input is already Dimension[]', () => {
    const dims: Dimension[] = [
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
    ];
    expect(convertDimensionsToDimensionArray(dims)).toBe(dims); // identity
  });

  test('converts Dimensions object to Dimension[]', () => {
    const dimsObj: Dimensions = {
      region: 'us-west-2',
      env: 'prod',
    };

    const result = convertDimensionsToDimensionArray(dimsObj);

    expect(result).toContainEqual({ key: 'region', value: 'us-west-2' });
    expect(result).toContainEqual({ key: 'env', value: 'prod' });
    expect(result.length).toBe(2);
  });

  test('handles empty Dimensions object', () => {
    const dimsObj: Dimensions = {};
    expect(convertDimensionsToDimensionArray(dimsObj)).toEqual([]);
  });
});

describe('deduplicateDimensions', () => {
  test('returns same array when 0 or 1 element', () => {
    expect(deduplicateDimensions([])).toEqual([]);
    const single = [{ key: 'a', value: '1' }] as const;
    expect(deduplicateDimensions(single)).toBe(single);
  });

  test('removes duplicates with same key+value', () => {
    const dims: Dimension[] = [
      { key: 'a', value: '1' },
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
      { key: 'b', value: '2' },
    ];

    expect(deduplicateDimensions(dims)).toEqual([
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
    ]);
  });

  test('sorting groups duplicates for removal', () => {
    const dims: Dimension[] = [
      { key: 'b', value: '2' },
      { key: 'a', value: '1' },
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
      { key: 'a', value: '1' },
    ];

    // all duplicates of a:1 should collapse
    expect(deduplicateDimensions(dims)).toEqual([
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
    ]);
  });

  test('retains different values under same key', () => {
    const dims: Dimension[] = [
      { key: 'env', value: 'prod' },
      { key: 'env', value: 'dev' },
    ];

    expect(deduplicateDimensions(dims)).toEqual([
      { key: 'env', value: 'dev' },
      { key: 'env', value: 'prod' },
    ]);
  });
});

describe('mergeDimensions', () => {
  test('returns base when extras undefined', () => {
    const base: Dimension[] = [{ key: 'a', value: '1' }];
    expect(mergeDimensions(base, undefined)).toBe(base);
  });

  test('returns base when extras empty', () => {
    const base: Dimension[] = [{ key: 'a', value: '1' }];
    expect(mergeDimensions(base, [])).toBe(base);
  });

  test('merges and deduplicates', () => {
    const base: Dimension[] = [
      { key: 'region', value: 'us-west-2' },
      { key: 'env', value: 'prod' },
    ];

    const extras: Dimension[] = [
      { key: 'env', value: 'prod' }, // duplicate
      { key: 'version', value: '1' },
      { key: 'version', value: '2' },
    ];

    const merged = mergeDimensions(base, extras);

    expect(merged).toEqual([
      { key: 'env', value: 'prod' },
      { key: 'region', value: 'us-west-2' },
      { key: 'version', value: '1' },
      { key: 'version', value: '2' },
    ]);
  });

  test('keeps dimension pairs unique per key+value', () => {
    const base = [{ key: 'x', value: '1' }];
    const extras = [{ key: 'x', value: '1' }];
    expect(mergeDimensions(base, extras)).toEqual([{ key: 'x', value: '1' }]);
  });

  test('maintains dedup regardless of ordering differences', () => {
    const base = [{ key: 'a', value: '1' }];
    const extras = [
      { key: 'b', value: '2' },
      { key: 'a', value: '1' }, // duplicate
      { key: 'c', value: '3' },
    ];

    expect(mergeDimensions(base, extras)).toEqual([
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
      { key: 'c', value: '3' },
    ]);
  });
});
