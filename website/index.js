import Docute from 'docute'

const doc = new Docute({
  routerMode: 'history',
  site: {
    title: 'Docute',
    description: 'Effortlessly documentation done right'
  },
  docs: [
    {
      title: 'Getting Started',
      children: [
        {
          title: 'Installation',
          path: '/docs/getting-started/installation'
        }
      ]
    }
  ],
  nav: [
    {
      title: 'Home',
      path: '/'
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
