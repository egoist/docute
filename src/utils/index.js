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

export const getFilenameByPath = (sourcePath, path) => {
  sourcePath = sourcePath || './'
  sourcePath = sourcePath
    // Remove leading relative path indicator, i.e. `.` and `./`
    .replace(/^\.\/?/, '')
    // Ensure the source path does not end with `/`
    // Since out `path` has leading `/`
    .replace(/(.+)\/?$/, '$1')

  if (!/\.md$/.test(path)) {
    path = /\/$/.test(path) ? `${path}README.md` : `${path}.md`
  }

  return sourcePath + path
}
