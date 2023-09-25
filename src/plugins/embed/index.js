import {getFilenameByPath, getFileUrl, isExternalLink} from '../../utils'
import inlineRender from '../../utils/inlineRender'

const SCAN = /#embed\(.*?\)(?!`)/g

async function getFile(url, api, type) {
  if (!isExternalLink(url)) {
    let filename = getFilenameByPath(url)
    if (type) {
      filename = filename.replace('.md', '')
    }
    const file = getFileUrl(api.store.getters.config.sourcePath, filename)
    const res = await fetch(file)
    return res.text()
  }
  return url
}

function compileMedia(type, url, api, codeType = '') {
  switch (type) {
    case 'fragment':
      return getFile(url, api).then(inlineRender)
    case 'code':
      return getFile(url, api, type)
        .then(x => `\`\`\`${codeType}\n${x}\n\`\`\``)
        .then(inlineRender)
    default:
      return 'Missing embed kind'
  }
}

async function replaceAsync(str, regex, asyncFn) {
  const promises = []
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args)
    promises.push(promise)
  })
  const data = await Promise.all(promises)
  return str.replace(regex, () => data.shift())
}

function transformEmbeds(markdown, api) {
  function process(match) {
    const params = match
      .replace('#embed(', '')
      .replace(')', '')
      .split(' ')
    const href = params[0]
    const type = params[1]
    const codeType = params[2]
    const embed = compileMedia(type, href, api, codeType, params.slice(3))
    return embed
  }
  return replaceAsync(markdown, SCAN, process)
}

const embedPlugin = {
  name: 'embed',
  extend(api) {
    api.processMarkdown(async markdown => {
      return transformEmbeds(markdown, api)
    })
  }
}

export default embedPlugin
