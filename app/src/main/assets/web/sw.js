/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "cdf205d40c6e8f7370653c64c0864fa6"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c6f367a99e98c8f31dac8d4b36aa5853"
  }, {
    "url": "pwa-192x192.png",
    "revision": "810c1501e3be2f0bc3cc91906fec5eeb"
  }, {
    "url": "privacy.html",
    "revision": "72d69bfa7a14bc806a69b49c45b67963"
  }, {
    "url": "privacy-policy.html",
    "revision": "72d69bfa7a14bc806a69b49c45b67963"
  }, {
    "url": "index.html",
    "revision": "30105b668838512527a1d41b3ee8fa2d"
  }, {
    "url": "icon.svg",
    "revision": "db3e3e4cc32fd25e04671caec4cb04e8"
  }, {
    "url": "favicon.ico",
    "revision": "7502780ce12b985ef93e4731f1283686"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "d6cee04940beb06fa33cbce2ab6f5c13"
  }, {
    "url": "assets/polyfills-legacy-DZe5wtpl.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-JL_VXF3e.js",
    "revision": null
  }, {
    "url": "assets/index-DdlB8n-p.css",
    "revision": null
  }, {
    "url": "assets/index-9WW4tZEW.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "d6cee04940beb06fa33cbce2ab6f5c13"
  }, {
    "url": "favicon.ico",
    "revision": "7502780ce12b985ef93e4731f1283686"
  }, {
    "url": "icon.svg",
    "revision": "db3e3e4cc32fd25e04671caec4cb04e8"
  }, {
    "url": "pwa-192x192.png",
    "revision": "810c1501e3be2f0bc3cc91906fec5eeb"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c6f367a99e98c8f31dac8d4b36aa5853"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "cdf205d40c6e8f7370653c64c0864fa6"
  }, {
    "url": "manifest.webmanifest",
    "revision": "f2d557dc544fd8a57ac4f0b3ca073b3d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
