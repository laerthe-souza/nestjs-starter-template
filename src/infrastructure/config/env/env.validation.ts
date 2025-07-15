import { ZodError, z } from 'zod';

import { IEnvironment } from '@shared/enums/environment.enum';

enum IZodErrors {
  REQUIRED = 'Required variable',
}

const environments = Object.values(IEnvironment) as unknown as readonly [
  IEnvironment,
  ...IEnvironment[],
];

const envVariablesSchema = z.object({
  NODE_ENV: z.enum(environments, {
    error: IZodErrors.REQUIRED,
  }),
  PORT: z.string({ error: IZodErrors.REQUIRED }),
  SERVICE_NAME: z.string({ error: IZodErrors.REQUIRED }),
});

export function validateEnvVariables(
  config: Record<string, string | number | boolean>,
) {
  try {
    const parsedEnv = envVariablesSchema.parse(config);

    globalThis.myEnv = parsedEnv;

    return parsedEnv;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map(
        data =>
          `Env variable ${data.path[0].toString()} error - ${data.message}`,
      );

      throw new Error(`\n\n${formattedErrors.join('\n')}\n`);
    } else {
      throw error;
    }
  }
}

export type IEnvVariables = z.output<typeof envVariablesSchema>;
