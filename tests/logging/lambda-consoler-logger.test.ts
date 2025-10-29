import { LambdaConsoleLoggerBuilder, LoggerFactory } from '../../src';
LoggerFactory.setBuilder(
  new LambdaConsoleLoggerBuilder({
    SpecialClass: { level: 'debug' },
    OnlyErrorClass: { level: 'error' },
  }),
);

describe('lambda-console-logger', () => {
  test('info level logger', () => {
    const logger = LoggerFactory.getLogger('test1');
    logger.info('test1 info');
    logger.info('test1 info with metadata', { a: 1, b: 2 });
    logger.debug('test1 debug');
    logger.debug('test1 debug with metadata', { a: 1, b: 2 });
    logger.warn('test1 warn');
    logger.warn('test1 warn with metadata', { a: 1, b: 2 });
    logger.error('test1 error');
    logger.error('test1 werrorarn with metadata', { a: 1, b: 2 });
  });

  test('error level logger', () => {
    const logger = LoggerFactory.getLogger('OnlyErrorClass');
    logger.info('OnlyErrorClass info');
    logger.info('OnlyErrorClass info with metadata', { a: 1, b: 2 });
    logger.debug('OnlyErrorClass debug');
    logger.debug('OnlyErrorClass debug with metadata', { a: 1, b: 2 });
    logger.warn('OnlyErrorClass warn');
    logger.warn('OnlyErrorClass warn with metadata', { a: 1, b: 2 });
    logger.error('OnlyErrorClass error');
    logger.error('OnlyErrorClass error with metadata', { a: 1, b: 2 });
  });

  test('debug level logger', () => {
    const logger = LoggerFactory.getLogger('SpecialClass');
    logger.info('SpecialClass info');
    logger.info('SpecialClass info with metadata', { a: 1, b: 2 });
    logger.debug('SpecialClass debug');
    logger.debug('SpecialClass debug with metadata', { a: 1, b: 2 });
    logger.warn('SpecialClass warn');
    logger.warn('SpecialClass warn with metadata', { a: 1, b: 2 });
    logger.error('SpecialClass error');
    logger.error('SpecialClass error with metadata', { a: 1, b: 2 });
  });
});
