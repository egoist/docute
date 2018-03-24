
import parser from 'yamljs'

const optionalByteOrderMark = '\\ufeff?'
const pattern =
  '^(' +
  optionalByteOrderMark +
  '(= yaml =|---)' +
  '$([\\s\\S]*?)' +
  '^(?:\\2|\\.\\.\\.)' +
  '$' +
  (process.platform === 'win32' ? '\\r?' : '') +
  '(?:\\n)?)'
// NOTE: If this pattern uses the 'g' flag the `regex` variable definition will
// need to be moved down into the functions that use it.
const regex = new RegExp(pattern, 'm')

function extractor(string) {
  string = string || ''

  const lines = string.split(/(\r?\n)/)
  // eslint-disable-next-line no-div-regex
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse(string)
  }
  return { attributes: {}, body: string }
}

function parse(string) {
  const match = regex.exec(string)

  if (!match) {
    return {
      attributes: {},
      body: string
    }
  }

  const yaml = match[match.length - 1].replace(/^\s+|\s+$/g, '')
  const attributes = parser.parse(yaml) || {}
  const body = string.replace(match[0], '')

  return { attributes, body, frontmatter: yaml }
}

function test(string = '') {
  return regex.test(string)
}

extractor.test = test

export default extractor
