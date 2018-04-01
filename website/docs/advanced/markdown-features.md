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

Similar to [Messages](#messages) but it looks more likes a container, use the following format to create a `message container`:

### tip

Show some tips in your doc:

```md
::: tip
  This is for beginners and pros, just enjoy!
:::
```

And you get:

::: tip
  This is for beginners and pros, just enjoy!
:::


### warning

Similar to [tip](#tip) but it looks more serious:

```md
::: warning
  Do not do like this, do it that way please. If you still can't help doing such way, we will call your mom and order some pizza to let you know, you're in trouble!
:::
```

And you get:

::: warning
  Do not do like this, do it that way please. If you still can't help doing such way, we will call your mom and order some pizza to let you know, you're in trouble!
:::


### danger

```md
::: danger
  This is really dangerous, watch out!
:::
```

And you get:

::: danger
  This is really dangerous, watch out!
:::
