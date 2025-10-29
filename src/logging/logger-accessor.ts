import { Logger, LoggerBuilder } from './models';
import { NoopLogger } from './noop-logger';

const NOOP_LOGGER = new NoopLogger();

const _nameToLoggerBuilder: Map<string, LoggerBuilder> = new Map();
let _defaultLoggerBuilder: LoggerBuilder | undefined = undefined;

export class LoggerFactory {
  /**
   * optional name?
   * @param name
   * @returns
   */
  static getLogger(name: string | Function): Logger {
    const _name = typeof name === 'string' ? name : name.name;
    let builder = _nameToLoggerBuilder.get(_name);
    builder = builder ? builder : _defaultLoggerBuilder;
    return builder ? builder.build(_name) : NOOP_LOGGER;
  }

  static setBuilder(builder: LoggerBuilder, name?: string) {
    if (name === undefined) {
      _defaultLoggerBuilder = builder;
    } else if (typeof name === 'string') {
      _nameToLoggerBuilder.set(name, builder);
    } else {
      throw new Error(`invalid logger builder name ${name}`);
    }
  }

  static setBuilderIfMissing(builder: LoggerBuilder, name?: string) {
    if (name === undefined && _defaultLoggerBuilder === undefined) {
      _defaultLoggerBuilder = builder;
    } else if (typeof name === 'string' && !_nameToLoggerBuilder.has(name)) {
      _nameToLoggerBuilder.set(name, builder);
    }
  }
}
