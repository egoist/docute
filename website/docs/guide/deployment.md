# Deployment

Keep in mind, it's just a static HTML file that can be served anywhere.

## Netlify <Badge type="success">Recommended</Badge>

1. Login to your [Netlify](https://www.netlify.com/) account.
2. In the [dashboard](https://app.netlify.com/) page, click __New site from Git__.
3. Choose a repository where you store your docs, leave the __Build Command__ area blank, fill in the __Publish directory__ area with the directory of your `index.html`, for example it should be `docs` if you populated it at `docs/index.html`.

## GitHub Pages

The easiest way to use GitHub Pages is to populate all your files inside `./docs` folder on the master branch, and then use this folder for GitHub Pages:

<ImageZoom url="https://i.loli.net/2018/06/11/5b1e0da0c173a.png" alt="github pages" :border="true" />

However you can still use `gh-pages` branch or even `master` branch to serve your docs, it all depends on your needs.
