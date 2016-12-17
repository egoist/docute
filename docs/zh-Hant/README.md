---
nav: zh-Hant
search: zh-Hant
---

# docute

docute 讓妳無需編譯文件享受到無縫的文檔撰寫、發布體驗。

## 簡介

`docute` 讓妳直接寫 markdown 文件作為文檔來顯示而不需要編譯成 html 這壹步，妳的文檔目錄裏只需要壹個首頁 `index.html` 和妳的配置文件 `config.js`。`docute` 會直接渲染這些 markdown 文件為壹個單頁應用。

## 安裝

使用 `docute-cli` 來方便初始化壹個文檔。

用 npm 安裝:

```bash
npm i -g docute-cli
```

用 Yarn 安裝

```bash
yarn global add docute-cli
```

## 快速入門

假設妳想將 markdown 文檔存放在 `./docs` 目錄:

```bash
docute init ./docs
```

這樣就成功初始化了該目錄，目前為止妳的文檔目錄中有:

- README.md: 作為文檔首頁的內容顯示
- index.html: 訪問網站時渲染的 html
- config.js: 配置文件
- .nojekyll: 表明這不是壹個 jekyll 網站，如果妳不是要發布到 github pages 那麽可以忽略它

然後妳可以在本地預覽文檔:

```bash
docute ./docs
```

打開 http://localhost:8080 就能看到妳的網站了。

## 配置文件

執行 `docute init` 後妳的文檔目錄會有壹個 `config.js` 配置文件:

```js
self.$config = {
  // 站點名稱
  title: 'My Website Name'
  // 其它配置...
}
```

### 多頁面

`README.md` 文件會渲染為文檔首頁，當然妳也可以添加更多頁面來顯示不同內容。比如添加壹個 `chinese.md` 用作文檔的中文翻譯，然後就能通過 `/#/chinese` 訪問到這個頁面了！

多頁面支持子目錄，比如壹個文件被放到 `language/chinese.md` 那麽它的訪問路徑就是 `/#/lanaguage/chinese`。

註意: 像 `about/README.md` 這樣的文件對應的路由是 `/#/about/`， 而對於路由 `/#/about` 它的源文件是 `about.md`。

### 導航欄

當妳有多個頁面的時候妳很可能需要壹個導航欄方便用戶瀏覽，妳可以通過配置文件添加導航欄:

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

##### 內置圖標

```js
self.$config = {
  // github repo 的縮略名
  repo: 'tj/co',
  // twitter 用戶名
  twitter: 'realDonaldTrump',
  // 頁面源文件地址
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs'
}
```

##### 自定義圖標

