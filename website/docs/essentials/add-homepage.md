---
title: Add Homepage
---
Homepage is using a different layout since it's only responsible for showcasing your project. Thus, we need you to provide some information in the front-matter to properly render it.

We use `/README.md` to render homepage, supported keys in front-matter are:

- __getStarted__: Fill a link for the `Get Started` button.
- __features__: Describe the features of your product, the type of `features` is: `Feature[]`.
```typescript
interface Feature {
  title: string
  description: string | string[]
}
```
