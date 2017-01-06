---
nav: zh-Hant
search: zh-Hant
---

# 插件

插件提供了一些額外的功能同時不讓 docute 本身變得臃腫。

## 插件列表

### DocSearch

DocSearch 是一個 [algolia.com](http://algolia.com) 提供的免費搜尋服務，這大概是最簡單的整合搜尋到你的文檔的方式。

要是用這個插件，先[申請加入 docsearch 項目](https://community.algolia.com/docsearch/)，然後他們會通過郵件發送 API key 和 indexName 給你，並且告訴你一些使用方法。

不過和他們的方法有所不同，在 docute 你只需要引入我們提供的 docsearch 插件就行了:

```html
<!-- 把 docsearch 插件放在最前面 -->
<script src="https://unpkg.com/docute/plugins/docsearch.js"></script>
<script src="config.js"></script>
<script src="https://unpkg.com/docute/dist/docute.js"></script>
```

最後在 `config.js` 中配置一下:

```js
self.$config = {
  // docsearch 方法由插件提供
  plugins: [
    docsearch({
      apiKey: '你的 API Key',
      indexName: '你的 Index Name',
      // docsearch 允許你把抓取的內容按照 tag 分類
      // 詳情請聯系 algolia 客服，這裏你只需要把你想搜尋的 tag 填進來就行了
      tags: ['english', 'zh-Hans', 'zh-Hant']
    })
  ],
  // 這個插件同時需要你的 URL
  // 因為 docsearch 是按照你的線上 URL 抓取內容的
  url: 'https://docute.js.org'
}
```

你可以查看 docute.js.org 在 algolia docsearch 的[配置文件](https://github.com/algolia/docsearch-configs/blob/master/configs/docute.json)，他們為這個網站按照 `english` `zh-Hans` `zh-Hant` 這些 tag 抓取內容。預設情況下搜尋框會搜尋所有內容，但是例如你在英文頁面只想搜尋英文內容，那麽你可以用 front-matter 設置你想搜尋的 tag:

```markdown
---
search: english
---
現在這個頁面上的搜尋框只會搜尋 english tag 下抓取到的內容。
```

這個 `search` 屬性也可以是一個數組，這樣你可以在多個 tag 中搜尋:

```markdown
---
search: 
  - zh-Hans
  - zh-Hant
---
挺簡單吧 :)
```

### Disqus

整合 `disqus` 評論到你的文檔中，它會在文檔區域下方顯示:

首先用一個 `script` 標簽引入:

```html
<script src="https://unpkg.com/docute/plugins/disqus.js"></script>
```

然後在 `config.js` 中配置一下:

```js
self.$config = {
  plugins: [
    disqus({
      shortname: 'SHORT_NAME' // 把這個替換為你的 disqus 站點縮略名
    })
  ]
}
```

我們將來也考慮加入 medium.com 那種的段落內評論的功能。

## 社區插件

- [evanyou](https://github.com/egoist/docute-evanyou): 給 Landing 頁面添加彩帶效果, 就像 [evanyou.me](http://evanyou.me) 那樣

## 開發一個插件

一個插件就是一個函數，它接受一個 `context` 參數:

```js
// config.js
self.$config = {
  plugins: [
    function myPlugin(context) {
      // context.store
      // context.router
    }
  ]
}
```

如果你的插件是需要用戶提供參數的，那麽用一個高階函數就行了:

```js
self.$config = {
  plugins: [
    myPlugin(options)
  ]
}

function myPlugin(options) {
  return function (context) {
    // context.store
    // context.router
  }
}
```

<p class="tip">
  你的插件也可以訪問 `window.fetch` 方法並且不需要任何 polyfill，因為我們已經加上了。
</p>

### Context

`context` 參數有以下屬性:

- Vue: `Vue` 構造函數
- store: vuex store 實例
- router: vue-router 實例
- registerComponent: 用於在頁面裏插入一個組件的函數

#### event

We use [eventstop](https://github.com/egoist/eventstop) as the event system. Basically the only thing you need is using `event.subscribe` to subscribe some inner events in docute.

List of events:

- `content:updated`: emitted after the main content gets updated
  - the first argument is the `vm` which you can use to access the current Vue component
- `jump:started`: emitted before the jumping to id action
  - the first argument is the `id` it jumps to
- `jump:stopped`: emitted after the jumping to id action
  - the first argument is the `id` it jumps to

#### registerComponent

這個函數需要兩個參數: `registerComponent(position, component)`

##### position

Value: `oneOf(['content:start', 'content:end', 'sidebar:start', 'sidebar:end'])`

要插入的位置。

##### component

Type: `VueComponent`

任意的 Vue 組件對象。

```js
registerComponent('content:end', {
  template: '<div>{{name}}</div>',
  data() {
    return {name: 'hello'}
  }
})
```
