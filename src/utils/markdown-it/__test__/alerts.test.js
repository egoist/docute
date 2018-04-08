import MarkdownIt from 'markdown-it'
import alertsPlugin from '../alerts'

const md = new MarkdownIt()
md.use(alertsPlugin())

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

test('multiple paragraph', () => {
  const html = md.render(`
> __Info__: hehe
>
> nah
  `)

    expect(html).toMatchSnapshot()
})
