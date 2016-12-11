---
nav: zh-Hans
---

# docute

docute 让你无需编译文件享受到无缝的文档撰写、发布体验。

## 简介

`docute` 让你直接写 markdown 文件作为文档来显示而不需要编译成 html 这一步，你的文档目录里只需要一个首页 `index.html` 和你的配置文件 `config.js`。`docute` 会直接渲染这些 markdown 文件为一个单页应用。

## 安装

使用 `docute-cli` 来方便初始化一个文档。

用 npm 安装:

```bash
npm i -g docute-cli
```

用 Yarn 安装

```bash
yarn global add docute-cli
```

## 快速入门

假设你想将 markdown 文档存放在 `./docs` 目录:

```bash
docute init ./docs
```

这样就成功初始化了该目录，尝试添加一个 README.md 作为文档的首页吧！然后在本地预览文档 `./docs` 目录:

```bash
docute ./docs
```

打开 http://localhost:8080 就能看到你的网站了。

## 配置文件

执行 `docute init` 后你的文档目录会有一个 `config.js` 配置文件:

```js
self.$config = {
  // 站点名称
  title: 'My Website Name'
  // 其它配置...
}
```

### 多页面

`README.md` 文件会渲染为文档首页，当然你也可以添加更多页面来显示不同内容。比如添加一个 `chinese.md` 用作文档的中文翻译，然后就能通过 `/#/chinese` 访问到这个页面了！

多页面支持子目录，比如一个文件被放到 `language/chinese.md` 那么它的访问路径就是 `/#/lanaguage/chinese`。

注意: 像 `about/README.md` 这样的文件对应的路由是 `/#/about/`， 而对于路由 `/#/about` 它的源文件是 `about.md`。

### 导航栏

当你有多个页面的时候你很可能需要一个导航栏方便用户浏览，你可以通过配置文件添加导航栏:

```js
self.$config = {
  nav: [
    // 首页
    {title: 'Home', path: '/'},
    // 中文文档
    {title: '中文文档', path: '/language/chinese'}
  ]
}
```

#### 图标

```js
self.$config = {
  // github repo 的缩略名
  repo: 'tj/co',
  // twitter 用户名
  twitter: 'realDonaldTrump',
  // 页面源文件地址
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs'
}
```

#### 下拉菜单

显示一个下拉菜单以容纳多个页面:

```js
self.$config = {
  nav: [
    {title: '其他语言', type: 'dropdown', items: [
      {title: '中文', path: '/language/chinese'},
      {title: '日语', path: '/language/japanese'}
    ]}
  ]
}
```

#### 具名导航

你可能想要在不同的页面显示不同的导航栏，比如英文文档用默认导航单，然后中文文档用汉化了的导航栏。

当配置文件中的 `nav` 选项是一个数组的时候，它会被作为所有页面的默认导航栏，但是你也可以把它设置为一个纯对象 `{}` 来拥有多个导航栏。

```js
self.$config = {
  nav: {
    default: [{title: 'Home', path: '/'}],
    chinese: [{title: '首页', path: '/chinese'}]
  }
}
```

现在你拥有两个有各自名字的导航栏，目前为止所有页面还是只会使用 `default` 这个默认导航栏，你可以通过 markdown 文件里的 front-matter 来切换:

```markdown
---
navbar: chinese
---
<!-- 现在这个页面的导航栏就是叫 chinese 的这个了 -->
你好世界！
```

## 指南

### 代码高亮

`docute` 使用 `highlight.js` 来高亮代码:

```html
<script src="/path/to/docute.js"></script>
<!-- 添加你要高亮的语言 -->
<script src="https://unpkg.com/highlight-languages/python.js"></script>
```

现在 `python` 代码就会被高亮了！

```python
def fib(n):
 a,b = 1,1
 for i in range(n-1):
  a,b = b,a+b
 return a
print fib(5)
```

docute 已经对一些语言内置了代码高亮 `javascript` `cpp` `css` `xml` `bash` `markdown`，你不用添加任何代码就能高亮这些语言。

### 部署到 GitHub

有三个地方可供你存储文档:

- `./docs` 目录
- master 分支
- gh-pages 分支

把文件 push 到 GitHub 之后在项目的 settings 里选择其中一个就可以了:

<img src="./assets/deploy.png" alt="deploy" width="500">

### 部署到 VPS

#### 使用 nginx

nginx conf 示例:

```nginx
server {
  listen 80;
  server_name  your.domain.com;

  location / {
    alias /path/to/dir/of/docs;
    index index.html;
  }
}
```

如果你想让网站通过子路径比如 `/docs` 来访问, 可以:

```nginx
server {
  listen 80;
  server_name  your.domain.com;

  location /docs {
    alias /path/to/dir/of/docs;
    index index.html;
  }
}
```
