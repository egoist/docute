---
nav: zh-Hant
search: zh-Hant
---

# docute

docute 讓你無需編譯文件享受到無縫的文檔撰寫、發布體驗。

<p class="warning">
  This transilation is kind of out-dated, you may check out the <a href="#" router-link="/home">English docs</a> instead.
</p>

## 簡介

`docute` 讓你直接寫 markdown 文件作為文檔來顯示而不需要編譯成 html 這一步，你的文檔目錄裏只需要一個首頁 `index.html` 和你的配置文件 `config.js`。`docute` 會直接渲染這些 markdown 文件為一個單頁應用。

## 安裝

使用 `docute-cli` 來方便初始化一個文檔。

用 npm 安裝:

```bash
npm i -g docute-cli
```

用 Yarn 安裝

```bash
yarn global add docute-cli
```

## 快速入門

假設你想將 markdown 文檔存放在 `./docs` 目錄:

```bash
docute init ./docs
```

這樣就成功初始化了該目錄，目前為止你的文檔目錄中有:

- README.md: 作為文檔首頁的內容顯示
- index.html: 訪問網站時渲染的 html
- config.js: 配置文件
- .nojekyll: 表明這不是一個 jekyll 網站，如果你不是要發布到 github pages 那麽可以忽略它

然後你可以在本地預覽文檔:

```bash
docute ./docs
```

打開 http://localhost:8080 就能看到你的網站了。

### 手動開始

你可能並不喜歡 node.js 或 npm，也可能覺得安裝它們很麻煩，其實你並不需要 `docute-cli`，我們唯一需要的只是一個 `index.html` 文件:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  <title>My Awesome Doc</title>
  <!-- docute 的 CSS -->
  <link rel="stylesheet" href="https://unpkg.com/docute/dist/docute.css">
</head>
<body>
  <div id="app"></div>
  <!-- 你也可以把包含 $config 配置的腳本放到單獨的文件裏 -->
  <!-- 例如 config.js -->
  <script>
    self.$config = {
      // 配置...
    }
  </script>
  <!-- 加載 docute 的 js 庫 -->
  <script src="https://unpkg.com/docute/dist/docute.js"></script>
</body>
</html>
```

## 配置文件

執行 `docute init` 後你的文檔目錄會有一個 `config.js` 配置文件:

```js
self.$config = {
  // 配置...
}
```

### 首頁

文檔目錄裏的 `README.md` 文件會渲染為文檔首頁，但有時你可能會想使用其他文件。例如你將 `./docs` 目錄裏的文件作為 github pages 使用的時候你可能想直接使用項目根目錄裏的 `README.md`，你可以通過配置指向該文件:

```js
self.$config = {
  // 項目根目錄裏的 README.md
  home: 'https://raw.githubusercontent.com/egoist/docute/master/README.md'
}
```

### Landing 頁面

你可以開啟 `landing` 選項來啟用 Landing 頁面:

```js
self.$config = {
  // true 將會預設使用 `landing.html`
  landing: true,
  // 也可以用自定義頁面
  landing: '_my-landing.html',
  // 當然 markdown 文件也可以
  landing: 'landing.md'
}
```

如果你開啟了這個功能，Landing 頁面的路由將是 `/`，而文檔的首頁將改為用 `/home` 訪問。

<p class="warning">
  你不能再動態添加的頁面裏使用 <code>script</code> 標簽，因為動態添加的內容 JS 不會被瀏覽器執行。
</p>

### 多頁面

當然你也可以添加更多頁面來顯示不同內容。例如添加一個 `chinese.md` 用作文檔的中文翻譯，然後就能通過 `/#/chinese` 訪問到這個頁面了！

多頁面支持子目錄，例如一個文件被放到 `language/chinese.md` 那麽它的訪問路徑就是 `/#/lanaguage/chinese`。

