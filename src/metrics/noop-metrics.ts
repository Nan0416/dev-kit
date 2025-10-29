import { Dimensions, Metrics, MetricsFactory } from './metrics-types';

export class NoopMetrics implements Metrics {
  readonly namespace: string;
  constructor(namespace: string) {
    this.namespace = namespace;
  }

  setDimensions(dimensions?: Dimensions): Metrics {
    return this;
  }
  setProperty(key: string, value: unknown): Metrics {
    return this;
  }
  setTimestamp(timestamp: Date): Metrics {
    return this;
  }

  time(name: string, value: number): void {}

  timer<T>(func: () => T, name: string): T {
    return func();
  }
  asyncTimer<T>(func: () => Promise<T>, name: string): Promise<T> {
    return func();
  }
  asyncCall<T>(func: () => Promise<T>, name: string): Promise<T> {
    return func();
  }
  count(name: string, value: number): void {}
  incrementCounter(name: string): void {}
  dollar(name: string, value: number): void {}
  percent(name: string, value: number): void {}
  number(name: string, value: number): void {}
  async close(): Promise<void> {}
  async flush(): Promise<void> {}
}

export class NoopMetricsFactory implements MetricsFactory {
  create(namespace: string): Metrics {
    return new NoopMetrics(namespace);
  }
}
