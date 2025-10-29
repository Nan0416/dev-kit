import { Dimensions, Metrics, MetricsFactory } from './metrics-types';

export interface MetricItem {
  readonly namespace: string;
  readonly dimensions?: Dimensions;
  readonly name: string;
  readonly value: number;
  readonly unit: string;
  readonly timestamp: string;
}

export class ConsoleMetrics implements Metrics {
  readonly namespace: string;
  private dimensions: Dimensions;
  private properties: { [key: string]: unknown };
  private readonly level: 'info' | 'debug';

  constructor(namespace: string) {
    this.namespace = namespace;
    this.dimensions = {};
    this.properties = {};
    this.level = 'info';
  }

  setDimensions(dimensions?: Dimensions): Metrics {
    this.dimensions = dimensions ?? {};
    return this;
  }

  setProperty(key: string, value: unknown): Metrics {
    this.properties[key] = value;
    return this;
  }

  setTimestamp(timestamp: Date): Metrics {
    return this;
  }

  private print(item: MetricItem): void {
    if (this.level === 'info') {
      console.info(this.toString(item));
    } else if (this.level === 'debug') {
      console.debug(this.toString(item));
    }
  }

  private toString(item: MetricItem): string {
    return `METRIC: ${item.name} ${item.value} ${item.unit} ${JSON.stringify(item.dimensions)} @ ${item.namespace} ${item.timestamp}`;
  }

  async flush(): Promise<void> {}
  async close(): Promise<void> {}

  time(name: string, value: number): void {
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value,
      unit: 'ms',
      timestamp: new Date().toISOString(),
    });
  }

  timer<T>(func: () => T, name: string): T {
    const startTimestamp = Date.now();
    const result = func();
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value: Date.now() - startTimestamp,
      unit: 'ms',
      timestamp: new Date().toISOString(),
    });
    return result;
  }

  async asyncTimer<T>(func: () => Promise<T>, name: string): Promise<T> {
    const startTimestamp = Date.now();
    const result = await func();
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value: Date.now() - startTimestamp,
      unit: 'ms',
      timestamp: new Date().toISOString(),
    });
    return result;
  }

  count(name: string, value: number): void {
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value,
      unit: 'count',
      timestamp: new Date().toISOString(),
    });
  }

  incrementCounter(name: string): void {
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value: 1,
      unit: 'count',
      timestamp: new Date().toISOString(),
    });
  }

  async asyncCall<T>(func: () => Promise<T>, name: string): Promise<T> {
    const startTimestamp = Date.now();

    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name: `${name}.Count`,
      value: 1,
      unit: 'count',
      timestamp: new Date().toISOString(),
    });

    try {
      const result = await func();
      this.print({
        namespace: this.namespace,
        dimensions: this.dimensions,
        name: `${name}.Error`,
        value: 0,
        unit: 'count',
        timestamp: new Date().toISOString(),
      });
      return result;
    } catch (err) {
      this.print({
        namespace: this.namespace,
        dimensions: this.dimensions,
        name: `${name}.Error`,
        value: 1,
        unit: 'count',
        timestamp: new Date().toISOString(),
      });
      throw err;
    } finally {
      this.print({
        namespace: this.namespace,
        dimensions: this.dimensions,
        name: `${name}.Latency`,
        value: Date.now() - startTimestamp,
        unit: 'ms',
        timestamp: new Date().toISOString(),
      });
    }
  }

  number(name: string, value: number): void {
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value: value,
      unit: 'unitless',
      timestamp: new Date().toISOString(),
    });
  }

  percent(name: string, value: number): void {
    this.print({
      namespace: this.namespace,
      dimensions: this.dimensions,
      name,
      value: Math.round(value * 1000) / 1000,
      unit: 'percent',
      timestamp: new Date().toISOString(),
    });
  }
}

export class ConsoleMetricsFactory implements MetricsFactory {
  constructor() {}

  create(namespace: string): Metrics {
    return new ConsoleMetrics(namespace);
  }
}
