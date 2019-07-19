# Personnalisation

La personnalisation de Docute est aussi amusante que de jouer avec des briques Lego.

## Barre de navigation

La barre de navigation est utilisée pour la navigation au niveau du site. Elle contient généralement un lien vers votre page d'accueil et un lien vers le référentiel de votre projet. Cependant, vous pouvez ajouter ici ce que vous voulez.

```js
new Docute({
  title: 'Docute',
  nav: [
    {
      title: 'Accueil',
      link: '/'
    },
    {
      title: 'GitHub',
      link: 'https://github.com/egoist/docute'
    },
    // Un menu déroulant
    {
      title: 'Communauté',
      children: [
        {
          title: 'Spectrum',
          link: 'https://spectrum.chat/your-community'
        },
        {
          title: 'Discord',
          link: 'https://discord.app/your-discord-server'
        }
      ]
    }
  ]
})
```

L'option `title` utilise par défaut la valeur de la balise `<title>` dans votre code HTML, donc elle est complètement facultative.

Consultez la barre de navigation de ce site pour voir à quoi elle ressemble.

## Barre latérale

La barre latérale est principalement utilisée pour la navigation entre les pages. Comme vous pouvez le constater sur cette page, nous l’utilisons également pour afficher un sélecteur de version et un sélecteur de langue.

```js
new Docute({
  sidebar: [
    // Un élément de la barre latérale, avec des liens enfants
    {
      title: 'Guide', // Facultatif
      collapsable: true, // Facultatif
      children: [
        {
          title: 'Commencer',
          link: '/guide/getting-started'
        },
        {
          title: 'Installation',
          link: '/guide/installation'
        }
      ]
    }
  ]
})
```

Consultez la référence de l’option [sidebar](../options.md#sidebar) pour plus de détails.

## Mise en page

Docute utilise par défaut une mise en page d'écran large comme vous le voyez, mais il existe d'autres mises en page disponibles :

<docute-select v-model="$store.state.originalConfig.layout" v-slot="{ value }">
  <option value="wide" :selected="value === 'wide'">Large</option>
  <option value="narrow" :selected="value === 'narrow'">Étroit</option>
  <option value="left" :selected="value === 'left'">Gauche</option>
</docute-select>

```js {interpolate:true}
new Docute({
  layout: '{{ $store.state.originalConfig.layout }}'
})
```

## Gestion des versions

Supposons que vous ayez une branche `master` pour les documents les plus récents et des branches `v0.1` `v0.2` pour les versions antérieures, vous pouvez utiliser un seul site Web Docute pour tous les servir, avec l'aide des options [`overrides`](../options.md#overrides) et [`sourcePath`](../options.md#sourcepath).

```js
new Docute({
  // Configurez les chemins suivants pour charger des fichiers Markdown à partir de différents chemins
  overrides: {
    '/v0.1/': {
      sourcePath: 'https://raw.githubusercontent.com/user/repo/v0.1'
    },
    '/v0.2/': {
      sourcePath: 'https://raw.githubusercontent.com/user/repo/v0.2'
    }
  },
  // Utilise l'option `versions` pour ajouter un sélecteur de version
  // Dans la barre latérale
  versions: {
    'v1 (Dernière)': {
      link: '/'
    },
    'v0.2': {
      link: '/v0.2/'
    },
    'v0.1': {
      link: '/v0.1/'
    }
  }
})
```

## Polices personnalisées

L'application des polices personnalisées sur votre site Web est assez simple, vous pouvez simplement ajouter une balise `<style>` dans votre fichier HTML pour utiliser les [Google Fonts](https://fonts.google.com/) :

```html
<style>
  /* Importer la police souhaitée à partir de Google */
  @import url('https://fonts.googleapis.com/css?family=Lato');

  /* Appliquer la police au body (pour remplacer celui par défaut) */
  body {
    font-family: Lato, sans-serif;
  }
</style>
```

<button @click="insertCustomFontsCSS">Cliquez moi</button> pour basculer vers les polices personnalisées sur ce site.

Par défaut, un nouveau site Web Docute utilise les polices par défaut du système.

## Style personnalisé

Vous pouvez utiliser l'option [`cssVariables`](../options.md#cssvariables) pour personnaliser le style du site :

```js
new Docute({
  cssVariables: {
    sidebarWidth: '300px'
  }
})

// Ou en utilisant une fonction pour obtenir le thème actuel
new Docute({
  cssVariables(theme) {
    return theme === 'dark' ? {} : {}
  }
})
```

Les `cssVariables` utilisées par le thème <code>{{ $store.getters.config.theme }}</code> :

<ul>
<li v-for="(value, key) in $store.getters.cssVariables" :key="key">
<strong>{{key}}</strong>: <color-box :color="value" v-if="/(Color|Background)/.test(key)" />
<code>{{value}}</code>
</li>
</ul>

Remarquez que ces propriétés sont définies en camelCase, mais vous devez les référencer dans le CSS à l'aide du kebab-case :

```css
.Sidebar {
  width: var(--sidebar-width);
}
```
