import { Logger, LoggerOptions, LogLevel, LoggerBuilder } from './models';
import { compareLogLevel } from './util';

export interface ConsoleLoggerOptions {
  readonly level: LogLevel;
}

export interface GlobalLoggerOptions {
  readonly time?: boolean;
}

export class ConsoleLoggerBuilder implements LoggerBuilder {
  private readonly nameToOptions: Record<string, ConsoleLoggerOptions | undefined>;
  private readonly defaultOptions: ConsoleLoggerOptions & GlobalLoggerOptions;

  constructor(nameToOptions: Record<string, ConsoleLoggerOptions>, defaultOptions?: ConsoleLoggerOptions & GlobalLoggerOptions) {
    this.nameToOptions = nameToOptions;
    this.defaultOptions = defaultOptions ?? {
      level: 'info',
    };
  }

  build(name: string): ConsoleLogger {
    let option = this.nameToOptions[name];
    option = option ? option : this.defaultOptions;
    return new ConsoleLogger({
      ...option,
      name: name,
      time: this.defaultOptions.time ?? false,
    });
  }
}

export class ConsoleLogger implements Logger {
  readonly level: LogLevel;
  readonly name: string;
  private readonly time: boolean;

  constructor(options: LoggerOptions & { time: boolean }) {
    this.level = options.level;
    this.name = options.name;
    this.time = options.time;
  }

  private print(level: LogLevel, message: string, meta?: any) {
    const segments: string[] = [`[${level}]`];
    if (this.time) {
      segments.push(`${new Date().toISOString()}`);
    }
    segments.push(`${this.name}: ${message}`);
    if (meta === undefined) {
      console.log(segments.join(' '));
    } else {
      console.log(segments.join(' '), meta);
    }
  }

  fatal(message: string, meta?: any): Logger {
    if (compareLogLevel('fatal', this.level) <= 0) {
      this.print('fatal', message, meta);
    }
    return this;
  }

  error(message: string, meta?: any): Logger {
    if (compareLogLevel('error', this.level) <= 0) {
      this.print('error', message, meta);
    }
    return this;
  }

  warn(message: string, meta?: any): Logger {
    if (compareLogLevel('warn', this.level) <= 0) {
      this.print('warn', message, meta);
    }
    return this;
  }

  info(message: string, meta?: any): Logger {
    if (compareLogLevel('info', this.level) <= 0) {
      this.print('info', message, meta);
    }
    return this;
  }

  debug(message: string, meta?: any): Logger {
    if (compareLogLevel('debug', this.level) <= 0) {
      this.print('debug', message, meta);
    }
    return this;
  }

  trace(message: string, meta?: any): Logger {
    if (compareLogLevel('trace', this.level) <= 0) {
      this.print('trace', message, meta);
    }
    return this;
  }
}
