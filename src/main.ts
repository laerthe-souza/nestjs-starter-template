import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { myEnv } from '@infrastructure/config/env';
import { gracefulShutdown } from '@shared/utils/graceful-shutdown';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);

  app.useLogger(logger);
  app.enableCors({ credentials: true, origin: myEnv.AUTHORIZED_DOMAINS });
  app.use(helmet());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableShutdownHooks();

  await app.listen(myEnv.PORT, () =>
    logger.log(
      `[${process.pid}] - Server is running on port ${myEnv.PORT}`,
      'NestApplication',
    ),
  );

  process.on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection - reason: ${reason as string}`);
  });

  process.on('uncaughtException', error => {
    logger.error({
      msg: `Uncaught exception:`,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    });
  });

  process.on('SIGTERM', gracefulShutdown(app));
  process.on('SIGINT', gracefulShutdown(app));
}
void bootstrap();
