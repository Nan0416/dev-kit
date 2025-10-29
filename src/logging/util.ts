import { LogLevel } from './models';

const logLevelOrder: LogLevel[] = ['off', 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'all'];

/**
 * Compare log levels
 *
 * @param level1
 * @param level2
 * @returns return negative number if level1 is more urgent than level2
 */
export function compareLogLevel(level1: LogLevel, level2: LogLevel): number {
  let level1Index: number = 100;
  let level2Index: number = 100;

  for (let i = 0; i < logLevelOrder.length; i++) {
    if (logLevelOrder[i] === level1) {
      level1Index = i;
    }
    if (logLevelOrder[i] === level2) {
      level2Index = i;
    }
  }

  return level1Index - level2Index;
}
