---
nav: zh-Hans
search: zh-Hans
---

# 插件

插件提供了一些额外的功能同时不让 docute 本身变得臃肿。

## 插件列表

### DocSearch

DocSearch 是一个 [algolia.com](http://algolia.com) 提供的免费搜索服务，这大概是最简单的整合搜索到你的文档的方式。

要是用这个插件，先[申请加入 docsearch 项目](https://community.algolia.com/docsearch/)，然后他们会通过邮件发送 API key 和 indexName 给你，并且告诉你一些使用方法。

不过和他们的方法有所不同，在 docute 你只需要引入我们提供的 docsearch 插件就行了:

```html
<!-- 把 docsearch 插件放在最前面 -->
<script src="https://unpkg.com/docute/plugins/docsearch.js"></script>
<script src="config.js"></script>
<script src="https://unpkg.com/docute/dist/docute.js"></script>
```

最后在 `config.js` 中配置一下:

```js
self.$config = {
  // docsearch 方法由插件提供
  plugins: [
    docsearch({
      apiKey: '你的 API Key',
      indexName: '你的 Index Name',
      // docsearch 允许你把抓取的内容按照 tag 分类
      // 详情请联系 algolia 客服，这里你只需要把你想搜索的 tag 填进来就行了
      tags: ['english', 'zh-Hans', 'zh-Hant']
    })
  ],
  // 这个插件同时需要你的 URL
  // 因为 docsearch 是按照你的线上 URL 抓取内容的
  url: 'https://docute.js.org'
}
```

你可以查看 docute.js.org 在 algolia docsearch 的[配置文件](https://github.com/algolia/docsearch-configs/blob/master/configs/docute.json)，他们为这个网站按照 `english` `zh-Hans` `zh-Hant` 这些 tag 抓取内容。默认情况下搜索框会搜索所有内容，但是比如你在英文页面只想搜索英文内容，那么你可以用 front-matter 设置你想搜索的 tag:

```markdown
---
search: english
---
现在这个页面上的搜索框只会搜索 english tag 下抓取到的内容。
```

这个 `search` 属性也可以是一个数组，这样你可以在多个 tag 中搜索:

```markdown
---
search: 
  - zh-Hans
  - zh-Hant
---
挺简单吧 :)
```

## 开发一个插件

一个插件就是一个函数，它的第一个参数 `context` 可以访问 `router` 和 `store`:

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

如果你的插件是需要用户提供参数的，那么用一个高阶函数就行了:

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
  你的插件也可以访问 `window.fetch` 方法并且不需要任何 polyfill，因为我们已经加上了。
</p>
