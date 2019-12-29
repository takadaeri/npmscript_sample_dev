// ServiceWorker.jsを作成するタスク
// workboxで動かす 

const path = require('path')
const { generateSW } = require('workbox-build')

const distDir = path.join(process.cwd(), 'dist')
const swPath = path.join(distDir, 'service-worker.js')
const cacheId = 'sampledev'

const workbox = () => {

  generateSW({
    cacheId: cacheId,
    swDest: swPath,
    importWorkboxFrom: "local",
    globDirectory: "./dist/",
    globPatterns: [],
    runtimeCaching: [
      {
          urlPattern: /.+(\/|.html)$/,
          handler: "NetworkFirst",
          options: {
              cacheName: cacheId + "-html-cache",
              expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 7,
              },
          },
      },
      {
          urlPattern: /.+\.(js|css|woff|json)$/,
          handler: "StaleWhileRevalidate",
          options: {
              cacheName: cacheId + "-dependent-cache",
              expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 90,
              },
          },
      },
      {
          urlPattern: /.+\.(png|gif|jpg|jpeg|svg|ico)$/,
          handler: "CacheFirst",
          options: {
              cacheName: cacheId + "-image-cache",
              expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 30,
              },
          },
      },
      {
          urlPattern: new RegExp('https://www.googleapis.com/'),
          handler: "StaleWhileRevalidate",
          options: {
              cacheName: cacheId + "-bookapi-cache",
              expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 30,
              },
          },
      },
      {
          urlPattern: new RegExp('https://books.google.com/'),
          handler: "StaleWhileRevalidate",
          options: {
              cacheName: cacheId + "-bookimg-cache",
              expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 30,
              },
          },
      }
    ]
  }).then(({ count, size, warnings }) => {
    for (const warning of warnings) {
      console.warn(warning)
    }
    //console.log(`Generated ${swPath}, which will precache ${count} files, totaling ${size} bytes.`)
    console.log('====== workbox task finished ======')
  })

}

module.exports = workbox