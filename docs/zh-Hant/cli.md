---
nav: zh-Hant
---

# docute-cli

`docute-cli` 可以幫你快速創建一個 `index.html` `config.js` `README.md`，以及有一個帶 live reload 的 dev server 等等功能。

## 初始化目錄

初始化一個文件夾用來存放文檔，比如 `./docs`:

```bash
# 默認的目錄就是 ./docs
docute init
# 你可以指定其它目錄
docute init ./my-docs
```

更多這個命令的參數可以執行 `docute init --help` 來查看。

## 本地預覽

`docute preview` 是默認的命令，也就是相當於直接執行 `docute`。執行 `docute` 的效果:

<img src="./assets/command-preview.png" alt="preview" width="500">

你可以使用 `--watch` 來開啟 live reload 功能，更多這個命令的參數可以執行 `docute --help` 來查看。
