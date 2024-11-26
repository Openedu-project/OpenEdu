import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
// scripts/deploy.ts
import { config } from 'dotenv';

function runCommand(command, cwd) {
  try {
    return execSync(command, {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: 'true' },
    });
  } catch (error) {
    console.error(`Failed to run command: ${command}`);
    throw error;
  }
}

function validateAppPath(appPath) {
  const absolutePath = path.resolve(process.cwd(), appPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`App path ${appPath} does not exist`);
  }

  const vercelConfigPath = path.join(absolutePath, 'vercel.json');
  if (!fs.existsSync(vercelConfigPath)) {
    throw new Error(`vercel.json not found in ${appPath}. Please create one.`);
  }

  return absolutePath;
}

function deploy({ appPath, env = 'production' }) {
  const absolutePath = validateAppPath(appPath);
  const app = path.basename(appPath);
  console.info(`\n📦 Processing ${app}...\n`);

  // Load env file
  const envPath = path.join(absolutePath, env ? `.env.${env}` : '.env.production');
  const envConfig = config({ path: envPath });

  if (envConfig.error) {
    throw new Error(`Error loading env file: ${envConfig.error.message}`);
  }

  // Convert env to CLI arguments
  const envArgs = Object.entries(envConfig.parsed || {})
    .map(([key, value]) => `--env ${key}=${value}`)
    .join(' ');

  try {
    // Run build using Turbo
    console.info('🛠️ Building...');
    runCommand(`pnpm run build --filter=${app}...`, process.cwd());

    // Build deploy command
    const deployCommand = [
      'vercel',
      'deploy',
      '--prod',
      `--token=${process.env.VERCEL_TOKEN}`,
      '--yes',
      `--cwd=${appPath}`,
      envArgs,
    ]
      .filter(Boolean)
      .join(' ');

    // Deploy
    console.info('🚀 Deploying...');
    const output = runCommand(deployCommand, process.cwd());

    console.info(`✅ ${app} deployed successfully!\n`);
    return output.toString();
  } catch (error) {
    console.error(`❌ Failed to process ${app}:`, error);
    throw error;
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);
const appPath = args.find(arg => arg.startsWith('--appPath='))?.split('=')[1];
const env = args.includes('--envFile');

if (!appPath) {
  throw new Error('--appPath is required');
}

deploy({ appPath, env }).catch(error => {
  console.error('Deploy failed:', error);
  process.exit(1);
});

export { deploy };
