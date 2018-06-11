# Introduction

> Here’s a quick overview of the features and usage in Docute.

<script>
console.log('??')
</script>

## What is Docute?

Docute is basically a JavaScript file that fetches Markdown files and renders them as a single-page application.

It's totally runtime-driven so there's no server-side components involved which also means there's no build process. You only need to create an HTML file and a bunch of Markdown documents and your website is almost ready!

## How does it work?

When you visit a page like `/`, Docute will fetch `/README.md` and render it to HTML string and display in a nice UI. Just like what you're seeing right now.

## Why not use..?

### VuePress / Peco

They're very good as long as you don't mind installing another 100 mega bytes of dependencies in your project.

### Hexo

It's good as long as you don't mind a build process or spending tens of hours trying to find or write a nice theme using ~~good~~ old string-based template engine.

### GitBook

Similar to Hexo but focus on docs and books.

## Browser Compatibility

We're trying to push web forward by using ES2015 features that modern browsers already support, and it will also make life so much easier if Docute drops IE support, thus we only plan to support evergreen browsers, namely last 2 versions of Google Chrome, Apple Safari, Mozilla Firefox and Microsoft Edge.
