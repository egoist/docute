# Docute

一种轻松创建文档的方式。

## 什么是 Docute ？

Docute 本质上就是一个 JavaScript 文件，它可以获取 Markdown 文件并将它们呈现为单页面应用。

它完全由运行时驱动，因此并不涉及服务端组件，这就意味着没有构建过程。你只需创建一个 HTML 文件和一堆 Markdown 文档，你的网站就差不多完成了！

## 它如何工作？

简而言之：URL 是 API。

访问你的 URL 时，会获取并呈现相应的 markdown 文件：

```
/         => /README.md
/foo      => /foo.md
/foo/     => /foo/README.md
/foo/bar  => /foo/bar.md
```

## 快速开始

假设你在 `./my-docs` 文件夹中有以下文件：

```bash
.
├── README.md
└── index.html
```

`index.html` 看起来像这样：

```html {highlight:[7,'10-16']}
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My Docs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docute@4/dist/docute.css">
  </head>
  <body>
    <div id="docute"></div>
    <script src="https://cdn.jsdelivr.net/npm/docute@4/dist/docute.js"></script>
    <script>
      new Docute({
        target: '#docute'
      })
    </script>
  </body>
</html>
```

然后你可以使用以下命令将此文件夹作为计算机上的静态网站展示：

- Node.js: `npm i -g serve && serve .`
- Python: `python -m SimpleHTTPServer`
- Golang: `caddy`
- ..或任何静态 web 服务器

这是 CodeSandbox 启动器，你可以立即预览或下载到本地运行：

<iframe src="https://codesandbox.io/embed/174359y77?module=%2Fmain.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 浏览器兼容性

Docute 支持所有常青浏览器（ever-green browsers），即没有对 IE 进行支持！
