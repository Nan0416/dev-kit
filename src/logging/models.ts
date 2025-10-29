export type LogLevel = 'off' | 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'all';

export interface LoggerOptions {
  readonly name: string;
  readonly level: LogLevel;
}

export interface LoggerBuilder {
  build(name: string): Logger;
}

export interface Logger extends LoggerOptions {
  fatal(message: string, meta?: any): Logger;
  error(message: string, meta?: any): Logger;
  warn(message: string, meta?: any): Logger;
  info(message: string, meta?: any): Logger;
  debug(message: string, meta?: any): Logger;
  trace(message: string, meta?: any): Logger;
}
