---
title: Markdown Features
toc: true
---

## Messages

Colored message blocks, to emphasize part of your page. 

You can use the following format to write a `blockquote`:

```md
> __Alert__: This is a very dangerous action!
```

With Docute it will be rendered as follows:

> __Alert__: This is a very dangerous action!

We also support other message types which are:

```md
> __Info__: This is a info!

> __Warning__: This is a warning!

> __Success__: This is ok!

> __Note__: This is just a note!
```

And they look like:

> __Info__: This is a info!

> __Warning__: This is a warning!

> __Success__: This is ok!

> __Note__: This is just a note!



## Message Containers

Similar to [Messages](#messages) but it works as a container. This means that `Message Containers` solves the problem that `Messages` cannot use multi-line syntax, eg, `table`.

You can use the following format to write a `message container`:


```md
::: Alert
  This is for beginners and pros, just enjoy!
:::
```

With Docute it will be rendered as follows:

::: Alert
  This is for beginners and pros, just enjoy!
:::

We also support other message types which are similar to [Messages](#messages):

```md
::: Info
  This is a info!
:::

::: Warning
  This is a warning!
:::

::: Success
  This is a ok!
:::

::: Note
  This is just a note!
:::
```

And they look like:

::: Info
  This is a info!
:::

::: Warning
  This is a warning!
:::

::: Success
  This is a ok!
:::

::: Note
  This is just a note!
:::
