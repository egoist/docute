importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'
)

self.addEventListener('install', e => {
  self.skipWaiting()
})

const ALLOWED_HOSTS = [
  // The domain to load markdown files
  location.host,
  // The domain to load external scripts like Prism components
  'unpkg.com'
]

const matchCb = ({ url, event }) => {
  return event.request.method === 'GET' && ALLOWED_HOSTS.includes(url.host)
}

workbox.routing.registerRoute(matchCb, workbox.strategies.networkFirst())
