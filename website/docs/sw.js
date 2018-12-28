importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'
)

const ALLOWED_HOSTS = [
  // The domain to load markdown files
  location.host,
  // The domain to load docute
  // 'unpkg.com'
]

const matchCb = ({ url, event }) => {
  return event.request.method === 'GET' && ALLOWED_HOSTS.includes(url.host)
}

workbox.routing.registerRoute(
  matchCb,
  workbox.strategies.networkFirst()
)
