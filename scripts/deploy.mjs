import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';

function loadEnvFile(appPath, envFileName) {
  const envFile = envFileName ? `.env.${envFileName}` : '.env.production';
  const envPath = path.join(appPath, envFile);

  if (!fs.existsSync(envPath)) {
    throw new Error(`Environment file ${envFile} not found in ${appPath}`);
  }

  const { parsed: envConfig } = config({ path: envPath });
  if (!envConfig) {
    throw new Error(`Failed to parse ${envFile}`);
  }

  return envConfig;
}

function runWithEnv(command, cwd, env) {
  try {
    return execSync(command, {
      cwd,
      stdio: 'inherit',
      env: {
        ...process.env,
        ...env,
        FORCE_COLOR: 'true',
      },
      isProd ? '--prod' : '',
      `--token=${process.env.VERCEL_TOKEN}`,
      '--yes',
      envArgs,
    ]
      .filter(Boolean)
      .join(' ');

    runWithEnv(deployCommand, absolutePath, envVars);

    console.info(`✅ ${app} deployed successfully!\n`);
  } catch (error) {
    console.error(`❌ Failed to process ${app}:`, error);
    throw error;
  }
}

const args = process.argv.slice(2);
const appPath = args.find(arg => arg.startsWith('--appPath='))?.split('=')[1];
const envFileName = args.includes('--envFileName')
  ? args.find(arg => arg.startsWith('--envFileName='))?.split('=')[1]
  : null;

if (!appPath) {
  throw new Error('--appPath is required');
}

deploy({ appPath, envFileName });

export { deploy };
