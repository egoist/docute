---
search: english
---

# docute-cli

`docute-cli` help you kick start a directory with `index.html` `config.js` `README.md` inside, as well as a dev server and some more features.

## Initialize A Directory

Initialize a directory to store docs, such as `./docs`:

```bash
# the default directory is ./docs
docute init
# or use custom path
docute init ./my-docs
```

Run `docute init --help` to see full usage.

## Preview Docs Locally

`docute preview` is the default command, which means running `docute` is the same as running `docute preview`, this is how it looks like:

<img src="/assets/command-preview.png" alt="preview" width="500">

You can use `--watch` option to enable live reloading, for full usage please run `docute --help` to check out.
