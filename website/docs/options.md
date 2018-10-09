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

## sidebar

- Type: `Array<SidebarItem>`

An array of navigation items to display in sidebar.

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
- Default: `'/'`

The source path to fetch markdown files from, by default we load them from the root path, a.k.a. `/`.

It can also be a full URL like: `https://some-website/path/to/markdown/files` so that you can load files from a different domain.


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

## overrides

- Type: `{[path: string]: LocaleOptions}`

```ts
interface LocaleOptions extends Options {
  language: string
}
```
