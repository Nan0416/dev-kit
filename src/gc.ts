import { LoggerFactory } from './logging';

const logger = LoggerFactory.getLogger('gc');

export function gc() {
  if (global.gc) {
    const startTime = Date.now();
    global.gc();
    logger.info(`gc took ${Date.now() - startTime} ms`);
  } else {
    logger.warn(`gc is not available please run node with --expose-gc`);
  }
}
