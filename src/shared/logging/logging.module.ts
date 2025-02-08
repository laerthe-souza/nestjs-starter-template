import { LoggerModule } from 'nestjs-pino';

import { Global, Module } from '@nestjs/common';

import { LoggingService } from './logging.service';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport:
          process.env.NODE_ENV === 'local'
            ? {
                target: 'pino-pretty',
                options: { singleLine: false },
              }
            : undefined,
        formatters: {
          level(label) {
            return { level: label.toUpperCase() };
          },
        },
        level: process.env.NODE_ENV === 'local' ? 'debug' : 'info',
      },
    }),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
