---
title: How it works
---

You may wonder what happens when you visit a URL like `/docs/getting-started/how-it-works`, well it's pretty simple:

__We fetch `/docs/getting-started/how-it-works.md` for this route and renders it to HTML.__

Then depending on the layout, we render it with different Vue component. Markdown files are rendered with `docs` layout by default, but you can set `layout` in front-matter to use different layout component, available layouts are `docs` `homepage` `page`.
