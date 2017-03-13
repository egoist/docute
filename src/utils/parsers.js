class Parsers {
  constructor() {
    this.beforeParseParsers = []
    this.afterParseParsers = []
  }

  beforeParse(fn) {
    this.beforeParseParsers.push(fn)
  }

  afterParse(fn) {
    this.afterParseParsers.push(fn)
  }

  parse(raw, fn) {
    this.beforeParseParsers.forEach(parser => {
      raw = parser(raw)
    })

    raw = fn(raw)

    this.afterParseParsers.forEach(parser => {
      raw = parser(raw)
    })

    return raw
  }
}

const parsers = new Parsers()

const beforeParse = parser => parsers.beforeParse(parser)
const afterParse = parser => parsers.afterParse(parser)

export default parsers

export { beforeParse, afterParse }
