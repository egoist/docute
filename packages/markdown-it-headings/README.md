# markdown-it-headings

Add heading anchors and generate headings array.

## Usage

```js
const MarkdownIt = require('markdown-it')
const headingsPlugin = require('markdown-it-headings')

const headings = []
const md = new MarkdownIt()
md.use(headingsPlugins(headings), options)
md.render(text)

// console.log(headings)
```

## Options

### minDepth

Type: `number`<br>
Default: `2`

### maxDepth

Type: `number`<br>
Default: `3`
