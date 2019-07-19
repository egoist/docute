# Déploiement

N'oubliez pas qu'il ne s'agit que d'un fichier HTML statique pouvant être utilisé n'importe où.

## Render <Badge type="success">Recommandé</Badge>

Render offre un [hébergement de site statique gratuit](https://render.com/docs/static-sites) avec le SSL entièrement géré, un CDN global et des déploiements automatiques en continu à partir de GitHub.

1. Créez un nouveau service Web sur Render et donnez l'autorisation à l'application GitHub de Render pour accéder à votre nouveau dépôt.
2. Utilisez les valeurs suivantes lors de la création :
  - Environment: Static Site
  - Build Command: Laissez le champ vide
  - Publish Directory: Le répertoire de votre `index.html`, par exemple cela devrait être `docs` si vous l'avez rempli dans `docs/index.html`.

## Netlify

1. Connectez vous à votre compte [Netlify](https://www.netlify.com/).
2. Dans la page du [dashboard](https://app.netlify.com/) , cliquez __New site from Git__.
3. Choisissez un dépôt où sont stockés vos docs, laissez à vide la zone __Build Command__, remplissez la zone __Publish directory__ avec le répertoire de votre `index.html`, par exemple cela devrait être `docs` si vous l'avez rempli dans `docs/index.html`.

## Pages GitHub

Le moyen le plus simple d’utiliser les pages GitHub consiste à renseigner tous vos fichiers dans le dossier `./docs` de la branche principale, puis d'utiliser ce dossier pour les pages GitHub :

<ImageZoom src="https://i.loli.net/2018/06/11/5b1e0da0c173a.png" alt="github pages" :border="true" />

Cependant, vous pouvez toujours utiliser la branche `gh-pages` ou même la branche `master` pour servir vos documents, tout dépend de vos besoins.

## ZEIT Now

[ZEIT Now](https://zeit.co/now) est une plateforme pour les déploiements globaux sans serveur, il est également parfaitement adapté au déploiement d'un site Web statique avec ou sans processus de construction.

En supposant que vos documents se trouvent dans le dossier `./docs`, vous pouvez simplement le renseigner dans `now.json` de votre projet :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "docs/**",
      "use": "@now/static"
    }
  ]
}
```

Puis [installez Now](https://zeit.co/docs/v2/getting-started/installation/) sur votre machine.

Après cela, vous pouvez exécuter la commande `now` dans votre projet et vous voilà prêt.

Assurez-vous de vérifier l'[intégration GitHub](https://zeit.co/docs/v2/integrations/now-for-github/) de Now si vous souhaitez des déploiements automatiques pour chaque push et pull request.
