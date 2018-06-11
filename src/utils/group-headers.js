export default headers => {
  headers = headers.map(header => Object.assign({}, header))

  let lastHeader
  headers.forEach(header => {
    if (header.depth === 2) {
      lastHeader = header
    } else if (lastHeader) {
      lastHeader.children = lastHeader.children || []
      // Only add h2 h3
      if (header.depth < 4) {
        lastHeader.children.push(header)
      }
    }
  })

  return headers.filter(header => header.depth === 2)
}
