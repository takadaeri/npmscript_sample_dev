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
## CSS設計（自分用に更新中）
/index.html にスタイル設計のCSS管理について記載
- _mixin.scss：mixin関数
- _value.scss：変数管理
- components/：コンポーネント
- init/：リセットCSS、サイトベースCSS
- structures/：ストラクチャー
- utility/：ユーティリティ

## PWA対応（試運転中）
ホームアイコン追加、manifest.json、service workerのプリキャッシュとランタイムキャッシュに対応
- manifest.json, 各種アイコン は create-pwa を使用 （良い感じに組み込めるPWAのモジュールが無かったので手動でディレクトリ移動）
- service worker は workbox を使用
