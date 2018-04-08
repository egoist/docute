---
title: Installation
---
The fastest way to use Docute is to create an HTML and load Docute from a CDN:

```html{5,8,9,11-17}
<!DOCTYPE html>
<html>
  <head>
    <title>My Project</title>
    <link rel="stylesheet" href="https://unpkg.com/docute/dist/docute.css">
  </head>
  <body>
    <div id="docute"></div>
    <script src="https://unpkg.com/docute/dist/docute.js"></script>
    <script>
      const doc = new Docute({
        site: {
          title: 'My Project',
          description: 'Documentation for My Project'
        }
      })
      doc.start('#docute')
    </script>
  </body>
</html>
```

Alternatively, you can use Docute with a bundler like webpack too:

```js
import Docute from 'docute'
import 'docute/dist/docute.css'

const doc = new Docute({
  site: {
    title: 'My Project',
    description: 'Documentation for My Project'
  }
})
doc.start('#docute')
```

> __WARNING__: Please note that you need to [alias `vue` to `vue/dist/vue.esm.js`](https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds) while using with the bundler, since Docute requires Vue runtime+compiler build.
