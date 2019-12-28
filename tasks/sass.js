// cssタスク
// @param {string} src - scssファイル群が入っているディレクトリのルート
// @param {string} dist - 出力されるcssファイルのディレクトリのルート
// @param {boolean} isDev - 開発フラグの有無

const sass = require('node-sass') // node用sass
const nodeSassGlobbing = require('node-sass-glob-importer') // sassファイル内でglobを使用する node-sass-globbingがダメなのでこっち
const postcss = require('postcss') // autoprefixerに必要
const autoprefixer = require('autoprefixer') // cssプレフィックス
const fs = require('fs-extra') // ディレクトリを再帰的に作成
const glob = require('glob') // ファイル名のパターンマッチング
const path = require('path') // パス操作

const css = (src, dist, isDev, pattern) => {

  glob(pattern, { root: src }, (err, files) => {

    if (err) {
      console.log(err)
      return
    }
    const resultArr = []
    const length = files.length
    let count = 0
    files.forEach(file => {

      // globのignoreが効かないのでここでパス除外
      if (file.match(/_developresources/)) {
        file = src + '/common/css/common.scss'
      }

      sass.render(
        {
          importer: nodeSassGlobbing(), file,
          outputStyle: isDev ? 'expanded' : 'compressed',
          includePaths: [path.resolve('src/_developresources/_scss')]
        },
        (error, resultSass) => {
          if (error) {
            console.log(error.message)
            return
          }
          const f = file.split(src)
          let filename = dist + f[1]
          filename = filename.replace('.scss', '.css')
          const dir = path.dirname(filename)

          // ディレクトリが無かったら再帰的に作成
          if (!fs.existsSync(dir)) {
            fs.mkdirsSync(dir)
          }

          postcss([autoprefixer]) // postcssのプラグインのautoprefixerを設定
            .process(resultSass.css, { from: undefined })
            .then(resultPost => {
              fs.writeFile(filename, resultPost.css, err => {
                if (err) throw err
                resultArr.push(f[1])
                count++
                if (count === length) {
                  // ファイル数を数えてタスクが完了
                  console.log('css: [' + resultArr.join(', ') + ']')
                  console.log('====== css finished ======')
                }
              })
            })
        }
      )
    })
  })
}

module.exports = css
