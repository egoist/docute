# Credits and Trade-offs

## Credits

### Vue 生态系统

没有 Vue 及其生态系统的帮助，该项目就不会出现。

### Reach Tech

UI 的灵感来源于 [Reach Tech](https://reach.tech)。

## Trade-offs

### VuePress / GitBook / Hexo

这些项目在构建时会生成静态的 HTML，这对 SEO 非常有帮助。

如果你在意 SEO，那你可能会喜欢使用 [tokio](https://github.com/egoist/tokio) 来预渲染你的网站。

### Docsify

[Docsify](https://docsify.js.org/#/) 和 Docute 几乎相同，但具有不同的 UI 和不同的使用方式。

Docute（60kB）比 Docisfy（20kB）大 3 倍，因为我们使用了 Vue，Vue Router 和 Vuex，而 Docsify 使用的是 vanilla JavaScript。

