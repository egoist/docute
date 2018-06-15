# 快速上手

> You don't need a build tool to use Docute.

Assuming you're having all your docs inside the `./docs` directory, you can now create `docs/index.html`:

```html {8,11-12}
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>My Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/docute@4/dist/docute.css">
  </head>
  <body>
    <div id="docute"></div>
    <script src="https://unpkg.com/docute@4/dist/docute.js"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

And the `main.js` for creating a Docute instance:

```js
// window.Docute is exposed by the `docute.js` file
var doc = new Docute({
  title: 'My Documentation', // Default to `<title>` value
  sidebar: [
    {
      title: 'Guide',
      children: [
        { title: 'Introduction', link: '/' }
      ]
    }
  ]
})

doc.start()
```

Here we created a Docute instance with site `title` and sidebar config, then you can serve the `./docs` directory locally with whatever static web server you like:

- Node.js: `npm i -g serve` and `serve docs`
- Python: `cd docs` and `python -m SimpleHTTPServer`
- golang: `cd docs` and `caddy`
- etc.
