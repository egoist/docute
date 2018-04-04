import MarkdownIt from 'markdown-it'
import messageBlocksPlugin from '../messageBlocks'

const md = new MarkdownIt()
md.use(messageBlocksPlugin())

test('main', () => {
  const html = md.render(`
> __Info__: This is a \`info\`!

> __Warning__: This is a <code>warning</code>!

> __Success__: This is __ok__!

>   __Note__: This is just a _note_!
`)
  expect(html).toMatchSnapshot()
})

test('no matching', () => {
  const html = md.render(`
> __Info__ : hehe

> nah
`)

  expect(html).toMatchSnapshot()
})
