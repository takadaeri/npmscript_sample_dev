/**
 * metaデータ、ファイルリストデータ生成タスク
 */

const xlsx = require('xlsx') // エクセルからjson生成する
const workbook = xlsx.readFile('./src/_developresources/_pug/data/sitemap.xlsx')
const sheetArr = workbook.SheetNames

// 吐き出し用metaデータの生成
let metaData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetArr[0]])
for (var i = 1; i < sheetArr.length; i++) {
  var oneJsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetArr[i]])
  metaData = metaData.concat(oneJsonData)
}
const data = {}
for (const [index, key] of metaData.entries()) {
  data[key.path] = metaData[index]
}

// ファイルリスト用データの生成
let filelist = []
for (var j = 0; j < sheetArr.length; j++) {
  let sheetObj = {}
  var sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetArr[j]])
  sheetObj.sheetname = sheetArr[j]
  sheetObj.list = sheetData
  filelist.push(sheetObj)
}

module.exports = {data, filelist}
