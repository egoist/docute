---
title: Layouts
---

## Docs Layout

The most basic layout in Docute is `docs`, it renders the <router-link to="/docs/essentials/the-docute-instance#docs-and-nav">docs</router-link> menu on left sidebar, just like what you see on this page.


## Page Layout

For pages like About page, you may use the `page` layout to replace <router-link to="/docs/essentials/the-docute-instance#docs-and-nav">docs</router-link> with a __Table of Contents__ menu on the left sidebar.

## Homepage Layout

The `homepage` layout only cares about the front-matter part within your markdown file.

Supported keys:

- __getStarted__: Fill a link for the `Get Started` button.
- __features__: Describe the features of your product, the type of `features` is: `Feature[]`.
```typescript
interface Feature {
  title: string
  description: string | string[]
}
```
