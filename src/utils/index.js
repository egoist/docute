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

export const getFileUrl = (sourcePath, path) => {
  sourcePath = sourcePath || '.'

  // Remove trailing slash in `sourcePath`
  // Since `path` always starts with slash
  sourcePath = sourcePath.replace(/\/$/, '')

  const result = sourcePath + path

  return result.replace(/^\.\//, '')
}

export const getFilenameByPath = path => {
  // Ensure path always starts with slash
  path = path.replace(/^\/?/, '/')

  // Add .md suffix
  if (!/\.md$/.test(path)) {
    path = /\/$/.test(path) ? `${path}README.md` : `${path}.md`
  }

  return path
}

export const inBrowser = typeof window !== 'undefined'
