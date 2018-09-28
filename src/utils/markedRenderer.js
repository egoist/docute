import marked from './marked'
import {slugify} from '.'

export default env => {
  const renderer = new marked.Renderer()

  env.headings = []
  const slugs = []
  renderer.heading = function(text, level, raw) {
    let slug = slugify(raw)
    slugs.push(slug)
    const sameSlugCount = slugs.filter(v => v === slug).length
    if (sameSlugCount > 1) {
      slug += `-${sameSlugCount}`
    }

    if (level === 1) {
      env.title = text
    } else if (level === 2 || level === 3) {
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
  renderer.code = function(code, lang, excaped) {
    const codeOptsRE = /({.+})/
    let codeOpts = {}
    if (lang && codeOptsRE.test(lang)) {
      codeOpts = codeOptsRE.exec(lang)[1].trim()
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`return ${codeOpts}`)
        codeOpts = fn()
      } catch (error) {
        throw new Error(
          `You're using invalid options for code fences, it must be JSON or JS object!\n${
            error.message
          }`
        )
      }
      lang = lang.replace(codeOptsRE, '').trim()
    }

    let res = origCode
      .call(this, code, lang, excaped)
      .replace(/^<pre>/, '<pre v-pre>')

    if (codeOpts.highlight) {
      const codeMask = code
        .split('\n')
        .map((v, i) => {
          i += 1
          const shouldHighlight = codeOpts.highlight.some(number => {
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

  return renderer
}
