# Deployment

Keep in mind, it's just a static HTML file that can be served anywhere.

## Render <Badge type="success">Recommended</Badge>

Render offers [free static site hosting](https://render.com/docs/static-sites) with fully managed SSL, a global CDN and continuous auto deploys from GitHub.

1. Create a new Web Service on Render, and give Render’s GitHub app permission to access your new repo.
2. Use the following values during creation:
  - Environment: Static Site
  - Build Command: Leave it blank
  - Publish Directory: The directory to your `index.html`, for example it should be `docs` if you populated it at `docs/index.html`.

## Netlify

1. Login to your [Netlify](https://www.netlify.com/) account.
2. In the [dashboard](https://app.netlify.com/) page, click __New site from Git__.
3. Choose a repository where you store your docs, leave the __Build Command__ area blank, fill in the __Publish directory__ area with the directory of your `index.html`, for example it should be `docs` if you populated it at `docs/index.html`.

## GitHub Pages

The easiest way to use GitHub Pages is to populate all your files inside `./docs` folder on the master branch, and then use this folder for GitHub Pages:

<ImageZoom src="https://i.loli.net/2018/06/11/5b1e0da0c173a.png" alt="github pages" :border="true" />

However you can still use `gh-pages` branch or even `master` branch to serve your docs, it all depends on your needs.

## ZEIT Now

[ZEIT Now](https://zeit.co/now) is a platform for Global Serverless Deployments, it's also perfectly suitable for deploying a static website with or without build process.

Assuming you have your docs in `./docs` folder, to deploy it you can simply populate a `now.json` in your project:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "docs/**",
      "use": "@now/static"
    }
  ]
}
```

Then [install Now](https://zeit.co/docs/v2/getting-started/installation/) on your machine.

After that, you can run the command `now` in your project and you're all set.

Make sure to check out Now's [GitHub Integration](https://zeit.co/docs/v2/integrations/now-for-github/) if you want automatic deployments on every push and pull request.
