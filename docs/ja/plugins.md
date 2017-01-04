---
nav: ja
search: ja
---

# プラグイン

プラグイン（plugins）は、いろいろな機能を追加しながら、docute 自体を太くないようにしています。

## プラグインリスト

### DocSearch

DocSearch は[algolia.com](http://algolia.com)が提供して、無料の検索サービスです。これは今にとって最も簡単な検索サービスだと思われています。

このプラグインを使うには、[docsearchプロジェクト](https://community.algolia.com/docsearch/)に登録しなければなりません。すると、API key と indexName 、または使い方を含んだメールが送られます。

しかし、公式の方法と違い、docute には docsearch プラグインだけを導入すればいいです：

```html
<!-- docsearch を最優先に -->
<script src="https://unpkg.com/docute/plugins/docsearch.js"></script>
<script src="config.js"></script>
<script src="https://unpkg.com/docute/dist/docute.js"></script>
```

最後は`config.js`に追加します：

```js
self.$config = {
  plugins: [
  　// docsearch 関数はプラグインが提供しています
    docsearch({
      apiKey: 'あなたのAPI Key',
      indexName: 'あなたのIndex Name',
      // タグによって分類するのも可能です
      tags: ['english', 'zh-Hans', 'zh-Hant']
    })
  ],
  // サイトの URL も必要です
  url: 'https://docute.js.org'
}
```

docute.js.org の[設定ファイル](https://github.com/algolia/docsearch-configs/blob/master/configs/docute.json)を参考してください。通常、すべての内容が検索されていますが、front-matter を使って、特定のタグを検索できます：

```markdown
---
search: english
---
このページで english タグの内容しか検索されていません
```

search プロパティを配列に設定したら、複数のタグが検索されることになります：

```markdown
---
search: 
  - zh-Hans
  - zh-Hant
---
簡単ですね :)
```

### Disqus

`disqus`コメントは、ページの一番下に表示されています。

まずプラグインを導入しましょう：

```html
<script src="https://unpkg.com/docute/plugins/disqus.js"></script>
```

次は`config.js`に以下の内容を追加します：

```js
self.$config = {
  plugins: [
    disqus({
      shortname: 'SHORT_NAME' // あなたの disqus サート名に変更
    })
  ]
}
```

medium.com のような段落内コメント機能は、計画中です。

## コミュニティプラグイン

- [evanyou](https://github.com/egoist/docute-evanyou)：ランディングページに[evanyou.me](http://evanyou.me)のようなリボンエフェクトをつけます。

## プラグインの開発

プラグインは一つの関数で、`context`という引数が使えます。

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

もしあなたのプラグインはユーザーから引数を提供するなら、高階関数を使いましょう：

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
　`window.fetch`は polyfill なしで使えます。
</p>

### Context

`context`引数に、以下のプロパティがあります：

- store: vuex store インスタンス
- router: vue-router インスタンス
- registerComponent: ページにコンポーネントを追加する関数

#### registerComponent

この関数には、２つの引数があります：`registerComponent(position, component)`

##### position

値：`oneOf(['content:start', 'content:end'])`

追加したい位置。

##### component

型：`VueComponent`

任意な Vue コンポーネント。

```js
registerComponent('content:end', {
  template: '<div>{{name}}</div>',
  data() {
    return {name: 'hello'}
  }
})
```
