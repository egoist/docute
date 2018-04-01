---
title: Markdown Features
toc: true
---

## Message Containers

To make your docss more readable, use the following format to write a `message container`:

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



## Message Blocks

To highlight some messages in your documentation, use the following format to write a `blockquote`:

```md
> __Alert__: This is a very dangerous action!
```

On GitHub it will be rendered as follows:

![2017-12-01 1 22 20](https://user-images.githubusercontent.com/8784712/33468930-b835cb64-d69a-11e7-8ab2-25585d61915d.png)

And with Docute it renders:

> __Alert__: This is a very `dangerous`  action!

We also support other message types which are:

```md
> __Info__: This is a `info`!

> __Warning__: This is a <code>warning</code>!

> __Success__: This is __ok__!

> __Note__: This is just a _note_!
```

And they look like:

> __Info__: This is a `info`!

> __Warning__: This is a <code>warning</code>!

> __Success__: This is __ok__!

> __Note__: This is just a _note_!
