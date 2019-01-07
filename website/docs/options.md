# Options

The options used by `Docute` constructor.

```js
new Docute(options)
```

## target

- Type: `string`
- Default: `docute`

The ID of the target element to locate, e.g. `app` or `#app`.

## title

- Type: `string`
- Default: `document.title`

Website title.

## nav

- Type: `Array<NavItem>`

An array of navigation items to display at navbar.

```ts
interface NavItem {
  title: string
  link: string
}
```

## sidebar

- Type: `Array<SidebarItem>` `(store: Vuex.Store) => Array<SidebarItem>`

An array of navigation items to display at sidebar.

```ts
interface SidebarItem {
  title?: string
  links: Array<ItemLink>
}

interface ItemLink {
  title: string
  link: string
  /* Whether to show TOC, true by default */
  toc?: boolean
}
```

## sourcePath

- Type: `string`
- Default: `'./'`

The source path to fetch markdown files from, by default we load them from path where your `index.html` is populated.

It can also be a full URL like: `https://some-website/path/to/markdown/files` so that you can load files from a different domain.

## pageData

- Type: `PageData | (store: Vuex.Store) => Promise<PageData>`

Directly use page data from this option instead of fetching a file.

```ts
interface PageData {
  [path: string]: PageDataItem | (store: Vuex.Store) => Promise<PageDataItem>
}

interface PageDataItem {
  title?: string
  content?: string
  file?: string
  markdown?: boolean
  [k: string]?: any
}
```

## componentMixins

- Type: `Array<Object>`

Basically an array of [Vue mixins](https://vuejs.org/v2/api/#mixins) that are applied to all markdown components.


## highlight

- Type: `Array<string>`

An array of language names to highlight. Check out [Prism.js](https://unpkg.com/prismjs/components/) for all supported language names (without the `prism-` prefix).

For example: `highlight: ['typescript', 'go', 'graphql']`.

## editLinkBase

- Type: `string`

The base path for the URL of *edit link*.

e.g. If you store the markdown files in `docs` folder on master branch in a GitHub repo, then it should be:

```
https://github.com/USER/REPO/blob/master/docs
```

## editLinkText

- Type: `string`
- Default: `'Edit this page'`

The text for *edit link*.

## centerContent

- Type: `boolean`
- Default: `true`

Centering contents.

## versions

- Type: `Versions`

When specified, Docute will show a version selector at the sidebar.

```ts
interface Versions {
  // The version number, like `v1`
  [version: string]: {
    // The link to this version of docs
    link: string
  }
}
```

## overrides

- Type: `{[path: string]: LocaleOptions}`

```ts
interface LocaleOptions extends Options {
  language: string
}
```

## router

- Type: `ConstructionOptions`

All vue-router's [Construction options](https://router.vuejs.org/api/#router-construction-options) except for `routes` are accepted here.

For example, you can set `router: { mode: 'history' }` to [get rid of the hash](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) in URLs.


## banner / footer

- Type: `string` `VueComponent`

Display banner and footer. A string will be wrapped inside `<div class="docute-banner">` or `<div class="docute-footer">` and used as Vue template.

For example:

```js
new Docute({
  banner: `Please <a href="https://donate.com/link">
  donate</a> <ExternalLinkIcon /> to support this project!`
})
```

You can also use a Vue component:

```js
new Docute({
  banner: {
    template: `
    <div class="docute-banner">
      Please <a href="https://donate.com/link">
      donate</a> <ExternalLinkIcon /> to support this project!
    </div>
    `
  }
})
```