妳可以指定壹個 SVG symbol 的 id 來添加自定義圖標，[SVG symbols](https://css-tricks.com/svg-symbol-good-choice-icons/) 讓妳能夠輕松地使用 inline SVG 圖標。

首先，把 SVG 圖標添加到 HTML 中，這裏是 `index.html`:

```html
<body>
  <div id="app"></div>
  <!-- 添加到任意 #app 以外的地方-->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="my-icon"  viewBox="0 0 22 22">
      <!-- 圖標裏的圖形比如 `<path>` 放在這裏 -->
    </symbol>
    <!-- ... 其它 symbols -->
  </svg>
</body>
```

然後在 `config.js` 中定義:

```js
self.$config = {
  icons: [
    {
      label: '鼠標移上來了!', // 鼠標移到圖標上顯示的提示
      svgId: 'my-icon' // symbol 的 id
    }
  ]
}
```

妳也可以添加壹個 `svgClass` 以便妳能通過 CSS 來控制圖標樣式:

```js
self.$config = {
  icons: [
    {
      label: '鼠標移上來了!',
      svgId: 'my-icon',
      svgClass: 'my-icon-class'
    }
  ]
}
```

```css
/*
  比如讓自定義圖標和內置圖標的 hover 效果相同
*/
.my-icon-class {
  fill: #ccc;
}
.my-icon-class:hover {
  fill: #333;
}
```

網絡上有很多免費的優質 SVG 圖標資源，比如 [bytesize-icons](https://github.com/danklammer/bytesize-icons) 和 [simple icons](https://simpleicons.org/)。

##### 具名圖標

妳可以設置多套圖標，然後給不同頁面指定不同圖標:

```js
self.$config = {
  icons: {
    default: [{label: 'hello'}],
    chinese: [{label: '妳好'}]
  }
}
```

現在所有頁面都會使用 `default` 這套圖標，妳可以通過 front-matter 指定頁面使用其它圖標，比如使用 `chinese`:

```markdown
---
icons: chinese
---
妳好世界
```

#### 下拉菜單

顯示壹個下拉菜單以容納多個頁面:

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

妳可能想要在不同的頁面顯示不同的導航欄，比如英文文檔用默認導航單，然後中文文檔用漢化了的導航欄。

當配置文件中的 `nav` 選項是壹個數組的時候，它會被作為所有頁面的默認導航欄，但是妳也可以把它設置為壹個純對象 `{}` 來擁有多個導航欄。

```js
self.$config = {
  nav: {
    default: [{title: 'Home', path: '/'}],
    chinese: [{title: '首頁', path: '/chinese'}]
  }
}
```

現在妳擁有兩個有各自名字的導航欄，目前為止所有頁面還是只會使用 `default` 這個默認導航欄，妳可以通過 markdown 文件裏的 front-matter 來切換:

```markdown
---
navbar: chinese
---
<!-- 現在這個頁面的導航欄就是叫 chinese 的這個了 -->
妳好世界！
```

## 指南

### 頁面標題

每個頁面在瀏覽器標簽欄中顯示的標題默認是配置文件中 `nav` 裏妳定義的 `title` 的值，這個 `title` 的值也會被用作導航欄中顯示的文字。

不過對於瀏覽器標簽欄，妳也可以直接通過 markdown 文件裏的 front-matter 來覆蓋頁面在標簽欄中顯示的標題:

```markdown
---
title: 首頁
---
比如這個頁面在導航欄中顯示成「簡體中文」可是在標簽欄中想把它顯示為「首頁」。
```

### 代碼高亮

`docute` 使用 `highlight.js` 來高亮代碼:

```html
<script src="/path/to/docute.js"></script>
<!-- 添加妳要高亮的語言 -->
<script src="https://unpkg.com/highlight-languages/python.js"></script>
```

現在 `python` 代碼就會被高亮了！

```python
def fib(n):
 a,b = 1,1
 for i in range(n-1):
  a,b = b,a+b
 return a
print fib(5)
```

docute 已經對壹些語言內置了代碼高亮 `javascript` `cpp` `css` `xml` `bash` `markdown` `yaml`，妳不用添加任何代碼就能高亮這些語言。

訪問 https://unpkg.com/highlight-languages/ 查看所有可添加的代碼語言。

### 文檔助手

#### 預置 CSS 樣式

使用預置的 CSS 樣式能讓妳的文檔更易讀。

##### p.tip

顯示壹段提示

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
  隱約雷鳴 陰霾天空 但盼風雨來 能留妳在此<br>
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
  隱約雷鳴 陰霾天空 但盼風雨來 能留妳在此<br>
  隱約雷鳴 陰霾天空 即使天無雨 我亦留此地<br>
</p>

#### HTML 屬性

妳可以用內置的 HTML DOM 屬性實現壹些 JS 效果:

##### jump-to-id

跳到壹個標題，比如 `/#/?id=install`:

```html
<a href="#" jump-to-id="install">查看安裝提示!</a>
```

<p class="tip">
  註意這種方法只能在當前頁面使用，他並不能跳到其它的頁面的標題。跨頁面跳轉請使用 <a href="#" jump-to-id="router-link">router-link</a> 屬性。
</p>

##### router-link

頁面間跳轉，支持 URL 和查詢參數 (query):

```html
<a href="#" router-link="/">首頁</a>
<a href="#" router-link="/chinese?id=install">查看中文安裝指南</a>
```

<p class="warning">
  請勿用 <code>router-link</code> 來跳到當前頁面的壹個標題處，這樣使用會導致沒有滑動效果，應該用 <a href="#" jump-to-id="jump-to-id">jump-to-id</a> 屬性來實現。
</p>

#### 全局變量

妳可能會需要這些全局變量:

```js
docute
docute.version // docute 的版本號
docute.store // Vuex store 實例
docute.router // Vue router 實例

Vue // Vue 構造函數
```

### 流量統計

#### Google Analytics

因為 docute 是壹個單頁應用，所以和傳統網站相比使用 Google Analytics 的方法略有不同，把下面的代碼添加到 HTML 文件裏即可 (放到 `body` 裏並且在加載 `docute.js` 之後):

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
  註意請把 <code>UA-XXXXX-Y</code> 替換成妳自己的跟蹤 ID.
</p>

### 部署到 GitHub

有三個地方可供妳存儲文檔:

- `./docs` 目錄
- master 分支
- gh-pages 分支

把文件 push 到 GitHub 之後在項目的 settings 裏選擇其中壹個就可以了:

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

如果妳想讓網站通過子路徑比如 `/docs` 來訪問, 可以:

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

### 側邊欄是從哪來的?

側邊欄 (或者說目錄表) 是從妳的 markdown 文件解析來的，我們獲取 markdown 裏的 h2 ~ h5 標題來構成這個目錄。

### 這和 gitbook 有什麽不同?

首先 docute 和 gitbook 其實很類似，因為它們都是用來寫文檔並且布局很像，但是 docute 不需要妳在發布文檔前先把它編譯到 HTML 文件，並且配置很少的同時保證了實用性，妳可以用 docute 寫出很優雅的文檔。

docute 同時總結了我們近幾年使用 gitbook/hexo/jekyll 這類工具撰寫文檔的經驗。

### 為什麽發布之前編譯不好?

這並不是不好，只是有時候我們並不需要。使用壹個單頁應用就足夠了，並且免去了很多啰嗦的構建程序。

不過我們也有計劃支持「編譯到 HTML 文件」這壹功能，同時也有支持[服務器端渲染的計劃](https://github.com/egoist/docute/issues/12)，後者意味著妳不需要構建的同時也能享受更好的 SEO 體驗，雖然現在 Google 已經支持抓取動態網頁上的內容了。
