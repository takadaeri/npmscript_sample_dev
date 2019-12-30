// imageタスク
// @param {string} src - imageファイル群が入っているディレクトリのルート
// @param {string} dist - 出力先のディレクトリのルート

const imagemin = require('imagemin') // imageminモジュール
const imageminMozjpeg = require('imagemin-mozjpeg') // imagemin jpgモジュール
const imageminPngquant = require('imagemin-pngquant') // imagemin pngモジュール
const imageminGifsicle = require('imagemin-gifsicle') // imagemin gifモジュール
const imageminSvgo = require('imagemin-svgo') // imagemin scgモジュール
const fs = require('fs-extra') // ディレクトリを再帰的に作成
const glob = require('glob') // ファイル名のパターンマッチング
const path = require('path') // パス操作

const image = (src, dist, pattern) => {
  glob(pattern, { root: src }, (err, files) => {

    if (err) {
      console.log(err)
      return
    }

    (async () => {
        const minimages = await imagemin(files, {
            plugins: [
                imageminMozjpeg({ quality: 80 }),
                imageminPngquant({
                    quality: [0.6, 0.8]
                }),
                imageminGifsicle(),
                imageminSvgo()
            ]
        })

        const resultArr = []
        const length = minimages.length
        let count = 0

        minimages.forEach(file => {

          // ignoreが効かないのでここでパス除外
          if (file.sourcePath.match(/_developresources/)) {
            return
          }

          const f = file.sourcePath.split(src)
          const filename = dist + f[1]
          const dir = path.dirname(filename)

          // ディレクトリが無かったら再帰的に作成
          if (!fs.existsSync(dir)) {
            fs.mkdirsSync(dir)
          }

          fs.writeFile(filename, file.data, err => {
            if (err) throw err
            resultArr.push(f[1])
            count++
            if (count === length) {
              // ファイル数を数えてタスクが完了
              console.log('img: [' + resultArr.join(', ') + ']')
              console.log('====== img finished ======')
            }
          })

        })

    })()

  })
}

module.exports = image
