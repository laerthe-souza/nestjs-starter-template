import { Module } from '@nestjs/common';

import { EnvModule } from '@infrastructure/config/env/env.module';
import { LoggingModule } from '@infrastructure/config/logging/logging.module';

@Module({
  imports: [EnvModule, LoggingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
