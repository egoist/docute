---
title: Content Format
---
As you already knew, we fetch `/:path.md` file to render `/:path`, so the content format is essentially `Markdown` with the help from [front-matter](https://jekyllrb.com/docs/frontmatter/) for extra information about this page.

A typical doc file looks like:

```markdown
---
title: Some page
---
Introduce something to you guys and girls.
```

However, you don't have to use an external file to render the page, `source` option to the rescue:

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
