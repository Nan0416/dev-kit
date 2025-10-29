import { Logger, LogLevel } from './models';

export class NoopLogger implements Logger {
  readonly level: LogLevel = 'fatal';
  readonly name: string = '';

  fatal(message: string, meta?: any): Logger {
    return this;
  }
  error(message: string, meta?: any): Logger {
    return this;
  }
  warn(message: string, meta?: any): Logger {
    return this;
  }
  info(message: string, meta?: any): Logger {
    return this;
  }
  debug(message: string, meta?: any): Logger {
    return this;
  }
  trace(message: string, meta?: any): Logger {
    return this;
  }
}