注意: 像 `about/README.md` 這樣的文件對應的路由是 `/#/about/`， 而對於路由 `/#/about` 它的源文件是 `about.md`。

### 側邊欄

To disable the sidebar globally, set it to `false` in `config.js`:
想預設隱藏側邊欄，可以在 `config.js` 中將其設置為 `false`:

```js
self.$config = {
  sidebar: false
}
```

或者只隱藏某個頁面的側邊欄:

```markdown
---
sidebar: false
---
用 front-matter 隱藏這個頁面的側邊欄
```

左下角也會有個按鈕用於切換側邊欄，你也可以隱藏它:

```js
self.$config = {
  disableSidebarToggle: true
}
```

#### 目錄表

側邊欄的目錄表 (table of contents) 是從你的 markdown 文件解析來的，我們獲取 markdown 裏的 h2 ~ h5 標題來構成這個目錄。

預設只會顯示 h2 到 h4 的標題，其他標題只有在你頁面滾動到相應區域才會顯示，不過你可以更改最深顯示的標題層級:

```js
self.$config = {
  // 顯示 h2 到 h4 的標題
  tocVisibleDepth: 3
}
```

### 導航欄

當你有多個頁面的時候你很可能需要一個導航欄方便用戶瀏覽，你可以通過配置文件添加導航欄:

```js
self.$config = {
  nav: [
    // 首頁
    {title: 'Home', path: '/'},
    // 中文文檔
    {title: '中文文檔', path: '/language/chinese'}
  ]
}
```

#### 圖標

##### Icon short-hand

```js
self.$config = {
  // slug for your github repo
  repo: 'tj/co',
  // twitter username
  twitter: 'realDonaldTrump',
  // the link to source file of current page
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs'
}
```

To fully customize the `label`, `link` or use custom svg icons, see below.

##### Custom Icons

The built-in svg icons: `github` `twitter` `edit` `menu` `link` `search` `close`, which you can use in the `icon` attribute in `icons` option:

```js
self.$config = {
  icons: [{
    icon: 'github',
    label: 'Contribute on GitHub',
    link: 'https://github.com/owner/repo'
  }]
}
```

This example will have the same effect as using `repo: 'owner/repo'` but with custom label text here.

