import MarkdownIt from 'markdown-it'
import headingsPlugin from '../headings'

test('main', () => {
  const md = new MarkdownIt()
  const state = { headings: [] }
  md.use(headingsPlugin(state))
  const html = md.render(`
# hello __foo__

## hello 2 <code>hi</code>
  `)
  expect(state).toMatchSnapshot('state')
  expect(html).toMatchSnapshot('html')
})
