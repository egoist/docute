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

这样就成功初始化了该目录，目前为止你的文档目录中有:

- README.md: 作为文档首页的内容显示
- index.html: 访问网站时渲染的 html
- config.js: 配置文件
- .nojekyll: 表明这不是一个 jekyll 网站，如果你不是要发布到 github pages 那么可以忽略它

然后你可以在本地预览文档:

```bash
docute ./docs
```

打开 http://localhost:8080 就能看到你的网站了。

## 配置文件

执行 `docute init` 后你的文档目录会有一个 `config.js` 配置文件:

```js
self.$config = {
  // 站点名称
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

##### 内置图标

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

##### 自定义图标

你可以指定一个 SVG symbol 的 id 来添加自定义图标，[SVG symbols](https://css-tricks.com/svg-symbol-good-choice-icons/) 让你能够轻松地使用 inline SVG 图标。

首先，把 SVG 图标添加到 HTML 中，这里是 `index.html`:

```html
<body>
  <div id="app"></div>
  <!-- 添加到任意 #app 以外的地方-->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="my-icon"  viewBox="0 0 22 22">
      <!-- 图标里的图形比如 `<path>` 放在这里 -->
    </symbol>
    <!-- ... 其它 symbols -->
  </svg>
</body>
```

然后在 `config.js` 中定义:

```js
self.$config = {
  icons: [
    {
      label: '鼠标移上来了!', // 鼠标移到图标上显示的提示
      svgId: 'my-icon' // symbol 的 id
    }
  ]
}
```

你也可以添加一个 `svgClass` 以便你能通过 CSS 来控制图标样式:

```js
self.$config = {
  icons: [
    {
      label: '鼠标移上来了!',
      svgId: 'my-icon',
      svgClass: 'my-icon-class'
    }
  ]
}
```

```css
/*
  比如让自定义图标和内置图标的 hover 效果相同
*/
.my-icon-class {
  fill: #ccc;
}
.my-icon-class:hover {
  fill: #333;
}
```

网络上有很多免费的优质 SVG 图标资源，比如 [bytesize-icons](https://github.com/danklammer/bytesize-icons) 和 [simple icons](https://simpleicons.org/)。

##### 具名图标

你可以设置多套图标，然后给不同页面指定不同图标:

```js
self.$config = {
  icons: {
    default: [{label: 'hello'}],
    chinese: [{label: '你好'}]
  }
}
```

现在所有页面都会使用 `default` 这套图标，你可以通过 front-matter 指定页面使用其它图标，比如使用 `chinese`:

```markdown
---
icons: chinese
---
你好世界
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

### 页面标题

每个页面在浏览器标签栏中显示的标题默认是配置文件中 `nav` 里你定义的 `title` 的值，这个 `title` 的值也会被用作导航栏中显示的文字。

不过对于浏览器标签栏，你也可以直接通过 markdown 文件里的 front-matter 来覆盖页面在标签栏中显示的标题:

```markdown
---
title: 首页
---
比如这个页面在导航栏中显示成「简体中文」可是在标签栏中想把它显示为「首页」。
```

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

docute 已经对一些语言内置了代码高亮 `javascript` `cpp` `css` `xml` `bash` `markdown` `yaml`，你不用添加任何代码就能高亮这些语言。

访问 https://unpkg.com/highlight-languages/ 查看所有可添加的代码语言。

### 文档助手

#### 预置 CSS 样式

使用预置的 CSS 样式能让你的文档更易读。

##### p.tip

显示一段提示

```html
<p class="tip">
  docute 对新手和专家都很实用！
</p>
```

它的呈现效果是:

<p class="tip">
  docute 对新手和专家都很实用！
</p>

##### p.warning

类似 `p.tip` 但更为强调:

```html
<p class="warning">
  雷神小动，刺云雨零耶，君将留？<br>
  雷神小动，虽不零，吾将留妹留者。<br>
  <strong>日文</strong>：<br><br>
  鸣神の 少しとよみて さし昙り 雨も降らんか 君を留めん<br>
  鸣神の 少しとよみて 降らずとも 我は止まらん 妹し留めば<br>
  <strong>译文：</strong><br><br>
  隐约雷鸣 阴霾天空 但盼风雨来 能留你在此<br>
  隐约雷鸣 阴霾天空 即使天无雨 我亦留此地<br>
</p>
```

它的呈现效果是:

<p class="warning">
  雷神小动，刺云雨零耶，君将留？<br>
  雷神小动，虽不零，吾将留妹留者。<br><br>
  <strong>日文</strong>：<br>
  鸣神の 少しとよみて さし昙り 雨も降らんか 君を留めん<br>
  鸣神の 少しとよみて 降らずとも 我は止まらん 妹し留めば<br><br>
  <strong>译文：</strong><br>
  隐约雷鸣 阴霾天空 但盼风雨来 能留你在此<br>
  隐约雷鸣 阴霾天空 即使天无雨 我亦留此地<br>
</p>

#### HTML 属性

你可以用内置的 HTML DOM 属性实现一些 JS 效果:

##### jump-to-id

跳到一个标题，比如 `/#/?id=install`:

```html
<a href="#" jump-to-id="install">查看安装提示!</a>
```

<p class="tip">
  注意这种方法智能在当前页面是用，他并不能跳到其它的页面的标题。跨页面跳转请使用 <a href="#" jump-to-id="router-link">router-link</a> 属性。
</p>

##### router-link

页面间跳转，支持 URL 和查询参数 (query):

```html
<a href="#" router-link="/">首页</a>
<a href="#" router-link="/chinese?id=install">查看中文安装指南</a>
```

<p class="warning">
  请勿用 <code>router-link</code> 来跳到当前页面的一个标题处，这样使用会导致没有滑动效果，应该用 <a href="#" jump-to-id="jump-to-id">jump-to-id</a> 属性来实现。
</p>

#### 全局变量

你可能会需要这些全局变量:

```js
docute
docute.version // docute 的版本号
docute.store // Vuex store 实例
docute.router // Vue router 实例

Vue // Vue 构造函数
```

### 部署到 GitHub

有三个地方可供你存储文档:

- `./docs` 目录
- master 分支
- gh-pages 分支

把文件 push 到 GitHub 之后在项目的 settings 里选择其中一个就可以了:

<img src="https://docute.js.org/assets/deploy.png" alt="deploy" width="500">

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
