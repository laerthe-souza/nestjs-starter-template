import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { myEnv } from '../env';
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
          myEnv.NODE_ENV === 'local'
            ? {
                target: 'pino-pretty',
                options: { singleLine: false },
              }
            : undefined,
        formatters: {
          level(label) {
            return { level: label.toUpperCase() };
          },
          bindings: bindings => ({
            pid: bindings.pid,
            host: bindings.hostname,
          }),
        },
        level: myEnv.NODE_ENV === 'local' ? 'debug' : 'info',
      },
    }),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
