// webfontタスク
// @param {string} src - webfontファイル群が入っているディレクトリのルート
// @param {string} dist - 出力されるwebfontファイルのディレクトリのルート

const webfont = require('webfont').default; // アイコンフォントを作るモジュール
const consolidate = require('consolidate'); // データを埋め込むモジュール
const fs = require('fs-extra') // ディレクトリを再帰的に作成

const iconfont = (src, dist) => {

  const srcpath = src + '/_developresources/';
  const distpath = dist + '/common/fonts/';
 
  webfont({
    files: srcpath + '_icons/**/*.svg',
    fontName: 'myFont',
    formats: [ 'ttf', 'eot', 'woff' ]
  })
  .then(result => {
    
    consolidate.lodash(srcpath + '_icons/myFontTemp.scss.lodash', { "glyphs": result.glyphsData }, (err, output)=>{
      if (err) { console.log(err) }
      fs.writeFile(srcpath + '_scss/_myfont.scss', output, err => {
        if (err) throw err
      })
    });

    fs.mkdirsSync(distpath)
    fs.writeFile(distpath + 'myFont.eot', result.eot, err => {
      if (err) throw err
    })
    fs.writeFile(distpath + 'myFont.ttf', result.ttf, err => {
      if (err) throw err
    })
    fs.writeFile(distpath + 'myFont.woff', result.woff, err => {
      if (err) throw err
    })

  })
  .catch(error => {
    console.log(error);
    throw error;
  });

}

module.exports = iconfont