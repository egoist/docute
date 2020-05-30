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

    if (level === 2) {
      env.headings.push({
        level,
        raw,
        // Remove trailing HTML
        text: raw.replace(/<.*>\s*$/g, ''),
        slug
      })
    }

    const tag = `h${level}`
    return `<${tag} class="markdown-header" id="${slug}">
    <router-link class="header-anchor" :to="{hash:'${slug}'}">
      <svg class="anchor-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
    </router-link>
    ${text}</${tag}>`
  }

  // Disable template interpolation in code
  renderer.codespan = text => `<code v-pre>${text}</code>`
  const origCode = renderer.code
  renderer.code = function(code, lang, escaped, opts) {
    opts = opts || {}
    const {env} = this.options

    if (opts.mixin) {
      env.mixins.push(code)
      return ''
    }

    let res = origCode.call(this, code, lang, escaped)

    if (!opts.interpolate) {
      res = res.replace(/^<pre>/, '<pre v-pre>')
    }

    if (opts.highlight) {
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
          const escapedLine = v ? marked.escape(v) : '&#8203;'
          return shouldHighlight
            ? `<span class="code-line highlighted">${escapedLine}</span>`
            : `<span class="code-line">${escapedLine}</span>`
        })
        .join('')
      res += `<div${
        opts.interpolate ? '' : ' v-pre'
      } class="code-mask">${codeMask}</div>`
    }

    return `<div data-lang="${lang || ''}" class="pre-wrapper">${res}</div>`
  }

  return hooks.process('extendMarkedRenderer', renderer)
}
