/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { IEnvVariables } from '@infrastructure/config/env/env.validation';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnvVariables {}
  }
}
