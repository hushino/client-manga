const withOffline = require('next-offline')

// https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts
const config = {
  reactStrictMode: true,
  experimental: {
    reactMode: 'concurrent',
    modern: true,
    granularChunks: true,
    deferScripts: false,
  },
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  //generateInDevMode: true,
  workboxOpts: {
    modifyURLPrefix: {
      'static/': '_next/static/',
      'public/': '/',
    },
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withOffline(config)