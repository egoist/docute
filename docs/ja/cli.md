---
nav: ja
search: ja
---

# docute-cli

`docute-cli`を利用して、`index.html` `config.js` `README.md`を含んだディレクトリと、live reload 機能がついている dev サーバーを初期化しましょう。

## 初期化

一つのディレクトリが作り出されます。例えば`./docs`：

```bash
# デフォルトディレクトリは ./docs です
docute init
# 別のディレクトリを指定します
docute init ./my-docs
```

詳しくは、`docute init --help`でご覧ください。

## ローカルでプレビュー

デフォルトコマンドは`docute preview`で、イコール`docute`コマンドです：

<img src="/assets/command-preview.png" alt="preview" width="500">

`--watch`オプションを利用して live reload 機能をオンにします。詳しくは、`docute --help`でご覧ください。
