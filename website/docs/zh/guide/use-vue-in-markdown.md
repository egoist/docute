# 在 Markdown 中使用 Vue

在编写 Markdown 文档时可以充分利用 Vue 和 JavaScript 的强大功能！

## 插值（Interpolation）

每个 Markdown 文件首先会编译为 HTML，然后渲染为 Vue 组件这意味着你可以在文本中使用 Vue 式的插值：

__输入__:

```markdown
{{ 1 + 1 }}
```

__输出__:

```
2
```

## Escaping

如果要在文本中禁用 Vue 式插值，可以将其包装在代码块或内联代码中，如下所示：

__输入__:

````markdown
```js
const foo = `{{ 安全，这不会被插值！}}`
```

`{{ bar }}` 也是安全的！
````

__输出__:

```js
const foo = `{{ 安全，这不会被插值！}}`
```

`{{ bar }}` 也是安全的！

## 使用组件

Docute 在 `window` 对象上暴露了 `Vue` 的构造函数，因此你可以使用它来注册全局组件，以便于在 Markdown 文档中使用：

```js {highlight:['13-20'],evaluate:true}
Vue.component('ReverseText', {
  props: ['text'],
  template: `
    <div class="reverse-text">
      {{ reversedText }} 
    </div>
  `,
  computed: {
    reversedText() {
      return this.text.split('').reverse().join('')
    }
  },
  css: `
    .reverse-text {
      border: 1px solid var(--border-color);
      padding: 20px;
      font-weight: bold;
      border-radius: 4px;
    }
  `
})
```

你可能会注意到高亮的部分，`css` 选项仅适用于 Docute，它用于在创建组件时，将 `style` 标签注入 `docsment.head`，当删除 `<style>` 标签时，该组件销毁。这样设计的目的为了在浏览器中通过 `<script>` 标签直接使用 Docute。

__输入__:

```markdown
<ReverseText text="hello world" />
```

__输出__:

<ReverseText text="hello world" />

## Trade-offs

- `@` 简写语法不能工作

由于标准的 HTML 属性不允许以 `@` 开头，因此我们使用的 markdown 解析器不会将 `v-on` 的简写 `@` 识别为有效的 HTML。非常欢迎大家发起 Pull Request 解决该问题。
