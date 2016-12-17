---
nav: zh-Hant
search: zh-Hant
---

# 插件

插件提供了壹些額外的功能同時不讓 docute 本身變得臃腫。

## 插件列表

### DocSearch

DocSearch 是壹個 [algolia.com](http://algolia.com) 提供的免費搜索服務，這大概是最簡單的整合搜索到妳的文檔的方式。

要是用這個插件，先[申請加入 docsearch 項目](https://community.algolia.com/docsearch/)，然後他們會通過郵件發送 API key 和 indexName 給妳，並且告訴妳壹些使用方法。

不過和他們的方法有所不同，在 docute 妳只需要引入我們提供的 docsearch 插件就行了:

```html
<!-- 把 docsearch 插件放在最前面 -->
<script src="https://unpkg.com/docute/plugins/docsearch.js"></script>
<script src="config.js"></script>
<script src="https://unpkg.com/docute/dist/docute.js"></script>
```

最後在 `config.js` 中配置壹下:

```js
self.$config = {
  // docsearch 方法由插件提供
  plugins: [
    docsearch({
      apiKey: '妳的 API Key',
      indexName: '妳的 Index Name',
      // docsearch 允許妳把抓取的內容按照 tag 分類
      // 詳情請聯系 algolia 客服，這裏妳只需要把妳想搜索的 tag 填進來就行了
      tags: ['english', 'zh-Hans', 'zh-Hant']
    })
  ],
  // 這個插件同時需要妳的 URL
  // 因為 docsearch 是按照妳的線上 URL 抓取內容的
  url: 'https://docute.js.org'
}
```

妳可以查看 docute.js.org 在 algolia docsearch 的[配置文件](https://github.com/algolia/docsearch-configs/blob/master/configs/docute.json)，他們為這個網站按照 `english` `zh-Hans` `zh-Hant` 這些 tag 抓取內容。默認情況下搜索框會搜索所有內容，但是比如妳在英文頁面只想搜索英文內容，那麽妳可以用 front-matter 設置妳想搜索的 tag:

```markdown
---
search: english
---
現在這個頁面上的搜索框只會搜索 english tag 下抓取到的內容。
```

這個 `search` 屬性也可以是壹個數組，這樣妳可以在多個 tag 中搜索:

```markdown
---
search: 
  - zh-Hans
  - zh-Hant
---
挺簡單吧 :)
```

## 開發壹個插件

壹個插件就是壹個函數，它的第壹個參數 `context` 可以訪問 `router` 和 `store`:

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

如果妳的插件是需要用戶提供參數的，那麽用壹個高階函數就行了:

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
  妳的插件也可以訪問 `window.fetch` 方法並且不需要任何 polyfill，因為我們已經加上了。
</p>
