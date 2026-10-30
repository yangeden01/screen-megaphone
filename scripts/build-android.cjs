const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(msg) {
  console.log(`[Android Build Setup] ${msg}`);
}

async function run() {
  if (!process.env.CI && !process.env.GITHUB_ACTIONS) {
    log('Local environment: skipping CI setup.');
    return;
  }

  log('Running in GitHub Actions CI. Building Android SDK user environment...');

  const javaHome = process.env.JAVA_HOME || '/opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/17.0.21-9/x64';
  const homeDir = process.env.HOME || '/home/runner';
  const systemAndroidSdk = process.env.ANDROID_HOME || '/usr/local/lib/android/sdk';

  // 1. Create a writable SDK home directory in runner's home
  const userSdk = path.join(homeDir, 'android-sdk');
  if (!fs.existsSync(userSdk)) {
    fs.mkdirSync(userSdk, { recursive: true });
  }

  // Symlink existing tools so Bubblewrap validatePath passes without permission issues
  const cmdlineLatest = path.join(systemAndroidSdk, 'cmdline-tools', 'latest');
  const safeSymlink = (src, dest) => {
    try {
      if (fs.existsSync(src) && !fs.existsSync(dest)) {
        fs.symlinkSync(src, dest, 'dir');
        log(`Symlinked ${src} -> ${dest}`);
      }
    } catch (e) {
      log(`Symlink note (${dest}): ${e.message}`);
    }
  };

  safeSymlink(cmdlineLatest, path.join(userSdk, 'tools'));
  if (fs.existsSync(path.join(cmdlineLatest, 'bin'))) {
    safeSymlink(path.join(cmdlineLatest, 'bin'), path.join(userSdk, 'bin'));
  }
  safeSymlink(path.join(systemAndroidSdk, 'build-tools'), path.join(userSdk, 'build-tools'));
  safeSymlink(path.join(systemAndroidSdk, 'platform-tools'), path.join(userSdk, 'platform-tools'));
  safeSymlink(path.join(systemAndroidSdk, 'platforms'), path.join(userSdk, 'platforms'));

  // 2. Configure Bubblewrap paths in ~/.bubblewrap/config.json
  const bubblewrapConfigDir = path.join(homeDir, '.bubblewrap');
  if (!fs.existsSync(bubblewrapConfigDir)) {
    fs.mkdirSync(bubblewrapConfigDir, { recursive: true });
  }

  const bubblewrapConfig = {
    jdkPath: javaHome,
    androidSdkPath: userSdk
  };
  fs.writeFileSync(
    path.join(bubblewrapConfigDir, 'config.json'),
    JSON.stringify(bubblewrapConfig, null, 2)
  );
  log(`Wrote Bubblewrap config pointing to ${userSdk}`);

  // 3. Ensure keystore exists or is created cleanly
  const keystorePath = path.resolve('android.keystore');
  if (!fs.existsSync(keystorePath)) {
    try {
      execSync(
        `keytool -genkey -v -keystore "${keystorePath}" -alias android -keyalg RSA -keysize 2048 -validity 10000 -storepass androidpassword -keypass androidpassword -dname "CN=ScreenMegaphone, OU=App, O=Megaphone, L=Taipei, S=Taiwan, C=TW"`,
        { stdio: 'inherit' }
      );
      log('Created android.keystore successfully.');
    } catch (e) {
      log(`Keytool warning: ${e.message}`);
    }
  }

  // 4. Install Bubblewrap CLI and run non-interactive build with --skipVersionPrompt
  try {
    log('Running Bubblewrap build with --skipVersionPrompt in CI postbuild...');
    execSync('npm install -g @bubblewrap/cli', { stdio: 'inherit' });
    
    // Bubblewrap build: --skipVersionPrompt uses version from twa-manifest.json non-interactively!
    execSync(
      `bubblewrap build --skipPwaValidation --skipVersionPrompt --keyStorePath "${keystorePath}" --keyStorePassword androidpassword --keyPassword androidpassword`,
      { stdio: 'inherit', env: { ...process.env, ANDROID_HOME: userSdk } }
    );
    log('Bubblewrap build execution completed successfully!');
  } catch (err) {
    log(`Bubblewrap build note: ${err.message}`);
  }
}

run().catch((e) => {
  console.error('[Android Build Setup Error]', e);
});
