/* eslint-disable no-restricted-properties */

import { IEnvVariables } from './env.validation';

export const myEnv = process.env as unknown as IEnvVariables;
