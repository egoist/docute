# 配置项

用于 `Docute` 构造函数的配置项。

```js
new Docute(options)
```


## target

- Type: `string`
- Default: `docute`

目标元素的 ID，会被用于创建 app，比如 `app` 或者 `#app`。

## title

- 类型：`string`
- 默认值：`document.title`

网站标题。

## nav

- 类型: `Array<NavItem>`

在头部显示的导航栏。

```ts
interface NavItem {
  title: string
  link: string
}
```

## sidebar

- 类型：`Array<SidebarItem>` `(store: Vuex.Store) => Array<SidebarItem>`

在侧边栏中显示的导航栏。

```ts
interface SidebarItem {
  title?: string
  links: Array<ItemLink>
}

interface ItemLink {
  title: string
  link: string
  /* 是否显示 TOC，默认为 true */
  toc: boolean
}
```

## sourcePath

- 类型：`string`
- 默认值：`'/'`

从 source path 获取 markdown 文件，默认情况下，我们从根目录加载它们，根目录也被称为 `/`。

它也可以是完整的 URL，例如： `https://some-website/path/to/markdown/files`，以便于你可以从其他域名加载文件。


## pageData

- 类型: `PageData | (store: Vuex.Store) => Promise<PageData>`

直接从这个选项获取页面数据，而不是请求一个文件。

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

- 类型: `Array<Object>`

一个包含 [Vue mixins](https://vuejs.org/v2/api/#mixins) 的数组，会被应用到所有的 Markdown 组件中。

## highlight

- 类型：`Array<string>`

需要语法高亮的语言名称数组。查阅 [Prism.js](https://unpkg.com/prismjs/components/) 获取所有支持的语言名称。（不需要携带 `prism-` 前缀)。

例如：`highlight: ['typescript', 'go', 'graphql']`。

## editLinkBase

- 类型：`string`

*编辑链接*的 URL 基础路径。

例如，如果将 markdown 文件存储在 Github 仓库的 master 分支的 `docs` 文件夹中，那么该路径应该为：

```
https://github.com/USER/REPO/blob/master/docs
```

## editLinkText

- 类型：`string`
- 默认值：`'Edit this page'`

*编辑链接*的文字内容。

## centerContent

- 类型：`boolean`
- 默认值：`true`

内容居中。

## versions

- 类型: `Versions`

设置此项之后, Docute 会在侧边栏显示一个版本选择器。

```ts
interface Versions {
  // 版本号, 比如 `v1`
  [version: string]: {
    // 指向相关文档的链接
    link: string
  }
}
```

## overrides

- 类型：`{[path: string]: LocaleOptions}`

```ts
interface LocaleOptions extends Options {
  language: string
}
```
