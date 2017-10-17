---
nav: ja
search: ja
---

# docute

docute を使い、ビルドプロセス（build process）なしにドキュメントを作りましょう。

<p class="danger">
  This translation is out-dated, please check out the <a href="#" router-link="/home">English docs</a> instead.
</p>

## はじめに

`docute`を利用して、markdown ファイルを直接に HTML コードとして変換して出力することができます。ホームページの`index.html`と設定ファイルの`config.js`だけあれば、`docute`は自動的に markdown ファイルを SPA に作成できます。

## インストール

`docute-cli`を使って便利に初期化できます。`docute-cli`をインストールするには、以下のコマンドを実行しましょう。

NPM：

```bash
npm i -g docute-cli
```

Yarn：

```bash
yarn global add docute-cli
```

## 初期化

markdown ファイルを`./docs`ディレクトリに置いた場合には：

```bash
docute init ./docs
```

これで`./docs`での初期化が完了します。このディレクトリには、以下のファイルが作り出されます：

- README.md：ホームページとして表示されています。
- index.html：必要な script と style ファイルを含んで、サイトへアクセスする時に使うHTMLファイルです。
- config.js：設定ファイル。
- .nojekyll：jekyll のサイトではないことを表すファイルです。Github pages にデプロイするつもりのない場合は、無視してください。

すると、ローカルでプレビューできます：

```bash
docute ./docs
```

http://localhost:8080でサイトを見てみましょう。

### 手動で初期化

node.js や npm が好きではない方に対して、ただ一つの`index.html`ファイルを作るのは十分です：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  <title>My Awesome Doc</title>
  <!-- docuteのスタイルファイル -->
  <link rel="stylesheet" href="https://unpkg.com/docute/dist/docute.css">
</head>
<body>
  <div id="app"></div>
  <!-- $config を含んだ設定ファイルも使えます -->
  <!-- 例えばconfig.js -->
  <script>
    self.$config = {
      // configs...
    }
  </script>
  <!-- docute ライブラリを導入します  -->
  <script src="https://unpkg.com/docute/dist/docute.js"></script>
</body>
</html>
```


## 設定ファイル

`docute init`を実行したら、ディレクトリに`config.js`というファイルが作り出されます。

```js
self.$config = {
  // blah...
}
```

### ホームページ

`README.md`ファイルはドキュメントのホームページとしてレンダリングされていますが、別のファイルをホームページにしたい場合は、以下のように設定してください：

```js
self.$config = {
  // ルート・ディレクトリの中の README.md
  home: 'https://raw.githubusercontent.com/egoist/docute/master/README.md'
}
```

### ランディングページ

`landing`オプションを使ってランディングページを有効にします。

```js
self.$config = {
  // trueと設定したら、`landing.html`がランディングページになります
  landing: true,
  // 別のファイルを使う時
  landing: '_my-landing.html',
  // もちろんmarkdownファイルも使えます
  landing: 'landing.md'
}
```

ランディングページを有効にすれば、ルーターには`/`がランディングページ、`/home`がドキュメントのホームページとなります。

### マルチページ

複数の markdown ファイルを作り、マルチページで表示できます。例えば、`chinese.md`を作成すると、`/#/chinese`ページがレンダリングされます。

サブディレクトリの場合も利用可能です。例えば、`language/chinese.md`を作成すれば、`/#/language/chinese`に通してアクセスできます。

注意点：`about/README.md`ファイルに対してのルーターは`/#/about/`ですが、`/#/about`（末尾の／なし）ルーターには、`about.md`ファイルとなっています。

### サイドバー

`sidebar`オプションを`false`に設定すると、サイドバーは全体的に無効になります。

```js
self.$config = {
  sidebar: false
}
```

また、特定のページにサイドバーを無効することもできます：

```markdown
---
sidebar: false
---
このページにサイドバーを無効にします
```

左下にあるサイドバーをスイッチするボタンも隠せます：

```js
self.$config = {
  disableSidebarToggle: true
}
```

#### 目次

サイドバーにある目次は、markdownファイルから作られたものです。h2 ~ h5 タイトルを利用して目次を作り出します。

通常、h5 レベル以降のタイトルは、ページがこのエリアにスクロールした時しか表示されていませんが、オプションに変更できます：

```js
self.$config = {
  // h2 から h4 までのタイトルを表示します
  tocVisibleDepth: 3
}
```

### ナビバー

複数のページがある時、ナビバーがひとつあれば便利です。設定ファイルにナビバーを有効にしましょう：

```js
self.$config = {
  nav: [
    // ホームページ
    {title: 'Home', path: '/'},
    // 中国語ページ
    {title: '中文文档', path: '/language/chinese'}
  ]
}
```

#### アイコン

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

##### 名付けたアイコン

何セットのアイコンを利用して、それぞれのアイコンでそれぞれのページを飾りましょう。

