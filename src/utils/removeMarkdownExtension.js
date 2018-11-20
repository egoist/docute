const RE = /\.md$/

export default input => {
  let [path, hash] = input.split('#')
  if (RE.test(path)) {
    path = path.replace(RE, '')
  }
  return `${path}${hash ? `#${hash}` : ''}`
}
