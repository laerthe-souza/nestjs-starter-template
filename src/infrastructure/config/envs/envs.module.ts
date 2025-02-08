import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnvVariables } from './envs.validation';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnvVariables })],
})
export class EnvsModule {}
