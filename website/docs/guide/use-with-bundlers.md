# Use With Bundlers

You don't have to use a bundler in order to use Docute, however if you want, you can!

First you need to install Docute as a dependency in your project:

```bash
npm install docute
```

Then see below for the usage with your bundler of choice.

## Webpack

In your entry file:

```js
import Docute from 'docute'

new Docute({
  target: '#app',
  // Other options
})
```

You may need to use [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to generate an HTML file too.

If you're using [Vue CLI](https://cli.vuejs.org) or [Poi](https://poi.js.org), congratulations, there's no more build configs needed.

## Parcel
You need a basic html file as entry-point. Let this be `index.html`:

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My Docs</title>
  </head>
  <body>
    <div id="docute"></div>
    <script src="index.js"></script>
  </body>
</html>
```

To bundle Docute simply add the following to any imported or required js-file. (Here it would be `index.js`):

```js
import Docute from 'docute'

new Docute({
  target: '#app',
  // Other options
  sourcePath: "<sourcePath>"
})
```

If you use an full url as [sourcePath](https://docute.org/options#sourcepath) you are done.

If you want to use a local local files you have to [modify your build command](https://github.com/parcel-bundler/parcel/issues/1411#issuecomment-415483965).

```json5
{
  "scripts": 
    {
      "build": "cp -R <sourcePath> ./dist && parcel build index.html"
    }
}
```
