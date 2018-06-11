import Markdown from 'markdown-it'
import headingsPlugin from '../headings'

test('main', () => {
  const md = new Markdown()
  md.use(headingsPlugin)

  const env = {
    headings: []
  }
  const html = md.render(
    `# foo

## hehe

### well good

## wow

## wow

## wow
  `,
    env
  )

  expect(html).toMatchSnapshot('html')
  expect(env).toMatchSnapshot('env')
})
