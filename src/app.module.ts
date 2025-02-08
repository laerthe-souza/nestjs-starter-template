import { EnvsModule } from '@infrastructure/config/envs/envs.module';
import { Module } from '@nestjs/common';
import { LoggingModule } from '@shared/logging/logging.module';

@Module({
  imports: [EnvsModule, LoggingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
