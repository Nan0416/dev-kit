import { Metrics, ConsoleMetricsFactory } from '../../src';

describe('console-metrics-logger', () => {
  let metrics: Metrics;
  const metricsFactory = new ConsoleMetricsFactory();
  beforeEach(() => {
    metrics = metricsFactory.create('Unittest');
  });
  test('methods', async () => {
    metrics.time('Latency', 10.23);
    const data = await metrics.asyncCall(async () => {
      return 10;
    }, 'ApiCall');
    expect(data).toEqual(10);
  });
});
