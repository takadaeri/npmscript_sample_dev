const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin') webpackが固まる

const NODE_ENV = process.env.NODE_ENV
const rootDir = process.cwd()

const src = `${rootDir}/src/_developresources/_js`
const dist = `${rootDir}/dist/common/js`
const distSW = `${rootDir}/dist`

let webpackConfig = {
  // prodの設定
  mode: 'production'
}
if (NODE_ENV === 'dev') {
  // devの設定
  webpackConfig = {
    devtool: 'inline-source-map',
    watch: true,
    mode: 'development'
  }
}

webpackConfig = Object.assign(webpackConfig, {
  entry: {
    'common': src + '/common.js',
    'push/index': src + '/push/index.js'
  },
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: 'dist/common/js'
  },
  module: {
    // Loaderの設定
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|dist|tasks)/,
        loader: "eslint-loader",
        options: {
            fix: true
        }
      },
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        // exclude: /node_modules[\\\/](?!(dom7|ssr-window|swiper)[\\\/]).*/,  //プラグイン使用する場合
        exclude: /(node_modules|dist|tasks)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|dist|tasks)/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: 'babel-loader',
              },
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-plain-loader',
          }
        ]
      }
    ]
  },
  // plugins: [
  //   new WorkboxWebpackPlugin.GenerateSW({
  //     globDirectory: distSW,
  //     globPatterns: ['/**/*.{html,js,css}', '/**/*.{jpg,png,gif,svg}'],
  //     swDest: distSW + '/service-worker.js',
  //     clientsClaim: true,
  //     skipWaiting: true,
  //     runtimeCaching: [
  //       {
  //         urlPattern: new RegExp('/'),
  //         handler: 'staleWhileRevalidate',
  //       },
  //       {
  //         urlPattern: new RegExp('https://www.googleapis.com/'),
  //         handler: 'cacheFirst',
  //         options: {
  //           cacheName: 'api',
  //           expiration: {
  //             maxEntries: 100,
  //             maxAgeSeconds: 72 * 60 * 60
  //           },
  //           cacheableResponse: { statuses: [0, 200] },
  //         }
  //       },
  //     ],
  //   })
  // ],
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': src
    }
  }
})

module.exports = webpackConfig
