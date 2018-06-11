import slugo from 'slugo'

const hidenTokens = (tokens, startIndex, total) => {
  if (startIndex === undefined) {
    startIndex = 0
  }
  if (total === undefined) {
    total = tokens.length
  }
  for (let i = 0; i < total; i++) {
    tokens[startIndex + i].hidden = true
    tokens[startIndex + i].children = []
  }
}

const getBlockquoteTokens = tokens => {
  const blockquoteStartIndex = 3
  const nextToken = tokens[blockquoteStartIndex]
  if (nextToken && nextToken.type === 'blockquote_open') {
    let blockquoteStopIndex
    for (const [index, token] of tokens.entries()) {
      if (token.type === 'blockquote_close') {
        blockquoteStopIndex = index
        break
      }
    }

    return tokens.slice(blockquoteStartIndex, blockquoteStopIndex + 1)
  }
}

export default md => {
  md.renderer.rules.heading_open = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx]

    env.ids = env.ids || []
    env.headings = env.headings || []

    const value = tokens[idx + 1].content
    let id = slugo(value)
    env.ids.push(id)
    const existingIdCount = env.ids.filter(v => v === id).length
    if (existingIdCount > 1) {
      id = `${id}${existingIdCount - 1}`
    }

    if (token.tag === 'h1') {
      env.title = value
      const blockquoteTokens = getBlockquoteTokens(tokens.slice(idx))
      if (blockquoteTokens) {
        env.subtitle = self.render(blockquoteTokens.filter((token, index) => {
          return index !== 0 && index !== (blockquoteTokens.length -1)
        }), options, env)
        hidenTokens(blockquoteTokens)
      }
      hidenTokens(tokens, idx, 3)
    } else {
      env.headings.push({
        id,
        value,
        depth: token.markup.length,
      })
    }

    token.attrPush(['id', id])
    token.attrPush(['tabindex', 0])

    return self.renderToken(tokens, idx, options)
  }
}
