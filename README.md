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
