# 书写规范

文档应易于阅读且易于编写。

## 文档规范

文档应以 Markdown 格式展现:

```markdown
# 标题

内容填在这里...
```

如果你不知道它是什么，请查阅 [Markdown](https://daringfireball.net/projects/markdown/)。

## 链接

### 内部链接

内部链接会转换为 `<router-link>` 进行 SPA 式导航。

__输入__：

```markdown
- [首页](/) <!-- 展示首页 -->
- [在 Markdown 中使用 Vue](/guide/use-vue-in-markdown) <!-- 展示其他页面 -->
```

__输出__：

- [首页](/) <!-- 展示首页 -->
- [在 Markdown 中使用 Vue](/guide/use-vue-in-markdown) <!-- 展示其他页面 -->

### 外部链接

外部链接会自动添加 HTML 属性 `target="_blank" rel="noopener noreferrer"`，例如：

__输入__：

```markdown
- [Docute website](https://docute.org)
- [Docute repo](https://github.com/egoist/docute)
```

__输出__：

- [Docute website](https://docute.org)
- [Docute repo](https://github.com/egoist/docute)

## 代码高亮 Highlighting

代码框使用 [Prism.js](https://prismjs.com/) 高亮显示，示例代码：

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

默认支持的语言：

- JavaScript
- CSS
- Markdown
- HTML

你可以查看[高亮](/options#高亮)选项添加更多语言。

## 代码框中某行高亮显示

__输入：__

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

__输出：__

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

## 使用 Mermaid

[Mermaid](https://mermaidjs.github.io/) 是一种纯文本编写图表的方法，你可以使用简单的 Docute 插件来添加对 Mermaid 的支持：

```html
<script src="https://cdn.jsdelivr.net/npm/docute@4.0.3/dist/docute.js"></script>
<!-- Load mermaid -->
<script src="https://cdn.jsdelivr.net/npm/mermaid@8.0.0-rc.8/dist/mermaid.min.js"></script>
<!-- Load the mermaid plugin -->
<script src="https://cdn.jsdelivr.net/npm/@leptosia/docute-mermaid@1/dist/index.min.js"></script>

<!-- Use the plugin -->
<script>
new Docute({
  // ...
  plugins: [
    docuteMermaid()
  ]
})
</script>
```

这是一个有效的示例：

<iframe src="https://codesandbox.io/embed/z2r960n3v4" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
