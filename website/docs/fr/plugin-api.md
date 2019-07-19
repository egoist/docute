# Api de plugin

Propriétés du plugin :

- `name` : `string` nom du plugin.
- `extend(api: PluginAPI)` : extension des fonctionnalités de base.

## api.processMarkdown(fn)

- `fn` : `(text: string) => string | Promise<string>`

Traite le markdown.

## api.processHTML(fn)

- `fn` : `(html: string) => string | Promise <string>`

Traite le HTML.

## api.extendMarkedRenderer(fn)

- `fn` : `(renderer: marked.Renderer) => void`

Vous pouvez utiliser `fn` pour modifier [le rendu de marked](https://marked.js.org/#/USING_PRO.md#renderer) que nous utilisons.

## api.extendMarkdownComponent(fn)

- `fn` : `(Component: VueComponentOptions) => void`

Vous pouvez utiliser ce hook pour modifier le composant du markdown compilé.

## api.onContentUpdated(fn)

- `fn` : `(vm: Vue) => void`

`fn` sera appelé lorsque le contenu de la page sera mis à jour.

## api.registerComponent(position, component)

- `position` : `string`
- `component` : `VueComponent`

Enregistre un composant à une position spécifique :

- `sidebar:start` : au début de la barre latérale.
- `sidebar:end` : à la fin de la barre latérale.
- `content:start` : au début du contenu de la page.
- `content:end` : à la fin du contenu de la page.
- `header-right:start` : au début de la navigation à droite dans l'entête du site.
- `header-right:end` : à la fin de la navigation à droite dans l'entête du site.

## api.enableSearch(options)

Active la barre de recherche.

Propriétés dans `options` :

|Propriété|Type|Description|
|---|---|---|
|`handler`|`Handler`|Une fonction Handler déclenchée pour chaque entrée d'utilisateur.|

```ts
type Handler = (keyword: string) => SearchResult[] | Promise<SearchResult[]>

interface SearchResult {
  title: string
  link: string
  label: string?
  description: string?
}
```

## api.router

Fondamentalement l'instance du [Router Vue](https://router.vuejs.org/api/#router-instance-properties).

## api.store

Fondamentalement l'instance de [Vuex](https://vuex.vuejs.org/api/#vuex-store-instance-properties).
