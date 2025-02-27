/* eslint-disable no-var */

import { IEnvVariables } from '@infrastructure/config/env/env.validation';

declare global {
  var myEnv: IEnvVariables;
}
