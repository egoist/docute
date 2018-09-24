# Built-in Components

Docute comes with a set of built-in Vue components.

## `<ImageZoom>`

Use medium-style zoom effect to display certain image.

|Prop|Type|Default|Description|
|---|---|---|---|
|url|`string`|N/A|URL to image|
|alt|`string`|N/A|Placeholder text|
|border|`boolean`|`false`|Show border around image|
|width|`string`|N/A|Image width|

Example: 

```markdown
<ImageZoom 
  url="https://i.loli.net/2018/09/24/5ba8e878850e9.png" 
  :border="true" 
  width="300"
/>
```

<ImageZoom url="https://i.loli.net/2018/09/24/5ba8e878850e9.png" :border="true" width="300"/>


## `<Badge>`

A small count and labeling component.

|Prop|Type|Default|Description|
|---|---|---|---|
|type|<code>'tip' &#x7C; 'warning' &#x7C; 'danger'</code>|`'tip'`|Badge type|
|children|`string`|N/A|Badge text|

Example:

```markdown
- Feature 1 <Badge>Stable</Badge>
- Feature 2 <Badge type="warning">Beta</Badge>
- Feature 3 <Badge type="danger">Deprecated</Badge>
```

- Feature 1 <Badge>Stable</Badge>
- Feature 2 <Badge type="warning">Beta</Badge>
- Feature 3 <Badge type="danger">Deprecated</Badge>
