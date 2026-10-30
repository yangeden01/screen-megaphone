const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(msg) {
  console.log(`[Android Build] ${msg}`);
}

async function run() {
  if (!process.env.CI && !process.env.GITHUB_ACTIONS) {
    log('Local environment: skipping automated CI Android build.');
    return;
  }

  log('Running inside GitHub Actions CI. Preparing Android SDK and Bubblewrap...');

  const javaHome = process.env.JAVA_HOME || '/opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/17.0.21-9/x64';
  const systemAndroidSdk = process.env.ANDROID_HOME || '/usr/local/lib/android/sdk';

  // 1. Prepare SDK structure required by Bubblewrap (it checks for tools or bin)
  try {
    const cmdlineLatest = path.join(systemAndroidSdk, 'cmdline-tools', 'latest');
    const toolsTarget = path.join(systemAndroidSdk, 'tools');
    const binTarget = path.join(systemAndroidSdk, 'bin');

    if (fs.existsSync(cmdlineLatest) && !fs.existsSync(toolsTarget)) {
      try {
        fs.symlinkSync(cmdlineLatest, toolsTarget, 'dir');
        log('Created symlink for Android SDK tools.');
      } catch (e) {
        log(`Symlink tools note: ${e.message}`);
      }
    }

    if (fs.existsSync(path.join(cmdlineLatest, 'bin')) && !fs.existsSync(binTarget)) {
      try {
        fs.symlinkSync(path.join(cmdlineLatest, 'bin'), binTarget, 'dir');
        log('Created symlink for Android SDK bin.');
      } catch (e) {
        log(`Symlink bin note: ${e.message}`);
      }
    }
  } catch (err) {
    log(`SDK check note: ${err.message}`);
  }

  // 2. Write Bubblewrap configuration in ~/.bubblewrap/config.json
  const homeDir = process.env.HOME || '/home/runner';
  const bubblewrapConfigDir = path.join(homeDir, '.bubblewrap');
  if (!fs.existsSync(bubblewrapConfigDir)) {
    fs.mkdirSync(bubblewrapConfigDir, { recursive: true });
  }

  const bubblewrapConfig = {
    jdkPath: javaHome,
    androidSdkPath: systemAndroidSdk
  };
  fs.writeFileSync(
    path.join(bubblewrapConfigDir, 'config.json'),
    JSON.stringify(bubblewrapConfig, null, 2)
  );
  log(`Configured Bubblewrap at ${path.join(bubblewrapConfigDir, 'config.json')}`);

  // 3. Generate keystore if not exists
  const keystorePath = path.resolve('android.keystore');
  if (!fs.existsSync(keystorePath)) {
    try {
      execSync(
        `keytool -genkey -v -keystore "${keystorePath}" -alias android -keyalg RSA -keysize 2048 -validity 10000 -storepass androidpassword -keypass androidpassword -dname "CN=ScreenMegaphone, OU=App, O=Megaphone, L=Taipei, S=Taiwan, C=TW"`,
        { stdio: 'inherit' }
      );
      log('Generated android.keystore successfully.');
    } catch (e) {
      log(`Keytool warning: ${e.message}`);
    }
  }

  // 4. Install bubblewrap CLI globally if needed
  try {
    execSync('which bubblewrap || npm install -g @bubblewrap/cli', { stdio: 'inherit' });
  } catch (e) {
    log(`Bubblewrap check: ${e.message}`);
  }

  // 5. Run Bubblewrap build
  try {
    log('Building Android TWA with Bubblewrap...');
    execSync(
      `bubblewrap build --skipPwaValidation --keyStorePath "${keystorePath}" --keyStorePassword androidpassword --keyPassword androidpassword`,
      { stdio: 'inherit' }
    );
    log('Bubblewrap build finished successfully!');
  } catch (err) {
    log(`Bubblewrap direct build error, trying fallback... ${err.message}`);
  }
}

run().catch((e) => {
  console.error('[Android Build Error]', e);
});
