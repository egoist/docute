# Use Vue in Markdown

> Leverage the power of Vue and JavaScript in writing Markdown document!

## Interpolation

Each markdown file is first compiled into HTML and then rendered as a Vue component. This means you can use Vue-style interpolation in text:

__Input__:

```markdown
{{ 1 + 1 }}
```

__Output__:

```
2
```

## Escaping

If you want to disable Vue-style interpolation in text, you can wrap it inside code fence or inline code as follows:

__Input__:

````markdown
```js
const foo = `{{ safe, this won't be interpolated! }}`
```

And `{{ bar }}` is safe too!
````

__Output__:

```js
const foo = `{{ safe, this won't be interpolated! }}`
```

And `{{ bar }}` is safe too!

## Using Components

Docute exposed the `Vue` constructor on `window` object, so you can use it to register global components in order to use in your Markdown document:

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

You may notice the highlighted part, the `css` option only works in Docute, which is used to inject `<style>` tag to `document.head` when the component is created, and remove the `<style>` tag when the component is destroyed. You won't need this if you are using `vue-loader` to bundle your component.

__Input__:

```markdown
<ReverseText />
```

__Output__:

<ReverseText />

## Built-in Components

### `<router-link>`

This is basically the `<router-link>` component from [vue-router](https://router.vuejs.org/api/#router-link-props).

### `<image-zoom>`

Display a image in medium's zoom style.

|Prop|Type|Default|Required|Description|
|---|---|---|---|---|
|url|string|`undefined`|✅|The URL to image|
|alt|string|`undefined`|❌|The alt text|
|border|boolean|`true`|❌|Whether to show a border|
