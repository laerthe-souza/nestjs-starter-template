import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnvVariables } from './env.validation';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnvVariables })],
})
export class EnvModule {}
