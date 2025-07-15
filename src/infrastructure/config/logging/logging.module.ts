import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { IEnvironment } from '@shared/enums/environment.enum';

import { EnvModule } from '../env/env.module';
import { LoggingService } from './logging.service';

@Global()
@Module({
  imports: [
    EnvModule,
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport:
          myEnv.NODE_ENV === IEnvironment.LOCAL
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: false,
                  translateTime: 'HH:MM:ss',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
        formatters: {
          level: label => {
            return { level: label.toUpperCase() };
          },
          bindings: bindings => ({
            pid: bindings.pid,
            host: bindings.hostname,
          }),
        },
        level: myEnv.NODE_ENV === IEnvironment.LOCAL ? 'debug' : 'info',
      },
    }),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
