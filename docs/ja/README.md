---
nav: ja
search: ja
---

# docute

docuteを使い、ビルドプロセス（build process）なしにドキュメントを作りましょう。

## はじめに

`docute`を利用して、markdownファイルを直接にHTMLコードとして変換して出力することができます。ホームページの`index.html`と設定ファイルの`config.js`だけあれば、`docute`は自動的にmarkdownファイルをSPAに作成できます。

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

markdownファイルを`./docs`ディレクトリに置いた場合には：

```bash
docute init ./docs
```

これで`./docs`での初期化が完了します。このディレクトリには、以下のファイルがあります：

- README.md：ホームページとして表示されています。
- index.html：必要なscriptとstyleファイルを含んで、サイトへアクセスする時に使うHTMLファイルです。
- config.js：設定ファイル。
- .nojekyll：jekyllのサイトではないことを表すファイルです。Github pagesに発表するつもりのない場合は、無視してください。

すると、ローカルでプレビューできます：

```bash
docute ./docs
```

http://localhost:8080でサイトを見てみましょう。

### 手動で初期化

node.jsやnpmが好きではない方に対して、ただ一つの`index.html`ファイルを作るのは十分です：

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
  <!-- $configを含んだ設定ファイルも使えます -->
  <!-- 例えばconfig.js -->
  <script>
    self.$config = {
      // configs...
    }
  </script>
  <!-- load the docute client library -->
  <script src="https://unpkg.com/docute/dist/docute.js"></script>