If you want to use your own SVG, you can set custom icon by providing the id of SVG symbol, [SVG symbols](https://css-tricks.com/svg-symbol-good-choice-icons/) is just a simple way to use inline SVG.

First, add it to your HTML file, which is `index.html` here:

```html
<body>
  <div id="app"></div>
  <!-- you can add it everywhere outside #app -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="my-icon"  viewBox="0 0 22 22">
      <!-- all shapes like `<path>` go here -->
    </symbol>
    <!-- ... other symbols -->
  </svg>
</body>
```

Then use it in `config.js`:

```js
self.$config = {
  icons: [
    {
      label: 'Hovered!', // the text for tooltip
      svgId: 'my-icon', // the id of symbol
      link: 'http://blah.blah'
    }
  ]
}
```

You can also add `svgClass` property to use CSS to control the style of your icon

```js
self.$config = {
  icons: [
    {
      label: 'Hovered!',
      svgId: 'my-icon',
      svgClass: 'my-icon-class',
      link: 'http://blah.blah'
    }
  ]
}
```

```css
/*
  To make consistent with default icon hover effect
  You can:
*/
.my-icon-class {
  fill: #ccc;
}
.my-icon-class:hover {
  fill: #333;
}
```

Check out [index.html](https://github.com/egoist/docute/blob/8aa85c42251aaa7298bd19562f961e59e781717c/docs/index.html#L20-L22) and [config.js](https://github.com/egoist/docute/blob/ab83d3a769b97e77887ccaf124168e88dc4c1c85/docs/config.js#L75-L80) of this doc to see how we add a custom icon for weibo.com (the last icon in the header).

There're many resources for good free SVG icons, for example: [bytesize-icons](https://github.com/danklammer/bytesize-icons) and [simple icons](https://simpleicons.org/).

##### 具名圖標

你可以設置多套圖標，然後給不同頁面指定不同圖標:

```js
self.$config = {
  icons: {
    default: [{label: 'hello'}],
    chinese: [{label: '你好'}]
  }
}
```

現在所有頁面都會使用 `default` 這套圖標，你可以通過 front-matter 指定頁面使用其他圖標，例如使用 `chinese`:

```markdown
---
icons: chinese
---
你好世界
```

#### 下拉菜單

顯示一個下拉菜單以容納多個頁面:

```js
self.$config = {
  nav: [
    {title: '其他語言', type: 'dropdown', items: [
      {title: '中文', path: '/language/chinese'},
      {title: '日語', path: '/language/japanese'}
    ]}
  ]
}
```

#### 具名導航

你可能想要在不同的頁面顯示不同的導航欄，例如英文文檔用預設導航單，然後中文文檔用漢化了的導航欄。

當配置文件中的 `nav` 選項是一個數組的時候，它會被作為所有頁面的預設導航欄，但是你也可以把它設置為一個純對象 `{}` 來擁有多個導航欄。

```js
self.$config = {
  nav: {
    default: [{title: 'Home', path: '/'}],
    chinese: [{title: '首頁', path: '/chinese'}]
  }
}
```

現在你擁有兩個有各自名字的導航欄，目前為止所有頁面還是只會使用 `default` 這個預設導航欄，你可以通過 markdown 文件裏的 front-matter 來切換:

```markdown
---
nav: chinese
---
<!-- 現在這個頁面的導航欄就是叫 chinese 的這個了 -->
你好世界！
```

### Markdown 配置

docute 使用 [marked](https://github.com/chjj/marked) 來解析 markdown 代碼，你可以調整 marked 的預設參數:

```js
self.$config = {
  marked: {
    smartypants: true
    // ...
  }
}
```

完整的參數說明請參考[官方文檔](https://github.com/chjj/marked#options-1)。

### debug

Set `debug` to `true` to enable vue-devtools:

```js
self.$config = {
  debug: true
}
```

## 指南

### 頁面標題

每個頁面在瀏覽器標簽欄中顯示的標題預設是配置文件中 `nav` 裏你定義的 `title` 的值，這個 `title` 的值也會被用作導航欄中顯示的文字。

不過對於瀏覽器標簽欄，你也可以直接通過 markdown 文件裏的 front-matter 來覆蓋頁面在標簽欄中顯示的標題:

```markdown
---
title: 首頁
---
例如這個頁面在導航欄中顯示成「簡體中文」可是在標簽欄中想把它顯示為「首頁」。
```

### 代碼高亮

`docute` uses `Prism.js` to highlight your code blocks, however only a few languages are supported by default, you can highlight other languages by:

```html
<script src="/path/to/docute.js"></script>
<!-- add your language after the main docute bundle -->
<script src="https://unpkg.com/prismjs/components/prism-python.js"></script>
```

Now the `python` code will get highlighten!

```python
def fib(n):
 a,b = 1,1
 for i in range(n-1):
  a,b = b,a+b
 return a
print fib(5)
```

The built-in languages are:

```js
[ 'markup',
  'xml',
  'html',
  'mathml',
  'svg',
  'css',
  'clike',
  'javascript',
  'js',
  'json',
  'bash',
  'yaml',
  'markdown' ]
```

Visit https://unpkg.com/prismjs/components/ for all available programming languages.

### 文檔助手

#### 預置 CSS 樣式

使用預置的 CSS 樣式能讓你的文檔更易讀。

##### p.tip

顯示一段提示

```html
<p class="tip">
  docute 對新手和專家都很實用！
</p>
```

它的呈現效果是:

<p class="tip">
  docute 對新手和專家都很實用！
</p>

##### p.warning

類似 `p.tip` 但更為強調:

```html
<p class="warning">
  雷神小動，刺雲雨零耶，君將留？<br>
  雷神小動，雖不零，吾將留妹留者。<br>
  <strong>日文</strong>：<br><br>
  鳴神の 少し之よみて さし曇り 雨も降らんか 君を留めん<br>
  鳴神の 少し之よみて 降らず之も 我は止まらん 妹し留めば<br>
  <strong>譯文：</strong><br><br>
  隱約雷鳴 陰霾天空 但盼風雨來 能留你在此<br>
  隱約雷鳴 陰霾天空 即使天無雨 我亦留此地<br>
</p>
```

它的呈現效果是:

<p class="warning">
  雷神小動，刺雲雨零耶，君將留？<br>
  雷神小動，雖不零，吾將留妹留者。<br><br>
  <strong>日文</strong>：<br>
  鳴神の 少し之よみて さし曇り 雨も降らんか 君を留めん<br>
  鳴神の 少し之よみて 降らず之も 我は止まらん 妹し留めば<br><br>
  <strong>譯文：</strong><br>
  隱約雷鳴 陰霾天空 但盼風雨來 能留你在此<br>
  隱約雷鳴 陰霾天空 即使天無雨 我亦留此地<br>
</p>

#### Navigation links

Links like `[Go](#heading-slug)` will navagate you to `?id=heading-slug` in current page.

Links like `[Go](/page#heaing-slug)` will navigate you to `/page?id=heading-slug` 

#### 全局變量

你可能會需要這些全局變量:

```js
docute
docute.version // docute 的版本號
docute.store // Vuex store 實例
docute.router // Vue router 實例

Vue // Vue 構造函數
```

### 流量統計

#### Google Analytics

因為 docute 是一個單頁應用，所以和傳統網站相比使用 Google Analytics 的方法略有不同，把下面的代碼添加到 HTML 文件裏即可 (放到 `body` 裏並且在加載 `docute.js` 之後):

```html
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
docute.router.afterEach(function (to) {
  ga('set', 'page', to.fullPath);
  ga('send', 'pageview');
});
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```

<p class="warning">
  注意請把 <code>UA-XXXXX-Y</code> 替換成你自己的跟蹤 ID.
</p>

### 部署到 GitHub

有三個地方可供你存儲文檔:

- `./docs` 目錄
- master 分支
- gh-pages 分支

把文件 push 到 GitHub 之後在項目的 settings 裏選擇其中一個就可以了:

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

如果你想讓網站通過子路徑例如 `/docs` 來訪問, 可以:

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

## 常見疑問

### 這和 gitbook 有什麽不同?

首先 docute 和 gitbook 其實很類似，因為它們都是用來寫文檔並且布局很像，但是 docute 不需要你在發布文檔前先把它編譯到 HTML 文件，並且配置很少的同時保證了實用性，你可以用 docute 寫出很優雅的文檔。

docute 同時總結了我們近幾年使用 gitbook/hexo/jekyll 這類工具撰寫文檔的經驗。

### 為什麽發布之前編譯不好?

這並不是不好，只是有時候我們並不需要。使用一個單頁應用就足夠了，並且免去了很多啰嗦的構建程序。

不過我們也有計劃支持「編譯到 HTML 文件」這一功能，同時也有支持[服務器端渲染的計劃](https://github.com/egoist/docute/issues/12)，後者意味著你不需要構建的同時也能享受更好的 SEO 體驗，雖然現在 Google 已經支持抓取動態網頁上的內容了。

### How to evaluate script tag inside markdown?

Since dynamically added script tags won't be executed by browser, you can manually implement this by a plugin:

```js
function evalPlugin(ctx) {
  ctx.event.on('content:updated', function () {
    document.querySelectorAll('.content script').forEach(function (el) {
      var execute = new Function(el.innerHTML)
      execute()
    })
  })
}
```

For docs about plugins please head to <span router-link="/plugins">plugins</span>.
