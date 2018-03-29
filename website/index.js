import Docute from 'docute'

const doc = new Docute({
  routerMode: 'history',
  site: {
    title: 'Docute',
    description: 'Effortlessly documentation done right'
  },
  docs: [
    {
      title: 'Essentials',
      children: [
        {
          title: 'Installation',
          path: '/docs/essentials/installation'
        },
        {
          title: 'The Docute Instance',
          path: '/docs/essentials/the-docute-instance'
        },
        {
          title: 'Content Format',
          path: '/docs/essentials/content-format'
        },
        {
          title: 'Layouts',
          path: '/docs/essentials/layouts'
        },
        {
          title: 'Front-Matter',
          path: '/docs/essentials/front-matter'
        }
      ]
    }
  ],
  nav: [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Docs',
      path: '/docs/essentials/installation'
    }
  ],
  source: {
    '/not-exists': {
      title: 'hahha',
      content: 'this is great'
    }
  }
})

doc.start('#app')
