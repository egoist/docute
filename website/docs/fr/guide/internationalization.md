# Internationalisation

Comme Docute utilise une API basée sur une URL, l'ajout d'une prise en charge multilingue peut être assez simple :

```
docs
├─ README.md
├─ foo.md
├─ nested
│  └─ README.md
└─ zh
   ├─ README.md
   ├─ foo.md
   └─ nested
      └─ README.md
```

Avec la structure des répertoires ci-dessus, les utilisateurs peuvent consulter la version *Chinoise* de vos documents via l'URL `/zh/`.

Ensuite, vous pouvez utiliser l'option `overrides` pour localiser le texte utilisé dans l'interface utilisateur :

```js
new Docute({
  sidebar: [
    {
      children: [
        { title: 'Guide', link: '/guide' }
      ]
    }
  ],
  overrides: {
    '/': {
      language: 'English' // Utilisé par le menu déroulant Langue dans la barre latérale
    },
    '/zh/': {
      language: 'Chinese',
      // Remplacer la barre latérale par défaut
      sidebar: [
        {
          children: [
            { title: '指南', link: '/zh/guide' }
          ]
        }
      ]
    }
  }
})
```
