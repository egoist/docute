# 在 Markdown  中使用 Vue

> 使用 Vue 和 JavaScript 来增强 Markdown 的功能

## 插值

每个 Markdown 文件都会首先被编译成 HTML 然后用作 Vue 组件来渲染，这意味着你可以在文本中使用 Vue 式的插值语法:

__输入__:

```markdown
{{ 1 + 1 }}
```

__输出__:

```
2
```

## 禁止插值

在某些文本中你可能不想使用插值语法，这样的话你可以使用 Markdown 的代码块或者内联代码语法来禁止该部分文本的插值:

__输入__:

````markdown
```js
const foo = `{{ 这块不会被插值 }}`
```

这里 `{{ bar }}` 也是!
````

__输出__:

```js
const foo = `{{ 这块不会被插值 }}`
```

这里 `{{ bar }}` 也是!

## 使用组件

Docute 把 `Vue` 暴露在了全局的 `window` 对象上，这样你可以使用它来注册全局组件以便在 Markdown 中使用:

```js {17-24}
Vue.component('ReverseText', {
  data() {
    return {
      text: 'hello world'
    }
  },
  template: `
    <div class="reverse-text">
    {{ text }} <button @click="reverse">Reverse</button>
    </div>
  `,
  methods: {
    reverse() {
      this.text = this.text.split('').reverse().join('')
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

注意高亮的部分，这里组件的 `css` 选项只在 Docute 中有用，在组件被创建时它会将指定的 CSS 以 `<style>` 标签的方式插入到 `document.head` 中，而在组件被销毁时这个 `<style>` 标签也会被销毁。如果你已经在使用 vue-loader 那你可能不需要使用这个选项。

__输入__:

```markdown
<ReverseText />
```

__输出__:

<ReverseText />

## 内置组件

### `<router-link>`

这其实就是 [vue-router](https://router.vuejs.org/api/#router-link-props) 里的 `<router-link>` 组件。

### `<image-zoom>`

显示一个具有类似 medium 的 zoom 效果的图片。

|Prop|Type|Default|Required|Description|
|---|---|---|---|---|
|url|string|`undefined`|✅|图片地址|
|alt|string|`undefined`|❌|占位文字|
|border|boolean|`true`|❌|是否显示边线|
