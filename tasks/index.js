const bs = require('browser-sync').create()
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const rootDir = process.cwd()

/************************************************v
task module
************************************************/

const sasslint = require('./stylelint') // scssのlint
const dele = require('./dele') // 削除
const copy = require('./copy') // コピー
const html = require('./html') // html（pug）
const sass = require('./sass') // css（scss）
const image = require('./image') // image
const script = require('./script') // webpack
const watch = require('./watch') // watch

/************************************************
path
************************************************/

const isDev = NODE_ENV === 'dev' ? true : false
const src = `${rootDir}/src`
const dist = `${rootDir}/dist`

/************************************************
data
************************************************/

const {data,filelist} = require('./data') // metaデータ生成

/************************************************
task
************************************************/

const stylelintTask = () => {
  sasslint(src)
}
const copyTask = () => {
  copy(src, dist)
}
const htmlTask = (f) => {
  if (f) {
    html(src, dist, data, f)
  } else {
    html(src, dist, data, '/**/*.pug')
  }
}
const cssTask = (f) => {
  if (f) {
    sass(src, dist, isDev, f)
  } else {
    sass(src, dist, isDev, '/**/!(_)*.scss')
  }
}
const imageTask = (f) => {
  if (f) {
    image(src, dist, f)
  } else {
    image(src, dist, '/**/*.{gif,jpg,png,svg}')
  }
}
const scriptTask = () => {
  script()
}

/************************************************
watch
************************************************/

// fで監視ファイルを渡す
const watchTasks = () => {
  watch(src + '/**/*.pug', f => {
    htmlTask(f)
  })
  watch(src + '/**/*.scss', f => {
    cssTask(f)
  })
  watch(src + '/**/*.{gif,jpg,png,svg}', f => {
    imageTask(f)
  })
}

/************************************************
localhost
************************************************/

const serverTask = () => {
  bs.init({
    open: 'external',
    notify: false,
    host: 'localhost',
    ghostMode: false,
    server: [dist],
    https: false // or true
  })

  bs.watch(`${dist}/**/*.js`).on('change', bs.reload)
  bs.watch(`${dist}/**/*.html`).on('change', bs.reload)
  bs.watch(`${dist}/**/*.css`, (e, f) => {
    if (e === 'change') {
      bs.reload('*.css')
    }
  })
  bs.watch(`${dist}/**/*.{gif,jpg,png,svg}`).on('change', bs.reload)
}

/************************************************
run
************************************************/

// コンパイル先ディレクトリ内を削除してから各タスクを走らせる
dele(dist, () => {
  stylelintTask()
  copyTask()
  htmlTask()
  cssTask()
  imageTask()
  scriptTask()
  if (isDev) {
    // 開発中はwatchとサーバーも走らせる
    watchTasks()
    serverTask()
  }
})
