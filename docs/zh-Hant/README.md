---
nav: zh-Hant
---

# docute

docute 讓你無需編譯文件享受到無縫的文檔撰寫、發布體驗。

## 簡介

`docute` 讓你直接寫 markdown 文件作為文檔來顯示而不需要編譯成 html 這一步，你的文檔目錄裡只需要一個首頁 `index.html` 和你的配置文件 `config.js`。 `docute` 會直接渲染這些 markdown 文件為一個單頁應用。

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
- .nojekyll: 表明這不是一個 jekyll 網站，如果你不是要發佈到 github pages 那麼可以忽略它

然後你可以在本地預覽文檔:

```bash
docute ./docs
```

打開 http://localhost:8080 就能看到你的網站了。

## 配置文件

執行 `docute init` 後你的文檔目錄會有一個 `config.js` 配置文件:

```js
self.$config = {
  // ?站點名稱
  title: 'My Website Name'
  // 其它配置...
}
```

### 多頁面

`README.md` 文件會渲染為文檔首頁，當然你也可以添加更多頁面來顯示不同內容。比如添加一個 `chinese.md` 用作文檔的中文翻譯，然後就能通過 `/#/chinese` 訪問到這個頁面了！

多頁面支持子目錄，比如一個文件被放到 `language/chinese.md` 那麼​​它的訪問路徑就是 `/#/lanaguage/chinese`。

注意: 像 `about/README.md` 這樣的文件對應的路由是 `/#/about/`， 而對於路由 `/#/about` 它的源文件是 `about.md`。

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

你可以指定一個 SVG symbol 的 id 來添加自定義圖標，[SVG symbols](https://css-tricks.com/svg-symbol-good-choice-icons/) 讓你能夠輕鬆地使用 inline SVG 圖標。

首先，把 SVG 圖標添加到 HTML 中，這裡是 `index.html`:

```html
<body>
  <div id="app"></div>
  <!-- 添加到任意 #app 以外的地方-->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="my-icon" viewBox="0 0 22 22">
      <!-- 圖標裡的圖形比如 `<path>` 放在這裡 -->
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

你也可以添加一個 `svgClass` 以便你能通過 CSS 來控製圖標樣式:

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

你可以設置多套圖標，然後給不同頁面指定不同圖標:

```js
self.$config = {
  icons: {
    default: [{label: 'hello'}],
    chinese: [{label: '你好'}]
  }
}
```

現在所有頁面都會使用 `default` 這套圖標，你可以通過 front-matter 指定頁面使用其它圖標，比如使用 `chinese`:

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

你可能想要在不同的頁面顯示不同的導航欄，比如英文文檔用默認導航單，然後中文文檔用漢化了的導航欄。

當配置文件中的 `nav` 選項是一個數組的時候，它會被作為所有頁面的默認導航欄，但是你也可以把它設置為一個純對象 `{}` 來擁有多個導航欄。

```js
self.$config = {
  nav: {
    default: [{title: 'Home', path: '/'}],
    chinese: [{title: '首頁', path: '/chinese'}]
  }
}
```

現在你擁有兩個有各自名字的導航欄，目前為止所有頁面還是只會使用 `default` 這個默認導航欄，你可以通過 markdown 文件裡的 front-matter 來切換:

```markdown
---
navbar: chinese
---
<!-- 現在這個頁面的導航欄就是叫 chinese 的這個了 -->
你好世界！
```

## 指南

### 頁面標題

每個頁面在瀏覽器標籤欄中顯示的標題默認是配置文件中 `nav` 裡你定義的 `title` 的值，這個 `title` 的值也會被用作導航欄中顯示的文字。

不過對於瀏覽器標籤欄，你也可以直接通過 markdown 文件裡的 front-matter 來覆蓋頁面在標籤欄中顯示的標題:

```markdown
---
title: 首頁
---
比如這個頁面在導航欄中顯示成「簡體中文」可是在標籤欄中想把它顯示為「首頁」。
```

### 代碼高亮

`docute` 使用 `highlight.js` 來高亮代碼:

```html
<script src="/path/to/docute.js"></script>
<!-- 添加你要高亮的語言 -->
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

docute 已經對一些語言內置了代碼高亮 `javascript` `cpp` `css` `xml` `bash` `markdown` `yaml`，你不用添加任何代碼就能高亮這些語言。

訪問 https://unpkg.com/highlight-languages/ 查看所有可添加的代碼語言。

### 部署到 GitHub

有三個地方可供你存儲文檔:

- `./docs` 目錄
- master 分支
- gh-pages 分支

把文件 push 到 GitHub 之後在項目的 settings 裡選擇其中一個就可以了:

<img src="https://docute.js.org/assets/deploy.png" alt="deploy" width="500">

### 部署到 VPS

#### 使用 nginx

nginx conf 示例:

```nginx
server {
  listen 80;
  server_name your.domain.com;

  location / {
    alias /path/to/dir/of/docs;
    index index.html;
  }
}
```

如果你想讓網站通過子路徑比如 `/docs` 來訪問, 可以:

```nginx
server {
  listen 80;
  server_name your.domain.com;

  location /docs {
    alias /path/to/dir/of/docs;
    index index.html;
  }
}
```
