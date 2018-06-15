# 部署

> Keep in mind, it's just a static HTML file that can be served anywhere.

## Netlify <Badge>Recommended</Badge>

1. Login to your [Netlify](https://www.netlify.com/) account.
2. In the [dashboard](https://app.netlify.com/) page, click __New site from Git__.
3. Choose a repository where you store your docs, leave the __Build Command__ area blank, fill in the __Publish directory__ area with the directory of your `index.html`, for example it should be `docs` if you populated it at `docs/index.html`.

### HTML5 router

When using the HTML5 router, a.k.a. [`routerMode: 'history'`](/api#routermode), you need to set up redirect rules that redirect all requests to your `index.html`, it's pretty simple when you're using Netlify, populate a `_redirects` file in the docs directory and you're all set:

📝 ___redirects__:

```
/*    /index.html   200
```

## GitHub Pages

The easiest to use GitHub Pages is to popuate all your files inside the `./docs`, and then use this folder for GitHub Pages:

<ImageZoom url="https://i.loli.net/2018/06/11/5b1e0da0c173a.png" alt="github pages" :border="true" />

However you can still use `gh-pages` branch or even `master` branch to serve your docs, it all depends on your needs.

### HTML5 router <Badge type="danger">Not recommended</Badge>

It's not recommended to use `routerMode: 'history'` with GitHub pages since GitHub does not provide native redirects functionality. You can use `404.html` to achieve this though.
