# Plugin API

Plugin properties:

- `name`: `string` Plugin name.
- `extend(api: PluginAPI)`: Extending core features.

## api.processMarkdown(fn)

- `fn`: `(text: string) => string`

Process markdown.

## api.processHTML(fn)

- `fn`: `(html: string) => string`

Process HTML.

## api.extendMarkedRenderer(fn)

- `fn`: `(renderer: marked.Renderer) => void`

You can use `fn` to modify the [marked renderer](https://marked.js.org/#/USING_PRO.md#renderer) we use.

## api.onContentUpdated(fn)

- `fn`: `(vm: Vue) => void`

`fn` will be called when the page content is updated.

## api.router

Basically the [Vue Router](https://router.vuejs.org/api/#router-instance-properties) instace.

## api.store

Basically the [Vuex](https://vuex.vuejs.org/api/#vuex-store-instance-properties) instance.
