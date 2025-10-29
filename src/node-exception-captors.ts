type UncaughtExceptionOrigin = 'uncaughtException' | 'unhandledRejection';

export function enableExceptionCatpors() {
  process.on('unhandledRejection', (reason: any, promise) => {
    console.error('unhandledRejection: ', reason);
  });

  process.on('uncaughtException', (error: Error, origin: UncaughtExceptionOrigin) => {
    console.error('uncaughtException: ' + error);

    if (error instanceof Error) {
      console.error(error.name, error.message, error.stack);
    }
  });
}
