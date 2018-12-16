# Customization

Cusotmizing Docute is as fun as playing with Lego bricks.

## Navbar

The navbar is used for site-level navigation. It usually contains a link to your homepage and a link to your project's repository. However you can add whatever you want there.

```js
new Docute({
  title: 'Docute',
  nav: [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'GitHub',
      link: 'https://github.com/leptosia/docute'
    }
  ]
})
```

The `title` option defaults to the value of `<title>` tag in your HTML, so it's completely optional.

Check out the navbar of this website to see how it looks.

## Sidebar

Sidebar is mainly used for navigations between pages. As you can see from this page, we also use it to display a version selector and a language selector.

```js
new Docute({
  sidebar: [
    // A sidebar item, with multiple sub-links
    {
      title: 'Guide', // Optional
      links: [
        {
          title: 'Getting Started',
          link: '/guide/getting-started'
        },
        {
          title: 'Installation',
          link: '/guide/installation'
        },
      ]
    }
  ]
})
```

Check out the [sidebar](../options.md#sidebar) option reference for more details.

## Versioning

Let's say you have `master` branch for the latest docs and `v0.1` `v0.2` branches for older versions, you can use one Docute website to serve them all, with the help of [`overrides`](../options.md#overrides) and [`sourcePath`](../options.md#sourcepath) option.

```js
new Docute({
  // Configure following paths to load Markdown files from different path
  overrides: {
    '/v0.1/': {
      sourcePath: 'https://raw.githubusercontent.com/user/repo/v0.1'
    },
    '/v0.2/': {
      sourcePath: 'https://raw.githubusercontent.com/user/repo/v0.2'
    }
  },
  // Use `versions` option to add a version selector
  // In the sidebar
  versions: {
    'v1 (Latest)': {
      link: '/'
    },
    'v0.2': {
      link: '/v0.2/'
    },
    'v0.1': {
      link: '/v0.1/'
    }
  }
})
```

## CSS Overrides

Default [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables):

```css
:root {
  --accent-color: rgb(6, 125, 247);
  --sidebar-width: 280px;
  --sidebar-bg: white;
  --sidebar-section-title-color: rgb(136, 136, 136);
  --border-color: #eaeaea;
  --header-height: 60px;
  --code-font: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
}
```
