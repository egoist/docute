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

Now you're good to go, add a README.md as the homepage for your doc！Then just preview the `./docs` by running:

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

The built-in languages are: `javascript` `cpp` `css` `xml` `bash` `markdown`

### Deploy to GitHub

There're three places to populate your docs:

- `./docs` folder
- master branch
- gh-pages branch

Just select it in repo's settings page after pushed files:

<img src="./assets/deploy.png" alt="deploy" width="500">

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
