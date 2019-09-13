import hooks from '../hooks'
import markedRenderer from './markedRenderer'
import marked from './marked'
import highlight from './highlight'

async function inlineRender(iContent) {
  let content = await hooks.processPromise('processMarkdown', iContent)
  const env = {
    headings: [],
    mixins: [],
    config: {}
  }
  content = marked(content, {
    renderer: markedRenderer(hooks),
    highlight,
    env
  })
  content = await hooks.processPromise('processHTML', content)
  return content
}

export default inlineRender
