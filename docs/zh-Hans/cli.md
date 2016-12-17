---
nav: zh-Hans
search: zh-Hans
---

# docute-cli

`docute-cli` 可以帮你快速创建一个 `index.html` `config.js` `README.md`，以及有一个带 live reload 的 dev server 等等功能。

## 初始化目录

初始化一个文件夹用来存放文档，比如 `./docs`:

```bash
# 默认的目录就是 ./docs
docute init
# 你可以指定其它目录
docute init ./my-docs
```

更多这个命令的参数可以执行 `docute init --help` 来查看。

## 本地预览

`docute preview` 是默认的命令，也就是相当于直接执行 `docute`。执行 `docute` 的效果:

<img src="./assets/command-preview.png" alt="preview" width="500">

你可以使用 `--watch` 来开启 live reload 功能，更多这个命令的参数可以执行 `docute --help` 来查看。
