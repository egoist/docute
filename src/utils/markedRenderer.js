import marked from './marked'
import {slugify} from '.'

export default hooks => {
  const renderer = new marked.Renderer()

  const slugs = []
  renderer.heading = function(text, level, raw) {
    const {env} = this.options

    let slug = slugify(raw)
    slugs.push(slug)
    const sameSlugCount = slugs.filter(v => v === slug).length
    if (sameSlugCount > 1) {
      slug += `-${sameSlugCount}`
    }

    if (level === 1) {
      env.title = text
      // Remove h1 header
      return ''
    }

    if (level === 2 || level === 3) {
      env.headings.push({
        level,
        raw,
        // Remove trailing HTML
        text: raw.replace(/<.*>\s*$/g, ''),
        slug
      })
    }

    const tag = `h${level}`
    return `<${tag} id="${slug}">${text}</${tag}>`
  }

  // Disable template interpolation in code
  renderer.codespan = text => `<code v-pre>${text}</code>`
  const origCode = renderer.code
  renderer.code = function(code, lang, escaped, opts) {
    let res = origCode
      .call(this, code, lang, escaped)
      .replace(/^<pre>/, '<pre v-pre>')

    if (opts && opts.highlight) {
      const codeMask = code
        .split('\n')
        .map((v, i) => {
          i += 1
          const shouldHighlight = opts.highlight.some(number => {
            if (typeof number === 'number') {
              return number === i
            }
            if (typeof number === 'string') {
              const [start, end] = number.split('-').map(Number)
              return i >= start && (!end || i <= end)
            }
            return false
          })
          return shouldHighlight
            ? `<span class="code-line highlighted">&#8203;</span>`
            : `<span class="code-line">&#8203;</span>`
        })
        .join('')
      res += `<div class="code-mask">${codeMask}</div>`
    }

    return `<div data-lang="${lang || ''}" class="pre-wrapper">${res}</div>`
  }

  return hooks.process('extendMarkedRenderer', renderer)
}
