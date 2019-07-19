# Plugin

Un plugin est essentiellement un objet pur :

```js
const showAuthor = {
  // Nom du plugin
  name: 'showAuthor',
  // Étend les fonctionnalités de base
  extend(api) {
    api.processMarkdown(text => {
      return text.replace(/{author}/g, '> Written by EGOIST')
    })
  }
}

new Docute({
  // ...
  plugins: [
    showAuthor
  ]
})
```

Exemple :

```markdown
# Titre de la page

{author}
```

<ImageZoom :border="true" src="https://i.loli.net/2018/09/28/5bae278dd9c03.png" />

---

Pour accepter les options de votre plugin, vous pouvez utiliser une fonction factory :

```js
const myPlugin = opts => {
  return {
    name: 'my-plugin',
    extend(api) {
      // faire quelque chose avec `opts` et `api`
    }
  }
}

new Docute({
  plugins: [
    myPlugin({ foo: true })
  ]
})
```

---

Pour plus d'informations sur la façon de développer un plugin, veuillez consulter [API de plugin](/plugin-api).

Consultez [https://github.com/egoist/docute-plugins](https://github.com/egoist/docute-plugins) pour avoir une liste des plugins Docute par mainteneurs et utilisateurs.
