import { ConsoleMetricsFactory, MetricsContext } from '../../src';

describe('metrics-context', () => {
  test('MetricsContext', () => {
    const metricsFactory = new ConsoleMetricsFactory();
    MetricsContext.setMetricsFactory(metricsFactory);
    MetricsContext.setDefaultNamespace('Unittest');
    const defaultNamespaceMetrics = MetricsContext.getMetrics();
    const defaultNamespaceMetrics2 = MetricsContext.getMetrics();
    const customNamespaceMetrics = MetricsContext.getMetrics('CustomNamespace');
    expect(defaultNamespaceMetrics).toBe(defaultNamespaceMetrics2);
    expect(defaultNamespaceMetrics).not.toBe(customNamespaceMetrics);
    MetricsContext.resetMetrics();
    const defaultNamespaceMetrics3 = MetricsContext.getMetrics();
    expect(defaultNamespaceMetrics).not.toBe(defaultNamespaceMetrics3);
  });
});
