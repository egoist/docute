# API

## new Docute(options)

Create an instance of `Docute`:

```js
var doc = new Docute(options)

doc.start()
```

## options

### title

- __Type__: `string`
- __Default__: `document.title || 'A Docute Website'`

The title of your website.

### subtitle

- __Type__: `string`
- __Default__: `undefined`

The subtitle of your website.

### root

- __Type__: `string`
- __Default__: `'/'`

The root URL of the app. For example, if the entire website is served under `/docs/`, then base should use the value `'/docs/'`. Note that you don't need to care about this option when using `routerMode: 'hash'` which is the default value.

### routerMode

- __Type__: `string`
- __Default__: `'hash'`
- __Possible values__: `'hash'` `'history'`

Configure the router mode.

- `hash`: uses the URL hash for routing, e.g. routes like `/#/hello-world`. Works in all Vue-supported browsers, including those that do not support HTML5 History API.

- `history`: uses HTML5 History API for routing, e.g. routes like `/hello-world`. Requires server config (i.e. redirect all requests to `index.html`).

### sourceRoot

- __Type__: `string`
- __Default__: `options.root` (Default to the value of `options.root`)

The root path to fetch sources (Markdown files) from.

For example, for path `/guide/hello` we will fetch `sourceRoot + 'guide/hello.md'` which is `/guide/hello.md` by default.

### getSource

- __Type__: `function(route: Route)`

You can provide `getSource` for a custom path to source mapping for all or specific routes.

If a falsy value is returned the fucntion will be ignored and default mapping will be applied.

**Example:**

```js
const routes = {
    '/docute-master': 'https://raw.githubusercontent.com/egoist/docute/master/README.md',
}

const doc = new Docute({
    getSource: function (route) {
        return routes[route.path]
    },
}
```


### sidebar

- __Type__: `SidebarItem[]`

Configure this to enable the sidebar.

```js
[
  {
    text: 'Guide',
    children: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting Started', link: '/getting-started' }
    ]
  },
  {
    text: 'API',
    link: '/api'
  }
]
```

The value of `sidebar` is basically an array of `SidebarItem`:

```ts
interface SidebarItem {
  text: string
  /* Either `children` or `link` should be set */
  children?: SidebarChildItem[]
  link?: string
}

interface SidebarChildItem {
  text: string
  link: string
}
```

### nav

You can add links to the navbar using the `nav` option:

```js
[
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Guide',
    link: '/guide'
  },
  {
    text: 'Ecosystem',
    children: [
      {
        text: 'GitHub',
        link: 'https://github.com/egoist/docute'
      },
      {
        text: 'Discord',
        link: 'https://chat.egoist.rocks'
      }
    ]
  }
]
```

The value of `nav` is basically an array of `NavItem`, it's actually pretty similar to the [sidebar](#sidebar) option:

```ts
interface NavItem {
  text: string
  /* Either `children` or `link` should be set */
  link?: string
  children?: NavChildItem[]
}

interface NavChildItem {
  text: string
  link: string
}
```

## methods

### doc.start([el])

#### el

- __Type__: `string` (A dom selector like: `#docute`)
- __Default__: `'#docute'`

Mount the app to a dom selector, by default it's `#docute`.
