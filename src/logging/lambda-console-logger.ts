import { Logger, LoggerOptions, LogLevel, LoggerBuilder } from './models';
import { compareLogLevel } from './util';

export interface LambdaConsoleLoggerOptions {
  readonly level: LogLevel;
}

/**
 * Example log message with lambda.
 *
 * 2025-04-09T06:34:30.457Z 82e14089-0697-412f-a1f4-b095c3582f70 INFO AccountService: Account service is up and handling request.
 *
 *
 * Concepts
 * 1. System logs v.s. Application logs.
 *  * System logs: Lambda can log message regarding to the lambda environment. e.g. Lifecycle event: START RequestId: 82e14089-0697-412f-a1f4-b095c3582f70 Version: $LATEST
 *  * Application logs: Application's log messages.
 * 2. Format: unstructured plain text vs. JSON format
 *  * You can print the log message as plain text or JSON string. CloudWatch also understands JSON, meaning, it can make query easier.
 * 3. Lambda supported vs. Application managed JSON format
 *  * For certain runtime environment with supported logging mechanism, lambda can automatically convert plain text to JSON message. https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-advanced.html#monitoring-cloudwatchlogs-logformat.
 * 4. When using Node.js runtime with console.error/debug/info, it will automatically append `{timestamp in ISO format} {requestId} {log level}` before the message.
 */
export class LambdaConsoleLoggerBuilder implements LoggerBuilder {
  private readonly nameToOptions: Record<string, LambdaConsoleLoggerOptions | undefined>;
  private readonly defaultOptions: LambdaConsoleLoggerOptions;

  constructor(nameToOptions: Record<string, LambdaConsoleLoggerOptions>, defaultOptions?: LambdaConsoleLoggerOptions) {
    this.nameToOptions = nameToOptions;
    this.defaultOptions = defaultOptions ?? {
      level: 'info',
    };
  }

  build(name: string): LambdaConsoleLogger {
    let option = this.nameToOptions[name];
    option = option ? option : this.defaultOptions;
    return new LambdaConsoleLogger({
      ...option,
      name: name,
    });
  }
}

export class LambdaConsoleLogger implements Logger {
  readonly level: LogLevel;
  readonly name: string;

  constructor(options: LoggerOptions) {
    this.level = options.level;
    this.name = options.name;
  }

  fatal(message: string, meta?: any): Logger {
    if (compareLogLevel('fatal', this.level) <= 0) {
      if (meta !== undefined) {
        console.error(`${this.name}: ${message}`, meta);
      } else {
        console.error(`${this.name}: ${message}`);
      }
    }
    return this;
  }

  error(message: string, meta?: any): Logger {
    if (compareLogLevel('error', this.level) <= 0) {
      if (meta !== undefined) {
        console.error(`${this.name}: ${message}`, meta);
      } else {
        console.error(`${this.name}: ${message}`);
      }
    }
    return this;
  }

  warn(message: string, meta?: any): Logger {
    if (compareLogLevel('warn', this.level) <= 0) {
      if (meta !== undefined) {
        console.warn(`${this.name}: ${message}`, meta);
      } else {
        console.warn(`${this.name}: ${message}`);
      }
    }
    return this;
  }

  info(message: string, meta?: any): Logger {
    if (compareLogLevel('info', this.level) <= 0) {
      if (meta !== undefined) {
        console.info(`${this.name}: ${message}`, meta);
      } else {
        console.info(`${this.name}: ${message}`);
      }
    }
    return this;
  }

  debug(message: string, meta?: any): Logger {
    if (compareLogLevel('debug', this.level) <= 0) {
      if (meta !== undefined) {
        console.debug(`${this.name}: ${message}`, meta);
      } else {
        console.debug(`${this.name}: ${message}`);
      }
    }
    return this;
  }

  trace(message: string, meta?: any): Logger {
    if (compareLogLevel('trace', this.level) <= 0) {
      if (meta !== undefined) {
        console.trace(`${this.name}: ${message}`, meta);
      } else {
        console.trace(`${this.name}: ${message}`);
      }
    }
    return this;
  }
}
