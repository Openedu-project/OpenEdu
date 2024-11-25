import { execSync } from 'node:child_process';
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

function deploy({ appPath, isProd = true }) {
  const app = path.basename(appPath);
  console.info(`\n📦 Processing ${app}...\n`);

  // Load env file
  const envPath = path.join(process.cwd(), appPath, isProd ? '.env.production' : '.env');
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
    runCommand(`pnpm turbo run build --filter=${app}...`, process.cwd());

    // Build deploy command
    const deployCommand = [
      'vercel',
      'deploy',
      isProd ? '--prod' : '',
      `--token=${process.env.VERCEL_TOKEN}`,
      '--yes',
      envArgs,
    ]
      .filter(Boolean)
      .join(' ');

    // Deploy
    console.info('🚀 Deploying...');
    const output = runCommand(deployCommand, appPath);

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
const isProd = args.includes('--prod');

if (!appPath) {
  throw new Error('--appPath is required');
}

deploy({ appPath, isProd }).catch(error => {
  console.error('Deploy failed:', error);
  process.exit(1);
});

export { deploy };
