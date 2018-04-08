---
title: Front-Matter
---
The front-matter provide some extra information so that Docute knows how to render the page, for example you may disable the left sidebar on some pages.

## Keys

There're some key that are only supported in `homepage` layout, <router-link to="/docs/advanced/layouts#homepage-layout">check them out here</router-link>.

### title

Supported layouts: `docs` `page` `homepage`<br>
Type: `string`

The page title, it defaults to `options.site.title` in `homepage` layout.

### subtitle

Supported layouts: `docs` `page` `homepage`<br>
Type: `string`

The page subtitle, it defaults to `options.site.subtitle` in `homepage` layout.

### toc

Supported layouts: `docs` `page`<br>
Type: `string` `boolean`<br>
Default: `false` in `docs` layout, `left` in `page` layout

Toggle the Table of Contents menu, use `left` to show it in the left sidebar, use `right` to show it in the right sidebar.

### layout

Supported layouts: `docs` `page` `homepage`<br>
Type: `string`<br>
Default: `docs`

Choose the layout component.
