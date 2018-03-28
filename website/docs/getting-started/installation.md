---
title: Installation
---
To fastest way to use Docute is to create an HTML and load Docute from a CDN:

```html
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
