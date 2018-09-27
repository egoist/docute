# Writing

A document should be easy-to-read and easy-to-write.

## Document Format

A document is represented in Markdown format:

```markdown
# Title

The content goes here...
```

Check out the introduction for [Markdown](https://daringfireball.net/projects/markdown/) if you're not sure what it is.

## Links

### Internal Links

Internal links are converted to `<router-link>` for SPA-style navigation.

__Input__:

```markdown
- [Home](/) <!-- Send the user to Homepage -->
- [Use Vue in Markdown](/guide/use-vue-in-markdown) <!-- Send the user to another page -->
```

__Output__:

- [Home](/) <!-- Send the user to Homepage -->
- [Use Vue in Markdown](/guide/use-vue-in-markdown) <!-- Send the user to another page -->

### External Links

External links automatically gets HTML attributes `target="_blank" rel="noopener noreferrer"`, for example:

__Input__:

```markdown
- [Docute website](https://docute.org)
- [Docute repo](https://github.com/egoist/docute)
```

__Output__:

- [Docute website](https://docute.org)
- [Docute repo](https://github.com/egoist/docute)

## Code Highlighting

Code fences will be highlighted using [Prism.js](https://prismjs.com/), example code:

```js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
```

The languages we support by default:

- JavaScript
- CSS
- Markdown
- HTML

You can use [highlight](/options#highlight) option to add more languages.

## Line Highlighting in Code Fences

__Input:__

````markdown
```js {highlight:[3,'5-7',12]}
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

```js {highlight:[3,'5-7',12]}
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
