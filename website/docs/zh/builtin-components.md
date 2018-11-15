# 内置组件

Docute 附带一些内置的 Vue 组件。

## `<ImageZoom>`

使用与 Medium 相同的缩放效果显示 image 。

|属性|类型|默认值|描述|
|---|---|---|---|
|url|`string`|N/A|Image 的 URL|
|alt|`string`|N/A|占位文字|
|border|`boolean`|`false`|是否显示图像周围的边框|
|width|`string`|N/A|Image 宽度|

示例：

```markdown
<ImageZoom 
  url="https://i.loli.net/2018/09/24/5ba8e878850e9.png" 
  :border="true" 
  width="300"
/>
```

<ImageZoom url="https://i.loli.net/2018/09/24/5ba8e878850e9.png" :border="true" width="300"/>


## `<Badge>`

用于计数和展示标签的组件。

|属性|类型|默认值|描述|
|---|---|---|---|
|type|<code>'tip' &#x7C; 'warning' &#x7C; 'danger'</code>|`'tip'`|Badge 类型|
|children|`string`|N/A|Badge 内容|

示例：

```markdown
- Feature 1 <Badge>稳定</Badge>
- Feature 2 <Badge type="warning">Beta</Badge>
- Feature 3 <Badge type="danger">弃用</Badge>
```

- Feature 1 <Badge>稳定</Badge>
- Feature 2 <Badge type="warning">Beta</Badge>
- Feature 3 <Badge type="danger">弃用</Badge>

## `<v-style>` `<v-script>`

在 Vue template 中替代 `<style>` 和 `<script>` 标签。

通常，在 Markdown 里你并不需要直接使用此组件。因为我们会自动将 markdown 中的 `<style>` 和 `<script>` 标签转换为该组件。
