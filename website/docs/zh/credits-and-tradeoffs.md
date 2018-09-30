# Credits and Trade-offs

## Credits

### Vue Ecosystem

This project won't exist without the help from Vue and its ecosystem.

### Reach Tech

The UI is inspired by [Reach Tech](https://reach.tech).

## Trade-offs

### VuePress / GitBook / Hexo

They all generate static HTML at build time, which is good for SEO. 

If you care about SEO, you may like using [tokio](https://github.com/egoist/tokio) to prerender your website.

### Docsify

[Docsify](https://docsify.js.org/#/) and Docute are pretty much the same, but with different UI and different usages.

Docute (60kB) is 3 times bigger than Docisfy (20kB), because we use Vue, Vue Router and Vuex while Docsify uses vanilla JavaScript under the hood.

