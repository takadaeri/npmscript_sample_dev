/**
 * 監視タスク
 * @param {glob} src - 監視対象のファイルパス
 * @param {function} cb - ファイル更新後に走らせる関数
 */

const chokidar = require('chokidar') //ファイル監視モジュール

const watch = (src, cb) => {
  const watcher = chokidar.watch(src, {
    ignored: /(^|[\/\\])\../,
    persistent: true, // 監視を続けている間プロセスを終了するか
    ignoreInitial: true, // 監視開始時のイベントを無視するかどうか
    awaitWriteFinish: {
      // イベントの発生を遅らせる
      stabilityThreshold: 100,
      pollInterval: 50
    }
  })
  watcher
    .on('add', path => {
      cb(path.split('/src')[1])
    })
    .on('change', path => {
      cb(path.split('/src')[1])
    })
    .on('unlink', path => {
      cb(path.split('/src')[1])
    })
}

module.exports = watch