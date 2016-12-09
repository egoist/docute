# docute

Writing docs without build process.

## Install

Use `docute-cli` to initial the docs folder.

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

Open http://localhost:8080 and you'll see it in action。

## Configuration

There will be a `config.js` in your doc directory after running `docute init`:

```js
self.$config = {
  // blah...
}
```

### Pages

`README.md` will be treated as homepage for your website, you can also add more markdown files to display more pages. For example, adding `chinese.md` to your doc folder so that you got a new page at `/#/chinese`!

It supports directory too, just try adding a new file at `language/chinese.md`, then you'll get `/#/language/chinese`.

### Navbar

You may need a navbar as the entrance for the pages:

```js
self.$config = {
  nav: [
    // homepage
    {title: 'Home', link: '/'},
    // chinese doc
    {title: 'Chinese', link: '/language/chinese'}
  ]
}
```

#### Dropdown menu

The item in navbar could also be a dropdown menu:

```js
self.$config = {
  nav: [
    {title: 'Languages', type: 'dropdown', items: [
      {title: 'Chinese', link: '/language/chinese'},
      {title: 'Japanese', link: '/language/japanese'}
    ]}
  ]
}
```
