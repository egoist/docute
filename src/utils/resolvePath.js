export default function(root, path) {
  return (
    // Ensure the trailing slash
    root.replace(/\/?$/, '/') +
    // Remove leading and traling slash
    path.replace(/^\//, '').replace(/\/$/, '')
  )
}
