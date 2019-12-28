// 削除タスク
// @param {glob} src - 削除対象のファイルパス
// @param {function} cb - 削除完了後に走らせる関数

const del = require('del') // 削除モジュール

const dele = async (src, cb) => {
  const deletedPaths = await del([src], {
    force: true
  })
  console.log('Deleted files and directories: ', deletedPaths.join('\n'))
  console.log('====== dele finished ======')
  cb()
}

module.exports = dele
