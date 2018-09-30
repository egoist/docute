# 插件 API

插件属性：

- `name`：`string` 插件名称.
- `extend(api: PluginAPI)`：扩展核心功能

## api.processMarkdown(fn)

- `fn`：`(text: string) => string`

处理 markdown。

## api.processHTML(fn)

- `fn`：`(html: string) => string`

处理 HTML.

## api.extendMarkedRenderer(fn)

- `fn`：`(renderer: marked.Renderer) => void`

你可以使用 `fn` 来修改我们使用的 [marked 渲染器](https://marked.js.org/#/USING_PRO.md#renderer)。

## api.onContentUpdated(fn)

- `fn`：`(vm: Vue) => void`

更新页面内容时将调用 `fn`。

## api.router

基本上是 [Vue Router](https://router.vuejs.org/api/#router-instance-properties) 实例。

## api.store

基本上是 [Vuex](https://vuex.vuejs.org/api/#vuex-store-instance-properties) 实例。
