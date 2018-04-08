---
title: Add Docs
---
As you already knew, we fetch `/:path.md` file to render `/:path`, and the <router-link to="/docs/essentials/add-homepage">homepage</router-link> is rendered from `/README.md` by default, so the content format is essentially `Markdown` with the help from [front-matter](https://jekyllrb.com/docs/frontmatter/) for extra information about this page.

A typical doc file looks like:

```markdown
---
title: Some page
---
Introduce something to you guys and girls.
```

However, if you __DON't__ want to use an external file to render the page, `source` option could be very helpful:

```js{2-7}
new Docute({
  source: {
    '/hello': {
      title: 'Some page',
      content: 'Introduce something to you guys and girls.'
    }
  }
})
```

If we find the source for the corresponding page (`/hello` in this case) in `source` option, Docute will use this directly instead of loading and parsing external Markdown file.
