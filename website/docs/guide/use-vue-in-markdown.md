# Use Vue in Markdown

Leverage the power of Vue and JavaScript in writing Markdown document!

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

You may notice the highlighted part, the `css` option only works with Docute, it is used to inject `<style>` tag to `document.head` when the component is created, and remove the `<style>` tag when the component is destroyed. This is designed for directly using Docute in browser via `<script>` tag.

__Input__:

```markdown
<ReverseText text="hello world" />
```

__Output__:

<ReverseText text="hello world" />

## Trade-offs

- `@` shorthand won't work

Since standard HTML attribute isn't allowed to start with `@`, the `@` shorthand for `v-on` directive won't be recognized as valid HTML by the markdown parser we use. Pull request is very welcome for fixing this.
