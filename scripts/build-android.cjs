const fs = require('fs');
const path = require('path');

function log(msg) {
  console.log(`[Android Build Setup] ${msg}`);
}

async function run() {
  if (!process.env.CI && !process.env.GITHUB_ACTIONS) {
    log('Local environment: skipping CI setup.');
    return;
  }

  log('Running inside GitHub Actions CI. Configuring Android SDK & Bubblewrap paths...');

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

  // Ensure any pre-existing android.keystore is cleaned so keytool step generates cleanly
  const keystorePath = path.resolve('android.keystore');
  if (fs.existsSync(keystorePath)) {
    try {
      fs.unlinkSync(keystorePath);
      log('Cleaned old keystore for fresh generation.');
    } catch (e) {
      // ignore
    }
  }
}

run().catch((e) => {
  console.error('[Android Build Setup Error]', e);
});
