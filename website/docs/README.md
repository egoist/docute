# Docute

The fastest way to create a documentation site for your project.

## What is Docute

Docute is basically a JavaScript file that fetches Markdown files and renders them as a single-page application.

It's totally runtime-driven so there's no server-side components involved which also means there's no build process. You only need to create an HTML file and a bunch of Markdown documents and your website is almost ready!

## How does it work

In short: URL is the API.

We fetch and render corresponding markdown file for the URL you visit:

```
/         => /README.md
/foo      => /foo.md
/foo/     => /foo/README.md
/foo/bar  => /foo/bar.md
```

## Quick Start

Let's say you have following files in `./my-docs` folder:

```bash
.
├── README.md
└── index.html
```

The `index.html` looks like:

```html {highlight:[7,'10-16']}
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My Docs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docute@4/dist/docute.css">
  </head>
  <body>
    <div id="docute"></div>
    <script src="https://cdn.jsdelivr.net/npm/docute@4/dist/docute.js"></script>
    <script>
      new Docute({
        target: '#docute'
      })
    </script>
  </body>
</html>
```

Then you can serve this folder as a static website on your machine using:

- Node.js: `npm i -g serve && serve .`
- Python: `python -m SimpleHTTPServer`
- Golang: `caddy`
- ..or whatever static web server
