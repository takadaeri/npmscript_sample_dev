/**
 * pugタスク
 * @param {string} src - htmlファイル群が入っているディレクトリのルート
 * @param {string} dist - 出力先のディレクトリのルート
 * @param {object} data - pugで使用するデータ
 */

const pug = require('pug') // pugモジュール
const fs = require('fs-extra') // ディレクトリを再帰的に作成
const glob = require('glob') // ファイル名のパターンマッチング
const path = require('path') // パス操作

const html = (src, dist, data, pattern) => {

  glob(pattern, { root: src }, (err, files) => {
  // glob('/**/*.pug', { root: src, ignore: ['/_developresources/**/**/*.pug'] }, (err, files) => { // ignore効かない公式バグ

    if (err) {
      console.log(err)
      return
    }
    const resultArr = []
    const length = files.length
    let count = 0
    files.forEach(file => {

      // ignoreが効かないのでここでパス除外
      if (file.match(/_developresources/)) {
        return
      }

      const f = file.split(src)
      const filename = dist + f[1].replace('.pug','.html')

      let html = pug.renderFile(file, { pretty: true, basedir: src + '/_developresources/_pug/', data: data[f[1].replace('.pug','.html')] })
      
      const dir = path.dirname(filename)

      // ディレクトリが無かったら再帰的に作成
      if (!fs.existsSync(dir)) {
        fs.mkdirsSync(dir)
      }
      
      fs.writeFile(filename, html, err => {
        if (err) throw err
        resultArr.push(f[1])
        count++
        if (count === length) {
          // ファイル数を数えてタスクが完了
          console.log('pug: [' + resultArr.join(', ') + ']')
          console.log('====== pug finished ======')
        }
      })

    })
  })
}

module.exports = html
