import Promise from 'promise-polyfill'

if (typeof window !== 'undefined') {
  window.Promise = window.Promise || Promise
} else if (typeof global !== 'undefined') {
  global.Promise = global.Promise || Promise
}
