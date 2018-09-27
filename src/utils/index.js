export const isExternalLink = link => {
  return /^https?:\/\//.test(link)
}

export const slugify = str => {
  const RE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g
  const REPLACEMENT = '-'
  const WHITESPACE = /\s/g

  return str
    .trim()
    .replace(RE, '')
    .replace(WHITESPACE, REPLACEMENT)
    .toLowerCase()
}

export const getFilenameByPath = path => {
  return /\/$/.test(path) ? `${path}README.md` : `${path}.md`
}
