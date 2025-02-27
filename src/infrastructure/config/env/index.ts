/* eslint-disable no-restricted-properties */

import { IEnvVariables } from './env.validation';

globalThis.myEnv = process.env as unknown as IEnvVariables;
