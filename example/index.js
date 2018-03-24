import Docute from 'docute'

const doc = new Docute({
  docs: [
    {
      title: 'Gettings started',
      children: [
        { title: 'Introduction', path: '/docs/getting-started/introduction' },
        { title: 'Download', path: '/docs/getting-started/download' }
      ]
    },
    {
      title: 'Advanced',
      children: [{ title: 'JSX in Depth', path: '/docs/advanced/jsx-in-depth' }]
    }
  ],
  nav: [
    {
      title: 'Home',
      path: '/'
    },
    { title: 'Docs', path: '/docs/getting-started/introduction' },
    {
      title: 'Help',
      path: '/help'
    }
  ]
})

doc.start('#app')

window.doc = doc
