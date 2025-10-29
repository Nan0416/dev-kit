import { LoggerFactory } from '../logging';
import { MetricsFactory } from './metrics-types';
import { Metrics } from './metrics-types';
import { NoopMetrics, NoopMetricsFactory } from './noop-metrics';

let _noopMetrics = new NoopMetrics('');
let _globalMetricsFactory: MetricsFactory | undefined = undefined;
let _defaultNamespace: string | undefined = undefined;
let _namespaceToMetrics: Map<string, Metrics> = new Map();

const logger = LoggerFactory.getLogger('MetricsContext');
export class MetricsContext {
  static setMetricsFactory(metricsFactory: MetricsFactory) {
    if (_globalMetricsFactory === undefined) {
      _globalMetricsFactory = metricsFactory;
    } else {
      logger.warn(`A MetricsFactory has already been configured, call resetMetrics() first.`);
    }
  }

  static setDefaultNamespace(namespace: string) {
    if (_defaultNamespace === undefined || _defaultNamespace === namespace) {
      _defaultNamespace = namespace;
    } else {
      logger.warn(`The default namespace has already been configured, call resetMetrics() first.`);
    }
  }

  static getMetrics(namespace?: string): Metrics {
    let targetNamespace = typeof namespace === 'string' ? namespace : _defaultNamespace;
    if (typeof targetNamespace === 'string') {
      let metrics = _namespaceToMetrics.get(targetNamespace);

      if (metrics) {
        return metrics;
      }

      if (_globalMetricsFactory === undefined) {
        logger.warn('MetricsFactory was not configured before requesting metrics object. Set up a noop MetricsFactory.');
        _globalMetricsFactory = new NoopMetricsFactory();
      }

      metrics = _globalMetricsFactory.create(targetNamespace);
      _namespaceToMetrics.set(targetNamespace, metrics);
      return metrics;
    } else {
      console.warn('Default namespace was not configured, return noop metrics object.');
      return _noopMetrics;
    }
  }

  static resetMetrics() {
    _defaultNamespace = undefined;
    _namespaceToMetrics.clear();
    _globalMetricsFactory = undefined;
  }
}
