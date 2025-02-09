import { execSync } from 'child_process';
import { readFileSync, existsSync, writeFileSync } from 'fs';

try {
  const envPath = '.env';
  const envExamplePath = '.env.example';

  if (!existsSync(envPath)) {
    console.error(`🚨 ${envPath} file does not exists.`);
    process.exit(1);
  }

  const envsFile = readFileSync(envPath);

  if (!existsSync(envExamplePath)) {
    writeFileSync(envExamplePath, envsFile);

    try {
      execSync('git add .env.example', { stdio: 'ignore' });
      console.log(
        '\n✅ .env.example created successfully and added to git staged area.',
      );
    } catch (error) {
      console.error(
        `🚨 Error when try to add ${envExamplePath} to git staged area.`,
        error,
      );
      process.exit(1);
    }
  }

  const extractKeys = (fileContent: Buffer) =>
    fileContent
      .toString()
      .match(/^\s*([^=\s#]+)/gm)
      ?.map(match => match.trim().split('=')[0]) ?? [];

  const envs = extractKeys(envsFile);
  const envsExample = extractKeys(readFileSync(envExamplePath));

  if (!envs.length) {
    console.error(`🚨 .env is empty.`);
    process.exit(1);
  }

  if (envs?.every(env => envsExample?.includes(env))) {
    console.log('\n✅ .env and .env.example files are synced!');

    const missingEnvs = envsExample?.filter(env => !envs.includes(env));

    if (missingEnvs?.length) {
      console.warn(
        `\n🤔 The following values are missing in .env file:\n\n${missingEnvs.join('\n')}\n`,
      );
    }

    process.exit(0);
  } else {
    const missingEnvs = envs?.filter(env => !envsExample?.includes(env));

    console.error(
      `\n🚨 The following values are missing in .env.example file:\n\n${missingEnvs?.join('\n')}\n`,
    );

    process.exit(1);
  }
} catch (error) {
  console.error(`🚨 Unknown error`, error);
  process.exit(1);
}