</body>
</html>
```


## 設定ファイル

`docute init`を実行したら、ディレクトリに`config.js`というファイルがあります。

```js
self.$config = {
  // サイト名
  title: '私のサイト'
  // blah...
}
```

### ホームページ

`README.md`ファイルはドキュメントのホームページとしてレンダリングされていますが、別のファイルをホームページに使いたい場合は、以下のように設定してください：

```js
self.$config = {
  // ルート・ディレクトリの中のREADME.md
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

それぞれのページを使い、それぞれの内容を表示することもできます。例えば、`chinese.md`ファイルを作成すれば、`/#/chinese`に通してアクセスできます。

サブディレクトリの場合も利用可能です。例えば、`language/chinese.md`を作成すると、`/#/language/chinese`で訪問できます。

注意点：`about/README.md`ファイルに対してのルーターは`/#/about/`ですが、`/#/about`（末尾の／なし）ルーターには、`about.md`ファイルとなります。

### サイドバー

`sidebar`オプションを`false`に設定すると、サイドバーは全体的に
無効になります。

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

サイドバーにある目次は、markdownファイルから作られたものです。h2 ~ h5タイトルを利用して目次を作り出します。

通常、h5レベル以降のタイトルは、ページがこのエリアにスクロールした時しか表示されていませんが、オプションに変更できます：

```js
self.$config = {
  // h2からh4までのタイトルを表示します
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

##### 内蔵アイコン

```js
self.$config = {
  // githubリポジトリの略
  repo: 'tj/co',
  // twitterユーザーネーム
  twitter: 'realDonaldTrump',
  // ソースファイルのアドレス
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs'
}
```

##### カスタムアイコン

SVGの[シンボル要素](https://css-tricks.com/svg-symbol-good-choice-icons/)のidを指定して、カスタムアイコンを使います。

まず、SVG要素を`index.html`に追加しましょう：

```html
<body>
  <div id="app"></div>
  <!-- #app 以外のところで -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="my-icon"  viewBox="0 0 22 22">
      <!-- `<path>`などのグラフィックはここに -->
    </symbol>
    <!-- ... 他のシンボル要素 -->
  </svg>
</body>
```

次に、`config.js`に追加しましょう：

```js
self.$config = {
  icons: [
    {
      label: 'マウスオーバー！', // マウスオーバーした時のツールチップ
      svgId: 'my-icon' // シンボル要素のid
    }
  ]
}
```

`svgClass`を追加したら、CSSを使って便利にアイコンをカスタマイズしたりできるようになります：

```js
self.$config = {
  icons: [
    {
      label: 'マウスオーバー！',
      svgId: 'my-icon',
      svgClass: 'my-icon-class'
    }
  ]
}
```

```css
/*
  カスタムアイコンを内蔵アイコンのスタイルに変換します
*/
.my-icon-class {
  fill: #ccc;
}
.my-icon-class:hover {
  fill: #333;
}
```

[bytesize-icons](https://github.com/danklammer/bytesize-icons)や[simple icons](https://simpleicons.org/)などのサイトには、フリーアイコンがたくさんあります。

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

これですべてのページは`default`アイコンを使うことになります。front-matterで特定のページを設定してみましょう：

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

すると、2つの名付けたナビバーができましたが、未だ全部のページは`default`のまま表示しています。markdownファイルにfront-matterを追加して変更してみましょう：

```markdown
---
navbar: japanese
---
<!-- このページのナビバーはjapaneseです -->
こんにちは！
```

### Markdownの設定

docuteは[marked](https://github.com/chjj/marked)を使ってmarkdownを解析しています。以下のようにmarkedのオプションを変更できます：

```js
self.$config = {
  marked: {
    smartypants: true
    // ...
  }
}
```

詳しくのは[公式サイト](https://github.com/chjj/marked#options-1)に参考してください。

## ガイド

### ページのタイトル

各々のページは、`nav`オプションの`title`をページのタイトルとして表示していますが、front-matterで表示タイトルを変えられます：

```markdown
---
title: ホームページ
---
ナビバーにこのページは「日本語」ですが、ブラウザのタブには「ホームページ」が表示されています
```

### シンタックスハイライト

`docute`は`highlight.js`を利用してシンタックスハイライトを行っています。

```html
<script src="/path/to/docute.js"></script>
<!-- ハイライトしたい言語を追加します -->
<script src="https://unpkg.com/highlight-languages/python.js"></script>
```

すると`python`コードはハイライトしたようになります：

```python
def fib(n):
 a,b = 1,1
 for i in range(n-1):
  a,b = b,a+b
 return a
print fib(5)
```

`docute`に次の言語のハイライト機能がついています：`javascript` `cpp` `css` `xml` `bash` `markdown` `yaml`。https://unpkg.com/highlight-languages/で利用できるプログラミング言語を探しましょう。

### ドキュメントヘルパー

#### 内蔵CSSスタイル

内蔵CSSスタイルは、読みやすさに目指して作られたものです。

##### p.tip

ヒントを表します。

```html
<p class="tip">
  docuteは初心者からベテランまでも実用的だ！
</p>
```

以下のように表示されています：

<p class="tip">
  docuteは初心者からベテランまでも実用的だ！
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

#### HTMLの属性

docuteは、いろいろな内蔵HTMLの属性を提供しています。

##### jump-to-id

特定のタイトルへ飛びます。例えば`/#/?id=install`

```html
<a href="#" jump-to-id="install">インストールのヒントへ</a>
```

<p class="tip">
  この方法は現在のページしか <strong>使えません</strong>。別のページへ移動したいなら、<a href="#" jump-to-id="router-link">router-link</a>属性を利用してください。
</p>

##### router-link

別のページへ移動します。URLとqueryが使えます：

```html
<a href="#" router-link="/">ホームページ</a>
<a href="#" router-link="/chinese?id=install">中国語のガード</a>
```

<p class="warning">
  smoothスクロールエフェクトがないため、タイトルへのジャンプは、<code>router-link</code> を使わないでください。<a href="#" jump-to-id="jump-to-id">jump-to-id</a> 属性を利用してください。
</p>

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

docuteはSPAであるため、普通のWebサイトと比べると、Google Analyticsの使い方は違っています。以下のコードをHTMLに追加すると、アクセス解析ができます：

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
  <code>UA-XXXXX-Y</code>を自分のIDに変更してください。
</p>

### GitHubにデプロイ

3つの場所にデプロイできます：

- `./docs` ディレクトリ
- master ブランチ
- gh-pages ブランチ

GitHubにpushした後、プロジェクトのsettingsでいずれのオプションを選びましょう：

<img src="https://docute.js.org/assets/deploy.png" alt="deploy" width="500">

### VPSにデプロイ

#### nginxの場合

以下のnginx confを試してみましょう：

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

確かにdocuteとgitbookは似っています。両方もドキュメントを作るためのものだけでなく、レイアウトも相似していますが、docuteはHTMLへコンパイルなしにデプロイできます。それに設定ファイルも簡単ですし。docuteを利用してエレガントなドキュメントを作りましょう！

このほか、docuteは我々がgitbook/hexo/jekyllなどを使った経験をまとめ、その上で作り出したものです。

### 発表前にビルドするのは、何かが悪いのか。

悪くないですが、そうする必要はないということです。SPAだけで十分なので、それにいろんなビルドプロセスから解放したいです。

かといって、HTMLへのコンピレーションもこれからの計画の一つです。それだけじゃなく、[サバーでのレンダリング](https://github.com/egoist/docute/issues/12)（SSR）機能もどんどん開発しています。今のGoogleはダイナミックサイトに対応可能ですが、SSRができれば、さらによいSEO体験もできるでしょう。
