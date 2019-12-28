// pugタスク
// @param {string} src - htmlファイル群が入っているディレクトリのルート
// @param {string} dist - 出力先のディレクトリのルート
// @param {object} data - pugで使用するデータ

const webpack = require('webpack')
const webpackcli = require('webpack-cli')
const path = require('path') // パス操作

const script = () => {

  console.log(path.resolve() + '/webpack.config.js')
  let webpackConfig = require(path.resolve() + '/webpack.config.js')
  webpack(webpackConfig)
  console.log('====== webpack task finished ======')

}

module.exports = script
