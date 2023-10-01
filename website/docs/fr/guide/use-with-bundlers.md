# Utiliser avec des Bundlers

Vous n’êtes pas obligé d’utiliser un bundleR pour utiliser Docute, mais si vous le souhaitez, vous le pouvez !

Vous devez d’abord installer Docute en tant que dépendance dans votre projet :

```bash
yarn add docute --dev
```

Ensuite, consultez ci-dessous l’utilisation avec le bundler de votre choix.

## Webpack

Dans votre fichier en point d'entrée :

```js
import Docute from 'docute'

new Docute({
  target: '#app',
  // Autres options
})
```

Vous devrez peut-être utiliser [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) pour générer également un fichier HTML.

Si vous utilisez [Vue CLI](https://cli.vuejs.org) ou [Poi](https://poi.js.org), félicitations, aucune configuration supplémentaire n'est requise.

## Parcel

[TODO] [PR WELCOME]
