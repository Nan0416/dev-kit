/**
 * A metric record has a namespace, metric name, value, unit, and dimensions.
 * A metrics object can hold multiple metric records under the same namespace.
 *
 * MetricsFactory provide a method to create metrics object. Different MetricsFactory implementations exist, they write metrics object to different destination and
 * use different format.
 *
 * MetricsContext provides a static method to get metrics from a MetricsFactory.
 */

/**
 * dimesions used to report and query
 */
export interface Dimensions {
  [key: string]: string;
}

export interface Metrics {
  readonly namespace: string;

  time(name: string, value: number): void;

  timer<T>(func: () => T, name: string): T;

  asyncTimer<T>(func: () => Promise<T>, name: string): Promise<T>;

  /**
   * timer + error counter.
   * @param func
   * @param name
   */
  asyncCall<T>(func: () => Promise<T>, name: string): Promise<T>;

  count(name: string, value: number): void;

  incrementCounter(name: string): void;

  percent(name: string, value: number): void;

  // unitless
  number(name: string, value: number): void;

  /**
   * Close the metrics object. Once it's closed, the metrics object can't be used.
   */
  close(): Promise<void>;

  /**
   * Flush to the storage.
   * A metrics object can be flushed indefinitely.
   */
  flush(): Promise<void>;

  setDimensions(dimensions?: Dimensions): Metrics;

  setProperty(key: string, value: unknown): Metrics;

  setTimestamp(timestamp: Date): Metrics;
}

export interface MetricsFactory {
  create(namespace: string): Metrics;
}
