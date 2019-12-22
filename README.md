# npmscript_sample_dev
npmscriptでnpmモジュールを直操作する開発環境です。

## 使用しているnode modules
- DELETE：　del
- COPY：　-
- DATA：　xlsx
- HTML：　pug
- CSS：　sass, stylelint
- Javascript：　webpack, babel-loader, eslint
- Image：　imagemin, imagemin-mozjpeg, imagemin-pngquant, imagemin-gifsicle, imagemin-svgo

## ディレクトリ構成
- src： 元ソース　（src/_developresources： 各リソースのMixinやモジュールなど）
- dist： 出力ディレクトリ
- tasks： タスク群

## 開発モード
```shell
npm run dev
npm run build
```
## CSS設計
/index.html にスタイル設計のCSS管理について記載
- _mixin.scss：mixin関数
- _value.scss：変数管理
- components/：コンポーネント
- init/：リセットCSS、サイトベースCSS
- structures/：ストラクチャー
- utility/：ユーティリティ