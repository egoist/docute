---
title: The Docute Instance
toc: true
---

<!-- You may wonder what happens when you visit a URL like `/docs/getting-started/how-it-works`, well it's pretty simple:

__We fetch `/docs/getting-started/how-it-works.md` for this route and renders it to HTML.__

Then depending on the layout, we render it with different Vue component. Markdown files are rendered with `docs` layout by default, but you can set `layout` in front-matter to use different layout component, available layouts are `docs` `homepage` `page`. -->

## Creating a Docute Instance

Every Docute application starts by creating a new Docute instance with the `Docute` function:

```js
const doc = new Docute({
  // ...options
})

// Start the application at given element
doc.start('#docute')
```

## Docs and Nav

You can see a menu in the left sidebar, which is defined via `docs` option while creating the Docute instance:

```js{2-13}
new Docute({
  docs: [
    {
      title: 'Getting Started',
      children: [
        {
          title: 'Installation',
          path: '/docs/getting-started/installation'
        },
        // ...
      ]
    }
  ]
})
```

Here's also a navbar which is mainly used for the whole-site navigation:

```js{2-11}
new Docute({
  nav: [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Docs',
      path: '/docs/essentials/installation'
    }
  ]
})
```

### How the contents are fetched

For a certain path like: `/docs/foo` we simply fetch `/docs/foo.md` and renders it to what you see. You can know more about <router-link to="/docs/essentials/add-docs">how it works</router-link> here.
