---
search: english
---

# Plugins

Plugins give you extra features without bloating docute itself.

<p class="warning">
  You should load plugin via `script` tag before running `docute.init`!
</p>

## List of Plugins

### DocSearch

DocSearch is a free service from [algolia.com](http://algolia.com), it might be the easiest way to add search to your documentation.

To use this plugin, [apply for the program](https://community.algolia.com/docsearch/) to get an API key and indexName first. 

Then load `docsearch.js` before initializing docute:

```html
<script src="https://unpkg.com/docute/dist/docute.js"></script>
<script src="https://unpkg.com/docute/plugins/docsearch.js"></script>
<script>
  docute.init({
    // ...config
  })
</script>
```

Finally activate the plugin by:

```js
docute.init({
  plugins: [
    // the docsearch variable is provided by docsearch plugin
    docsearch({
      apiKey: 'You API Key',
      indexName: 'Your Index Name',
      // this plugin requires a url too
      // it indicates where docsearch fetches contents
      url: 'https://docute.js.org'
    })
  ]
})
```

You can check out the [algolia docsearch config](https://github.com/algolia/docsearch-configs/blob/master/configs/docute.json) for docute.js.org, we have `english` `zh-Hans` `zh-Hant` tags for now. By default the search bar in your doc will search all tags, but you may only allow it to search relevant tag for specified page. For example, search `english` tag on English page only.

Then use front-matter to do this:

```markdown
---
search: english
---
Now, search on this page will only give you results which is tagged by `english`
```

The `search` could also be an array so that it can search multiple tags:

```markdown
---
search: 
  - zh-Hans
  - zh-Hant
---
Easy?
```

If you doc is indexed by `variable` like `version` insteads of `tags`, you should use full keyword including the variable name:

```markdown
---
search:
  - "version\:2.0.0"
---
```

### Disqus

Integrate Disqus to your docs, it will show after the main content.

First include the plugin via `script` tag:

```html
<script src="https://unpkg.com/docute/plugins/disqus.js"></script>
```

Add activate it by:

```js
docute.init({
  plugins: [
    disqus({
      shortname: 'SHORT_NAME' // replace this with your own shortname
    })
  ]
})
```

## Community Plugins

- [evanyou](https://github.com/egoist/docute-evanyou): Add colorful ribbon effect to your landing page, just like [evanyou.me](http://evanyou.me)!
- [docute-iframe](https://github.com/egoist/docute-iframe): Run code in docs with an iframe.
- [docute-emojify](https://github.com/hkwu/docute-emojify): Transform emoji aliases in Markdown like GitHub's editor.

## Write A Plugin

A plugin is simply a function that takes `context` as arguments.

```js
docute.init({
  plugins: [
    function myPlugin(context) {
      // context.store
      // context.router
      // context....
    }
  ]
})
```

If your plugin needs options, use a higher-order function instead:

```js
docute.init({
  plugins: [
    myPlugin(options)
  ]
})

function myPlugin(options) {
  return function (context) {
    // context.store
    // context.router
  }
}
```

<p class="tip">
  You can also access `window.fetch` here without any polyfill, we already did that for you!
</p>

### Context

The argument `context` has following properties:

- Vue: the `Vue` constructor
- store: the vuex store instance
- router: the vue-router instance
- registerComponent: register a component to a specific position of the document
- event: the event system
- beforeParse/afterParse: you can add handlers to process raw markdown content and the html content processed by marked.

#### event

We use [eventstop](https://github.com/egoist/eventstop) as the event system. Basically the only thing you need is using `event.on` to subscribe some inner events in docute.

List of events you can subscribe:

- `content:updated`: emitted after the main content gets updated
  - the first argument is the `vm` which you can use to access the current Vue component
- `jump:started`: emitted before the jumping to id action
  - the first argument is the `id` it jumps to
- `jump:stopped`: emitted after the jumping to id action
  - the first argument is the `id` it jumps to
- `search:started`: emitted after user performs a search action (hit enter in search box)
- `search:stopped`: emitted after app received search results, the first argument of callback function is the result.
- `landing:updated`: emiited after the landing page is fetched and the dom is updated.

List of events you can emit:

- `reload`: reload current page, eg: you changed the `store` state and want to refetch data.

#### registerComponent

The function requires two arguments: `registerComponent(position, component)`

##### position

The value is one of followings:

- `content:start`: at the start of main content (no sidebar, no header)
- `content:end`: at the end of main content
- `sidebar:start`: at the start of sidebar (after search element)
- `sidebar:end`: at the end of sidebar
- `nav:start`: at the start of `nav` items
- `nav:end`: at the end of `nav` items
- `icons:start`: at the start of header icons
- `icons:end`: at the end of header icons

##### component

Type: `VueComponent`

Any Vue component (plain object works too) can be accepted as component argument.

```js
registerComponent('content:end', {
  template: '<div>{{name}}</div>',
  data() {
    return {name: 'hello'}
  }
})
```

#### beforeParse(handler)

##### handler

Type: `function`<br>
Return: `string`

The first argument of handler is the raw markdown content. (excluded front-matter of course)

#### afterParse(handler)

##### handler

Type: `function`<br>
Return: `string`

The first argument of handler is a string processed by marked.


