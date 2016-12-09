# docute

docute 让你无需编译文件享受到无缝的文档撰写、发布体验。

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

这样就成功初始化了该目录，常识添加一个 README.md 作为文档的首页吧！然后在本地预览文档 `./docs` 目录:

```bash
docute ./docs
```

打开 http://localhost:8080 就能看到你的网站了。

## 配置文件

执行 `docute init` 后你的文档目录会有一个 `config.js` 配置文件:

```js
self.$config = {
  // 配置内容
}
```

### 多页面

`README.md` 文件会渲染为文档首页，当然你也可以添加更多页面来显示不同内容。比如添加一个 `chinese.md` 用作文档的中文翻译，然后就能通过 `/#/chinese` 访问到这个页面了！

多页面支持子目录，比如一个文件被放到 `language/chinese.md` 那么它的访问路径就是 `/#/lanaguage/chinese`。

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
