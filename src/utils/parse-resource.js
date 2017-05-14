import nprogress from 'nprogress'
import marked from './marked'
import { fetchCredentials } from './'

function isFile(file) {
  return /\.(html|md)$/.test(file)
}

export default async function (
  resource,
  {
    fallback,
    progress = true,
    marked: markedOpts,
    componentName = 'custom-resource'
  } = {}
) {
  let text
  let html
  let source
  let component
  /**
  * String: using as file path or markdown string
  * object:
  *   {source}: use as file path
  *   {markdown}: use as markdown and parse to html
  *   {html}: use as html directly
  *   {any + component}: use as component's template
  */

  if (resource === true) {
    resource = fallback
  }

  if (typeof resource === 'string') {
    source = resource
  } else if (typeof resource === 'object' && resource.source) {
    source = resource.source
  }

  if (isFile(source)) {
    progress && nprogress.start()
    const res = await fetch(source, {
      credentials: fetchCredentials(source)
    })
    progress && nprogress.done()

    if (res.status === 404) {
      throw new Error(`${source} not found`)
    }

    text = await res.text()
    html = /\.html$/.test(source) ? text : marked(text)
  } else if (typeof source === 'string') {
    text = source
    html = marked(text, markedOpts)
  }

  if (typeof resource === 'object') {
    if (resource.markdown) {
      text = resource.markdown
      html = marked(text, markedOpts)
    } else if (resource.html) {
      html = resource.html
    }
    if (resource.component) {
      component = {
        name: componentName,
        ...resource.component,
        template: `<div>${html}</div>`
      }
    }
  }

  return {
    component,
    html
  }
}
