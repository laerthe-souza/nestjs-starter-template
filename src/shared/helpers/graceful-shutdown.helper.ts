import { INestApplication } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SignalConstants } from 'node:os';

export function gracefulShutdown(app: INestApplication) {
  const logger = app.get(Logger);

  return async (signal?: SignalConstants): Promise<void> => {
    if (signal) {
      logger.warn(
        `Received ${Object.values(signal)[0]}, initiating shutdown...`,
        gracefulShutdown.name,
      );
    }

    await app.close();

    logger.warn(`Application shutdown is finished`, gracefulShutdown.name);

    process.exit(0);
  };
}
