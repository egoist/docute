# Support hors ligne

Améliorez les performances de votre site Web en mettant en cache et en servant vos fichiers, ceci est optimisé par un [service worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API/Using_Service_Workers).

Commencez par créer un fichier `sw.js` dans votre répertoire racine de vos docs :

```js
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'
)

const ALLOWED_HOSTS = [
  // Le domaine pour charger les fichiers markdown
  location.host,
  // Le domaine pour charger docute
  'unpkg.com'
]

const matchCb = ({ url, event }) => {
  return event.request.method === 'GET' && ALLOWED_HOSTS.includes(url.host)
}

workbox.routing.registerRoute(
  matchCb,
  workbox.strategies.networkFirst()
)
```

<sup>_[Workbox](https://developers.google.com/web/tools/workbox/) est une bibliothèque qui recueille les meilleures pratiques et supprime le boilerplate que chaque développeur écrit lorsqu'il travaille avec des services workers._</sup>

Puis enregistrez ce service worker dans `index.html` :

```html {highlight:['16-18']}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>My Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/docute@4/dist/docute.css" />
  </head>
  <body>
    <div id="docute"></div>
    <script src="https://unpkg.com/docute@4/dist/docute.js"></script>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
      }

      new Docute({
        target: '#docute'
      })
    </script>
  </body>
</html>
```

__🥳 Votre site Web sera maintenant prêt pour la gestion hors-ligne.__

Si vous n'avez plus besoin de ce service worker, remplacez le contenu de `sw.js` par le code suivant pour le désactiver :

```js
self.addEventListener('install', e => {
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  self.registration
    .unregister()
    .then(() => {
      return self.clients.matchAll()
    })
    .then(clients => {
      clients.forEach(client => client.navigate(client.url))
    })
})
```
