# Options

Les options utilisées par le constructeur `Docute`.

```js
new Docute(options)
```

## target

- Type : `string`
- Par défaut : `docute`

L'ID de l'élément cible à localiser, par exemple `app` ou `#app`.

## title

- Type : `string`
- Par défaut : `document.title`

Titre du site web.

## logo

- Type : `string` `object`
- Par défaut : `<span>{{ $store.getters.config.title }}</span>`

Personnalise le logo dans l'entête.

- `string` : utilisé comme un template de Vue.
- `object` : utilisé comme un composant de Vue.

## nav

- Type : `Array<NavItem>`

Un tableau d'éléments de navigation à afficher sur la barre de navigation.

```ts
interface NavItem {
  title: string
  link?: string
  // Ouvrir le lien dans un nouvel onglet
  // Ne fonctionne que pour les liens externes
  // Par défaut à `true`
  openInNewTab?: boolean
  // Ou utiliser `children` pour afficher le menu déroulant
  children?: Array<NavItemLink>
}

interface NavItemLink {
  title: string
  link: string
  openInNewTab?: boolean
}
```

## sidebar

- Type : `Array<SidebarItem>` `(store: Vuex.Store) => Array<SidebarItem>`

Un tableau d'éléments de navigation à afficher dans la barre latérale.

```ts
interface SidebarItem {
  title?: string
  collapsable?: boolean
  children: Array<SidebarItemLink>
}

interface SidebarItemLink {
  title: string
  link: string
  // Ouvrir le lien dans un nouvel onglet
  // Ne fonctionne que pour les liens externes
  // Par défaut à `true`
  openInNewTab?: boolean
  /* Indique s'il faut afficher la table des matières, `true` par défaut */
  toc?: boolean
}
```

## sourcePath

- Type : `string`
- Par défaut : `'./'`

Le chemin source depuis lequel il faut chercher les fichiers markdown, nous les chargeons par défaut depuis le chemin où votre `index.html` est rempli.

Il peut également s'agir d'une URL complète du type : `https://some-website/path/to/markdown/files` afin que vous puissiez charger des fichiers d'un autre domaine.

## routes

- Type : `Routes`

Utilisez cette option pour que Docute récupère un fichier spécifique ou utilise un contenu donné pour un chemin.

```ts
interface Routes {
  [path: string]: RouteData
}

interface RouteData {
  /* Par défaut sur l'entête h1 du contenu */
  title?: string
  /* Un des éléments `content` ou `file` est requis */
  content?: string
  /* La réponse sera utilisée comme `contenu` */
  file?: string
  /* Analyse le contenu comme du markdown, true par défaut */
  markdown?: boolean
  [k: string]?: any
}
```

## componentMixins

- Type : `Array<Object>`

Fondamentalement, un tableau de [mixins de Vue](https://vuejs.org/v2/api/#mixins) qui sont appliqués à tous les composants markdown.


## highlight

- Type : `Array<string>`

Un tableau de noms de langages à mettre en évidence. Consultez [Prism.js](https://unpkg.com/prismjs/components/) pour tous les noms de langaes pris en charge (sans le préfixe `prism-`).

Par exemple : `highlight: ['typescript', 'go', 'graphql']`.

## editLinkBase

- Type : `string`

Le chemin de base pour l'URL du *lien de modification*.

Par exemple, si vous stockez les fichiers markdown dans le dossier `docs` de la branche principale d’un dépôt GitHub, il faut alors :

```
https://github.com/USER/REPO/blob/master/docs
```

## editLinkText

- Type : `string`
- Par défaut : `'Edit this page'`

Le texte du *lien de modification*.

## theme

- Type : `string`
- Par défaut : `default`
- Valeurs : `default` `dark`

Thème du site.

## detectSystemDarkTheme

- Type : `boolean`
- Par défaut : `undefined`

Dans les versions récentes de macOS (Mojave) et de Windows 10, les utilisateurs ont pu activer le mode sombre au niveau du système. Définissez cette option sur `true` pour que Docute utilise le thème sombre par défaut si votre système l’a activé.

## darkThemeToggler

- Type : `boolean`
- Par défaut : `undefined`


Affiche un interrupteur pour activer ou désactiver le thème sombre.

## layout

- Type : `string`
- Par défaut : `wide`
- Valeurs : `wide` `narrow` `left`

Mise en page du site.

## versions

- Type : `Versions`

Lorsque l'option est spécifiée, Docute affichera un sélecteur de version dans la barre latérale.

```ts
interface Versions {
  // Le numéro de version, comme `v1`
  [version: string]: {
    // Le lien vers cette version de la documentation
    link: string
  }
}
```

## cssVariables

- Type : `object` `(theme: string) => object`

Remplace les variables CSS.

## overrides

- Type : `{[path: string]: LocaleOptions}`

```ts
interface LocaleOptions extends Options {
  language: string
}
```

## router

- Type : `ConstructionOptions`

Tous les [options de construction](https://router.vuejs.org/api/#router-construction-options) de vue-router à l'exception de `routes` sont acceptés ici.

Par exemple, vous pouvez définir `router: {mode: 'history'}` pour [supprimer le hachage](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) dans les URL.


## banner / footer

- Type : `string` `VueComponent`

Afficher la bannière et le pied de page. Une chaîne sera insérée dans `<div class="docute-banner">` ou `<div class="docute-footer">` et utilisée comme template de Vue.

Par exemple :

```js
new Docute({
  banner: `Veuillez <a href="https://donate.com/link">
  faire un don</a> <ExternalLinkIcon /> pour soutenir ce projet !`
```

Vous pouvez également utiliser un composant Vue :

```js
new Docute({
  banner: {
    template: `
    <div class="docute-banner">
      Veuillez <a href="https://donate.com/link">
      faire un don</a> <ExternalLinkIcon /> pour soutenir ce projet !
    </div>
    `
  }
})
```

## imageZoom

- Type : `boolean`
- Par défaut : `undefined`

Activer l’effet de zoom d’image comme Medium pour toutes les images.

Vous pouvez également utiliser le composant [`<image-zoom>`](./builtin-components.md#imagezoom) si vous n'en avez besoin que dans des images spécifiques.

## fetchOptions

- Type : `object`

L'option pour [`window.fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
