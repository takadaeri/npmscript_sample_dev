// コピータスク
// @param {string} src - コピー対象のファイルパス
// @param {string} dist - コピー先のファイルパス

const fs = require('fs-extra') // ディレクトリを再帰的に作成
const glob = require('glob') // ファイル名のパターンマッチング
const path = require('path') // パス操作

const copy = (src, dist) => {
  
  glob('/**/*.{html,css,js,ico,php,txt,json,htaccess,pdf,wav,csv,appcache}', { root: src }, (err, files) => {

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
      const filename = dist + f[1]
      const dir = path.dirname(filename)
      
      // ディレクトリが無かったら再帰的に作成
      if (!fs.existsSync(dir)) {
        fs.mkdirsSync(dir)
      }

      fs.copyFile(file, filename, ()=>{
  	    resultArr.push(f[1])
  	    count++
  	    if (count === length) {
  	      // ファイル数を数えてタスクが完了
  	      console.log('copy: [' + resultArr.join(', ') + ']')
  	      console.log('====== copy finished ======')
  	    }
      })

    })

  })
}

module.exports = copy
