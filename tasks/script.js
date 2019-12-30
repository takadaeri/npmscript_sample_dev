// scriptタスク

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
