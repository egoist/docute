# Writing

> A document should be easy-to-read and easy-to-write.

## Document Format

A document is represented in Markdown format:

```markdown
# Title

> Sub title

The content goes here...
```

Check out the introduction for [Markdown](https://daringfireball.net/projects/markdown/).

Some notes:

- We use the value of `h1` header as document title.
- We use the first blockquote after `h1` header as subtitle.

## Links

### Internal Links

Internal links are converted to `<router-link>` for SPA-style navigation.

__Input__:

```markdown
- [Home](/) <!-- Send the user to Homepage -->
- [Getting Started](/getting-started) <!-- Send the user to another page -->
```

__Output__:

- [Home](/) <!-- Send the user to Homepage -->
- [Getting Started](/getting-started) <!-- Send the user to another page -->

### External Links

External links automatically gets `target="_blank" rel="noopener noreferrer"`, for example:

__Input__:

```markdown
- [Docute website](https://docute.org)
- [Docute repo](https://github.com/egoist/docute)
```

__Output__:

- [Docute website](https://docute.org)
- [Docute repo](https://github.com/egoist/docute)

## Line Highlighting in Code Fences

__Input:__

````markdown
```js {3,5-7,12}
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```
````

__Output:__

```js {3,5-7,12}
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```
