# Introduction à Docute

Le moyen le plus rapide pour créer un site de documentation pour votre projet.

## Qu'est-ce que Docute

Docute est essentiellement un fichier JavaScript qui récupère des fichiers Markdown et les rend sous forme d'une application mono page.

Il est totalement axé sur l'exécution, il n'y a donc aucun composant côté serveur, ce qui signifie également qu'il n'y a pas de processus de construction. Vous avez seulement besoin de créer un fichier HTML et plusieurs documents Markdown et votre site web est presque prêt !

## Comment ça marche

En bref : l'URL est l'API.

Nous récupérons et faisons le rendu du fichier markdown correspondant vers l'URL que vous visitez :

```
/         => /README.md
/foo      => /foo.md
/foo/     => /foo/README.md
/foo/bar  => /foo/bar.md
```

## Démarrage rapide

Supposons que vous avez les fichiers suivants dans le dossier `./my-docs` :

```bash
.
├── README.md
└── index.html
```

Le fichier `index.html` ressemble à ceci :

```html {highlight:[7,'10-16']}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>My Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/docute@4/dist/docute.css">
  </head>
  <body>
    <div id="docute"></div>
    <script src="https://unpkg.com/docute@4/dist/docute.js"></script>
    <script>
      new Docute({
        target: '#docute'
      })
    </script>
  </body>
</html>
```

Vous pouvez ensuite servir ce dossier en tant que site Web statique sur votre ordinateur en utilisant :

- Node.js: `npm i -g serve && serve .`
- Python: `python -m SimpleHTTPServer`
- Golang: `caddy`
- ..ou quel que soit le serveur web statique

Ensuite, vous pouvez utiliser [sidebar](./options.md#sidebar), [nav](./options.md#nav) ou d'autres [options](./options.md) pour personnaliser le site Web.

Voici un [REPL](https://repl.it/@egoist/docute-starter) où vous pouvez essayer Docute en ligne ou [téléchargez](https://repl.it/@egoist/docute-starter.zip) le pour l'exécuter localement.

## Comparaisons

### VuePress / GitBook / Hexo

Ils génèrent tous du HTML statique lors de la construction, ce qui est bien pour le SEO (référencement).

Si le SEO vous intéresse, vous pouvez utiliser [presite](https://github.com/egoist/presite) pour pré rendre votre site web.

### Docsify

[Docsify](https://docsify.js.org/#/) et Docute sont à peu près les mêmes, mais avec une interface utilisateur et des usages différents.

Docute (60Kb) est 3 fois plus volumineux que Docsify (20 Kb), car nous utilisons Vue, Vue Router et Vuex, alors que Docsify utilise sous le capot du JavaScript.

## Compatibilité des navigateurs

Docute prend en charge tous les navigateurs _ever-green_. Aucun support de IE !
