/**
 * stylelintタスク
 * @param {string} src - sstylelint対象ファイルが入っているディレクトリのルート
 */

const stylelint = require('stylelint') // stylelintモジュール
const glob = require('glob') // ファイル名のパターンマッチング

const sasslint = (src) => {
  glob('**/*.scss', { root: src }, (err, files) => {

    if (err) {
      console.log(err)
      return
    }

    stylelint
        .lint({
          // config: setting, // .stylelintrc.json で設定しているので記述しない
          files: files,
          fix: true
        })
        .then(function(data) {
          console.log('====== stylelint finished ======')
        })
        .catch(function(err) {
          console.error(err.stack)
        })

  })
}

module.exports = sasslint