```js
self.$config = {
  icons: {
    default: [{label: 'hello'}],
    chinese: [{label: '你好'}]
  }
}
```

これですべてのページは`default`アイコンを使うことになります。front-matter で特定のページを設定してみましょう：

```markdown
---
icons: chinese
---
こんにちは
```

#### ドロップダウン

ドロップダウンを利用してページをスイッチしましょう：

```js
self.$config = {
  nav: [
    {title: '言語', type: 'dropdown', items: [
      {title: '中国語', path: '/language/chinese'},
      {title: '日本語', path: '/language/japanese'}
    ]}
  ]
}
```

#### 名付けたナビ

それぞれのページにそれぞれのナビバーが使えます。

配列である`nav`オプションは、すべてのページにデフォルトナビバーとして利用していますが、オブジェクト`{}`に変更してマルチナビバーを使いましょう：

```js
self.$config = {
  nav: {
    default: [{title: 'Home', path: '/'}],
    chinese: [{title: '首页', path: '/chinese'}]
  }
}
```

すると、2つの名付けたナビバーができましたが、未だ全部のページは`default`のまま表示しています。markdown ファイルに front-matter を追加して変更してみましょう：

```markdown
---
nav: japanese
---
<!-- このページのナビバーは japanese です -->
こんにちは！
```

### Markdownの設定

docute は[marked](https://github.com/chjj/marked)を使って markdown を解析しています。以下のように marked のオプションを変更できます：

```js
self.$config = {
  marked: {
    smartypants: true
    // ...
  }
}
```

詳しくのは[公式サイト](https://github.com/chjj/marked#options-1)に参考してください。

### debug

Set `debug` to `true` to enable vue-devtools:

```js
self.$config = {
  debug: true
}
```

## ガイド

### ページのタイトル

各々のページは、`nav`オプションの`title`をページのタイトルとして表示していますが、front-matter で表示タイトルを変えられます：

```markdown
---
title: ホームページ
---
ナビバーにこのページの名は「日本語」ですが、ブラウザのタブには「ホームページ」として表示されています
```

### シンタックスハイライト

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

### ドキュメントヘルパー

#### 内蔵CSSスタイル

内蔵 CSS スタイルは、読みやすさに目指して作られたものです。

##### p.tip

ヒントを表します。

```html
<p class="tip">
  docuteは初心者からベテランまでも実用的だ！
</p>
```

以下のように表示されています：

<p class="tip">
  docute は初心者からベテランまでも実用的だ！
</p>

##### p.warning

`p.tip`と似っていますが、さらに強い感じがします：


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

以下のように表示されています：

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

#### Navigation links

Links like `[Go](#heading-slug)` will navagate you to `?id=heading-slug` in current page.

Links like `[Go](/page#heaing-slug)` will navigate you to `/page?id=heading-slug` 

#### グローバル変数

以下のグローバル変数は利用可能です：

```js
docute
docute.version // docuteのバージョン
docute.store // Vuex storeのインスタンス
docute.router // Vue routerのインスタンス

Vue // Vueコンストラクタ関数
```

### アクセス解析

#### Google Analytics

docute は SPA であるため、普通の Web サイトと比べると、Google Analytics の使い方は違っています。以下のコードを HTML に追加すると、アクセス解析ができます：

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
  <code>UA-XXXXX-Y</code>を自分の ID に変更してください。
</p>

### GitHubにデプロイ

3つの場所にデプロイできます：

- `./docs` ディレクトリ
- master ブランチ
- gh-pages ブランチ

GitHub に push した後、プロジェクトの settings でいずれのオプションを選びましょう：

<img src="https://docute.js.org/assets/deploy.png" alt="deploy" width="500">

### VPSにデプロイ

#### nginxの場合

以下の nginx conf を試してみましょう：

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

サブパス（sub path）の時は：

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

## よくある質問

### gitbookとの違いは何ですか。

確かに docute と gitbook は似っています。両方もドキュメントを作るためのものだけでなく、レイアウトも相似していますが、docute は HTML へのコンパイルなしにデプロイできます。それに設定ファイルも簡単ですし。docute を利用してエレガントなドキュメントを作りましょう！

このほか、docute は我々が gitbook/hexo/jekyll などを使った経験をまとめ、その上で作り出したものです。

### 発表前にビルドするのは、何かが悪いのか。

悪くないですが、そうする必要はないということです。SPA だけで十分なので、それにいろんなビルドプロセスから解放したいです。

かといって、HTML へのコンピレーションもこれからの計画の一つです。それだけじゃなく、[サバーでのレンダリング](https://github.com/egoist/docute/issues/12)（SSR）機能もどんどん開発しています。今の Google はダイナミックサイトに対応可能ですが、SSR ができれば、さらによい SEO 体験もできるでしょう。

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
