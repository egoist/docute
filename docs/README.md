# docute

Writing docs without build process.

## Introduction

`docute` simply allows you to write markdown files and populate them in `./docs` folder directly without being built to static html files, only `index.html` and `config.js` are required! It smartly reads and parses the markdown files on the fly and finally displays them as a single page website.

## Installation

Use `docute-cli` to initialize the docs folder.

Using npm:

```bash
npm i -g docute-cli
```

Using Yarn:

```bash
yarn global add docute-cli
```

## Quick Start

Assume that the folder you want for docs is `./docs`:

```bash
docute init ./docs
```

Now the `./docs` folder is ready, so far we got:

- README.md: Used as content of homepage
- index.html: The html that contains the scripts and styles you need
- config.js: Configuration file
- .nojekyll: Indicates that this is not a jekyll website, ignore this if you're not deploying to github pages

Then you can preview the docs locally:

```bash
docute ./docs
```

Open http://localhost:8080 and you'll see it in action.

## Configuration

There will be a `config.js` in your doc directory after running `docute init`:

```js
self.$config = {
  // site name
  title: 'My Website Name'
  // blah...
}
```

### Pages

`README.md` will be treated as homepage for your website, you can also add more markdown files to display more pages. For example, adding `chinese.md` to your doc folder so that you got a new page at `/#/chinese`!

It supports directory too, just try adding a new file at `language/chinese.md`, then you'll get `/#/language/chinese`.

Note: file like `about/README.md` will be mapping to `/#/about/`, while the `/#/about` is for `about.md`.

### Navbar

You may need a navbar as the entrance for the pages:

```js
self.$config = {
  nav: [
    // homepage
    {title: 'Home', path: '/'},
    // chinese doc
    {title: 'Chinese', path: '/language/chinese'}
  ]
}
```

#### Icons

##### Built-in Icons

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

##### Custom Icons

You can set custom icon by providing the id of SVG symbol, [SVG symbols](https://css-tricks.com/svg-symbol-good-choice-icons/) is just a simple way to use inline SVG around.

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
      svgId: 'my-icon' // the id of symbol
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
      svgClass: 'my-icon-class'
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

There're many resources for good free SVG icons, check out [bytesize-icons](https://github.com/danklammer/bytesize-icons) and [simple icons](https://simpleicons.org/).

##### Named Icons

You can have multiple sets of icons and use different set for different pages, just set the `icons` to a plain object:

```js
self.$config = {
  icons: {
    default: [{label: 'hello'}],
    chinese: [{label: '你好'}]
  }
}
```

Now, every page would use `default` icons, to use `chinese` icons just add front-matter in your page:

```markdown
---
icons: chinese
---
hello world!
```

#### Dropdown menu

The item in navbar could also be a dropdown menu:

```js
self.$config = {
  nav: [
    {title: 'Languages', type: 'dropdown', items: [
      {title: 'Chinese', path: '/language/chinese'},
      {title: 'Japanese', path: '/language/japanese'}
    ]}
  ]
}
```

#### Named navbar

You can have multipage navbar and use different navbar for different pages.

If the `nav` option in config file is an array, it will be the only navbar across pages, but you can also set it to a plain object to have multiple named navbar:

```js
self.$config = {
  nav: {
    default: [{title: 'Home', path: '/'}],
    chinese: [{title: '首页', path: '/chinese'}]
  }
}
```

For now all pages will still use the `default` navbar, but you can switch this by setting front-matter in your markdown file:

```markdown
---
navbar: chinese
---
<!-- this page use the `chinese` navbar -->
你好世界！
```

## Recipes

### Page Title

The title in browser tab is the `title` you defined in `nav` property in config file, this value will also be used in navbar item.

However, you can use front-matter in markdown to override page title:

```markdown
---
title: Home
---
For example, I want this page to be shown as 'English' in navbar but 'Home' in browser tab.
```

### Code Highlight

`docute` uses `highlight.js` to highlight your code blocks, however only a few languages are supported by default, you can highlight other languages by:

```html
<script src="/path/to/docute.js"></script>
<!-- add your language after the main docute bundle -->
<script src="https://unpkg.com/highlight-languages/python.js"></script>
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

The built-in languages are: `javascript` `cpp` `css` `xml` `bash` `markdown` `yaml`

Visit https://unpkg.com/highlight-languages/ for all available programming languages.

### Doc Helpers

#### CSS Helpers

CSS helpers make your docs even more readable.

##### p.tip

Show some tips in your doc:

```html
<p class="tip">
  This is for beginners and pros, just enjoy!
</p>
```

And you get:

<p class="tip">
  This is for beginners and pros, just enjoy!
</p>

##### p.warning

Similar to `p.tip` but it looks more serious:

```html
<p class="warning">
  Do not do like this, do it that way please. If you still can't help doing such way, we will call your mom and order some pizza to let you know, you're in trouble!
</p>
```

And you get:

<p class="warning">
  Do not do like this, do it that way please. If you still can't help doing such way, we will call you mom and order some pizza to let you know, you're in trouble!
</p>

#### HTML Attributes

docute gives you some built-in html attributes for shot-hand use:

##### jump-to-id

Jump to a heading anchor, for `/#/?id=install` you can do:

```html
<a href="#" jump-to-id="install">Check out install intructions!</a>
```

<p class="tip">
  Note that you can only navigate id in the same page, it <strong>cannot</strong> jump to another page! For cross-page navigation, use <a href="#" jump-to-id="router-link">router-link</a> attribute.
</p>

##### router-link

Navigate to a new page, support both URL path and query:

```html
<a href="#" router-link="/">Go Home</a>
<a href="#" router-link="/chinese?id=install">Checkout Chinese Installation guide!</a>
```

<p class="warning">
  Do not use <code>router-link</code> to jump to an id in the same page, it will not give you the smooth-scroll effect if it's in the same page, use <a href="#" jump-to-id="jump-to-id">jump-to-id</a> instead.
</p>

#### Global Variables

You can access following global variables if you need:

```js
docute
docute.version // the version of docute
docute.store // Vuex store instance
docute.router // Vue router instance

Vue // Vue constructor
```

### Deploy to GitHub

There're three places to populate your docs:

- `./docs` folder
- master branch
- gh-pages branch

Just select it in repo's settings page after pushed files:

<img src="https://docute.js.org/assets/deploy.png" alt="deploy" width="500">

### Deploy to VPS

#### Using nginx

Try following nginx conf:

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

Or if you want to serve it at sub path like `/docs`, try:

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

## FAQ

### Where's my sidebar from?

The sidebar (or the TOC) is coming from your markdown files, we parse markdown content and get headings (h2 to h5) to group a nested TOC.

### Is it like gitbook?

Yes and No. Yes is because they are both for writing documentation and they have the similar UI, but docute does not require you to **generate** static html files, and have less configurations while still keeping the most useful features for writing elegant docs.

docute is also built by what I've learned from using gitbook/hexo/jekyll in the past years.

### What's wrong with build before publish?

It's not wrong, but we don't always need it that way, sometimes a simple Single Page Application is good enough for our docs while we can get rid of some verbose steps to publish docs. In fact, we're also looking forward to [supporting this feature and server-side rendering](https://github.com/egoist/docute/issues/12) at some point, I know many SEO guys and girls would like this even if Google already supports retrieving data from SPA website.
