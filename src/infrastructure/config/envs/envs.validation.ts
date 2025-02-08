import { ZodError, z } from 'zod';

enum ZodErrors {
  required = 'Required variable',
  invalid_url = 'Invalid url',
}

const envVariablesSchema = z.object({
  PORT: z.string({ required_error: ZodErrors.required }),
  NODE_ENV: z.enum(['local', 'stage', 'prod'], {
    required_error: ZodErrors.required,
  }),
  AUTHORIZED_DOMAINS: z.string().transform(value => value.split(',')),
});

export function validateEnvVariables(
  config: Record<string, string | number | boolean>,
) {
  try {
    const parsedEnv = envVariablesSchema.parse(config);

    return parsedEnv;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map(
        data => `Env variable ${data.path[0]} error - REASON: ${data.message}`,
      );

      throw Error(`\n\n${formattedErrors.join('\n')}\n`);
    } else {
      throw error;
    }
  }
}

export type IEnvVariables = z.output<typeof envVariablesSchema>;
